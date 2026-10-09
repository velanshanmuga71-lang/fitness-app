export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const rawText = (req.query.text || req.body?.text || '').trim();
  const lang = (req.query.lang || req.body?.lang || 'en').trim();

  if (!rawText) {
    return res.status(400).json({ error: 'Text parameter is required' });
  }

  // Clean text for natural speech synthesis
  const cleanText = rawText
    .replace(/[*#_~`•▸►→]/g, ' ')
    .replace(/[^\w\s.,!?'’"-]/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 320); // Keep voice responses concise and natural

  try {
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(lang)}&client=tw-ob&q=${encodeURIComponent(cleanText)}`;
    
    const audioRes = await fetch(googleTtsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://translate.google.com/'
      }
    });

    if (!audioRes.ok) {
      return res.status(audioRes.status).json({ error: 'Failed to synthesize speech' });
    }

    const audioBuffer = await audioRes.arrayBuffer();
    
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    return res.send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error('TTS error:', err);
    return res.status(500).json({ error: 'TTS service failed', details: err.message });
  }
}
