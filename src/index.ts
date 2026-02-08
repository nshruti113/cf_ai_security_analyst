import { ConversationMemory } from './memory';
import { SecurityAnalyzer } from './ai-analyzer';

export { ConversationMemory };

interface Env {
  AI: any;
  MEMORY: DurableObjectNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Route: /api/chat - Main chat endpoint
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      try {
        const { message, conversationId = 'default' } = await request.json();

        if (!message) {
          return new Response(JSON.stringify({ error: 'Message is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Get Durable Object instance for this conversation
        const id = env.MEMORY.idFromName(conversationId);
        const memoryObj = env.MEMORY.get(id);

        // Retrieve conversation history
        const historyResponse = await memoryObj.fetch(
          new Request(`http://memory/history?id=${conversationId}`, { method: 'GET' })
        );
        const { history } = await historyResponse.json();

        // Store user message
        await memoryObj.fetch(
          new Request(`http://memory/history?id=${conversationId}`, {
            method: 'POST',
            body: JSON.stringify({ role: 'user', content: message })
          })
        );

        // Generate AI response
        const analyzer = new SecurityAnalyzer(env.AI);
        const aiResponse = await analyzer.analyzeSecurityQuery(message, history);

        // Store AI response
        await memoryObj.fetch(
          new Request(`http://memory/history?id=${conversationId}`, {
            method: 'POST',
            body: JSON.stringify({ role: 'assistant', content: aiResponse })
          })
        );

        return new Response(JSON.stringify({ 
          response: aiResponse,
          conversationId 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } catch (error: any) {
        console.error('Chat error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Route: /api/analyze-traffic - Analyze traffic patterns
    if (url.pathname === '/api/analyze-traffic' && request.method === 'POST') {
      try {
        const trafficData = await request.json();
        const analyzer = new SecurityAnalyzer(env.AI);
        const analysis = await analyzer.analyzeTrafficPattern(trafficData);

        return new Response(JSON.stringify({ analysis }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Route: /api/generate-report - Generate incident report
    if (url.pathname === '/api/generate-report' && request.method === 'POST') {
      try {
        const { incidents } = await request.json();
        const analyzer = new SecurityAnalyzer(env.AI);
        const report = await analyzer.generateIncidentReport(incidents);

        return new Response(JSON.stringify({ report }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Route: /api/history - Get conversation history
    if (url.pathname === '/api/history' && request.method === 'GET') {
      const conversationId = url.searchParams.get('id') || 'default';
      const id = env.MEMORY.idFromName(conversationId);
      const memoryObj = env.MEMORY.get(id);
      
      const response = await memoryObj.fetch(
        new Request(`http://memory/history?id=${conversationId}`, { method: 'GET' })
      );
      
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Route: /api/clear - Clear conversation history
    if (url.pathname === '/api/clear' && request.method === 'DELETE') {
      const conversationId = url.searchParams.get('id') || 'default';
      const id = env.MEMORY.idFromName(conversationId);
      const memoryObj = env.MEMORY.get(id);
      
      await memoryObj.fetch(
        new Request(`http://memory/history?id=${conversationId}`, { method: 'DELETE' })
      );
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Health check
    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({ 
        status: 'healthy',
        service: 'SecureBot AI Security Analyst',
        version: '1.0.0'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Default: return 404
    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};