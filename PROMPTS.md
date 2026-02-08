# AI Prompts Used in Development

This document contains all AI prompts used during the development of SecureBot.

## Initial Project Planning

**Prompt:**
```
Help me build an AI-powered security analyst chatbot for Cloudflare that:
- Uses Llama 3.3 on Workers AI
- Implements Durable Objects for conversation memory
- Provides real-time chat interface
- Analyzes DDoS attack patterns
```

## System Prompt for SecureBot

**Prompt used in `src/ai-analyzer.ts`:**
```
You are SecureBot, an expert AI security analyst specializing in DDoS attack analysis and network security.

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
```

## Traffic Pattern Analysis Prompt

**Prompt template for analyzing network traffic:**
```
Analyze this network traffic pattern and determine if it's malicious:

Traffic Data:
- Total Requests: {totalRequests}
- Unique IPs: {uniqueIPs}
- Requests per IP: {requestsPerIP}
- IP Entropy: {ipEntropy}
- Protocol Distribution: {protocols}
- Top Source IPs: {topIPs}

Provide:
1. Attack classification (if malicious)
2. Confidence level
3. Reasoning
4. Recommended actions
```

## Incident Report Generation Prompt

**Prompt for generating security reports:**
```
Generate a concise security incident report for these attacks:

{incident_list}

Include:
1. Executive Summary
2. Attack Timeline
3. Impact Assessment
4. Mitigation Actions Taken
5. Recommendations

Keep it professional and actionable.
```

## Code Generation Prompts

### Durable Objects Implementation
**Prompt:**
```
Create a Cloudflare Durable Object class that:
- Stores conversation history
- Supports GET, POST, DELETE operations
- Keeps last 50 messages
- Uses Durable Object storage API
```

### Workers AI Integration
**Prompt:**
```
Create a TypeScript class that integrates with Cloudflare Workers AI to:
- Call Llama 3.3 model
- Pass conversation history as context
- Handle system and user prompts
- Return formatted responses
- Include error handling
```

### Chat Interface
**Prompt:**
```
Design a modern, professional chat interface with:
- Clean gradient design
- Message bubbles for user/AI
- Typing indicators
- Quick action buttons for common queries
- Responsive layout
- Smooth animations
```

## Testing Prompts

Example queries used for testing:

1. "What is a SYN flood attack and how can I detect it?"
2. "Analyze traffic: 5000 req/sec, 10 IPs, entropy 2.1"
3. "Best practices for DDoS mitigation"
4. "How does Slowloris differ from HTTP flood?"
5. "Generate incident report for yesterday's attacks"

## Refinement Prompts

**For improving response quality:**
```
Make the AI responses more:
- Actionable (specific mitigation steps)
- Technical but accessible
- Include real-world examples
- Reference industry standards (OWASP, NIST)
```

---

**Note:** This application was built with AI assistance (Claude by Anthropic) but all architecture decisions, implementation details, and testing were done by the developer.