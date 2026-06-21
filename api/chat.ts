export const config = {
  runtime: 'edge',
};

const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Very basic in-memory rate limiting (Note: resets on cold starts in serverless environments, but works per instance)
const rateLimitCache = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 20;

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  if (!GROQ_API_KEY) {
    return new Response(JSON.stringify({ error: 'GROQ_API_KEY is not set' }), { status: 500 });
  }

  // Rate Limiting Logic
  // Get IP address from headers (Vercel specific header)
  const ip = req.headers.get('x-forwarded-for') || 'unknown-ip';
  const now = Date.now();
  const rateLimitData = rateLimitCache.get(ip);

  if (rateLimitData) {
    if (now - rateLimitData.timestamp < RATE_LIMIT_WINDOW) {
      if (rateLimitData.count >= MAX_REQUESTS) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), { status: 429 });
      }
      rateLimitData.count += 1;
    } else {
      // Reset window
      rateLimitCache.set(ip, { count: 1, timestamp: now });
    }
  } else {
    rateLimitCache.set(ip, { count: 1, timestamp: now });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), { status: 400 });
    }

    // Call Groq API via standard Fetch
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API Error:', errorText);
      return new Response(JSON.stringify({ error: 'Error communicating with AI service' }), { status: 500 });
    }

    // Return the readable stream directly to the client
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in chat handler:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
