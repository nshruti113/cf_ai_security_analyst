interface Env {
  AI: any;
}

export class SecurityAnalyzer {
  private ai: any;

  constructor(ai: any) {
    this.ai = ai;
  }

  async analyzeSecurityQuery(query: string, conversationHistory: any[] = []): Promise<string> {
    // Build context from conversation history
    const historyContext = conversationHistory
      .slice(-10) // Last 10 messages
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    const systemPrompt = `You are SecureBot, an expert AI security analyst specializing in DDoS attack analysis and network security.

Your expertise includes:
- DDoS attack pattern recognition (SYN floods, HTTP floods, Slowloris, UDP floods)
- Network traffic analysis and anomaly detection
- Security incident response and mitigation strategies
- Threat intelligence and risk assessment

Guidelines:
- Provide clear, actionable security recommendations
- Explain technical concepts in an accessible way
- Reference specific attack signatures and patterns when relevant
- Suggest concrete mitigation steps
- Be concise but thorough

If asked about attack patterns, explain:
- What the attack does
- How to detect it
- Recommended mitigation strategies
- Risk level assessment`;

    const userPrompt = historyContext 
      ? `Previous conversation:\n${historyContext}\n\nCurrent question: ${query}`
      : query;

    try {
      const response = await this.ai.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 1024,
        temperature: 0.7,
      });

      return response.response || 'I apologize, but I couldn\'t generate a response. Please try again.';
    } catch (error) {
      console.error('AI Error:', error);
      return 'I encountered an error processing your request. Please try again.';
    }
  }

  async analyzeTrafficPattern(pattern: any): Promise<string> {
    const prompt = `Analyze this network traffic pattern and determine if it's malicious:

Traffic Data:
- Total Requests: ${pattern.totalRequests}
- Unique IPs: ${pattern.uniqueIPs}
- Requests per IP: ${pattern.requestsPerIP}
- IP Entropy: ${pattern.ipEntropy}
- Protocol Distribution: ${JSON.stringify(pattern.protocols)}
- Top Source IPs: ${pattern.topIPs?.join(', ') || 'N/A'}

Provide:
1. Attack classification (if malicious)
2. Confidence level
3. Reasoning
4. Recommended actions`;

    return this.analyzeSecurityQuery(prompt);
  }

  async generateIncidentReport(incidents: any[]): Promise<string> {
    const incidentSummary = incidents.map(inc => 
      `- ${inc.type} attack at ${inc.timestamp} (Confidence: ${inc.confidence})`
    ).join('\n');

    const prompt = `Generate a concise security incident report for these attacks:

${incidentSummary}

Include:
1. Executive Summary
2. Attack Timeline
3. Impact Assessment
4. Mitigation Actions Taken
5. Recommendations

Keep it professional and actionable.`;

    return this.analyzeSecurityQuery(prompt);
  }
}