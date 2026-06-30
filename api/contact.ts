export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const data = await req.json();

    // It's highly recommended to move this to an environment variable in Vercel:
    // process.env.DISCORD_WEBHOOK_URL
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL || 'https://discordapp.com/api/webhooks/1479474596859088896/OvJ8zGtBfAEadnZjvXvonkHNp-vPxYDlpFwUO4xU7dGFWPJIWamqJGj1Dbo_j88qgP0w';

    const response = await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('Discord Webhook Error:', await response.text());
      return new Response(JSON.stringify({ error: 'Failed to send message to Discord' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in contact handler:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
