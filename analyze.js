// api/analyze.js — Vercel Serverless Function
// Proxies Claude API calls from dashboard to avoid CORS

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { api_key, prompt, type } = req.body;
  if (!api_key || !prompt) return res.status(400).json({ error: "api_key and prompt required" });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    if (data.error) return res.status(400).json({ success: false, error: data.error.message });
    const text = data.content?.[0]?.text || "";
    return res.status(200).json({ success: true, text, type });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
