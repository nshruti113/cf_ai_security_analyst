// Durable Object to store conversation history and security incidents
export class ConversationMemory {
  state: DurableObjectState;
  conversations: Map<string, any[]>;

  constructor(state: DurableObjectState) {
    this.state = state;
    this.conversations = new Map();
  }

  async fetch(request: Request) {
    const url = new URL(request.url);
    const conversationId = url.searchParams.get('id') || 'default';

    if (request.method === 'POST') {
      // Add message to conversation history
      const message = await request.json();
      
      let history = await this.state.storage.get<any[]>(`conv:${conversationId}`) || [];
      history.push({
        ...message,
        timestamp: new Date().toISOString()
      });
      
      // Keep last 50 messages
      if (history.length > 50) {
        history = history.slice(-50);
      }
      
      await this.state.storage.put(`conv:${conversationId}`, history);
      
      return new Response(JSON.stringify({ success: true, historyLength: history.length }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'GET') {
      // Retrieve conversation history
      const history = await this.state.storage.get<any[]>(`conv:${conversationId}`) || [];
      return new Response(JSON.stringify({ history }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'DELETE') {
      // Clear conversation history
      await this.state.storage.delete(`conv:${conversationId}`);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response('Method not allowed', { status: 405 });
  }
}