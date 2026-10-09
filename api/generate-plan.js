export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-goog-api-key');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not configured' });
  }

  const { name, age, height, weight, goalWeight, goalType, duration, frequency } = req.body;

  const prompt = `You are an elite sports scientist and strength coach. Create a custom periodized training program tailored specifically for this athlete:
- Name: ${name || 'Athlete'}
- Age: ${age || 22}, Height: ${height || 185}cm
- Current Weight: ${weight || 75}kg -> Target: ${goalWeight || 85}kg
- Primary Goal: ${goalType || 'Lean Bulk & Muscle Gain'}
- Commitment Duration: ${duration || '48 Weeks (1 Year)'}
- Weekly Training Days: ${frequency || '3 Days / Week (Full Body)'}

Calculate their personalized nutrition targets (daily calories, protein in grams, carbs in grams, fat in grams) based on their biometrics and goal.
Design the phases to match their duration:
- If duration is 12 Weeks: provide 2 phases (e.g. Weeks 1-6 Foundation, Weeks 7-12 Progression).
- If duration is 24 Weeks: provide 3 phases.
- If duration is 48 Weeks: provide 4 periodized phases.

For each phase:
- Provide 1 to 2 distinct workouts (e.g. Workout A / Workout B, or Upper / Lower, or Push / Pull).
- Set days to match their frequency (e.g. if 3 days: ["Monday", "Wednesday", "Friday"]; if 4 days: ["Monday", "Tuesday", "Thursday", "Friday"]; if 5 days: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"]).
- Include 4 to 6 foundational exercises per workout with clear sets, reps, restTime (seconds), focus, instruction, and breathing tips.
- List restDays and a recovery protocol.

Respond with ONLY valid JSON conforming to this exact structure:
{
  "programTitle": "Custom Plan Title for ${name || 'Athlete'}",
  "programSummary": "1-2 sentence overview of the customized scientific strategy",
  "dailyTargetKcal": 2800,
  "dailyProteinGrams": 160,
  "dailyCarbsGrams": 320,
  "dailyFatGrams": 70,
  "phases": [
    {
      "id": 1,
      "name": "Phase 1: Adaptation & Foundation",
      "months": "1-1.5",
      "weeks": "Weeks 1-6",
      "goal": "Core neuromuscular adaptation and movement competence",
      "frequency": "${frequency || '3 Days / Week'}",
      "restBetweenExercises": 60,
      "restDays": ["Tuesday", "Thursday", "Saturday", "Sunday"],
      "recovery": "20-30 min Zone 2 walk + mobility stretching",
      "nutrition": { "kcal": 2800, "pro": 160, "carb": 320, "fat": 70 },
      "workouts": [
        {
          "name": "Full Body A",
          "days": ["Monday", "Wednesday", "Friday"],
          "exercises": [
            {
              "name": "Standard Push-Ups",
              "sets": 3,
              "reps": "10-15",
              "restTime": 60,
              "focus": "Chest & Triceps control",
              "instruction": "Hands shoulder-width apart, lower chest until an inch above the floor.",
              "breathing": "Inhale down, exhale up."
            },
            {
              "name": "Table Rows",
              "sets": 3,
              "reps": "8-12",
              "restTime": 60,
              "focus": "Upper back contraction",
              "instruction": "Lie beneath horizontal edge, pull chest up squeezing shoulder blades.",
              "breathing": "Exhale pulling up, inhale lowering."
            },
            {
              "name": "Air Squats",
              "sets": 3,
              "reps": "15-20",
              "restTime": 60,
              "focus": "Full depth & knee tracking",
              "instruction": "Hips back and down past parallel, chest upright.",
              "breathing": "Inhale down, exhale stand."
            },
            {
              "name": "Plank",
              "sets": 3,
              "reps": "45-60s",
              "restTime": 60,
              "focus": "Core brace & pelvic tilt",
              "instruction": "Maintain straight rigid line from shoulders to heels.",
              "breathing": "Consistent diaphragmatic breaths."
            }
          ]
        }
      ]
    }
  ]
}`;

  const models = ['gemini-flash-latest', 'gemini-3.5-flash-lite', 'gemini-flash-lite-latest'];
  for (const model of models) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey.trim()
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      });

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        try {
          const cleanJson = JSON.parse(rawText.replace(/```json/gi, '').replace(/```/g, '').trim());
          return res.status(200).json(cleanJson);
        } catch (e) {
          return res.status(200).json({ rawText });
        }
      }
    } catch (err) {
      console.warn(`Model ${model} plan generation error:`, err);
    }
  }

  return res.status(500).json({ error: 'Failed to generate plan across all Gemini models' });
}
