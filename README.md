# 🛡️ SecureBot - AI Security Analyst

> AI-powered security analyst chatbot built on Cloudflare Workers AI, specialized in DDoS attack analysis and threat detection.

**🌐 Live Demo:** https://cf-ai-security-analyst.shrutinarayana19.workers.dev

**Tech Stack**: Cloudflare Workers, Workers AI (Llama 3.3), Durable Objects, TypeScript

[![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat&logo=cloudflare)](https://workers.cloudflare.com/)
[![AI](https://img.shields.io/badge/Workers%20AI-Llama%203.3-blue)](https://ai.cloudflare.com/)

---

## 🎯 Overview

SecureBot is an intelligent security assistant that helps analyze DDoS attacks, provide mitigation strategies, and generate incident reports using state-of-the-art LLM technology.

### Key Features

✅ **LLM Integration**: Powered by Llama 3.3 70B on Cloudflare Workers AI  
✅ **Persistent Memory**: Durable Objects store conversation history  
✅ **Real-time Chat**: Interactive web interface for security queries  
✅ **Traffic Analysis**: AI-powered network pattern analysis  
✅ **Incident Reports**: Automated security report generation  

---

## 🏗️ Architecture
```
User Interface (Cloudflare Pages)
          ↓
Cloudflare Worker (API Routes)
          ↓
┌─────────────────┬──────────────────┐
│                 │                  │
Workers AI    Durable Objects      │
(Llama 3.3)   (Memory/State)       │
                                    │
          AI Analysis ←─────────────┘
```

### Components

1. **Cloudflare Worker** (`src/index.ts`) - Main API handler
2. **AI Analyzer** (`src/ai-analyzer.ts`) - LLM integration and prompts
3. **Durable Objects** (`src/memory.ts`) - Conversation state management
4. **Chat Interface** (`public/index.html`) - User-facing web UI

---

## 🚀 Quick Start

### Prerequisites

- Cloudflare account (free tier works!)
- Node.js 16.13+
- Wrangler CLI

### Local Development
```bash
# Clone the repository
git clone https://github.com/nshruti113/cf_ai_security_analyst.git
cd cf_ai_security_analyst

# Install dependencies
npm install

# Login to Cloudflare
wrangler login

# Run locally
wrangler dev

# Open browser
http://localhost:8787
```

### Deploy to Cloudflare
```bash
# Deploy Worker + Durable Objects
wrangler deploy

# Your app will be live at:
# https://cf-ai-security-analyst.<your-subdomain>.workers.dev
```

---

## 💬 Usage Examples

### Chat Interface

Ask SecureBot questions like:

- "What is a SYN flood attack?"
- "How do I detect HTTP floods?"
- "Analyze traffic: 5000 req/sec, 10 unique IPs, entropy 2.1"
- "Best practices for DDoS mitigation"
- "Generate an incident report for today's attacks"

### API Endpoints

#### POST `/api/chat`
```bash
curl -X POST https://your-worker.workers.dev/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is a DDoS attack?",
    "conversationId": "session-123"
  }'
```

#### POST `/api/analyze-traffic`
```bash
curl -X POST https://your-worker.workers.dev/api/analyze-traffic \
  -H "Content-Type: application/json" \
  -d '{
    "totalRequests": 5000,
    "uniqueIPs": 10,
    "ipEntropy": 2.1,
    "protocols": {"HTTP": 4500, "TCP": 500}
  }'
```

#### GET `/api/history`
```bash
curl https://your-worker.workers.dev/api/history?id=session-123
```

#### DELETE `/api/clear`
```bash
curl -X DELETE https://your-worker.workers.dev/api/clear?id=session-123
```

---

## 🧠 AI Capabilities

### Security Expertise

SecureBot is trained to help with:

- **Attack Recognition**: SYN floods, HTTP floods, Slowloris, UDP floods
- **Traffic Analysis**: Pattern detection and anomaly identification  
- **Mitigation Strategies**: Actionable defense recommendations
- **Incident Response**: Step-by-step response procedures
- **Risk Assessment**: Threat level evaluation

### Context-Aware Conversations

- Remembers previous messages in the conversation
- Provides consistent, contextual responses
- Adapts explanations based on user's technical level

---

## 🛠️ Technical Details

### Workers AI (LLM)

- **Model**: `@cf/meta/llama-3.3-70b-instruct-fp8-fast`
- **Max Tokens**: 1024
- **Temperature**: 0.7 (balanced creativity/accuracy)

### Durable Objects (Memory)

- **Storage**: Persistent conversation history
- **Capacity**: Last 50 messages per conversation
- **Isolation**: Per-conversation state management

### Performance

- **Response Time**: < 2 seconds (avg)
- **Scalability**: Serverless, auto-scaling
- **Cost**: Pay-per-request pricing

---

## 📁 Project Structure
```
cf_ai_security_analyst/
├── src/
│   ├── index.ts           # Main Worker (API routes)
│   ├── ai-analyzer.ts     # AI logic & prompts
│   └── memory.ts          # Durable Objects (state)
├── public/
│   └── index.html         # Chat interface
├── wrangler.toml          # Cloudflare config
├── package.json
├── tsconfig.json
├── README.md
└── PROMPTS.md            # AI prompts documentation

---

## 🤝 Contributing

This is a portfolio project. Feedback and suggestions are welcome!

---

## 📄 License

MIT License

---

**Built with Cloudflare Workers, Workers AI, and Durable Objects** 🚀