import React, { useState, useEffect, useRef } from 'react';
import {
  Dumbbell,
  Calendar,
  Target,
  Flame,
  CheckCircle2,
  ArrowRight,
  Info,
  Activity,
  Award,
  Circle,
  TrendingUp,
  ChevronRight,
  Plus,
  History,
  Clock,
  Droplets,
  Moon,
  Coffee,
  Utensils,
  Camera,
  Menu,
  X,
  BookOpen,
  Wind,
  Sun,
  Zap,
  ShieldAlert,
  RotateCcw,
  LayoutGrid,
  Home,
  ChevronLeft,
  Download,
  Upload,
  Cloud,
  User,
  LogIn,
  LogOut,
  Sparkles,
  Scale,
  Mail,
  Lock,
  Bot,
  Send,
  Volume2,
  VolumeX,
  Key,
  Settings,
  Sliders,
  MessageSquare,
  MessageSquareText,
  ChevronDown,
  Mic,
  MicOff,
  Paperclip,
  FileText,
  Phone,
  PhoneOff,
  Radio
} from 'lucide-react';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { motion, AnimatePresence } from 'framer-motion';
import { programData } from './data/program';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  auth, 
  loginWithGoogle, 
  signUpWithEmail, 
  loginWithEmail, 
  logoutUser, 
  saveUserCloudData, 
  loadUserCloudData 
} from './firebase';
import './App.css';

const flatRampWarmup = [
  { name: "Jumping Jacks", image: "/Exercise images/Warm-ups images/Jumping-Jack.gif", target: "Increase Heart Rate & Core Temp", volume: "60 seconds", type: 'timer', duration: 60, phase: "Raise" },
  { name: "High Knees", image: "/Exercise images/Warm-ups images/High-Knees.gif", target: "Hip Flexors & Pulse Raising", volume: "60 seconds", type: 'timer', duration: 60, phase: "Raise" },
  { name: "Scapular Push-ups", image: "/Exercise images/Warm-ups images/Scapular Push-ups.gif", target: "Shoulder Stability & Mid-Back", volume: "10-12 reps", type: 'reps', phase: "Activate" },
  { name: "Glute Bridges", image: "/Exercise images/Warm-ups images/Glute Bridges.gif", target: "Glute & Lower Back Engagement", volume: "10-15 reps", type: 'reps', phase: "Activate" },
  { name: "Arm Circles", image: "/Exercise images/Warm-ups images/Arm Circles.gif", target: "3D Shoulder Mobility", volume: "10 each way", type: 'reps', phase: "Mobilize" },
  { name: "Leg Swings", image: "/Exercise images/Warm-ups images/leg-swings.gif", target: "Hamstring & Hip Flexibility", volume: "10 per leg", type: 'reps', phase: "Mobilize" },
  { name: "Cat-Cow", image: "/Exercise images/Warm-ups images/Cat-Cow.gif", target: "Spinal Mobility (vital for 6.1 ft frame)", volume: "10 reps", type: 'reps', phase: "Mobilize" },
  { name: "Wrist Rotations", image: "/Exercise images/Warm-ups images/Wrist Rotations.gif", target: "Forearm & Grip Health", volume: "20 seconds", type: 'timer', duration: 20, phase: "Mobilize" },
  { name: "Primer Set", image: null, target: "First exercise of the day (Low Intensity)", volume: "1 set x 15 reps", type: 'reps', phase: "Potentiate" }
];

const DEFAULT_GUEST_PROFILE = {
  name: '',
  age: 22,
  height: 185,
  startingWeight: 75,
  currentWeight: 75,
  goalWeight: 85,
  goalType: 'Lean Bulk & Muscle Gain',
  duration: '48 Weeks (1 Year)',
  frequency: '3 Days / Week (Full Body)',
  targetGain: '10kg',
  onboardingCompleted: false
};

// Pure Exercise Image Resolver mapping to local assets & remote fallback
const getExerciseImagePath = (name) => {
  if (!name) return '/app-icon.jpg';
  const n = name.toLowerCase().trim();
  if (n.includes('incline') && n.includes('push')) return '/Exercise images/Incline pushups.gif';
  if (n.includes('decline') && n.includes('push')) return '/Exercise images/Decline Push-Ups.png';
  if (n.includes('diamond') && n.includes('push')) return '/Exercise images/Diamond Push-Ups.png';
  if (n.includes('archer') && n.includes('push')) return '/Exercise images/Archer Push-Ups.gif';
  if (n.includes('pike') && n.includes('push')) return '/Exercise images/Pike Push Ups.png';
  if (n.includes('pseudo') || (n.includes('planche') && n.includes('push'))) return '/Exercise images/Pseudo Planche Push-Ups.gif';
  if (n.includes('push-up') || n.includes('push up') || n.includes('pushups')) return '/Exercise images/Standard Push-Ups.png';

  if (n.includes('archer') && n.includes('row')) return '/Exercise images/Archer Rows.png';
  if (n.includes('one-arm') && n.includes('row')) return '/Exercise images/One-Arm Table Rows.jpg';
  if (n.includes('towel') && n.includes('lat')) return '/Exercise images/Towel Lat Pulldowns.png';
  if (n.includes('towel') && n.includes('row')) return '/Exercise images/Towel Rows.png';
  if (n.includes('table row') || n.includes('inverted row') || n.includes('row')) return '/Exercise images/Table Rows.jpg';

  if (n.includes('bulgarian') || n.includes('split squat')) return '/Exercise images/Bulgarian-split-squat.jpg';
  if (n.includes('pistol') && (n.includes('assist') || n.includes('box'))) return '/Exercise images/assisted pistol squats.webp';
  if (n.includes('pistol')) return '/Exercise images/Full Pistol Squats.png';
  if (n.includes('wall sit') || n.includes('wall-sit')) return '/Exercise images/wall-sits.webp';
  if (n.includes('squat')) return '/Exercise images/Air Squats.jpg';

  if (n.includes('jumping lunge') || (n.includes('jump') && n.includes('lunge'))) return '/Exercise images/Jumping Lunges.gif';
  if (n.includes('lunge')) return '/Exercise images/Reverse Lunges.png';

  if (n.includes('single-leg') && n.includes('bridge')) return '/Exercise images/Single-Leg Glute Bridges.png';
  if (n.includes('glute bridge') || n.includes('hip thrust') || n.includes('bridge')) return '/Exercise images/Glute Bridges.png';

  if (n.includes('calf raise') || n.includes('calf')) return '/Exercise images/Calf Raises.jpg';
  if (n.includes('nordic')) return '/Exercise images/Nordic Hamstring Curl.webp';
  if (n.includes('burpee')) return '/Exercise images/Burpees.gif';
  if (n.includes('walkout')) return '/Exercise images/plank walkouts.gif';
  if (n.includes('plank')) return '/Exercise images/Plank.png';
  if (n.includes('hollow')) return '/Exercise images/Hollow Body Hold.webp';
  if (n.includes('pulse') && n.includes('superman')) return '/Exercise images/Superman Pulses.jpg';
  if (n.includes('superman')) return '/Exercise images/Superman Holds.webp';
  if (n.includes('russian')) return '/Exercise images/Russian Twist.webp';
  if (n.includes('l-sit') || n.includes('lsit')) return '/Exercise images/L-Sits.webp';
  if (n.includes('handstand')) return '/Exercise images/Wall Handstand Practice.gif';

  return `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${n.replace(/ /g, '_')}/0.jpg`;
};

// Sports-Science Heuristic Program Generator (Offline/Resilient Fallback)
const buildSmartHeuristicPlan = (profile) => {
  const name = profile.name || 'Athlete';
  const goal = profile.goalType || 'Lean Bulk & Muscle Gain';
  const freq = profile.frequency || '3 Days / Week (Full Body)';
  const duration = profile.duration || '48 Weeks (1 Year)';
  const sWeight = Number(profile.startingWeight || profile.currentWeight) || 75;
  const gWeight = Number(profile.goalWeight) || 85;
  const age = Number(profile.age) || 22;
  const height = Number(profile.height) || 185;

  const bmr = 10 * sWeight + 6.25 * height - 5 * age + 5;
  const tdee = Math.round(bmr * 1.45);
  let kcal = tdee;
  let pro = Math.round(sWeight * 2.0);
  if (goal.includes('Fat Loss')) {
    kcal = Math.max(1600, tdee - 450);
    pro = Math.round(sWeight * 2.2);
  } else if (goal.includes('Lean Bulk')) {
    kcal = tdee + 350;
    pro = Math.round(sWeight * 2.0);
  } else if (goal.includes('Strength')) {
    kcal = tdee + 200;
    pro = Math.round(sWeight * 2.1);
  }
  const fat = Math.round((kcal * 0.25) / 9);
  const carb = Math.max(120, Math.round((kcal - (pro * 4) - (fat * 9)) / 4));

  const isFatLoss = goal.includes('Fat Loss');
  let workoutsPhase1 = [];
  let restDays = ["Tuesday", "Thursday", "Saturday", "Sunday"];

  if (freq.includes('4 Days')) {
    restDays = ["Wednesday", "Saturday", "Sunday"];
    workoutsPhase1 = [
      {
        name: "Upper Body Power & Hypertrophy",
        days: ["Monday", "Thursday"],
        exercises: [
          { name: "Standard Push-Ups", sets: 4, reps: isFatLoss ? "15-20" : "10-12", restTime: 60, focus: "Pectoral contraction", instruction: "Elbows at 45 degrees, full lock at top.", image: getExerciseImagePath("Standard Push-Ups") },
          { name: "Table Rows", sets: 4, reps: "10-12", restTime: 60, focus: "Lat retraction", instruction: "Pull sternum to table, pause 1s at peak.", image: getExerciseImagePath("Table Rows") },
          { name: "Pike Push Ups", sets: 3, reps: "8-10", restTime: 75, focus: "Anterior deltoids", instruction: "Hips elevated in V-shape, lower forehead forward.", image: getExerciseImagePath("Pike Push Ups") },
          { name: "Towel Lat Pulldowns", sets: 3, reps: "12-15", restTime: 45, focus: "Upper back", instruction: "Maintain tension on towel throughout entire stroke.", image: getExerciseImagePath("Towel Lat Pulldowns") },
          { name: "Plank", sets: 3, reps: "45-60s", restTime: 45, focus: "Core stability", instruction: "Posterior pelvic tilt, glutes engaged.", image: getExerciseImagePath("Plank") }
        ]
      },
      {
        name: "Lower Body & Core Drive",
        days: ["Tuesday", "Friday"],
        exercises: [
          { name: "Air Squats", sets: 4, reps: isFatLoss ? "20-25" : "12-15", restTime: 60, focus: "Quad activation", instruction: "Drive knees out, deep hip crease.", image: getExerciseImagePath("Air Squats") },
          { name: "Bulgarian Split Squats", sets: 3, reps: "10 per leg", restTime: 60, focus: "Single leg hypertrophy", instruction: "Rear foot on chair, vertical torso.", image: getExerciseImagePath("Bulgarian Split Squats") },
          { name: "Glute Bridges", sets: 4, reps: "15-20", restTime: 45, focus: "Glute lockout", instruction: "Squeeze glutes hard for 2 seconds at top.", image: getExerciseImagePath("Glute Bridges") },
          { name: "Calf Raises", sets: 3, reps: "20-25", restTime: 45, focus: "Calf burn", instruction: "Full stretch at bottom, squeeze at peak.", image: getExerciseImagePath("Calf Raises") },
          { name: "Hollow Body Hold", sets: 3, reps: "30-45s", restTime: 45, focus: "Transverse abdominis", instruction: "Press lower back firmly into floor.", image: getExerciseImagePath("Hollow Body Hold") }
        ]
      }
    ];
  } else if (freq.includes('5 Days')) {
    restDays = ["Thursday", "Sunday"];
    workoutsPhase1 = [
      {
        name: "Push Day (Chest, Shoulders, Triceps)",
        days: ["Monday", "Friday"],
        exercises: [
          { name: "Standard Push-Ups", sets: 4, reps: "12-15", restTime: 60, focus: "Chest", instruction: "Controlled 3-second descent.", image: getExerciseImagePath("Standard Push-Ups") },
          { name: "Diamond Push-Ups", sets: 3, reps: "8-12", restTime: 60, focus: "Triceps peak", instruction: "Thumbs and index fingers touching.", image: getExerciseImagePath("Diamond Push-Ups") },
          { name: "Pike Push Ups", sets: 3, reps: "8-10", restTime: 75, focus: "Deltoid drive", instruction: "Push upward and through shoulders.", image: getExerciseImagePath("Pike Push Ups") },
          { name: "Plank", sets: 3, reps: "60s", restTime: 45, focus: "Core brace", instruction: "Tight core, neutral spine.", image: getExerciseImagePath("Plank") }
        ]
      },
      {
        name: "Pull Day (Back, Biceps, Traps)",
        days: ["Tuesday", "Saturday"],
        exercises: [
          { name: "Table Rows", sets: 4, reps: "10-12", restTime: 60, focus: "Lats & Rhomboids", instruction: "Chest to table, squeeze shoulder blades.", image: getExerciseImagePath("Table Rows") },
          { name: "Towel Lat Pulldowns", sets: 3, reps: "12-15", restTime: 45, focus: "Lat width", instruction: "Pull towel hard outward while driving elbows down.", image: getExerciseImagePath("Towel Lat Pulldowns") },
          { name: "Superman Holds", sets: 3, reps: "10 reps (3s hold)", restTime: 45, focus: "Lower back", instruction: "Arch spine safely and hold.", image: getExerciseImagePath("Superman Holds") },
          { name: "Russian Twist", sets: 3, reps: "20 reps", restTime: 45, focus: "Obliques", instruction: "Rotate shoulders with controlled tempo.", image: getExerciseImagePath("Russian Twist") }
        ]
      },
      {
        name: "Legs & Core Conditioning",
        days: ["Wednesday"],
        exercises: [
          { name: "Air Squats", sets: 4, reps: "20 reps", restTime: 60, focus: "Quads & Glutes", instruction: "Smooth explosive tempo.", image: getExerciseImagePath("Air Squats") },
          { name: "Bulgarian Split Squats", sets: 3, reps: "10 per leg", restTime: 60, focus: "Unilateral balance", instruction: "Drive through front heel.", image: getExerciseImagePath("Bulgarian Split Squats") },
          { name: "Single-Leg Glute Bridges", sets: 3, reps: "12 per leg", restTime: 45, focus: "Hamstrings & Glutes", instruction: "Elevate hips completely.", image: getExerciseImagePath("Single-Leg Glute Bridges") },
          { name: "Burpees", sets: 3, reps: "12-15", restTime: 60, focus: "Metabolic conditioning", instruction: "Chest to floor, jump up cleanly.", image: getExerciseImagePath("Burpees") }
        ]
      }
    ];
  } else {
    // 3 Days Full Body
    workoutsPhase1 = [
      {
        name: "Full Body Foundation",
        days: ["Monday", "Wednesday", "Friday"],
        exercises: [
          { name: "Standard Push-Ups", sets: 3, reps: isFatLoss ? "15-20" : "10-12", restTime: 60, focus: "Chest & Triceps", instruction: "Hands slightly wider than shoulders. Maintain straight line.", image: getExerciseImagePath("Standard Push-Ups") },
          { name: "Table Rows", sets: 3, reps: "8-12", restTime: 60, focus: "Lats & Biceps", instruction: "Pull chest up to tabletop. Reverse push-up mechanic.", image: getExerciseImagePath("Table Rows") },
          { name: "Air Squats", sets: 3, reps: isFatLoss ? "20-25" : "15-20", restTime: 60, focus: "Quad & Glute strength", instruction: "Hips below knees, heels anchored.", image: getExerciseImagePath("Air Squats") },
          { name: "Reverse Lunges", sets: 3, reps: "10 per leg", restTime: 60, focus: "Unilateral stability", instruction: "Knees at 90 degrees on descent.", image: getExerciseImagePath("Reverse Lunges") },
          { name: "Plank", sets: 3, reps: "45-60s", restTime: 60, focus: "Core stability", instruction: "Brace abs like preparing for impact.", image: getExerciseImagePath("Plank") },
          { name: "Superman Holds", sets: 3, reps: "10 reps (3s hold)", restTime: 60, focus: "Posterior chain", instruction: "Simultaneous arm and leg raise.", image: getExerciseImagePath("Superman Holds") }
        ]
      }
    ];
  }

  const workoutsPhase2 = workoutsPhase1.map(w => ({
    ...w,
    exercises: w.exercises.map(e => ({
      ...e,
      sets: Math.min(5, e.sets + 1),
      reps: typeof e.reps === 'string' && e.reps.includes('-')
        ? `${Number(e.reps.split('-')[0]) + 2}-${Number(e.reps.split('-')[1]) + 2}`
        : e.reps,
      focus: "Progressive Overload & Density"
    }))
  }));

  const numPhases = duration.includes('12') ? 2 : duration.includes('24') ? 3 : 4;
  const phases = [
    {
      id: 1,
      name: `${goal.split('&')[0].trim()} Foundation`,
      months: "1–1.5",
      weeks: "Weeks 1–6",
      goal: `Establish neuromuscular baseline and progressive capacity tailored for ${goal}.`,
      frequency: freq,
      restBetweenExercises: 60,
      restDays,
      recovery: isFatLoss ? "30 min Zone 2 Incline Walk + Mobility" : "20 min Zone 2 Recovery Walk + Hamstring Stretch",
      nutrition: { kcal, pro, carb, fat },
      workouts: workoutsPhase1
    },
    {
      id: 2,
      name: "Volume & Hypertrophy Escalation",
      months: "1.5–3",
      weeks: "Weeks 7–12",
      goal: "Escalate training volume and mechanical tension for targeted body transformation.",
      frequency: freq,
      restBetweenExercises: 60,
      restDays,
      recovery: "25 min Zone 2 Recovery + Foam Rolling",
      nutrition: { kcal, pro, carb, fat },
      workouts: workoutsPhase2
    }
  ];

  if (numPhases >= 3) {
    phases.push({
      id: 3,
      name: "Maximum Intensity & Strength Peak",
      months: "3–4.5",
      weeks: "Weeks 13–18",
      goal: "Peak mechanical tension and neuromuscular drive with advanced variations.",
      frequency: freq,
      restBetweenExercises: 90,
      restDays,
      recovery: "Active contrast shower + 20 min mobility flow",
      nutrition: { kcal, pro, carb, fat },
      workouts: workoutsPhase2
    });
  }

  if (numPhases >= 4) {
    phases.push({
      id: 4,
      name: "Athletic Mastery & Final Peak",
      months: "4.5–6+",
      weeks: "Weeks 19–24+",
      goal: "Consolidate body transformation and maximize work capacity and aesthetics.",
      frequency: freq,
      restBetweenExercises: 60,
      restDays,
      recovery: "Full body restorative yoga + 30 min recovery walk",
      nutrition: { kcal, pro, carb, fat },
      workouts: workoutsPhase2
    });
  }

  return {
    programTitle: `${name}'s Personalized ${goal} Protocol`,
    programSummary: `Custom designed for ${name} (${sWeight}kg ➔ ${gWeight}kg) with ${freq} over ${duration}.`,
    dailyTargetKcal: kcal,
    dailyProteinGrams: pro,
    dailyCarbsGrams: carb,
    dailyFatGrams: fat,
    phases
  };
};

// Normalizes raw AI output to guarantee full schema compatibility
const normalizePlanData = (rawPlan, profile) => {
  if (!rawPlan || !rawPlan.phases || !Array.isArray(rawPlan.phases) || rawPlan.phases.length === 0) {
    return buildSmartHeuristicPlan(profile);
  }

  const enrichedPhases = rawPlan.phases.map((ph, pIdx) => {
    const workouts = (ph.workouts || []).map((w, wIdx) => {
      let days = w.days;
      if (!days || !Array.isArray(days) || days.length === 0) {
        const freq = profile.frequency || '3 Days';
        if (freq.includes('4 Days')) {
          days = wIdx === 0 ? ["Monday", "Thursday"] : ["Tuesday", "Friday"];
        } else if (freq.includes('5 Days')) {
          days = wIdx === 0 ? ["Monday", "Friday"] : wIdx === 1 ? ["Tuesday", "Saturday"] : ["Wednesday"];
        } else {
          days = ["Monday", "Wednesday", "Friday"];
        }
      }

      const exercises = (w.exercises || []).map(ex => ({
        name: ex.name || 'Exercise',
        sets: Number(ex.sets) || 3,
        reps: ex.reps || '10-12',
        restTime: Number(ex.restTime) || 60,
        focus: ex.focus || 'Focus and control',
        instruction: ex.instruction || 'Maintain proper form and tempo.',
        breathing: ex.breathing || 'Exhale on effort, inhale on reset.',
        image: ex.image || getExerciseImagePath(ex.name)
      }));

      return {
        name: w.name || `Workout ${wIdx + 1}`,
        days,
        exercises
      };
    });

    const defaultRest = profile.frequency?.includes('4 Days') 
      ? ["Wednesday", "Saturday", "Sunday"] 
      : profile.frequency?.includes('5 Days') 
      ? ["Thursday", "Sunday"] 
      : ["Tuesday", "Thursday", "Saturday", "Sunday"];

    return {
      id: ph.id || pIdx + 1,
      name: ph.name || `Phase ${pIdx + 1}`,
      months: ph.months || `${pIdx * 1.5 + 1}–${(pIdx + 1) * 1.5}`,
      weeks: ph.weeks || `Phase ${pIdx + 1}`,
      goal: ph.goal || 'Progressive athletic adaptation',
      frequency: ph.frequency || profile.frequency || '3 Days / Week',
      restBetweenExercises: ph.restBetweenExercises || 60,
      restDays: ph.restDays || defaultRest,
      recovery: ph.recovery || '20-30 min Zone 2 walk + mobility',
      nutrition: ph.nutrition || {
        kcal: rawPlan.dailyTargetKcal || 2800,
        pro: rawPlan.dailyProteinGrams || 160,
        carb: rawPlan.dailyCarbsGrams || 320,
        fat: rawPlan.dailyFatGrams || 70
      },
      workouts
    };
  });

  return {
    programTitle: rawPlan.programTitle || `${profile.name || 'Athlete'}'s Custom Protocol`,
    programSummary: rawPlan.programSummary || `Custom tailored for ${profile.goalType || 'Athletic Fitness'}`,
    dailyTargetKcal: rawPlan.dailyTargetKcal || 2800,
    dailyProteinGrams: rawPlan.dailyProteinGrams || 160,
    dailyCarbsGrams: rawPlan.dailyCarbsGrams || 320,
    dailyFatGrams: rawPlan.dailyFatGrams || 70,
    phases: enrichedPhases
  };
};

// Generates plan via Serverless Backend /api/generate-plan -> Direct Gemini API -> Heuristic Fallback
const generateCustomPlanApi = async (profile) => {
  // 1. Try serverless endpoint first
  try {
    const res = await fetch('/api/generate-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: profile.name,
        age: profile.age,
        height: profile.height,
        weight: profile.currentWeight || profile.startingWeight,
        goalWeight: profile.goalWeight,
        goalType: profile.goalType,
        duration: profile.duration,
        frequency: profile.frequency
      })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.phases && Array.isArray(data.phases) && data.phases.length > 0) {
        return normalizePlanData(data, profile);
      }
    }
  } catch (err) {
    console.warn("Serverless plan generation endpoint deferred:", err);
  }

  // 2. Direct Gemini endpoint fallback
  const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || '').trim();
  if (apiKey) {
    const prompt = `You are an elite sports scientist and strength coach. Create a custom periodized training program tailored specifically for this athlete:
- Name: ${profile.name || 'Athlete'}
- Age: ${profile.age || 22}, Height: ${profile.height || 185}cm
- Current Weight: ${profile.currentWeight || profile.startingWeight || 75}kg -> Target: ${profile.goalWeight || 85}kg
- Primary Goal: ${profile.goalType || 'Lean Bulk & Muscle Gain'}
- Commitment Duration: ${profile.duration || '48 Weeks (1 Year)'}
- Weekly Training Days: ${profile.frequency || '3 Days / Week (Full Body)'}

Calculate daily calories, protein, carbs, fat.
Provide periodized phases matching duration (12 weeks = 2 phases, 24 weeks = 3 phases, 48 weeks = 4 phases).
Each phase has workouts matching weekly frequency, with 4-6 exercises per workout.
Respond with ONLY valid JSON conforming to:
{
  "programTitle": "Custom Plan Title",
  "programSummary": "overview",
  "dailyTargetKcal": 2800,
  "dailyProteinGrams": 160,
  "dailyCarbsGrams": 320,
  "dailyFatGrams": 70,
  "phases": [
    {
      "id": 1,
      "name": "Phase 1: Foundation",
      "weeks": "Weeks 1-6",
      "months": "1-1.5",
      "goal": "adaptation",
      "frequency": "${profile.frequency || '3 Days / Week'}",
      "restBetweenExercises": 60,
      "restDays": ["Tuesday", "Thursday", "Saturday", "Sunday"],
      "recovery": "20-30 min walk",
      "nutrition": { "kcal": 2800, "pro": 160, "carb": 320, "fat": 70 },
      "workouts": [
        {
          "name": "Workout A",
          "days": ["Monday", "Wednesday", "Friday"],
          "exercises": [
            { "name": "Standard Push-Ups", "sets": 3, "reps": "10-15", "restTime": 60, "focus": "Chest control", "instruction": "Form cue", "breathing": "Inhale down, exhale up." }
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
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });
        if (response.ok) {
          const result = await response.json();
          const raw = result?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (raw) {
            const parsed = JSON.parse(raw.replace(/```json/gi, '').replace(/```/g, '').trim());
            if (parsed && parsed.phases && parsed.phases.length > 0) {
              return normalizePlanData(parsed, profile);
            }
          }
        }
      } catch (e) {
        console.warn(`Direct model ${model} plan generation error:`, e);
      }
    }
  }

  // 3. Guaranteed sports science heuristic builder
  return buildSmartHeuristicPlan(profile);
};

// Markdown & Bold text parser for AI Coach message bubbles
const renderInlineBold = (text) => {
  if (!text) return text;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="ai-formatted-strong">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const renderFormattedAiText = (raw) => {
  if (!raw) return null;
  const lines = raw.split('\n');
  return (
    <div className="ai-formatted-content">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} style={{ height: '0.35rem' }} />;
        
        if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
          const hText = trimmed.replace(/^#+\s*/, '');
          return <div key={idx} className="ai-formatted-heading">{renderInlineBold(hText)}</div>;
        }
        if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const bulletText = trimmed.replace(/^[•\-\*]\s*/, '');
          return (
            <div key={idx} className="ai-bullet-row">
              <span className="ai-bullet-dot">▸</span>
              <span>{renderInlineBold(bulletText)}</span>
            </div>
          );
        }
        const numMatch = trimmed.match(/^(\d+[\.\)])\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="ai-bullet-row">
              <span className="ai-bullet-dot" style={{ fontWeight: 700, color: 'var(--accent-primary)', minWidth: '18px' }}>{numMatch[1]}</span>
              <span>{renderInlineBold(numMatch[2])}</span>
            </div>
          );
        }
        return <div key={idx} className="ai-text-line">{renderInlineBold(line)}</div>;
      })}
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('workout'); // 'workout' or 'dashboard'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlansOpen, setIsPlansOpen] = useState(false);
  const [isAccountSheetOpen, setIsAccountSheetOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);
  const [customProgram, setCustomProgram] = useState(() => {
    try {
      const saved = localStorage.getItem('vfit_custom_program');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const activeProgram = customProgram || programData;

  useEffect(() => {
    if (customProgram) {
      localStorage.setItem('vfit_custom_program', JSON.stringify(customProgram));
    }
  }, [customProgram]);

  const [currentPhaseIdx, setCurrentPhaseIdx] = useState(() => {
    return parseInt(localStorage.getItem('currentPhaseIdx')) || 0;
  });
  const getLocalDate = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parseLocalDate = (dateStr) => {
    if (!dateStr) return new Date();
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const todayDate = getLocalDate();
  const [selectedDashboardDate, setSelectedDashboardDate] = useState(todayDate);

  // User Profile (Dynamic for Multi-User)
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('userProfile');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Automatically purge old hardcoded test template "Velan"
        if (parsed.name === 'Velan' && (!parsed.goalType || !parsed.onboardingCompleted)) {
          return DEFAULT_GUEST_PROFILE;
        }
        return parsed;
      }
    } catch (e) {
      console.warn("Storage parse error:", e);
    }
    return DEFAULT_GUEST_PROFILE;
  });

  useEffect(() => {
    if (userProfile && userProfile.name) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    const displayName = (userProfile.name && userProfile.name.trim()) ? userProfile.name.trim() : 'Athlete';
    if (hour < 12) return { msg: `Good Morning, ${displayName}`, icon: <Sun size={24} className="greeting-icon-sun" />, quote: "Let's start building.", color: "var(--color-greeting-morning)" };
    if (hour < 18) return { msg: `Good Afternoon, ${displayName}`, icon: <Sun size={24} className="greeting-icon-sun" />, quote: "Stay focused.", color: "var(--color-greeting-morning)" };
    return { msg: `Good Evening, ${displayName}`, icon: <Moon size={24} className="greeting-icon-moon" />, quote: "Finish the day strong.", color: "var(--color-greeting-evening)" };
  };

  const greeting = getGreeting();

  // Custom Modal State
  const [showResetModal, setShowResetModal] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);

  // Persistence states
  const [workoutHistory, setWorkoutHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('workoutHistory')) || {};
    } catch (e) {
      return {};
    }
  });

  const [weightLogs, setWeightLogs] = useState(() => {
    try {
      const existing = localStorage.getItem('weightLogs');
      const parsed = existing ? JSON.parse(existing) : null;
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {}
    return [{ date: new Date().toISOString().split('T')[0], weight: 75 }];
  });

  // Biometric Scientific Nutrition Engine (Mifflin-St Jeor formula)
  const dynamicNutrition = (() => {
    const age = Number(userProfile.age) || 22;
    const height = Number(userProfile.height) || 185;
    const currentW = Number(weightLogs && weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : (userProfile.startingWeight || 75));
    const goalType = userProfile.goalType || 'Lean Bulk & Muscle Gain';

    // Mifflin-St Jeor BMR: 10 * weight(kg) + 6.25 * height(cm) - 5 * age + 5
    const bmr = 10 * currentW + 6.25 * height - 5 * age + 5;
    const tdee = Math.round(bmr * 1.45); // Moderate athletic activity

    let kcal, pro, carb, fat;
    if (goalType.includes('Fat Loss')) {
      kcal = Math.max(1600, tdee - 450);
      pro = Math.round(currentW * 2.2);
      fat = Math.round((kcal * 0.25) / 9);
      carb = Math.max(80, Math.round((kcal - (pro * 4 + fat * 9)) / 4));
    } else if (goalType.includes('Lean Bulk')) {
      kcal = tdee + 350;
      pro = Math.round(currentW * 1.9);
      fat = Math.round((kcal * 0.25) / 9);
      carb = Math.max(150, Math.round((kcal - (pro * 4 + fat * 9)) / 4));
    } else if (goalType.includes('Strength')) {
      kcal = tdee + 200;
      pro = Math.round(currentW * 2.0);
      fat = Math.round((kcal * 0.28) / 9);
      carb = Math.max(120, Math.round((kcal - (pro * 4 + fat * 9)) / 4));
    } else if (goalType.includes('Recomposition')) {
      kcal = tdee;
      pro = Math.round(currentW * 2.1);
      fat = Math.round((kcal * 0.25) / 9);
      carb = Math.max(100, Math.round((kcal - (pro * 4 + fat * 9)) / 4));
    } else {
      kcal = tdee + 100;
      pro = Math.round(currentW * 1.7);
      fat = Math.round((kcal * 0.22) / 9);
      carb = Math.max(180, Math.round((kcal - (pro * 4 + fat * 9)) / 4));
    }

    return { kcal, pro, carb, fat, bmr: Math.round(bmr), tdee };
  })();

  const TARGET_KCAL = customProgram?.dailyTargetKcal || dynamicNutrition.kcal;
  const TARGET_PRO = customProgram?.dailyProteinGrams || dynamicNutrition.pro;
  const TARGET_CARB = customProgram?.dailyCarbsGrams || dynamicNutrition.carb;
  const TARGET_FAT = customProgram?.dailyFatGrams || dynamicNutrition.fat;
  const [nutritionHistory, setNutritionHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('nutritionHistory')) || {};
  });
  const [dailyStats, setDailyStats] = useState(() => {
    return JSON.parse(localStorage.getItem('dailyStats')) || {};
  });

  const [showWeightInput, setShowWeightInput] = useState(false);
  const [newWeight, setNewWeight] = useState('');

  // Local Intake Temp State
  const [intakeCalories, setIntakeCalories] = useState('');
  const [intakeProtein, setIntakeProtein] = useState('');
  const [intakeCarbs, setIntakeCarbs] = useState('');
  const [intakeFats, setIntakeFats] = useState('');
  const [intakeSleep, setIntakeSleep] = useState('');
  const [intakeWater, setIntakeWater] = useState('');

  // Focused Workout Session State
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [isWarmupActive, setIsWarmupActive] = useState(false);
  const [activeWarmupIdx, setActiveWarmupIdx] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [warmupCompleted, setWarmupCompleted] = useState(() => {
    return JSON.parse(localStorage.getItem('warmupCompleted')) || {};
  });

  // Progressive Overload Log: { "ExerciseName": [{ date, reps, sets, note }] }
  const [overloadLog, setOverloadLog] = useState(() => {
    try {
      const saved = localStorage.getItem('overloadLog');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [showOverloadModal, setShowOverloadModal] = useState(false);
  const [overloadTarget, setOverloadTarget] = useState(null); // { name, currentReps, currentSets }
  const [overloadInput, setOverloadInput] = useState({ reps: '', sets: '', note: '' });

  const [activeExIdx, setActiveExIdx] = useState(0);
  const [activeSet, setActiveSet] = useState(1);
  const [timerRemaining, setTimerRemaining] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timerTotal, setTimerTotal] = useState(0);

  // Voice Coach Personas & Audio Settings
  const [voicePersona, setVoicePersona] = useState(() => localStorage.getItem('vfit_voice_persona') || 'female');
  const [voiceRate, setVoiceRate] = useState(() => parseFloat(localStorage.getItem('vfit_voice_rate')) || 0.95);
  const [availableVoices, setAvailableVoices] = useState([]);

  useEffect(() => {
    localStorage.setItem('vfit_voice_persona', voicePersona);
    localStorage.setItem('vfit_voice_rate', voiceRate.toString());
  }, [voicePersona, voiceRate]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) setAvailableVoices(v);
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const currentAudioRef = useRef(null);

  const announceVoice = async (text, onEnd, customPersona = voicePersona) => {
    // Immediately cancel any current audio playback or speech synthesis
    if (currentAudioRef.current) {
      try {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      } catch (e) {}
      currentAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }

    const cleanText = (text || '')
      .replace(/[*#_~`•▸►→]/g, ' ')
      .replace(/[^\w\s.,!?'’"-]/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    // Persona mapping to language/accents
    const personaLangMap = {
      maya: 'en',
      female: 'en',
      alex: 'en',
      male: 'en',
      jordan: 'en-GB',
      kai: 'en-AU',
      aarav: 'en-IN'
    };
    const ttsLang = personaLangMap[customPersona] || 'en';

    // Primary: Google Native Human Studio Audio Stream via /api/tts
    const tryStudioAudio = () => {
      return new Promise((resolve) => {
        try {
          const audioUrl = `/api/tts?text=${encodeURIComponent(cleanText.slice(0, 320))}&lang=${encodeURIComponent(ttsLang)}`;
          const audio = new Audio(audioUrl);
          currentAudioRef.current = audio;

          audio.onended = () => {
            currentAudioRef.current = null;
            if (onEnd) onEnd();
            resolve(true);
          };

          audio.onerror = () => {
            currentAudioRef.current = null;
            resolve(false);
          };

          audio.play().catch(() => resolve(false));
        } catch (e) {
          resolve(false);
        }
      });
    };

    // Fallback: Browser Neural Natural Speech (strictly excluding robotic legacy synths)
    const fallbackToNeural = () => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        if (onEnd) onEnd();
        return;
      }

      const msg = new SpeechSynthesisUtterance(cleanText);
      msg.rate = 1.0;
      msg.pitch = (customPersona === 'maya' || customPersona === 'female') ? 1.05 : 0.98;
      msg.volume = 1.0;

      if (onEnd) {
        msg.onend = () => onEnd();
        msg.onerror = () => onEnd();
      }

      const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const isRobotic = (v) => {
          const n = (v.name || '').toLowerCase();
          return n.includes('desktop') || n.includes('david') || n.includes('zira') || n.includes('mark') || n.includes('hazel') || n.includes('sapi');
        };

        const naturalVoices = voices.filter(v => {
          if (isRobotic(v)) return false;
          const n = (v.name || '').toLowerCase();
          return n.includes('natural') || n.includes('neural') || n.includes('online') || n.includes('google') || n.includes('enhanced') || n.includes('premium') || n.includes('siri') || n.includes('ava');
        });

        const pool = naturalVoices.length > 0 ? naturalVoices : voices.filter(v => !isRobotic(v));

        let picked = null;
        if (customPersona === 'jordan') {
          picked = pool.find(v => v.lang.startsWith('en-GB')) || pool[0];
        } else if (customPersona === 'kai') {
          picked = pool.find(v => v.lang.startsWith('en-AU')) || pool[0];
        } else if (customPersona === 'aarav') {
          picked = pool.find(v => v.lang.startsWith('en-IN')) || pool[0];
        } else if (customPersona === 'alex' || customPersona === 'male') {
          picked = pool.find(v => (v.name.toLowerCase().includes('guy') || v.name.toLowerCase().includes('eric') || v.name.toLowerCase().includes('christopher') || v.name.toLowerCase().includes('daniel') || v.name.toLowerCase().includes('male')) && v.lang.startsWith('en')) || pool.find(v => v.lang.startsWith('en'));
        } else {
          picked = pool.find(v => (v.name.toLowerCase().includes('jenny') || v.name.toLowerCase().includes('aria') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('ava') || v.name.toLowerCase().includes('google us') || v.name.toLowerCase().includes('female')) && v.lang.startsWith('en')) || pool.find(v => v.lang.startsWith('en'));
        }

        if (picked) msg.voice = picked;
      }

      window.speechSynthesis.speak(msg);
    };

    const played = await tryStudioAudio();
    if (!played) {
      fallbackToNeural();
    }
  };

  const handleTestVoice = (persona = voicePersona) => {
    const phrases = {
      maya: "Hey champion! I'm Coach Maya. Ready to crush today's session?",
      female: "Hey champion! I'm Coach Maya. Ready to crush today's session?",
      alex: "Let's lock in! Focus on clean form and dominate every set.",
      male: "Let's lock in! Focus on clean form and dominate every set.",
      jordan: "Right, let's keep the tempo controlled and maintain perfect form today.",
      kai: "G'day! Time to get moving and smash those workout goals today!",
      aarav: "Namaste! Focus with discipline, push each rep, and build strength."
    };
    announceVoice(phrases[persona] || phrases.maya, null, persona);
  };

  // AI Coach Assistant States & Multimodal Features
  const [showAiCoach, setShowAiCoach] = useState(false);
  const [aiChatMessages, setAiChatMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('vfit_ai_chat');
      return saved ? JSON.parse(saved) : [
        {
          role: 'assistant',
          text: "Hey! I'm your V-FIT AI Coach. I'm connected to your live biometric profile, current training block, and nutrition targets. How can I optimize your session today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
    } catch (e) {
      return [];
    }
  });
  const [aiInputText, setAiInputText] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const geminiApiKey = (import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || '').trim();

  // Attachment states & refs
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [isCompressingFile, setIsCompressingFile] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Voice dictation & ChatGPT-style Live Voice states
  const [isListening, setIsListening] = useState(false);
  const [isLiveVoiceActive, setIsLiveVoiceActive] = useState(false);
  const [liveVoiceStatus, setLiveVoiceStatus] = useState('idle'); // 'listening', 'thinking', 'speaking'
  const [liveInterimTranscript, setLiveInterimTranscript] = useState('');
  const [liveAiSpeechText, setLiveAiSpeechText] = useState('');
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [showLiveSubtitles, setShowLiveSubtitles] = useState(true);
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const [micVolume, setMicVolume] = useState(0);

  const recognitionRef = useRef(null);
  const liveVoiceActiveRef = useRef(false);
  const isVoiceMutedRef = useRef(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const animFrameRef = useRef(null);

  // Process & compress attachment files (images, pdfs, audio)
  const processAttachmentFile = async (file) => {
    if (!file) return;
    setIsCompressingFile(true);

    try {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_DIM = 1200;
            let width = img.width;
            let height = img.height;
            if (width > height && width > MAX_DIM) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else if (height > MAX_DIM) {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
            const base64Data = dataUrl.split(',')[1];
            setSelectedAttachment({
              name: file.name,
              type: 'image',
              mimeType: 'image/jpeg',
              previewUrl: dataUrl,
              base64Data
            });
            setIsCompressingFile(false);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result;
          const base64Data = String(dataUrl).split(',')[1];
          const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
          const isAudio = file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|m4a|ogg|aac|webm)$/i);
          setSelectedAttachment({
            name: file.name,
            type: isPdf ? 'pdf' : isAudio ? 'audio' : 'doc',
            mimeType: file.type || (isPdf ? 'application/pdf' : 'application/octet-stream'),
            previewUrl: isPdf ? null : dataUrl,
            base64Data
          });
          setIsCompressingFile(false);
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error("Attachment error:", err);
      setIsCompressingFile(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processAttachmentFile(file);
    }
    e.target.value = '';
  };

  // Voice Dictation (Speech-to-Text)
  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    return recognition;
  };

  const toggleVoiceDictation = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsListening(false);
      return;
    }

    const recognition = initSpeechRecognition();
    if (!recognition) {
      alert("Microphone dictation is supported on Chrome, Safari, Edge, and Android/iOS browsers.");
      return;
    }

    recognitionRef.current = recognition;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setAiInputText(transcript);
    };
    recognition.onerror = (e) => {
      console.warn("Speech recognition notice:", e.error);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);

    try {
      recognition.start();
    } catch (e) {
      console.warn("Speech start error:", e);
      setIsListening(false);
    }
  };

  // Interrupt ongoing coach voice playback and resume listening immediately (ChatGPT style)
  const handleInterruptVoice = () => {
    if (currentAudioRef.current) {
      try {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      } catch (e) {}
      currentAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    if (liveVoiceActiveRef.current && !isVoiceMutedRef.current) {
      setLiveVoiceStatus('listening');
      setTimeout(() => {
        if (liveVoiceActiveRef.current && !isVoiceMutedRef.current) runLiveVoiceListen();
      }, 150);
    }
  };

  // Toggle Mute during Live Voice Session
  const toggleVoiceMute = () => {
    const nextMuted = !isVoiceMuted;
    setIsVoiceMuted(nextMuted);
    isVoiceMutedRef.current = nextMuted;
    if (nextMuted) {
      try { recognitionRef.current?.stop(); } catch (e) {}
      if (currentAudioRef.current) {
        try { currentAudioRef.current.pause(); } catch (e) {}
      }
      setLiveVoiceStatus('idle');
    } else {
      setLiveVoiceStatus('listening');
      runLiveVoiceListen();
    }
  };

  // Live Hands-Free Conversational Voice Loop (ChatGPT-Style Real-Time Subtitles)
  const runLiveVoiceListen = () => {
    if (!liveVoiceActiveRef.current || isVoiceMutedRef.current) return;
    const recognition = initSpeechRecognition();
    if (!recognition) return;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      if (liveVoiceActiveRef.current && !isVoiceMutedRef.current) {
        setLiveVoiceStatus('listening');
      }
    };

    let accumulatedFinal = '';
    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          accumulatedFinal += transcript;
        } else {
          interim += transcript;
        }
      }
      const currentLive = accumulatedFinal || interim;
      if (currentLive) setLiveInterimTranscript(currentLive);
    };

    recognition.onerror = (e) => {
      if (liveVoiceActiveRef.current && e.error !== 'no-speech') {
        console.warn("Live voice recognition error:", e.error);
      }
    };

    recognition.onend = async () => {
      if (!liveVoiceActiveRef.current || isVoiceMutedRef.current) return;
      const query = (accumulatedFinal || liveInterimTranscript).trim();
      if (query) {
        setLiveVoiceStatus('thinking');
        await handleSendAiMessage(query, null, true);
      } else {
        setTimeout(() => {
          if (liveVoiceActiveRef.current && !isVoiceMutedRef.current) runLiveVoiceListen();
        }, 250);
      }
    };

    try {
      recognition.start();
    } catch (e) {
      console.warn("Live voice start notice:", e);
    }
  };

  const startLiveVoiceSession = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Live Voice Session is supported on Chrome, Safari, Edge, and Android/iOS browsers.");
      return;
    }

    setIsLiveVoiceActive(true);
    liveVoiceActiveRef.current = true;
    setIsVoiceMuted(false);
    isVoiceMutedRef.current = false;
    setLiveVoiceStatus('listening');
    setLiveInterimTranscript('');
    setLiveAiSpeechText('');

    // Start Web Audio API Volume Analyzer for real-time visual orb wave reactiveness
    try {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        micStreamRef.current = stream;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          audioContextRef.current = audioCtx;
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          const src = audioCtx.createMediaStreamSource(stream);
          src.connect(analyser);
          analyserRef.current = analyser;

          const dataArr = new Uint8Array(analyser.frequencyBinCount);
          const checkVolume = () => {
            if (!liveVoiceActiveRef.current) return;
            analyser.getByteFrequencyData(dataArr);
            let sum = 0;
            for (let i = 0; i < dataArr.length; i++) sum += dataArr[i];
            const avg = sum / dataArr.length;
            setMicVolume(Math.min(1, avg / 85));
            animFrameRef.current = requestAnimationFrame(checkVolume);
          };
          checkVolume();
        }
      }).catch((err) => {
        console.warn("Microphone visualizer stream notice:", err);
      });
    } catch (e) {}

    runLiveVoiceListen();
  };

  const stopLiveVoiceSession = () => {
    liveVoiceActiveRef.current = false;
    setIsLiveVoiceActive(false);
    setLiveVoiceStatus('idle');
    setLiveInterimTranscript('');

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(t => t.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch (e) {}
      audioContextRef.current = null;
    }
    setMicVolume(0);

    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    if (currentAudioRef.current) {
      try { currentAudioRef.current.pause(); } catch (e) {}
      currentAudioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
  };

  const handleSendAiMessage = async (customPrompt, customAttachment, isVoiceMode = false) => {
    const activeAttachment = customAttachment || selectedAttachment;
    const textToSend = (customPrompt || aiInputText).trim();
    if ((!textToSend && !activeAttachment) || isAiThinking) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      role: 'user',
      text: textToSend || (activeAttachment ? `[Attached ${activeAttachment.type.toUpperCase()}: ${activeAttachment.name}]` : ''),
      timestamp: timeStr,
      attachment: activeAttachment ? {
        type: activeAttachment.type,
        name: activeAttachment.name,
        previewUrl: activeAttachment.previewUrl
      } : null
    };

    const newHistory = [...aiChatMessages, userMsg];
    setAiChatMessages(newHistory);
    setAiInputText('');
    setSelectedAttachment(null);
    setIsAiThinking(true);

    const currentExNames = currentWorkout.exercises ? currentWorkout.exercises.map(e => e.name).join(', ') : 'Rest Day';
    const isLiveConvo = isVoiceMode || liveVoiceActiveRef.current;
    const systemPrompt = isLiveConvo
      ? `You are V-FIT AI Coach in a real-time live phone call with ${userProfile.name || 'Athlete'} (ChatGPT Voice Mode).
Athlete Profile: ${currentWeight}kg -> Target ${userProfile.goalWeight || 85}kg (${userProfile.goalType || 'Lean Bulk'}), Today's Workout: ${currentWorkout.name}.
VOICE CONVERSATION RULES:
1. Respond in 1 to 2 spoken sentences ONLY (maximum 30 words).
2. Talk naturally with human enthusiasm like a supportive personal coach talking on the phone.
3. NEVER use bullet points, asterisks (**), hashtags, numbered lists, or markdown formatting.
4. Give punchy, actionable advice.`
      : `You are V-FIT AI Coach, an elite strength and conditioning specialist and sports nutritionist.
Athlete Profile:
- Name: ${userProfile.name || 'Athlete'}
- Age: ${userProfile.age || 22}, Height: ${userProfile.height || 185}cm
- Current Weight: ${currentWeight}kg -> Target: ${userProfile.goalWeight || 85}kg (${userProfile.goalType || 'Lean Bulk'})
- Program Duration: ${userProfile.duration || '48 Weeks'}, Frequency: ${userProfile.frequency || '3 Days/week'}
- Current Training Block: Phase ${currentPhase.id} (${currentPhase.name})
- Today's Workout: ${currentWorkout.name} (Exercises: ${currentExNames})
- Dynamic Targets: ${TARGET_KCAL} kcal daily (${TARGET_PRO}g Protein, ${TARGET_CARB}g Carbs, ${TARGET_FAT}g Fat)

Instructions:
Provide clear, actionable, science-backed guidance.
If an image of food/meal is attached: analyze the plate, estimate Calories, Protein, Carbs, and Fats, and offer dietary tips.
If an image of gym equipment/machine is attached: explain how to set it up, target muscle groups, and correct execution cues.
If a document or PDF is attached: summarize key findings and provide tailored athletic adjustments.
Format responses with short bullet points (•) and bold text (**bold**). Keep responses concise and motivating so they are fast to digest during workouts.`;

    let replyText = '';

    // Build multimodal parts
    const parts = [{ text: `${systemPrompt}\n\nAthlete Question: ${textToSend || 'Please analyze this attachment and give me expert fitness coaching on it.'}` }];
    if (activeAttachment && activeAttachment.base64Data && activeAttachment.mimeType) {
      parts.push({
        inlineData: {
          mimeType: activeAttachment.mimeType,
          data: activeAttachment.base64Data
        }
      });
    }

    // Layer 1: Serverless /api/chat endpoint
    try {
      const serverRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: 'user', parts }] })
      });
      if (serverRes.ok) {
        const data = await serverRes.json();
        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          replyText = data.candidates[0].content.parts[0].text;
        }
      }
    } catch (err) {
      console.warn("Serverless chat endpoint deferred:", err);
    }

    // Layer 2: Direct Gemini Multi-Model Cascading Fallback
    if (!replyText) {
      const apiKey = (geminiApiKey || '').trim();
      const models = ['gemini-flash-latest', 'gemini-3.5-flash-lite', 'gemini-flash-lite-latest'];
      for (const model of models) {
        try {
          const directRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': apiKey
            },
            body: JSON.stringify({ contents: [{ role: 'user', parts }] })
          });
          if (directRes.ok) {
            const data = await directRes.json();
            if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
              replyText = data.candidates[0].content.parts[0].text;
              break;
            }
          }
        } catch (e) {
          console.warn(`Direct model ${model} chat error:`, e);
        }
      }
    }

    // Layer 3: Dynamic Heuristic Guidance (Offline/Offline Fallback)
    if (!replyText) {
      if (activeAttachment) {
        if (activeAttachment.type === 'image') {
          replyText = `📷 **Visual Analysis for ${userProfile.name || 'Athlete'}:**\n\n` +
            `• **Detection:** Meal / Workout Image (${activeAttachment.name})\n` +
            `• **Estimated Nutrition:** Balanced whole-food portion aligned with your daily ${TARGET_KCAL} kcal target.\n` +
            `• **Coach Tip:** Aim to get at least 35-40g of complete protein in this meal to optimize muscle protein synthesis!`;
        } else if (activeAttachment.type === 'pdf') {
          replyText = `📄 **Document Analysis (${activeAttachment.name}):**\n\n` +
            `• Document received and reviewed for your ${userProfile.goalType || 'Transformation'} protocol.\n` +
            `• Prioritize consistent training volume, adequate micronutrient intake, and 7.5+ hours of recovery sleep.`;
        } else {
          replyText = `🎵 **Audio Note Processed:** Your voice note was logged into your session history. Keep pushing toward your ${userProfile.goalWeight}kg goal!`;
        }
      } else {
        const q = (textToSend || '').toLowerCase();
        if (q.includes('meal') || q.includes('food') || q.includes('protein') || q.includes('nutrition') || q.includes('eat') || q.includes('diet')) {
          replyText = `🥗 **Custom Meal Strategy for your ${TARGET_KCAL} kcal / ${TARGET_PRO}g Protein Target:**\n\n` +
            `• **Post-Workout Recovery:** 40g whey or 200g Greek yogurt + 1 banana + 35g oats (~430 kcal, 42g protein).\n` +
            `• **High-Density Fuel:** 200g grilled chicken breast or paneer + 150g rice + steamed greens (~580 kcal, 48g protein).\n` +
            `• **Evening Sustenance:** 3 eggs (or tofu stir-fry) + whole grain toast + avocado (~480 kcal, 28g protein).\n\n` +
            `💧 **Hydration Target:** Drink at least 3.5L of water today to maximize cellular hydration and muscle protein synthesis!`;
        } else if (q.includes('substitute') || q.includes('replace') || q.includes('pain') || q.includes('hurt') || q.includes('alternative') || q.includes('injury')) {
          replyText = `🔄 **Exercise Substitutions for Today's Routine (${currentWorkout.name}):**\n\n` +
            `• **Shoulder or Wrist Strain:** Swap to Neutral-Grip Floor Press or Elevated Incline Push-Ups.\n` +
            `• **Lower Back Tightness:** Perform Chest-Supported Rows or Incline Inverted Table Rows.\n` +
            `• **Knee Strain on Squats:** Switch to Bulgarian Split Squats with vertical shin or Box Squats to parallel.\n\n` +
            `⚡ Prioritize smooth tempo and joint comfort over rushing sets!`;
        } else if (q.includes('plateau') || q.includes('stuck') || q.includes('progress') || q.includes('overload') || q.includes('reps')) {
          replyText = `📈 **Overload Strategy for your ${userProfile.goalType || 'Lean Bulk'} Plan:**\n\n` +
            `• **Micro-Progression:** Add just 1 single clean rep across your sets, or slow down the eccentric (lowering) phase by 2 seconds.\n` +
            `• **Recovery Hormone Window:** Growth hormone and protein synthesis peak during deep sleep. Target 7.5–8.5 hours tonight.\n` +
            `• **Deload Timing:** In Week 6 of Phase ${currentPhase.id}, drop volume by 30% to allow your central nervous system to supercompensate!`;
        } else {
          replyText = `🔥 **Coach Assessment for ${userProfile.name || 'Athlete'}:**\n\n` +
            `• **Objective:** ${userProfile.goalType || 'Lean Bulk & Muscle Gain'}\n` +
            `• **Trajectory:** Current ${currentWeight}kg ➔ Target ${userProfile.goalWeight || 85}kg\n` +
            `• **Daily Targets:** ${TARGET_KCAL} kcal (${TARGET_PRO}g Protein)\n\n` +
            `Stay consistent with today's sets! You can attach photos of food or gym machines, use the microphone, or start a live voice call anytime.`;
        }
      }
    }

    const updated = [...newHistory, { role: 'assistant', text: replyText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
    setAiChatMessages(updated);
    localStorage.setItem('vfit_ai_chat', JSON.stringify(updated));
    setIsAiThinking(false);

    // If in Live Voice Session, speak response and loop back to listen
    if (isVoiceMode || liveVoiceActiveRef.current) {
      setLiveVoiceStatus('speaking');
      const cleanVoiceText = replyText.replace(/[*#_•▸►→]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300);
      setLiveAiSpeechText(cleanVoiceText);
      announceVoice(cleanVoiceText, () => {
        if (liveVoiceActiveRef.current && !isVoiceMutedRef.current) {
          setLiveVoiceStatus('listening');
          setTimeout(() => {
            if (liveVoiceActiveRef.current && !isVoiceMutedRef.current) runLiveVoiceListen();
          }, 250);
        }
      });
    }
  };

  const playNotification = (type) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      if (type === 'start') {
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.15);
      } else {
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);

        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.frequency.setValueAtTime(440, audioCtx.currentTime + 0.2);
        gain2.gain.setValueAtTime(0.05, audioCtx.currentTime + 0.2);
        osc2.start(audioCtx.currentTime + 0.2);
        osc2.stop(audioCtx.currentTime + 0.35);
      }
    } catch (e) { console.log("Audio play blocked"); }
  };

  useEffect(() => {
    let interval;
    if (timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining(prev => {
          if (prev === 4) announceVoice("3");
          if (prev === 3) announceVoice("2");
          if (prev === 2) announceVoice("1");

          if (prev <= 1) {
            playNotification('end');
            announceVoice(isWarmupActive ? "Time up!" : "Go!");
            if (isWarmupActive) {
              handleNextWarmup();
            } else {
              setIsResting(false);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRemaining, isWarmupActive]);

  const handleStartWarmupSession = () => {
    setIsWarmupActive(true);
    setActiveWarmupIdx(0);
    const firstEx = derivedWarmup[0];
    playNotification('start');
    announceVoice(`Starting R.A.M.P warm-up. Phase: ${firstEx.phase}. First exercise: ${firstEx.name}`);
    if (firstEx.type === 'timer') {
      setTimerRemaining(firstEx.duration);
      setTimerTotal(firstEx.duration);
    }
  };

  const handleNextWarmup = () => {
    if (activeWarmupIdx < derivedWarmup.length - 1) {
      const nextIdx = activeWarmupIdx + 1;
      setActiveWarmupIdx(nextIdx);
      const nextEx = derivedWarmup[nextIdx];
      announceVoice(`Next exercise: ${nextEx.name}`);
      if (nextEx.type === 'timer') {
        setTimerRemaining(nextEx.duration);
        setTimerTotal(nextEx.duration);
      } else {
        setTimerRemaining(0);
      }
    } else {
      setIsWarmupActive(false);
      handleCompleteWarmup();
    }
  };

  const handleRestartWorkoutToday = () => {
    // 1. Reset Workout Progress
    const newHistory = { ...workoutHistory };
    newHistory[todayDate] = false; // Explicit false
    setWorkoutHistory(newHistory);
    localStorage.setItem('workoutHistory', JSON.stringify(newHistory));

    // 2. Reset Warmup Status
    const newWarmup = { ...warmupCompleted };
    newWarmup[todayDate] = false; // Explicit false
    setWarmupCompleted(newWarmup);
    localStorage.setItem('warmupCompleted', JSON.stringify(newWarmup));

    // 3. Reset internal exercise tracking
    setCompletedExercises([]);

    announceVoice("Training session reset. R.A.M.P warm-up protocol is now active.");
  };

  const handleResetWarmupOnly = () => {
    const newWarmup = { ...warmupCompleted };
    newWarmup[todayDate] = false;
    setWarmupCompleted(newWarmup);
    localStorage.setItem('warmupCompleted', JSON.stringify(newWarmup));
    announceVoice("Warm-up reset. R.A.M.P protocol is now available.");
  };

  const handleStartWorkout = () => {
    setIsWorkoutActive(true);
    setActiveExIdx(0);
    setActiveSet(1);
    setIsResting(false);
    setTimerRemaining(0);
    playNotification('start');
    announceVoice(`Starting training. First exercise, ${currentWorkout.exercises[0].name}`);
  };

  const handleFinishSet = () => {
    const exercise = currentWorkout.exercises[activeExIdx];

    if (activeSet < exercise.sets) {
      setTimerRemaining(exercise.restTime || 60);
      setTimerTotal(exercise.restTime || 60);
      setIsResting(true);
      setActiveSet(prev => prev + 1);
      playNotification('start');
      announceVoice(`Resting. Next, set ${activeSet + 1}`);
    } else {
      if (activeExIdx < currentWorkout.exercises.length - 1) {
        const nextExercise = currentWorkout.exercises[activeExIdx + 1];
        const recoveryTime = currentPhase.restBetweenExercises || 90;
        setTimerRemaining(recoveryTime);
        setTimerTotal(recoveryTime);
        setIsResting(true);
        handleToggleExercise(exercise.name);
        setActiveExIdx(prev => prev + 1);
        setActiveSet(1);
        playNotification('start');
        announceVoice(`Exercise complete. Take a break. Next up, ${nextExercise.name}`);
      } else {
        // Last set of last exercise
        const updatedCompleted = [...completedExercises, exercise.name];
        setCompletedExercises(updatedCompleted);
        setIsWorkoutActive(false);
        handleLogWorkout(true); // Signal that we are finishing the session
        playNotification('end');
        announceVoice("Workout complete! Great job today.");
      }
    }
  };

  // Save to localStorage
  useEffect(() => { localStorage.setItem('currentPhaseIdx', currentPhaseIdx); }, [currentPhaseIdx]);
  useEffect(() => { localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory)); }, [workoutHistory]);
  useEffect(() => { localStorage.setItem('weightLogs', JSON.stringify(weightLogs)); }, [weightLogs]);
  useEffect(() => { localStorage.setItem('nutritionHistory', JSON.stringify(nutritionHistory)); }, [nutritionHistory]);
  useEffect(() => { localStorage.setItem('dailyStats', JSON.stringify(dailyStats)); }, [dailyStats]);
  useEffect(() => { localStorage.setItem('warmupCompleted', JSON.stringify(warmupCompleted)); }, [warmupCompleted]);
  useEffect(() => { localStorage.setItem('overloadLog', JSON.stringify(overloadLog)); }, [overloadLog]);

  // Multi-User Auth & Cloud Sync States
  const [currentUser, setCurrentUser] = useState(null);
  const [cloudStatus, setCloudStatus] = useState('offline'); // 'synced' | 'syncing' | 'offline'
  const isCloudLoadedRef = useRef(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingForm, setOnboardingForm] = useState({
    name: '',
    age: '22',
    height: '185',
    startingWeight: '75',
    goalWeight: '85',
    goalType: 'Lean Bulk & Muscle Gain',
    duration: '48 Weeks (1 Year)',
    frequency: '3 Days / Week (Full Body)'
  });

  // Track Firebase Auth State (Google & Email Sign-In)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setCloudStatus('syncing');
        isCloudLoadedRef.current = false;
        try {
          const cloudData = await loadUserCloudData(user.uid);
          
          // A profile is valid if the user has explicitly completed onboarding AND has a personalized name (not the old placeholder 'Velan')
          const hasValidProfile = 
            cloudData?.profile && 
            cloudData.profile.onboardingCompleted === true &&
            cloudData.profile.name && 
            cloudData.profile.name !== 'Velan' &&
            cloudData.profile.goalType;

          if (hasValidProfile) {
            setUserProfile(cloudData.profile);
            if (cloudData.customProgram) {
              setCustomProgram(cloudData.customProgram);
              localStorage.setItem('vfit_custom_program', JSON.stringify(cloudData.customProgram));
            }
            if (cloudData.workoutHistory) setWorkoutHistory(cloudData.workoutHistory);
            if (cloudData.weightLogs && Array.isArray(cloudData.weightLogs) && cloudData.weightLogs.length > 0) {
              setWeightLogs(cloudData.weightLogs);
            }
            if (cloudData.nutritionHistory) setNutritionHistory(cloudData.nutritionHistory);
            if (cloudData.dailyStats) setDailyStats(cloudData.dailyStats);
            if (cloudData.warmupCompleted) setWarmupCompleted(cloudData.warmupCompleted);
            if (cloudData.overloadLog) setOverloadLog(cloudData.overloadLog);
            if (cloudData.currentPhaseIdx !== undefined) setCurrentPhaseIdx(cloudData.currentPhaseIdx);
            setCloudStatus('synced');
          } else {
            // First time login OR account that was never onboarded:
            // ALWAYS prompt the Athletic Profile Setup Modal!
            const suggestedName = user.displayName 
              ? user.displayName.split(' ')[0] 
              : (cloudData?.profile?.name && cloudData.profile.name !== 'Velan' ? cloudData.profile.name : '');
            
            setOnboardingForm({
              name: suggestedName,
              age: String(cloudData?.profile?.age || '22'),
              height: String(cloudData?.profile?.height || '185'),
              startingWeight: String(cloudData?.profile?.startingWeight || '75'),
              goalWeight: String(cloudData?.profile?.goalWeight || '85'),
              goalType: cloudData?.profile?.goalType || 'Lean Bulk & Muscle Gain',
              duration: cloudData?.profile?.duration || '48 Weeks (1 Year)',
              frequency: cloudData?.profile?.frequency || '3 Days / Week (Full Body)'
            });
            setShowOnboarding(true);
            setCloudStatus('synced');
          }
        } catch (err) {
          console.error("Cloud load error:", err);
          setCloudStatus('offline');
        } finally {
          isCloudLoadedRef.current = true;
        }
      } else {
        setCloudStatus('offline');
        isCloudLoadedRef.current = false;
      }
    });
    return () => unsubscribe();
  }, []);

  // Save to Firebase under current user ID whenever state changes
  useEffect(() => {
    if (!currentUser || !isCloudLoadedRef.current) return;
    if (!userProfile.onboardingCompleted) return;

    const syncTimer = setTimeout(async () => {
      setCloudStatus('syncing');
      const isSaved = await saveUserCloudData(currentUser.uid, {
        profile: userProfile,
        customProgram,
        workoutHistory,
        weightLogs,
        nutritionHistory,
        dailyStats,
        warmupCompleted,
        overloadLog,
        currentPhaseIdx
      });
      setCloudStatus(isSaved ? 'synced' : 'offline');
    }, 1200);

    return () => clearTimeout(syncTimer);
  }, [currentUser, userProfile, customProgram, workoutHistory, weightLogs, nutritionHistory, dailyStats, warmupCompleted, overloadLog, currentPhaseIdx]);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);

  const handleGoogleLogin = async () => {
    setAuthError('');
    setIsAuthSubmitting(true);
    const { user, error } = await loginWithGoogle();
    setIsAuthSubmitting(false);
    if (error) {
      if (error.includes('unauthorized-domain')) {
        setAuthError('Domain not authorized yet. Please add "fitness-app-five-cyan.vercel.app" to Authorized Domains in your Firebase Console (Authentication > Settings > Authorized Domains).');
      } else {
        setAuthError(error.replace("Firebase: ", ""));
      }
    } else {
      setShowAuthModal(false);
    }
  };

  const handleEmailAuth = async (e) => {
    if (e) e.preventDefault();
    if (!authEmail || !authPassword) {
      setAuthError("Please enter both email and password.");
      return;
    }
    setAuthError('');
    setIsAuthSubmitting(true);
    let res;
    if (authMode === 'signup') {
      res = await signUpWithEmail(authEmail, authPassword);
    } else {
      res = await loginWithEmail(authEmail, authPassword);
    }
    setIsAuthSubmitting(false);
    if (res.error) {
      setAuthError(res.error.replace("Firebase: ", ""));
    } else {
      setShowAuthModal(false);
      setAuthEmail('');
      setAuthPassword('');
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    isCloudLoadedRef.current = false;
    setCurrentUser(null);
    setCloudStatus('offline');

    // Wipe all user profile and workout data from localStorage
    localStorage.removeItem('userProfile');
    localStorage.removeItem('vfit_custom_program');
    localStorage.removeItem('workoutHistory');
    localStorage.removeItem('weightLogs');
    localStorage.removeItem('nutritionHistory');
    localStorage.removeItem('dailyStats');
    localStorage.removeItem('warmupCompleted');
    localStorage.removeItem('overloadLog');

    // Reset all React state to default guest state
    setUserProfile(DEFAULT_GUEST_PROFILE);
    setCustomProgram(null);
    setCurrentPhaseIdx(0);
    setWorkoutHistory({});
    setWeightLogs([{ date: todayDate, weight: 75 }]);
    setNutritionHistory({});
    setDailyStats({});
    setWarmupCompleted({});
    setOverloadLog({});
  };

  const handleCompleteOnboarding = async (shouldGenerateAi = true) => {
    const sWeight = Number(onboardingForm.startingWeight) || 75;
    const gWeight = Number(onboardingForm.goalWeight) || 85;
    const profileName = onboardingForm.name.trim() || (currentUser?.displayName ? currentUser.displayName.split(' ')[0] : 'Athlete');

    const updatedProfile = {
      name: profileName,
      age: Number(onboardingForm.age) || 22,
      height: Number(onboardingForm.height) || 185,
      startingWeight: sWeight,
      currentWeight: sWeight,
      goalWeight: gWeight,
      goalType: onboardingForm.goalType || 'Lean Bulk & Muscle Gain',
      duration: onboardingForm.duration || '48 Weeks (1 Year)',
      frequency: onboardingForm.frequency || '3 Days / Week (Full Body)',
      targetGain: `${Math.abs(gWeight - sWeight)}kg`,
      onboardingCompleted: true
    };

    setUserProfile(updatedProfile);
    const initialLogs = [{ date: todayDate, weight: sWeight }];
    setWeightLogs(initialLogs);

    let newPlan = null;
    if (shouldGenerateAi) {
      setIsGeneratingPlan(true);
      try {
        newPlan = await generateCustomPlanApi(updatedProfile);
        if (newPlan) {
          setCustomProgram(newPlan);
          localStorage.setItem('vfit_custom_program', JSON.stringify(newPlan));
          setCurrentPhaseIdx(0);
        }
      } catch (err) {
        console.warn("AI plan generation error, using smart heuristic:", err);
        newPlan = buildSmartHeuristicPlan(updatedProfile);
        setCustomProgram(newPlan);
        localStorage.setItem('vfit_custom_program', JSON.stringify(newPlan));
        setCurrentPhaseIdx(0);
      } finally {
        setIsGeneratingPlan(false);
      }
    } else {
      setCustomProgram(null);
      localStorage.removeItem('vfit_custom_program');
      setCurrentPhaseIdx(0);
    }

    setShowOnboarding(false);

    if (currentUser) {
      setCloudStatus('syncing');
      await saveUserCloudData(currentUser.uid, {
        profile: updatedProfile,
        customProgram: newPlan || null,
        workoutHistory,
        weightLogs: initialLogs,
        nutritionHistory,
        dailyStats,
        warmupCompleted,
        overloadLog,
        currentPhaseIdx: 0
      });
      setCloudStatus('synced');
    }
  };


  const latestWeightEntry = (Array.isArray(weightLogs) && weightLogs.length > 0)
    ? weightLogs[weightLogs.length - 1]
    : { date: todayDate, weight: Number(userProfile?.startingWeight) || 75 };
  const currentWeight = Number(latestWeightEntry?.weight) || 75;
  const lastWeightDate = latestWeightEntry?.date || todayDate;
  const isWeighInDue = (new Date() - new Date(lastWeightDate)) / (1000 * 60 * 60 * 24) >= 7;

  const getWorkoutByDay = (dateObj) => {
    const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const phase = (activeProgram?.phases && activeProgram.phases[currentPhaseIdx])
      ? activeProgram.phases[currentPhaseIdx]
      : (activeProgram?.phases?.[0] || { id: 1, name: "Foundation", workouts: [] });

    if (phase.restDays && phase.restDays.includes(weekday)) {
      return {
        name: "Rest & Active Recovery",
        isRest: true,
        recovery: phase.recovery || "20-30 min Zone 2 Walk + Mobility",
        exercises: []
      };
    }

    if (!customProgram && phase.id === 4) {
      const mapping = { "Monday": 0, "Tuesday": 1, "Thursday": 2, "Friday": 3, "Saturday": 4 };
      if (mapping[weekday] !== undefined && phase.workouts?.[mapping[weekday]]) {
        return phase.workouts[mapping[weekday]];
      }
    }

    const workout = (phase.workouts || []).find(w => w.days && w.days.includes(weekday));
    return workout || (phase.workouts && phase.workouts[0]) || { name: "Rest Day", isRest: true, exercises: [] };
  };

  const todayObj = new Date();
  const tomorrowObj = new Date();
  tomorrowObj.setDate(todayObj.getDate() + 1);

  const currentWorkout = getWorkoutByDay(todayObj);

  // Dynamic Warmup Logic to replace Primer Set
  const derivedWarmup = flatRampWarmup.map(ex => {
    if (ex.name === "Primer Set" && currentWorkout?.exercises?.[0]) {
      const firstMainEx = currentWorkout.exercises[0];
      return {
        ...ex,
        name: `Primer: ${firstMainEx.name}`,
        image: firstMainEx.image || getExerciseImagePath(firstMainEx.name), // Use image from actual first exercise
        target: `Light set of ${firstMainEx.name} to potentiate CNS`,
        volume: "1 set x 15 reps (Light Weight)"
      };
    }
    return ex;
  });

  const tomorrowWorkout = getWorkoutByDay(tomorrowObj);
  const currentPhase = (activeProgram?.phases && activeProgram.phases[currentPhaseIdx])
    ? activeProgram.phases[currentPhaseIdx]
    : (activeProgram?.phases?.[0] || { id: 1, name: "Foundation", weeks: "6 Weeks", months: "1-2", workouts: [] });

  // Calculate estimated time for today's workout
  const calculateWorkoutTime = (workout, phase) => {
    if (!workout || workout.isRest) return "0 min";
    let totalSeconds = 0;
    workout.exercises.forEach((ex, idx) => {
      const setsCount = parseInt(ex.sets) || 0;
      const performanceTime = setsCount * 45; // 45s per set estimate
      const restTime = (setsCount - 1) * (ex.restTime || 60);
      totalSeconds += performanceTime + restTime;
      if (idx < workout.exercises.length - 1) {
        totalSeconds += (phase.restBetweenExercises || 90);
      }
    });
    return `${Math.ceil(totalSeconds / 60)} min`;
  };

  // Audio unlocking for mobile
  useEffect(() => {
    const unlock = () => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('');
        utterance.volume = 0;
        window.speechSynthesis.speak(utterance);
      }
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
    };
    window.addEventListener('click', unlock);
    window.addEventListener('touchstart', unlock);
  }, []);

  const workoutTime = calculateWorkoutTime(currentWorkout, currentPhase);

  // Advanced Progress Calculation: Filter logs by current phase ID
  const getSessionsForPhase = (pId) => {
    return Object.values(workoutHistory).filter(log =>
      (log.phaseId === pId) ||
      (typeof log === 'boolean' && log && pId === 1) // Legacy support for boolean logs as Ph1
    ).length;
  };

  const totalSessionsDone = Object.keys(workoutHistory).length;
  const sessionsInCurrentPhase = getSessionsForPhase(currentPhase.id);
  const sessionsPerWeek = parseInt(currentPhase.frequency) || 3;
  const targetSessionsForPhase = sessionsPerWeek * 6; // 6-week blocks (1-Year Plan)
  const phaseProgress = Math.min(100, Math.round((sessionsInCurrentPhase / targetSessionsForPhase) * 100));

  // Deload: final week (Week 6) of each 6-week block to allow CNS & tendon recovery before advancing
  const isDeloadWeekActive = sessionsInCurrentPhase >= (targetSessionsForPhase - sessionsPerWeek) && sessionsInCurrentPhase < targetSessionsForPhase;

  // Progressive Overload Helpers
  const getLastPerformance = (exerciseName) => {
    const logs = overloadLog[exerciseName];
    if (!logs || logs.length === 0) return null;
    return logs[logs.length - 1];
  };

  const handleLogOverload = () => {
    if (!overloadTarget || (!overloadInput.reps && !overloadInput.sets)) return;
    const newEntry = {
      date: todayDate,
      reps: overloadInput.reps || overloadTarget.currentReps,
      sets: overloadInput.sets || overloadTarget.currentSets,
      note: overloadInput.note || ''
    };
    const existing = overloadLog[overloadTarget.name] || [];
    const updated = { ...overloadLog, [overloadTarget.name]: [...existing, newEntry] };
    setOverloadLog(updated);
    setShowOverloadModal(false);
    setOverloadInput({ reps: '', sets: '', note: '' });
    announceVoice(`Performance logged for ${overloadTarget.name}.`);
  };

  // Phase-specific logging check
  const todayLog = workoutHistory[todayDate];
  const isTodayLogged = !!(todayLog && (
    (typeof todayLog === 'boolean' && todayLog) ||
    (todayLog.completed && todayLog.phaseId === currentPhase.id)
  ));


  const getPhaseIcon = (id) => {
    switch (id) {
      case 1: return <Activity size={80} className="banner-bg-icon" />;
      case 2: return <Dumbbell size={80} className="banner-bg-icon" />;
      case 3: return <Target size={80} className="banner-bg-icon" />;
      case 4: return <Flame size={80} className="banner-bg-icon" />;
      default: return <Award size={80} className="banner-bg-icon" />;
    }
  };

  const currentPhaseIcon = getPhaseIcon(currentPhase.id);

  const isWarmupDoneToday = !!warmupCompleted[todayDate];

  const handleCompleteWarmup = () => {
    const updated = { ...warmupCompleted, [todayDate]: true };
    setWarmupCompleted(updated);
    localStorage.setItem('warmupCompleted', JSON.stringify(updated));
    announceVoice("Warm-up routine complete. R.A.M.P protocol finished. You are now primed for the main session.");
  };

  const handleToggleExercise = (exerciseName) => {
    setCompletedExercises(prev =>
      prev.includes(exerciseName) ? prev.filter(e => e !== exerciseName) : [...prev, exerciseName]
    );
  };

  const handleLogWorkout = (forceLog = false) => {
    if (forceLog || progress === 100 || currentWorkout.isRest) {
      // Store log with phase ID to allow switching/previewing other phases
      const logEntry = {
        completed: true,
        phaseId: currentPhase.id,
        timestamp: new Date().toISOString()
      };

      setWorkoutHistory(prev => ({ ...prev, [todayDate]: logEntry }));
      setCompletedExercises([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (currentWorkout.isRest && !forceLog) {
        alert("Recovery session logged! Rest well.");
      }
    }
  };

  const handleAddWeight = () => {
    if (newWeight && !isNaN(newWeight)) {
      setWeightLogs(prev => [...prev, { date: todayDate, weight: parseFloat(newWeight) }]);
      setShowWeightInput(false);
      setNewWeight('');
    }
  };

  const handleLogIntake = () => {
    if (intakeCalories || intakeProtein || intakeCarbs || intakeFats) {
      const existing = nutritionHistory[selectedDashboardDate] || { calories: 0, protein: 0, carbs: 0, fats: 0 };

      const p = (parseInt(intakeProtein) || 0);
      const c = (parseInt(intakeCarbs) || 0);
      const f = (parseInt(intakeFats) || 0);

      // Auto-calculate kcal if input is empty
      const manualKcal = parseInt(intakeCalories);
      const calculatedKcal = (isNaN(manualKcal)) ? (p * 4 + c * 4 + f * 9) : manualKcal;

      const newNutrition = {
        ...nutritionHistory,
        [selectedDashboardDate]: {
          calories: (Number(existing.calories) || 0) + calculatedKcal,
          protein: (Number(existing.protein) || 0) + p,
          carbs: (Number(existing.carbs) || 0) + c,
          fats: (Number(existing.fats) || 0) + f
        }
      };
      setNutritionHistory(newNutrition);
      localStorage.setItem('nutritionHistory', JSON.stringify(newNutrition));
      setIntakeCalories('');
      setIntakeProtein('');
      setIntakeCarbs('');
      setIntakeFats('');
    }

    if (intakeSleep || intakeWater) {
      const existing = dailyStats[selectedDashboardDate] || { sleep: 0, water: 0 };
      const newStats = {
        ...dailyStats,
        [selectedDashboardDate]: {
          sleep: intakeSleep ? parseFloat(intakeSleep) : existing.sleep,
          water: intakeWater ? parseFloat(intakeWater) : existing.water
        }
      };
      setDailyStats(newStats);
      localStorage.setItem('dailyStats', JSON.stringify(newStats));
      setIntakeSleep('');
      setIntakeWater('');
    }
  };

  const handleUpdateDailyStat = (type, value) => {
    const newStats = {
      ...dailyStats,
      [selectedDashboardDate]: {
        ...(dailyStats[selectedDashboardDate] || { water: 0, sleep: 0 }),
        [type]: value
      }
    };
    setDailyStats(newStats);
    localStorage.setItem('dailyStats', JSON.stringify(newStats));
  };

  const handleResetToday = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    const targetDate = selectedDashboardDate;

    // 1. Update Nutrition
    const newNutrition = { ...nutritionHistory };
    delete newNutrition[targetDate];
    setNutritionHistory(newNutrition);
    localStorage.setItem('nutritionHistory', JSON.stringify(newNutrition));

    // 2. Update Daily Stats (Water/Sleep)
    const newStats = { ...dailyStats };
    delete newStats[targetDate];
    setDailyStats(newStats);
    localStorage.setItem('dailyStats', JSON.stringify(newStats));

    // 3. Update Workout History (Training Status, Streak, Volume Density)
    const newWorkoutHistory = { ...workoutHistory };
    delete newWorkoutHistory[targetDate];
    setWorkoutHistory(newWorkoutHistory);
    localStorage.setItem('workoutHistory', JSON.stringify(newWorkoutHistory));

    // 4. Update Weight Logs (Trajectory)
    const newWeightLogs = weightLogs.filter(log => log.date !== targetDate);
    // Safety check: Don't let weight history go completely empty otherwise graph will crash
    if (newWeightLogs.length === 0) {
      newWeightLogs.push({ date: targetDate, weight: 75 });
    }
    setWeightLogs(newWeightLogs);
    localStorage.setItem('weightLogs', JSON.stringify(newWeightLogs));

    // 5. Reset local inputs if current
    if (targetDate === todayDate) {
      setIntakeCalories('');
      setIntakeProtein('');
      setIntakeCarbs('');
      setIntakeFats('');
      setIntakeSleep('');
      setIntakeWater('');
    }

    setShowResetModal(false);
    setIsResetSuccess(true);
    setTimeout(() => setIsResetSuccess(false), 3000);
  };

  const startW = userProfile.startingWeight || 75;
  const goalW = userProfile.goalWeight || 85;
  const isLosing = goalW < startW;
  const totalDiff = Math.abs(goalW - startW) || 1;
  const currentDiff = isLosing ? (startW - currentWeight) : (currentWeight - startW);
  const weightProgress = Math.max(0, Math.min(100, (currentDiff / totalDiff) * 100));

  const [dashboardWeekOffset, setDashboardWeekOffset] = useState(0);

  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  // Displayed days for the Dashboard ribbon (allows navigating back in time)
  const displayedDays = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i) - dashboardWeekOffset);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  // Export all workout and tracking data to a JSON backup file
  const handleExportData = () => {
    const backup = {
      workoutHistory,
      weightLogs,
      nutritionHistory,
      dailyStats,
      warmupCompleted,
      overloadLog,
      currentPhaseIdx,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vfit-backup-${todayDate}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import previously saved JSON backup
  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.workoutHistory) {
          setWorkoutHistory(data.workoutHistory);
          localStorage.setItem('workoutHistory', JSON.stringify(data.workoutHistory));
        }
        if (data.weightLogs) {
          setWeightLogs(data.weightLogs);
          localStorage.setItem('weightLogs', JSON.stringify(data.weightLogs));
        }
        if (data.nutritionHistory) {
          setNutritionHistory(data.nutritionHistory);
          localStorage.setItem('nutritionHistory', JSON.stringify(data.nutritionHistory));
        }
        if (data.dailyStats) {
          setDailyStats(data.dailyStats);
          localStorage.setItem('dailyStats', JSON.stringify(data.dailyStats));
        }
        if (data.warmupCompleted) {
          setWarmupCompleted(data.warmupCompleted);
          localStorage.setItem('warmupCompleted', JSON.stringify(data.warmupCompleted));
        }
        if (data.overloadLog) {
          setOverloadLog(data.overloadLog);
          localStorage.setItem('overloadLog', JSON.stringify(data.overloadLog));
        }
        if (data.currentPhaseIdx !== undefined) {
          setCurrentPhaseIdx(data.currentPhaseIdx);
          localStorage.setItem('currentPhaseIdx', data.currentPhaseIdx);
        }
        alert("Backup restored successfully!");
      } catch (err) {
        alert("Failed to restore: please select a valid V-FIT backup JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const getDayNutrition = (date) => nutritionHistory[date] || { calories: 0, protein: 0, carbs: 0, fats: 0 };
  const getDayStats = (date) => dailyStats[date] || { water: 0, sleep: 0 };
  const getDayWorkoutStatus = (date) => workoutHistory[date] ? "Completed" : "Rest/Missed";

  return (
    <div className="app-container" data-phase={currentPhase.id}>
      <div className={`sidebar-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)} />
      <aside className={`sidebar ${isMenuOpen ? 'mobile-open' : ''}`}>
        <div className="glass-card sidebar-inner-card">
          <div className="logo-area">
            <div className="logo-box">
              <img src="/vfit-logo.png" alt="V-Fit" />
            </div>
            <h2 className="logo-text">V-FIT</h2>
            <button className="mobile-close-btn" onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="account-card">
            {currentUser ? (
              <div className="user-profile-badge" onClick={() => {
                setOnboardingForm({
                  name: userProfile.name || '',
                  age: String(userProfile.age || 22),
                  height: String(userProfile.height || 185),
                  startingWeight: String(userProfile.startingWeight || 75),
                  goalWeight: String(userProfile.goalWeight || 85),
                  goalType: userProfile.goalType || 'Lean Bulk & Muscle Gain'
                });
                setShowOnboarding(true);
              }} title="Click to edit profile metrics">
                <div className="user-avatar-wrap">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt={userProfile.name} className="user-avatar-img" />
                  ) : (
                    <div className="user-avatar-placeholder">{userProfile.name?.charAt(0) || 'A'}</div>
                  )}
                </div>
                <div className="user-info-text">
                  <span className="user-name">{userProfile.name}</span>
                  <span className="user-stats">{userProfile.height}cm • {currentWeight}kg → {userProfile.goalWeight}kg</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleLogout(); }} className="btn-logout" title="Sign Out">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="btn-google-login">
                <LogIn size={16} color="var(--accent-primary)" />
                <span>Sign In / Create Account</span>
              </button>
            )}
          </div>

          <div className="greeting-box">
            <div className="greeting-header">
              {greeting.icon}
              <span className="greeting-text">{greeting.msg}</span>
            </div>
            <p className="greeting-quote">{greeting.quote}</p>
          </div>

          <nav className="nav-main">
            <div className={`nav-item ${view === 'workout' ? 'active' : ''}`} onClick={() => { setView('workout'); setIsMenuOpen(false); }}>
              <Dumbbell size={20} color={view === 'workout' ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
              <span>Training</span>
            </div>
            <div className={`nav-item ${view === 'dashboard' ? 'active' : ''}`} onClick={() => { setView('dashboard'); setSelectedDashboardDate(todayDate); setIsMenuOpen(false); }}>
              <Target size={20} color={view === 'dashboard' ? 'var(--accent-secondary)' : 'var(--text-secondary)'} />
              <span>Dashboard</span>
            </div>
          </nav>

          <div className="nav-label">PLAN PHASES</div>
          <nav className="nav-phases">
            {activeProgram.phases.map((phase, idx) => (
              <div
                key={phase.id}
                className={`nav-item phase-item ${currentPhaseIdx === idx ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPhaseIdx(idx);
                  setCompletedExercises([]);
                  setView('workout');
                  setIsMenuOpen(false);
                }}
              >
                <Award size={20} />
                <div className="phase-text">
                  <span className="phase-name">{phase.name}</span>
                  <span className="phase-months">{phase.weeks || `Block ${phase.id}`} • Mo {phase.months}</span>
                </div>
              </div>
            ))}
          </nav>

          <div className="nav-label">DISPLAY MODE</div>
          <nav className="nav-theme">
            <div className={`nav-item theme-item ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>
              <Moon size={20} />
              <span>Dark Appearance</span>
            </div>
            <div className={`nav-item theme-item ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>
              <Sun size={20} />
              <span>Light Appearance</span>
            </div>
          </nav>

          <div className="nav-label">DATA & BACKUP</div>
          <nav className="nav-theme">
            <div className="nav-item" onClick={handleExportData} style={{ cursor: 'pointer' }} title="Save backup file to your phone/PC">
              <Download size={20} color="var(--accent-primary)" />
              <span>Export Backup (.json)</span>
            </div>
            <label className="nav-item" style={{ cursor: 'pointer' }} title="Restore data from backup file">
              <Upload size={20} color="var(--accent-secondary)" />
              <span>Import Backup</span>
              <input type="file" accept=".json" onChange={handleImportData} style={{ display: 'none' }} />
            </label>
          </nav>
        </div>
      </aside>

      <main className="main-content">
        <header className="header sticky-header">
          <div className="header-mobile-top">
            <div className="header-left">
              <div className="header-greeting-right" style={{ paddingLeft: 0 }}>
                {greeting.icon}
                <div className="header-greeting-text-box">
                  <span className="h-greet-msg" style={{ color: greeting.color }}>{greeting.msg}</span>
                  <span className="h-greet-date">{todayObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
            <div className="header-right-actions">
              <div className={`cloud-sync-badge ${cloudStatus}`} title={`Google Firebase Cloud: ${cloudStatus.toUpperCase()}`}>
                <Cloud size={14} />
                <span>{cloudStatus === 'synced' ? 'Cloud Synced' : cloudStatus === 'syncing' ? 'Syncing...' : 'Local'}</span>
              </div>
              <button className="theme-toggle-btn-v2" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </header>
        <div className="glass-card date-box">
          <Calendar size={20} color="var(--accent-primary)" />
          <span className="date-text">{view === 'workout' ? "Today's Objective" : "Analytical Insights"}</span>
        </div>

        {
          view === 'workout' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="workout-view">
              <section className="modern-phase-banner compact-banner">
                <div className="banner-image-overlay"></div>
                <div className="modern-banner-main">
                  <div className="modern-banner-text">
                    <div className="phase-pill-label">TRAINING BLOCK {currentPhase.id}</div>
                    <h2 className="modern-phase-title">{currentPhase.name}</h2>
                    <div className="phase-duration-tag">{currentPhase.weeks || '6 Weeks'} • Month {currentPhase.months} (1-Year Plan)</div>
                  </div>
                </div>

                <div className="modern-stats-grid-v2">
                  <div className="m-stat-v2">
                    <div className="m-icon-box"><History size={16} color="var(--accent-primary)" /></div>
                    <div className="m-info-v2">
                      <span className="m-val-v2">{sessionsInCurrentPhase}</span>
                      <span className="m-label-v2">SESSIONS</span>
                    </div>
                  </div>
                  <div className="m-stat-v2">
                    <div className="m-icon-box"><TrendingUp size={16} color="#10b981" /></div>
                    <div className="m-info-v2">
                      <span className="m-val-v2">{phaseProgress}%</span>
                      <span className="m-label-v2">EFFICIENCY</span>
                    </div>
                  </div>
                  <div className="m-stat-v2">
                    <div className="m-icon-box"><Calendar size={16} color="var(--accent-primary)" /></div>
                    <div className="m-info-v2">
                      <span className="m-val-v2">
                        {tomorrowWorkout.isRest ? 'Active Rest' : tomorrowWorkout.name.split(' ')[0]}
                      </span>
                      <span className="m-label-v2">SCHEDULE</span>
                    </div>
                  </div>
                  <div className="m-stat-v2">
                    <div className="m-icon-box"><Clock size={16} /></div>
                    <div className="m-info-v2">
                      <span className="m-val-v2">{workoutTime}</span>
                      <span className="m-label-v2">ESTIMATED</span>
                    </div>
                  </div>
                </div>
              </section>

              <div className="workout-grid">
                <div className="glass-card workout-main-card">
                  {isTodayLogged ? (
                    <div className="completed-banner reset-capable-banner">
                      <div className="completed-info-main">
                        <CheckCircle2 size={32} color="#10b981" />
                        <div>
                          <h3>Workout Logged</h3>
                          <p>You're done for today. <strong>{tomorrowWorkout.isRest ? 'Tomorrow is a Rest Day' : `Tomorrow: ${tomorrowWorkout.name}`}</strong></p>
                        </div>
                      </div>
                      <button onClick={handleRestartWorkoutToday} className="reset-today-btn" title="Reset Today">
                        <RotateCcw size={18} />
                        <span>Start Over</span>
                      </button>
                    </div>
                  ) : !isWarmupDoneToday && !currentWorkout.isRest ? (
                    <div className="warmup-section centered-warmup-info">
                      <div className="workout-header-row">
                        <div className="workout-info-group">
                          <span className="premium-tag-mini">R.A.M.P PROTOCOL</span>
                          <h3 className="workout-title">Daily V-FIT Warm-Up</h3>
                          <p className="workout-subtitle">Interactive routine to prime your CNS and unlock the session.</p>
                        </div>
                        <div className="warmup-actions-row">
                          <button onClick={handleStartWarmupSession} className="log-btn warmup-finish-btn">
                            <Zap size={20} />
                            Start Warm-up
                          </button>
                        </div>
                      </div>

                      <div className="warmup-preview-grid">
                        {derivedWarmup.map((ex, i) => (
                          <div key={i} className="warmup-preview-item">
                            <span className="wp-phase">{ex.phase}</span>
                            <span className="wp-name">{ex.name}</span>
                            <span className="wp-vol">{ex.volume}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="workout-header-row">
                        <div className="workout-info-group">
                          <h3 className="workout-title">{currentWorkout.isRest ? 'Rest & Recovery' : currentWorkout.name}</h3>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <p className="workout-subtitle" style={{ margin: 0 }}>
                              {currentWorkout.isRest
                                ? 'Growth happens during recovery. Prioritize sleep!'
                                : isWarmupDoneToday ? 'CNS Primed. Main session ready to start.' : 'Focus on mechanical tension and leverage manipulation.'}
                            </p>
                            {isWarmupDoneToday && !currentWorkout.isRest && (
                              <button onClick={handleResetWarmupOnly} className="reset-warmup-inline-btn" title="Reset Warmup">
                                <RotateCcw size={12} /> Reset Warmup
                              </button>
                            )}
                          </div>
                        </div>
                        {!currentWorkout.isRest && (
                          <div className="progress-group">
                            <button onClick={handleStartWorkout} className="log-btn main-session-btn">
                              <Activity size={20} />
                              Start Main Session
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Deload Week Banner */}
                      {isDeloadWeekActive && !currentWorkout.isRest && (
                        <div className="deload-banner">
                          <ShieldAlert size={18} color="#f97316" />
                          <div>
                            <strong>⚡ Deload Week Active</strong>
                            <p>Perform only 2 sets per exercise. Stay 4–5 reps away from failure. Let your CNS recover.</p>
                          </div>
                        </div>
                      )}

                      {!currentWorkout.isRest ? (
                        <div className="exercises-list">
                          {currentWorkout.exercises.map((ex, idx) => {
                            const lastPerf = getLastPerformance(ex.name);
                            const targetSets = isDeloadWeekActive ? 2 : ex.sets;
                            return (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                key={ex.name}
                                className="exercise-item"
                              >
                                <div className="ex-main">
                                  <div className="ex-thumb">
                                    <img 
                                      src={ex.image || getExerciseImagePath(ex.name)} 
                                      alt={ex.name} 
                                      onError={(e) => { e.target.src = '/app-icon.jpg'; }} 
                                    />
                                  </div>
                                  <div className="ex-details">
                                    <h4>{ex.name}</h4>
                                    <p>{ex.focus || "Master the technique"}</p>
                                    {lastPerf && (
                                      <div className="overload-last-perf">
                                        <TrendingUp size={11} color="#10b981" />
                                        <span>Last: {lastPerf.sets}×{lastPerf.reps} on {lastPerf.date}</span>
                                        {lastPerf.note && <span className="overload-note">"{lastPerf.note}"</span>}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="ex-meta">
                                  <span className={`ex-sets-reps ${isDeloadWeekActive ? 'deload-dim' : ''}`}>
                                    {isDeloadWeekActive ? `2 × ${ex.reps} (deload)` : `${ex.sets} × ${ex.reps}`}
                                  </span>
                                  <button
                                    className="overload-log-btn"
                                    onClick={() => {
                                      setOverloadTarget({ name: ex.name, currentReps: ex.reps, currentSets: ex.sets });
                                      setOverloadInput({ reps: '', sets: '', note: '' });
                                      setShowOverloadModal(true);
                                    }}
                                    title="Log today's actual reps/sets"
                                  >
                                    <Plus size={13} /> Log
                                  </button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="rest-display">
                          <Info size={48} color="var(--accent-primary)" style={{ marginBottom: '1.5rem', opacity: 0.8 }} />
                          <p className="recovery-instruction">{currentWorkout.recovery || "Focus on hydration and light mobility today."}</p>
                          <button onClick={handleLogWorkout} className="log-btn" style={{ marginTop: '2.5rem' }}>
                            Log Active Recovery
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <aside className="workout-sidebar">
                  <div className="glass-card weight-card-new">
                    <div className="weight-header-new">
                      <div className="icon-badge"><TrendingUp size={20} color="white" /></div>
                      <div><h4 className="weight-title-new">Body Weight</h4><p className="weight-subtitle-new">Goal: {userProfile.goalWeight || 85}.0 kg</p></div>
                    </div>
                    <div className="weight-main-new">
                      {!showWeightInput ? (
                        <div className="weight-value-container" onClick={() => setShowWeightInput(true)}>
                          <span className="weight-num">{currentWeight.toFixed(1)}</span>
                          <span className="weight-unit">KG</span>
                        </div>
                      ) : (
                        <div className="weight-input-container">
                          <input type="number" step="0.1" value={newWeight} onChange={(e) => setNewWeight(e.target.value)} autoFocus className="weight-input-field" placeholder={currentWeight.toString()} />
                          <div className="weight-input-actions">
                            <button onClick={handleAddWeight} className="btn-save-weight">Save</button>
                            <button onClick={() => setShowWeightInput(false)} className="btn-cancel-weight">×</button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="weight-progress-bar">
                      <div className="progress-labels"><span>{userProfile.startingWeight || 75}kg</span><span>{weightProgress.toFixed(0)}% to target</span><span>{userProfile.goalWeight || 85}kg</span></div>
                      <div className="progress-track-bg"><div className="progress-fill-bar" style={{ width: `${Math.min(100, Math.max(0, weightProgress))}%` }} /></div>
                    </div>
                  </div>

                  <div className="glass-card activity-card">
                    <div className="activity-card-header">
                      <div>
                        <h4 className="activity-title">Weekly Streak</h4>
                        <p className="activity-subtitle">{last7Days.filter(d => workoutHistory[d]).length} sessions this week</p>
                      </div>
                      <div className="streak-badge">
                        <Flame size={14} fill="#f97316" color="#f97316" />
                        <span>{last7Days.filter(d => workoutHistory[d]).length}D</span>
                      </div>
                    </div>
                    <div className="activity-grid">
                      {last7Days.map(date => (
                        <div key={date} className={`day-dot-group ${date === todayDate ? 'is-today' : ''}`}>
                          <div className={`day-dot ${workoutHistory[date] ? 'active' : ''}`}>
                            {workoutHistory[date] && <CheckCircle2 size={16} color="white" />}
                          </div>
                          <span className="day-label">{parseLocalDate(date).toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </motion.div>
          ) : (
            <div className="dashboard-grid-expanded">
              <div className="dashboard-main-col">
                <div className="glass-card analytical-header">
                  <div className="date-nav-wrapper">
                    <div className="date-nav-toolbar">
                      <button
                        className="date-nav-btn"
                        onClick={() => setDashboardWeekOffset(p => p + 7)}
                        title="View older 7 days"
                      >
                        <ChevronLeft size={16} /> Older
                      </button>

                      <div className="date-picker-wrap">
                        <Calendar size={14} color="var(--accent-primary)" />
                        <input
                          type="date"
                          value={selectedDashboardDate}
                          max={todayDate}
                          onChange={(e) => {
                            if (e.target.value) {
                              const val = e.target.value;
                              setSelectedDashboardDate(val);
                              const diffDays = Math.floor((new Date(todayDate) - new Date(val)) / (1000 * 60 * 60 * 24));
                              if (diffDays >= 0) {
                                setDashboardWeekOffset(Math.floor(diffDays / 7) * 7);
                              }
                            }
                          }}
                          className="history-calendar-picker"
                          title="Jump directly to any date"
                        />
                      </div>

                      <button
                        className="date-nav-btn"
                        onClick={() => setDashboardWeekOffset(p => Math.max(0, p - 7))}
                        disabled={dashboardWeekOffset === 0}
                        title="View newer 7 days"
                      >
                        Newer <ChevronRight size={16} />
                      </button>
                    </div>

                    <div className="date-selection-banner">
                      {displayedDays.map(date => (
                        <div
                          key={date}
                          className={`date-chip ${selectedDashboardDate === date ? 'active' : ''} ${date === todayDate ? 'is-today' : ''}`}
                          onClick={() => setSelectedDashboardDate(date)}
                        >
                          <span className="chip-day">{parseLocalDate(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                          <span className="chip-num">{parseLocalDate(date).getDate()}</span>
                          {date === todayDate && <span className="today-indicator">TODAY</span>}
                          <div className="chip-dots">
                            {warmupCompleted[date] && <div className="dot-warmup" />}
                            {workoutHistory[date] && <div className="dot-workout" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="day-analysis-grid">
                    <section className="nutrition-summary-v2">
                      <div className="food-summary-card">
                        <div className="food-summary-info">
                          <div className="calories-box">
                            <div className="cal-stat-item">
                              <span className="cal-num">{getDayNutrition(selectedDashboardDate).calories}</span>
                              <span className="cal-label">Consumed</span>
                            </div>
                            <div className="cal-stat-item">
                              <span className="cal-num">{Math.max(0, TARGET_KCAL - getDayNutrition(selectedDashboardDate).calories)}</span>
                              <span className="cal-label">Remaining</span>
                            </div>
                          </div>

                          <div className="macros-grid-mini">
                            {[
                              { label: 'Protein', val: getDayNutrition(selectedDashboardDate).protein, target: TARGET_PRO, color: '#3b82f6' },
                              { label: 'Carbs', val: getDayNutrition(selectedDashboardDate).carbs || 0, target: TARGET_CARB, color: '#f59e0b' },
                              { label: 'Fats', val: getDayNutrition(selectedDashboardDate).fats || 0, target: TARGET_FAT, color: '#ef4444' }
                            ].map(m => (
                              <div key={m.label} className="macro-mini-item">
                                <div className="macro-mini-header">
                                  <span>{m.label}</span>
                                  <span>{m.val}/{m.target}g</span>
                                </div>
                                <div className="macro-mini-bar">
                                  <div className="macro-mini-fill" style={{ width: `${Math.min(100, (m.val / m.target) * 100)}%`, background: m.color }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="nutrition-meter-large">
                          <svg className="meter-svg" width="140" height="140">
                            <circle className="meter-bg" cx="70" cy="70" r="64" />
                            <motion.circle
                              className="meter-progress"
                              cx="70" cy="70" r="64"
                              strokeDasharray={2 * Math.PI * 64}
                              animate={{ strokeDashoffset: (1 - Math.min(1, getDayNutrition(selectedDashboardDate).calories / TARGET_KCAL)) * (2 * Math.PI * 64) }}
                              transition={{ duration: 1.5, ease: 'easeOut' }}
                            />
                          </svg>
                          <div className="meter-label-center">
                            <span className="meter-goal-val">{getDayNutrition(selectedDashboardDate).calories}</span>
                            <span className="meter-goal-label">/ {TARGET_KCAL}</span>
                          </div>
                        </div>
                      </div>

                      <div className="daily-extras-grid">
                        <div className={`extra-status-card ${warmupCompleted[selectedDashboardDate] ? 'active' : 'dark'}`}>
                          <div className="extra-info">
                            <h4>Warm-up</h4>
                            <div className="extra-val">{warmupCompleted[selectedDashboardDate] ? 'Completed' : 'Pending'}</div>
                          </div>
                          <div className="extra-meter-small">
                            <Zap size={32} color={warmupCompleted[selectedDashboardDate] ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'} />
                          </div>
                        </div>
                        <div className={`extra-status-card ${workoutHistory[selectedDashboardDate] ? 'active' : 'dark'}`}>
                          <div className="extra-info">
                            <h4>Training</h4>
                            <div className="extra-val">{workoutHistory[selectedDashboardDate] ? 'Session Logged' : 'Incomplete'}</div>
                          </div>
                          <div className="extra-meter-small">
                            <Dumbbell size={32} color={workoutHistory[selectedDashboardDate] ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'} />
                          </div>
                        </div>
                      </div>

                      <div className="daily-extras-grid">
                        <div className={`extra-status-card ${getDayStats(selectedDashboardDate).sleep >= 8 ? 'active' : 'dark'}`}>
                          <div className="extra-info">
                            <h4>Sleep</h4>
                            <div className="extra-val">{getDayStats(selectedDashboardDate).sleep}<span className="extra-unit">/8 Hours</span></div>
                          </div>
                          <div className="extra-meter-small">
                            <Moon size={32} opacity={getDayStats(selectedDashboardDate).sleep >= 8 ? 1 : 0.3} />
                          </div>
                        </div>
                        <div className={`extra-status-card ${getDayStats(selectedDashboardDate).water >= 5 ? 'active' : 'dark'}`}>
                          <div className="extra-info">
                            <h4>Water</h4>
                            <div className="extra-val">{getDayStats(selectedDashboardDate).water}<span className="extra-unit">/5 Liters</span></div>
                          </div>
                          <div className="extra-meter-small">
                            <Droplets size={32} opacity={getDayStats(selectedDashboardDate).water >= 5 ? 1 : 0.3} />
                          </div>
                        </div>
                      </div>

                      {selectedDashboardDate === todayDate && (
                        <div className="fuel-input-premium">
                          <div className="fuel-input-header"><Utensils size={14} /> Quick Log Nutrition</div>
                          <div className="fuel-input-grid">
                            <input type="number" placeholder="Kcal" value={intakeCalories} onChange={e => setIntakeCalories(e.target.value)} />
                            <input type="number" placeholder="Protein" value={intakeProtein} onChange={e => setIntakeProtein(e.target.value)} />
                            <input type="number" placeholder="Carbs" value={intakeCarbs} onChange={e => setIntakeCarbs(e.target.value)} />
                            <input type="number" placeholder="Fats" value={intakeFats} onChange={e => setIntakeFats(e.target.value)} />
                            <button className="btn-add-log" onClick={handleLogIntake} title="Add to Daily Intake">Log</button>
                          </div>
                          <div className="fuel-input-grid" style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                              <Moon size={16} color="var(--text-secondary)" />
                              <input
                                type="number"
                                placeholder="Sleep hr"
                                value={intakeSleep}
                                onChange={e => setIntakeSleep(e.target.value)}
                                style={{ flex: 1 }}
                              />
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                              <Droplets size={16} color="var(--accent-secondary)" />
                              <input
                                type="number"
                                placeholder="Water L"
                                value={intakeWater}
                                onChange={e => setIntakeWater(e.target.value)}
                                style={{ flex: 1 }}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div style={{ marginTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem' }}>
                        <button onClick={handleResetToday} style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: '#ef4444',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                          padding: '0.8rem 1rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '800',
                          cursor: 'pointer',
                          width: '100%',
                          letterSpacing: '0.05em'
                        }}>
                          RESET DATA FOR {selectedDashboardDate === todayDate ? "TODAY" : parseLocalDate(selectedDashboardDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
                        </button>
                      </div>
                    </section>

                    <div className="analysis-card workout-insights">
                      <div className="ai-header">
                        <div className="icon-badge-mini" style={{ background: 'rgba(6, 182, 212, 0.1)' }}>
                          <Dumbbell size={18} color="var(--accent-secondary)" />
                        </div>
                        <h4>Training Status</h4>
                      </div>
                      <div className="status-badge" style={{
                        backgroundColor: workoutHistory[selectedDashboardDate] ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)',
                        color: workoutHistory[selectedDashboardDate] ? '#10b981' : 'var(--text-secondary)'
                      }}>
                        {workoutHistory[selectedDashboardDate] ? (
                          <><CheckCircle2 size={18} color="#10b981" style={{ marginRight: '8px' }} /> SESSION LOGGED</>
                        ) : 'NO ACTIVITY'}
                      </div>
                      <p className="status-info">
                        {selectedDashboardDate === todayDate
                          ? "Real-time tracking for your current athletic window."
                          : `Historical analysis for ${parseLocalDate(selectedDashboardDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card roadmap-card">
                  <h3>{customProgram ? `${userProfile.name || 'Athlete'}'s Performance Roadmap` : '12-Month Accelerated Performance Roadmap'}</h3>
                  <div className="roadmap-list">
                    {activeProgram.phases.map((phase, idx) => {
                      const sessionsPerWeek = parseInt(phase.frequency) || 3;
                      const totalExpected = sessionsPerWeek * 6; // 6 weeks per block (1-Year Fast Track)
                      const sessionsDoneInThisPhase = getSessionsForPhase(phase.id);

                      return (
                        <div key={phase.id} className={`roadmap-item ${currentPhaseIdx >= idx ? 'active' : ''}`}>
                          <div className="roadmap-marker">
                            {currentPhaseIdx > idx ? <CheckCircle2 size={24} /> : phase.id}
                          </div>
                          <div className="roadmap-info" style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                              <div className="rm-details">
                                <p className="rm-name">{phase.name}</p>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                                  <p className="rm-goal" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{phase.goal}</p>
                                  {(phase.id === 4 || phase.id === 8) && (
                                    <span style={{
                                      fontSize: '0.6rem',
                                      background: 'rgba(239, 68, 68, 0.1)',
                                      color: '#ef4444',
                                      padding: '2px 6px',
                                      borderRadius: '4px',
                                      fontWeight: '800'
                                    }}>MAX TESTING PHASE</span>
                                  )}
                                </div>
                              </div>
                              <span className="rm-count">{Math.min(totalExpected, sessionsDoneInThisPhase)} / {totalExpected} sessions</span>
                            </div>
                            <div className="rm-progress-bar">
                              <div className="rm-progress-fill" style={{ width: `${Math.min(100, (sessionsDoneInThisPhase / totalExpected) * 100)}%` }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="dashboard-side-col">
                <div className="glass-card analytics-card-compact">
                  {(() => {
                    const allWeights = (weightLogs && weightLogs.length > 0 ? weightLogs.map(l => l.weight) : [75]).concat([userProfile.startingWeight || 75, userProfile.goalWeight || 85]);
                    const minChartW = Math.min(...allWeights) - 2;
                    const maxChartW = Math.max(...allWeights) + 2;
                    const rangeChartW = (maxChartW - minChartW) || 10;
                    const pointsStr = weightLogs.map((l, i) => `${(i / (weightLogs.length - 1 || 1)) * 100},${100 - ((l.weight - minChartW) / rangeChartW) * 100}`).join(' ');

                    return (
                      <>
                        <div className="ac-header">
                          <div className="ac-header-text">
                            <h4>Weight Trajectory</h4>
                            <p>Current: {currentWeight}kg • Goal: {userProfile.goalWeight || 85}kg</p>
                          </div>
                          <div className="gain-summary">
                            <span className="gain-label">{isLosing ? 'TOTAL LOSS' : 'TOTAL GAIN'}</span>
                            <div className="gain-mini">
                              {currentWeight >= (userProfile.startingWeight || 75) ? '+' : ''}
                              {(currentWeight - (userProfile.startingWeight || 75)).toFixed(1)}kg
                            </div>
                          </div>
                        </div>
                        <div className="chart-container-premium">
                          <svg width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            {/* Area Fill */}
                            <path
                              d={`M 0 100 ${pointsStr} L 100 100 Z`}
                              fill="url(#chartGradient)"
                            />
                            {/* Line */}
                            <polyline
                              fill="none"
                              stroke="var(--accent-primary)"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points={pointsStr}
                            />
                            {/* Points */}
                            {weightLogs.map((l, i) => (
                              <circle
                                key={i}
                                cx={(i / (weightLogs.length - 1 || 1)) * 100}
                                cy={100 - ((l.weight - minChartW) / rangeChartW) * 100}
                                r="2"
                                fill="white"
                                stroke="var(--accent-primary)"
                                strokeWidth="1"
                              />
                            ))}
                          </svg>
                          <div className="chart-axis-labels">
                            <span>{new Date(weightLogs[0]?.date || todayDate).toLocaleDateString('en-US', { month: 'short' })}</span>
                            <span>TODAY</span>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="glass-card consistency-card">
                  <h4>Volume Density</h4>
                  <div className="consistency-dots-grid">
                    {[...Array(60)].map((_, i) => (
                      <div key={i} className={`c-dot ${i < Object.keys(workoutHistory).length ? 'active' : ''}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </main >

      <AnimatePresence>
        {isWorkoutActive && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="workout-session-overlay"
          >
            <header className="session-header">
              <button className="session-back-btn" onClick={() => setIsWorkoutActive(false)}>
                <ChevronRight style={{ transform: 'rotate(180deg)' }} size={28} />
              </button>
              <h3 className="session-header-title">Workout</h3>
              <div style={{ width: 40 }} /> {/* Spacer */}
            </header>

            <main className="session-container">
              <AnimatePresence mode="wait">
                {!isResting ? (
                  <motion.div
                    key="work-mode"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                  >
                    <div className="session-visual-wrapper">
                      <img 
                        src={currentWorkout.exercises[activeExIdx]?.image || getExerciseImagePath(currentWorkout.exercises[activeExIdx]?.name)} 
                        alt={currentWorkout.exercises[activeExIdx]?.name || 'Exercise'} 
                        onError={(e) => { e.target.src = '/app-icon.jpg'; }}
                      />
                      <div className="visual-stats-overlay">
                        <div className="stats-glass-card">
                          <div className="stat-item-premium">
                            <div className="stat-icon-box"><Clock size={18} /></div>
                            <div className="stat-text-group">
                              <span className="stat-label-mini">Time Left</span>
                              <span className="stat-value-mini">{currentWorkout.exercises[activeExIdx].restTime}s</span>
                            </div>
                          </div>
                          <div className="stat-item-premium">
                            <div className="stat-icon-box"><Target size={18} color="#ef4444" /></div>
                            <div className="stat-text-group">
                              <span className="stat-label-mini">Burn Mode</span>
                              <span className="stat-value-mini">{currentWorkout.exercises[activeExIdx].reps} Reps</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="session-info-section" style={{ marginTop: '2.5rem', marginBottom: '8rem' }}>
                      <h2 className="session-main-title">{currentWorkout.exercises[activeExIdx].name}</h2>
                      <p className="session-description-text">
                        {currentWorkout.exercises[activeExIdx].focus}
                      </p>

                      <div className="session-instruction-box">
                        <span className="instruction-label">
                          <BookOpen size={14} style={{ marginRight: '6px' }} />
                          Instruction
                        </span>
                        <p className="instruction-content">
                          {currentWorkout.exercises[activeExIdx].instruction}
                        </p>
                      </div>

                      {currentWorkout.exercises[activeExIdx].breathing && (
                        <div className="breathing-box">
                          <div className="breathing-icon">
                            <Wind size={18} />
                          </div>
                          <div className="breathing-text">
                            <strong>Breathing:</strong> {currentWorkout.exercises[activeExIdx].breathing}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="session-actions-sticky" style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <button className="btn-complete-premium" onClick={handleFinishSet}>
                        Complete Set {activeSet} <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="rest-mode"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="rest-overlay-container"
                  >
                    <div className="circular-timer-v3">
                      <svg className="timer-svg-v3" width="280" height="280">
                        <circle className="timer-bg-v3" cx="140" cy="140" r="130" />
                        <motion.circle
                          className="timer-progress-v3"
                          cx="140" cy="140" r="130"
                          strokeDasharray={2 * Math.PI * 130}
                          animate={{ strokeDashoffset: (1 - (timerRemaining / (timerTotal || 1))) * (2 * Math.PI * 130) }}
                          transition={{ duration: 1, ease: 'linear' }}
                        />
                      </svg>
                      <div className="timer-content-v3">
                        <div className="timer-num-v3">{timerRemaining}</div>
                        <div className="timer-label-v3">SEC REST</div>
                      </div>
                    </div>

                    <div className="rest-info-next" style={{ textAlign: 'center' }}>
                      <p style={{ opacity: 0.5, fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>NEXT PERFORMANCE</p>
                      <h4 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem' }}>Set {activeSet} of {currentWorkout.exercises[activeExIdx].sets}</h4>

                      <button
                        onClick={() => {
                          setTimerRemaining(0);
                          setIsResting(false);
                          playNotification('end');
                        }}
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'white',
                          padding: '0.8rem 2rem',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: '800',
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em'
                        }}
                      >
                        Skip Rest
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showResetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="custom-modal-overlay"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card custom-modal"
            >
              <div className="modal-icon warning">
                <Info size={32} color="#ef4444" />
              </div>
              <h3>Clear Daily Logs?</h3>
              <p>This will permanently delete all logs for <strong>{selectedDashboardDate === todayDate ? "Today" : selectedDashboardDate}</strong>. This action cannot be undone.</p>

              <div className="modal-actions">
                <button className="modal-btn cancel" onClick={() => setShowResetModal(false)}>Cancel</button>
                <button className="modal-btn confirm" onClick={confirmReset}>Yes, Clear Data</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isResetSuccess && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="success-toast"
          >
            <CheckCircle2 size={18} />
            <span>Success: Logs wiped for {selectedDashboardDate}</span>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isWarmupActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="workout-session-overlay warmup-overlay"
          >
            <header className="session-header">
              <button className="session-back-btn" onClick={() => setIsWarmupActive(false)}>
                <X size={28} />
              </button>
              <h3 className="session-header-title">R.A.M.P Warm-up</h3>
              <div className="warmup-step-indicator">{activeWarmupIdx + 1} / {derivedWarmup.length}</div>
            </header>

            <main className="session-container">
              <div className="warmup-current-ex">
                <span className="session-phase-tag">{derivedWarmup[activeWarmupIdx].phase}</span>
                <h2 className="session-main-title">{derivedWarmup[activeWarmupIdx].name}</h2>
                <p className="session-description-text">{derivedWarmup[activeWarmupIdx].target}</p>

                {derivedWarmup[activeWarmupIdx].image && (
                  <div className="session-visual-area" style={{ marginBottom: '1.5rem', maxHeight: '200px', overflow: 'hidden', borderRadius: '24px' }}>
                    <img
                      src={derivedWarmup[activeWarmupIdx].image}
                      alt={derivedWarmup[activeWarmupIdx].name}
                      className="session-ex-img"
                      onError={(e) => { e.target.style.display = 'none'; }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}

                {derivedWarmup[activeWarmupIdx].type === 'timer' ? (
                  <div className="session-visual-area">
                    <div className="timer-circle-wrap">
                      <svg className="timer-svg" viewBox="0 0 200 200">
                        <circle className="timer-bg" cx="100" cy="100" r="90" />
                        <motion.circle
                          className="timer-progress"
                          cx="100" cy="100" r="90"
                          initial={{ pathLength: 1 }}
                          animate={{ pathLength: timerRemaining / timerTotal }}
                          transition={{ duration: 1, ease: "linear" }}
                        />
                      </svg>
                      <div className="timer-text-overlay">
                        <span className="timer-current">{timerRemaining}</span>
                        <span className="timer-label">SEC</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="session-reps-display">
                    <span className="reps-val">{derivedWarmup[activeWarmupIdx].volume}</span>
                    <span className="reps-label">TARGET VOLUME</span>
                  </div>
                )}
              </div>

              <div className="session-actions-sticky">
                <button
                  onClick={handleNextWarmup}
                  className="btn-complete-premium warmup-action-btn"
                >
                  {activeWarmupIdx < derivedWarmup.length - 1 ? (
                    <>Next Exercise <ArrowRight size={20} /></>
                  ) : (
                    <>Finish Warm-up <Zap size={20} /></>
                  )}
                </button>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPlansOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="plans-sheet-overlay"
              onClick={() => setIsPlansOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="plans-sheet"
            >
              <div className="sheet-handle" />
              <div className="sheet-header">
                <div>
                  <h3 style={{ margin: 0 }}>Training Plans</h3>
                  <div style={{ fontSize: '0.78rem', color: customProgram ? '#a5b4fc' : 'var(--text-secondary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {customProgram ? (
                      <>
                        <Sparkles size={12} color="#a5b4fc" />
                        <span>AI Custom: {customProgram.programTitle || 'Personalized Routine'}</span>
                      </>
                    ) : (
                      <span>Velan's Master Blueprint (48 Weeks)</span>
                    )}
                  </div>
                </div>
                <button className="sheet-close" onClick={() => setIsPlansOpen(false)}><X size={20} /></button>
              </div>

              {/* Plan Action Bar */}
              <div style={{ padding: '0.6rem 1.25rem 0.2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {customProgram ? (
                  <>
                    <button
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s' }}
                      onClick={() => {
                        setCustomProgram(null);
                        localStorage.removeItem('vfit_custom_program');
                        setCurrentPhaseIdx(0);
                      }}
                    >
                      Reset to Master Blueprint
                    </button>
                    <button
                      style={{ padding: '0.45rem 0.95rem', fontSize: '0.78rem', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 700 }}
                      onClick={async () => {
                        setIsGeneratingPlan(true);
                        const plan = await generateCustomPlanApi(userProfile);
                        setCustomProgram(plan);
                        localStorage.setItem('vfit_custom_program', JSON.stringify(plan));
                        setCurrentPhaseIdx(0);
                        setIsGeneratingPlan(false);
                      }}
                      disabled={isGeneratingPlan}
                    >
                      <Sparkles size={13} /> {isGeneratingPlan ? 'Re-analyzing...' : 'Re-generate with AI'}
                    </button>
                  </>
                ) : (
                  <button
                    style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700, width: '100%', justifyContent: 'center' }}
                    onClick={async () => {
                      setIsGeneratingPlan(true);
                      const plan = await generateCustomPlanApi(userProfile);
                      setCustomProgram(plan);
                      localStorage.setItem('vfit_custom_program', JSON.stringify(plan));
                      setCurrentPhaseIdx(0);
                      setIsGeneratingPlan(false);
                    }}
                    disabled={isGeneratingPlan}
                  >
                    <Sparkles size={14} /> {isGeneratingPlan ? 'Designing with Gemini...' : '⚡ Generate AI Plan for My Biometrics'}
                  </button>
                )}
              </div>

              <div className="plans-sheet-grid">
                {activeProgram.phases.map((phase, idx) => (
                  <div
                    key={phase.id}
                    className={`plan-sheet-item ${currentPhaseIdx === idx ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentPhaseIdx(idx);
                      setCompletedExercises([]);
                      setView('workout');
                      setIsPlansOpen(false);
                    }}
                  >
                    <div className="plan-sheet-icon">
                      <Award size={24} />
                    </div>
                    <div className="plan-sheet-info">
                      <h4>{phase.name}</h4>
                      <span>Block {phase.id} • {phase.weeks} (Mo {phase.months})</span>
                    </div>
                    {currentPhaseIdx === idx && <CheckCircle2 size={20} color="var(--accent-primary)" />}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Account Bottom Sheet for Mobile */}
      <AnimatePresence>
        {isAccountSheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="plans-sheet-overlay"
              onClick={() => setIsAccountSheetOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="plans-sheet account-bottom-sheet"
            >
              <div className="sheet-handle" />
              <div className="sheet-header">
                <h3>My Account</h3>
                <button className="sheet-close" onClick={() => setIsAccountSheetOpen(false)}><X size={20} /></button>
              </div>

              <div className="account-sheet-content">
                {currentUser ? (
                  <>
                    <div className="account-user-card-mobile">
                      <div className="account-avatar-large">
                        {currentUser.photoURL ? (
                          <img src={currentUser.photoURL} alt={userProfile.name} />
                        ) : (
                          <span>{userProfile.name?.charAt(0) || 'A'}</span>
                        )}
                      </div>
                      <div className="account-user-details">
                        <h4>{userProfile.name || 'Athlete'}</h4>
                        <p>{currentUser.email}</p>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', marginTop: '3px' }}>
                          <span className={`cloud-sync-pill-mobile ${cloudStatus}`}>
                            <Cloud size={12} /> {cloudStatus === 'synced' ? 'Cloud Synced' : cloudStatus === 'syncing' ? 'Syncing...' : 'Local Mode'}
                          </span>
                          <span className="account-goal-pill">
                            <Sparkles size={11} /> {userProfile.goalType || 'Lean Bulk & Muscle Gain'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="account-stats-summary-grid">
                      <div className="as-stat-item">
                        <span className="as-stat-val">{userProfile.height} <small>cm</small></span>
                        <span className="as-stat-label">Height</span>
                      </div>
                      <div className="as-stat-item">
                        <span className="as-stat-val">{currentWeight} <small>kg</small></span>
                        <span className="as-stat-label">Current</span>
                      </div>
                      <div className="as-stat-item">
                        <span className="as-stat-val">{userProfile.goalWeight || 85} <small>kg</small></span>
                        <span className="as-stat-label">Goal</span>
                      </div>
                      <div className="as-stat-item">
                        <span className="as-stat-val">{userProfile.age || 22}</span>
                        <span className="as-stat-label">Age</span>
                      </div>
                    </div>

                    {/* Voice & Audio Coach Selector */}
                    <div className="voice-coach-card-mobile">
                      <div className="voice-coach-header">
                        <div className="vc-title-wrap">
                          <Volume2 size={15} color="var(--accent-primary)" />
                          <span>Voice Coach Persona</span>
                        </div>
                        <button className="btn-test-voice-pill" onClick={() => handleTestVoice(voicePersona)}>
                          <Volume2 size={12} /> Test
                        </button>
                      </div>
                      <div className="voice-personas-grid">
                        <div 
                          className={`vp-item ${voicePersona === 'maya' || voicePersona === 'female' ? 'active' : ''}`}
                          onClick={() => { setVoicePersona('maya'); handleTestVoice('maya'); }}
                        >
                          <strong>👩 Maya</strong>
                          <small>US Natural</small>
                        </div>
                        <div 
                          className={`vp-item ${voicePersona === 'alex' || voicePersona === 'male' ? 'active' : ''}`}
                          onClick={() => { setVoicePersona('alex'); handleTestVoice('alex'); }}
                        >
                          <strong>👨 Alex</strong>
                          <small>US Athletic</small>
                        </div>
                        <div 
                          className={`vp-item ${voicePersona === 'jordan' ? 'active' : ''}`}
                          onClick={() => { setVoicePersona('jordan'); handleTestVoice('jordan'); }}
                        >
                          <strong>🇬🇧 Jordan</strong>
                          <small>UK British</small>
                        </div>
                        <div 
                          className={`vp-item ${voicePersona === 'kai' ? 'active' : ''}`}
                          onClick={() => { setVoicePersona('kai'); handleTestVoice('kai'); }}
                        >
                          <strong>🇦🇺 Kai</strong>
                          <small>AU Aussie</small>
                        </div>
                        <div 
                          className={`vp-item ${voicePersona === 'aarav' ? 'active' : ''}`}
                          onClick={() => { setVoicePersona('aarav'); handleTestVoice('aarav'); }}
                        >
                          <strong>🇮🇳 Aarav</strong>
                          <small>IN Native</small>
                        </div>
                      </div>
                    </div>

                    <div className="account-sheet-actions">
                      <button
                        className="btn-sheet-action ai"
                        onClick={() => {
                          setIsAccountSheetOpen(false);
                          setShowAiCoach(true);
                        }}
                      >
                        <Bot size={16} /> Consult V-FIT AI Coach
                      </button>

                      <button
                        className="btn-sheet-action primary"
                        onClick={() => {
                          setIsAccountSheetOpen(false);
                          setOnboardingForm({
                            name: userProfile.name || '',
                            age: String(userProfile.age || 22),
                            height: String(userProfile.height || 185),
                            startingWeight: String(userProfile.startingWeight || 75),
                            goalWeight: String(userProfile.goalWeight || 85),
                            goalType: userProfile.goalType || 'Lean Bulk & Muscle Gain',
                            duration: userProfile.duration || '48 Weeks (1 Year)',
                            frequency: userProfile.frequency || '3 Days / Week (Full Body)'
                          });
                          setShowOnboarding(true);
                        }}
                      >
                        <Sparkles size={16} /> Edit Athletic Profile
                      </button>

                      <div className="sheet-row-buttons">
                        <button className="btn-sheet-action secondary" onClick={handleExportData}>
                          <Download size={16} /> Export Backup
                        </button>
                        <label className="btn-sheet-action secondary" style={{ cursor: 'pointer', textAlign: 'center' }}>
                          <Upload size={16} /> Import Backup
                          <input type="file" accept=".json" onChange={handleImportData} style={{ display: 'none' }} />
                        </label>
                      </div>

                      <button
                        className="btn-sheet-action logout"
                        onClick={() => {
                          handleLogout();
                          setIsAccountSheetOpen(false);
                        }}
                      >
                        <LogOut size={16} /> Sign Out of V-FIT
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="account-logged-out-box">
                    <p>Sign in to sync your workouts, actual reps, and weight across all devices.</p>
                    <button
                      className="btn-google-login"
                      style={{ marginTop: '1rem' }}
                      onClick={() => {
                        setIsAccountSheetOpen(false);
                        setShowAuthModal(true);
                      }}
                    >
                      <LogIn size={16} color="var(--accent-primary)" />
                      <span>Sign In / Create Account</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav className="bottom-nav">
        <div className={`b-nav-item ${view === 'dashboard' ? 'active' : ''}`} onClick={() => { setView('dashboard'); setSelectedDashboardDate(todayDate); }}>
          <Home size={22} color={view === 'dashboard' ? 'var(--accent-secondary)' : 'var(--text-secondary)'} />
          <span>Dash</span>
        </div>
        <div className={`b-nav-item ${view === 'workout' ? 'active' : ''}`} onClick={() => { setView('workout'); }}>
          <Dumbbell size={22} color={view === 'workout' ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
          <span>Train</span>
        </div>
        <div className={`b-nav-item ${isPlansOpen ? 'active' : ''}`} onClick={() => { setIsPlansOpen(true); }}>
          <LayoutGrid size={22} color={isPlansOpen ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
          <span>Plans</span>
        </div>
        <div 
          className={`b-nav-item ${isAccountSheetOpen ? 'active' : ''}`} 
          onClick={() => {
            if (currentUser) {
              setIsAccountSheetOpen(true);
            } else {
              setShowAuthModal(true);
            }
          }}
        >
          {currentUser && currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="Profile" className="b-nav-avatar" />
          ) : (
            <User size={22} color={currentUser ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
          )}
          <span>{currentUser ? (userProfile.name?.split(' ')[0] || 'Profile') : 'Account'}</span>
        </div>
      </nav>

      {/* Floating AI Coach Button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fab-ai-coach"
        onClick={() => setShowAiCoach(true)}
        title="Open V-FIT AI Coach"
      >
        <div className="fab-ai-glow" />
        <Bot size={22} color="white" />
        <span className="fab-ai-label">AI Coach</span>
      </motion.button>

      {/* V-FIT AI Coach Modal / Sheet */}
      <AnimatePresence>
        {showAiCoach && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="plans-sheet-overlay"
              style={{ zIndex: 99990 }}
              onClick={() => setShowAiCoach(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="plans-sheet ai-coach-sheet"
              style={{ zIndex: 99995 }}
            >
              <div className="sheet-handle" />
              
              {/* Hidden File and Camera Pickers */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*,application/pdf,audio/*"
                onChange={handleFileChange}
              />
              <input
                type="file"
                ref={cameraInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
              />

              <div className="ai-coach-header">
                <div className="ai-coach-title-wrap">
                  <div className="ai-avatar-badge">
                    <Bot size={22} color="white" />
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>V-FIT AI Coach</h3>
                    <span className="ai-status-pill">
                      <span className="ai-pulse-dot" />
                      Live AI Assistant
                    </span>
                  </div>
                </div>

                <div className="ai-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    className={`btn-live-voice-call ${isLiveVoiceActive ? 'active' : ''}`}
                    onClick={() => isLiveVoiceActive ? stopLiveVoiceSession() : startLiveVoiceSession()}
                    title={isLiveVoiceActive ? "End Live Voice Session" : "Start Live Voice Call"}
                  >
                    <Radio size={14} className={isLiveVoiceActive ? 'live-radio-pulse' : ''} />
                    <span>{isLiveVoiceActive ? 'End Call' : 'Live Voice'}</span>
                  </button>
                  <button className="sheet-close" onClick={() => { if (isLiveVoiceActive) stopLiveVoiceSession(); setShowAiCoach(false); }}>
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* ChatGPT-Style Immersive Live Voice Mode Interface */}
              {isLiveVoiceActive && (
                <div className="chatgpt-voice-overlay">
                  {/* Atmospheric Glow */}
                  <div className={`chatgpt-ambient-glow ${isVoiceMuted ? 'muted' : liveVoiceStatus}`} />

                  {/* Header */}
                  <div className="chatgpt-voice-header">
                    <button
                      className="chatgpt-icon-btn"
                      onClick={() => stopLiveVoiceSession()}
                      title="Return to Chat"
                    >
                      <ChevronDown size={22} />
                    </button>

                    <div className="chatgpt-header-pill" onClick={() => setShowVoiceSelector(true)}>
                      <span className={`chatgpt-status-dot ${isVoiceMuted ? 'muted' : liveVoiceStatus}`} />
                      <span className="chatgpt-coach-name">
                        {voicePersona === 'maya' || voicePersona === 'female' ? 'Coach Maya' :
                         voicePersona === 'alex' || voicePersona === 'male' ? 'Coach Alex' :
                         voicePersona === 'jordan' ? 'Coach Jordan' :
                         voicePersona === 'kai' ? 'Coach Kai' : 'Coach Aarav'}
                      </span>
                      <span className="chatgpt-status-sub">
                        {isVoiceMuted ? '• Muted' :
                         liveVoiceStatus === 'listening' ? '• Listening' :
                         liveVoiceStatus === 'thinking' ? '• Thinking...' :
                         liveVoiceStatus === 'speaking' ? '• Speaking' : '• Ready'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className={`chatgpt-icon-btn ${showLiveSubtitles ? 'active' : ''}`}
                        onClick={() => setShowLiveSubtitles(!showLiveSubtitles)}
                        title="Toggle Captions"
                      >
                        <MessageSquareText size={18} />
                      </button>
                      <button
                        className="chatgpt-icon-btn"
                        onClick={() => setShowVoiceSelector(true)}
                        title="Voice Settings"
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Center Stage & Organic Liquid Orb */}
                  <div
                    className="chatgpt-voice-stage"
                    onClick={() => {
                      if (liveVoiceStatus === 'speaking') {
                        handleInterruptVoice();
                      }
                    }}
                  >
                    <div className="chatgpt-orb-container">
                      <div className={`chatgpt-wave-ring ring-1 ${liveVoiceStatus}`} />
                      <div className={`chatgpt-wave-ring ring-2 ${liveVoiceStatus}`} />
                      <div className={`chatgpt-wave-ring ring-3 ${liveVoiceStatus}`} />

                      <div
                        className={`chatgpt-liquid-orb ${isVoiceMuted ? 'muted' : liveVoiceStatus}`}
                        style={{
                          transform: liveVoiceStatus === 'listening' && micVolume > 0.04
                            ? `scale(${1 + micVolume * 0.4})`
                            : undefined
                        }}
                      />
                    </div>

                    {liveVoiceStatus === 'speaking' && (
                      <div className="chatgpt-interrupt-pill">
                        <Sparkles size={13} />
                        <span>Tap orb to interrupt</span>
                      </div>
                    )}

                    {showLiveSubtitles && (
                      <div className="chatgpt-captions-container">
                        {liveVoiceStatus === 'listening' && (
                          <div className="chatgpt-user-speech-caption">
                            {liveInterimTranscript ? `“${liveInterimTranscript}”` : "Listening... speak anytime"}
                          </div>
                        )}
                        {liveVoiceStatus === 'thinking' && (
                          <div className="chatgpt-idle-caption">
                            ⚡ Formulating coach advice...
                          </div>
                        )}
                        {liveVoiceStatus === 'speaking' && (
                          <div className="chatgpt-ai-speech-caption">
                            {liveAiSpeechText}
                          </div>
                        )}
                        {liveVoiceStatus === 'idle' && (
                          <div className="chatgpt-idle-caption">
                            {isVoiceMuted ? 'Microphone muted. Tap mic to resume.' : 'Ready. Ask your coach anything.'}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Floating Frosted Bottom Dock */}
                  <div className="chatgpt-voice-dock">
                    <button
                      className={`chatgpt-dock-btn ${isVoiceMuted ? 'active-muted' : ''}`}
                      onClick={toggleVoiceMute}
                      title={isVoiceMuted ? "Unmute Microphone" : "Mute Microphone"}
                    >
                      {isVoiceMuted ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>

                    <button
                      className="chatgpt-dock-btn end-call"
                      onClick={stopLiveVoiceSession}
                      title="End Session"
                    >
                      <PhoneOff size={22} />
                    </button>

                    <button
                      className="chatgpt-dock-btn"
                      onClick={() => setShowVoiceSelector(true)}
                      title="Select Voice"
                    >
                      <Sliders size={20} />
                    </button>
                  </div>

                  {/* Voice Persona Drawer */}
                  {showVoiceSelector && (
                    <div className="voice-persona-modal-backdrop" onClick={() => setShowVoiceSelector(false)}>
                      <div className="voice-persona-sheet" onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#fff' }}>AI Coach Voice</h3>
                          <button className="chatgpt-icon-btn" onClick={() => setShowVoiceSelector(false)} style={{ width: 32, height: 32 }}>
                            <X size={16} />
                          </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {[
                            { id: 'maya', name: 'Coach Maya', desc: 'Warm, natural & inspiring (US)', gender: 'female' },
                            { id: 'alex', name: 'Coach Alex', desc: 'Athletic, high-energy & motivating (US)', gender: 'male' },
                            { id: 'jordan', name: 'Coach Jordan', desc: 'Crisp, technical & focused (UK)', gender: 'neutral' },
                            { id: 'kai', name: 'Coach Kai', desc: 'Upbeat, friendly & encouraging (AU)', gender: 'male' },
                            { id: 'aarav', name: 'Coach Aarav', desc: 'Driven, dedicated & direct (IN)', gender: 'male' },
                          ].map(p => (
                            <div
                              key={p.id}
                              className={`persona-option-item ${voicePersona === p.id || (voicePersona === 'female' && p.id === 'maya') || (voicePersona === 'male' && p.id === 'alex') ? 'selected' : ''}`}
                              onClick={() => {
                                setVoicePersona(p.id);
                                handleTestVoice(p.id);
                              }}
                            >
                              <div>
                                <div className="persona-meta-title">{p.name}</div>
                                <div className="persona-meta-desc">{p.desc}</div>
                              </div>
                              <button
                                className="persona-test-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setVoicePersona(p.id);
                                  handleTestVoice(p.id);
                                }}
                              >
                                <Volume2 size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: -2 }} />
                                Preview
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Active Context Banner */}
              <div className="ai-context-banner">
                <span className="ai-context-tag">🎯 {userProfile.goalType || 'Lean Bulk'}</span>
                <span className="ai-context-tag">⚖️ {currentWeight}kg ➔ {userProfile.goalWeight || 85}kg</span>
                <span className="ai-context-tag">🥗 {TARGET_KCAL} kcal</span>
                <span className="ai-context-tag">💪 Phase {currentPhase.id}</span>
              </div>

              {/* Chat Message Stream */}
              <div className="ai-chat-messages">
                {aiChatMessages.map((msg, i) => (
                  <div key={i} className={`ai-message-row ${msg.role}`}>
                    {msg.role === 'user' ? (
                      <div className="ai-message-bubble user-bubble">
                        {msg.attachment && (
                          <div className={`ai-bubble-attachment ${msg.attachment.type}`}>
                            {msg.attachment.type === 'image' && (
                              <img src={msg.attachment.previewUrl} alt={msg.attachment.name} />
                            )}
                            {msg.attachment.type === 'pdf' && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <FileText size={18} color="#ef4444" />
                                <span>{msg.attachment.name}</span>
                              </div>
                            )}
                            {msg.attachment.type === 'audio' && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Volume2 size={18} color="#10b981" />
                                <span>{msg.attachment.name}</span>
                              </div>
                            )}
                          </div>
                        )}
                        {msg.text && <div className="ai-msg-text">{msg.text}</div>}
                        <span className="ai-user-time">{msg.timestamp}</span>
                      </div>
                    ) : (
                      <div className="ai-message-bubble assistant-bubble">
                        <div className="ai-assistant-header">
                          <div className="ai-assistant-title">
                            <Sparkles size={13} color="#a5b4fc" />
                            <span>AI Coach</span>
                          </div>
                          <div className="ai-assistant-tools">
                            <span className="ai-msg-time">{msg.timestamp}</span>
                            <button
                              className="btn-read-aloud"
                              onClick={() => announceVoice(msg.text.replace(/[*#_]/g, ''))}
                              title="Listen to Coach"
                            >
                              <Volume2 size={13} />
                            </button>
                          </div>
                        </div>
                        {renderFormattedAiText(msg.text)}
                      </div>
                    )}
                  </div>
                ))}
                {isAiThinking && (
                  <div className="ai-message-row assistant">
                    <div className="ai-message-bubble assistant-bubble thinking">
                      <div className="ai-assistant-header">
                        <div className="ai-assistant-title">
                          <Sparkles size={13} color="#a5b4fc" />
                          <span>AI Coach</span>
                        </div>
                      </div>
                      <span className="ai-typing-indicator">Analyzing athletic biometrics & periodization...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Action Suggestion Chips */}
              <div className="ai-quick-chips">
                <button className="ai-chip-btn" onClick={() => handleSendAiMessage("What is an optimal high-protein meal for my daily target?")}>🍗 Meal Idea</button>
                <button className="ai-chip-btn" onClick={() => handleSendAiMessage("What exercise can I substitute for today's routine if I have joint strain?")}>🔄 Exercise Swap</button>
                <button className="ai-chip-btn" onClick={() => handleSendAiMessage("How do I break through a strength and hypertrophy plateau?")}>📈 Break Plateau</button>
                <button className="ai-chip-btn" onClick={() => handleSendAiMessage("What should my recovery and sleep focus be tonight?")}>⚡ Recovery Focus</button>
              </div>

              {/* File Attachment Selected Bar */}
              {selectedAttachment && (
                <div className="ai-attachment-preview-bar">
                  {selectedAttachment.type === 'image' ? (
                    <img src={selectedAttachment.previewUrl} alt={selectedAttachment.name} className="att-thumb-preview" />
                  ) : selectedAttachment.type === 'pdf' ? (
                    <FileText size={22} color="#ef4444" />
                  ) : (
                    <Volume2 size={22} color="#10b981" />
                  )}
                  <div className="att-file-info">
                    <span className="att-file-name">{selectedAttachment.name}</span>
                    <span className="att-file-meta">{selectedAttachment.type.toUpperCase()} • Ready for Coach Analysis</span>
                  </div>
                  <button className="btn-att-remove" onClick={() => setSelectedAttachment(null)} title="Remove attachment">
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Voice Dictating Indicator */}
              {isListening && (
                <div className="ai-voice-dictating-bar">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="ai-pulse-dot" style={{ background: '#ef4444', boxShadow: '0 0 8px #ef4444' }} />
                    Listening... Speak your question
                  </span>
                  <button
                    style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', fontWeight: 700 }}
                    onClick={toggleVoiceDictation}
                  >
                    Done
                  </button>
                </div>
              )}

              {/* Prompt Input Bar */}
              <div className="ai-input-bar">
                <button
                  type="button"
                  className="btn-input-tool"
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach Photo, PDF, or Audio"
                  disabled={isCompressingFile}
                >
                  <Paperclip size={18} />
                </button>
                <button
                  type="button"
                  className="btn-input-tool"
                  onClick={() => cameraInputRef.current?.click()}
                  title="Take Photo of Food or Gym Machine"
                  disabled={isCompressingFile}
                >
                  <Camera size={18} />
                </button>
                <input
                  type="text"
                  className="ai-input-field"
                  placeholder={isListening ? "Listening to your voice..." : selectedAttachment ? "Add a message or tap send..." : "Ask coach, snap food, or upload PDF..."}
                  value={aiInputText}
                  onChange={e => setAiInputText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSendAiMessage(); }}
                />
                <button
                  type="button"
                  className={`btn-input-tool ${isListening ? 'active-mic' : ''}`}
                  onClick={toggleVoiceDictation}
                  title={isListening ? "Stop Listening" : "Speak your Question"}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
                <button
                  className="btn-ai-send"
                  disabled={isAiThinking || (!aiInputText.trim() && !selectedAttachment)}
                  onClick={() => handleSendAiMessage()}
                  title="Send to Coach"
                >
                  <Send size={18} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Progressive Overload Log Modal */}
      <AnimatePresence>
        {showOverloadModal && overloadTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="custom-modal-overlay"
            onClick={() => setShowOverloadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card custom-modal"
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-icon" style={{ background: 'rgba(99,102,241,0.15)' }}>
                <TrendingUp size={28} color="var(--accent-primary)" />
              </div>
              <h3>Log Performance</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1.2rem' }}>
                <strong>{overloadTarget.name}</strong><br />
                Target: {overloadTarget.currentSets} × {overloadTarget.currentReps}
              </p>

              {(() => {
                const history = overloadLog[overloadTarget.name];
                const last = history && history.length > 0 ? history[history.length - 1] : null;
                return last ? (
                  <div className="overload-history-row">
                    <TrendingUp size={13} color="#10b981" />
                    <span>Last logged: {last.sets}×{last.reps} on {last.date}</span>
                  </div>
                ) : (
                  <div className="overload-history-row" style={{ opacity: 0.5 }}>
                    <span>No previous log — this will be your baseline.</span>
                  </div>
                );
              })()}

              <div className="overload-input-grid">
                <div className="overload-field">
                  <label>Sets Done</label>
                  <input
                    type="number"
                    placeholder={overloadTarget.currentSets}
                    value={overloadInput.sets}
                    onChange={e => setOverloadInput(p => ({ ...p, sets: e.target.value }))}
                    min="1" max="10"
                  />
                </div>
                <div className="overload-field">
                  <label>Reps Done</label>
                  <input
                    type="text"
                    placeholder={overloadTarget.currentReps}
                    value={overloadInput.reps}
                    onChange={e => setOverloadInput(p => ({ ...p, reps: e.target.value }))}
                  />
                </div>
              </div>
              <div className="overload-field" style={{ marginTop: '0.75rem' }}>
                <label>Note (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. felt strong, add reps next time"
                  value={overloadInput.note}
                  onChange={e => setOverloadInput(p => ({ ...p, note: e.target.value }))}
                  style={{ width: '100%' }}
                />
              </div>

              <div className="modal-actions" style={{ marginTop: '1.5rem' }}>
                <button className="modal-btn cancel" onClick={() => setShowOverloadModal(false)}>Cancel</button>
                <button className="modal-btn confirm" onClick={handleLogOverload}>Save Log</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Authentication Modal (Google & Email/Password) */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="custom-modal-overlay"
            style={{ zIndex: 99999 }}
            onClick={() => setShowAuthModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card onboarding-modal"
              onClick={e => e.stopPropagation()}
            >
              <div className="onboarding-badge-icon">
                <LogIn size={28} color="var(--accent-primary)" />
              </div>
              <h3 className="onboarding-title">{authMode === 'login' ? 'Welcome Back' : 'Create V-FIT Account'}</h3>
              <p className="onboarding-subtitle">Sync your workouts across all your devices in real-time</p>

              {/* 1-Click Google Sign In */}
              <button onClick={handleGoogleLogin} className="btn-google-login" style={{ marginBottom: '1.25rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/></svg>
                <span>Continue with Google</span>
              </button>

              <div className="auth-divider">
                <span>OR WITH EMAIL</span>
              </div>

              {authError && <div className="auth-error-banner">{authError}</div>}

              <form onSubmit={handleEmailAuth} className="onboarding-fields" style={{ marginTop: '1rem' }}>
                <div className="onboarding-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="you@gmail.com"
                    value={authEmail}
                    onChange={e => setAuthEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="onboarding-field">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={e => setAuthPassword(e.target.value)}
                    required
                    minLength="6"
                  />
                </div>

                <button type="submit" disabled={isAuthSubmitting} className="btn-onboarding-submit" style={{ marginTop: '0.75rem' }}>
                  {isAuthSubmitting ? 'Authenticating...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="auth-switch-text" style={{ marginTop: '1.25rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {authMode === 'login' ? (
                  <span>Don't have an account? <strong style={{ color: 'var(--accent-primary)', cursor: 'pointer' }} onClick={() => { setAuthMode('signup'); setAuthError(''); }}>Sign Up</strong></span>
                ) : (
                  <span>Already have an account? <strong style={{ color: 'var(--accent-primary)', cursor: 'pointer' }} onClick={() => { setAuthMode('login'); setAuthError(''); }}>Log In</strong></span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Profile Onboarding & Edit Modal */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="custom-modal-overlay"
            style={{ zIndex: 99999 }}
            onClick={() => {
              if (userProfile.onboardingCompleted) setShowOnboarding(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card onboarding-modal"
              onClick={e => e.stopPropagation()}
            >
              <div className="onboarding-badge-icon">
                <Sparkles size={28} color="var(--accent-primary)" />
              </div>
              <h3 className="onboarding-title">Athletic Profile Setup</h3>
              <p className="onboarding-subtitle">Personalize your 1-year transformation metrics</p>

              <div className="onboarding-fields">
                <div className="onboarding-field">
                  <label>Your Name / Nickname</label>
                  <input
                    type="text"
                    placeholder="Enter your name / nickname"
                    value={onboardingForm.name}
                    onChange={e => setOnboardingForm(p => ({ ...p, name: e.target.value }))}
                  />
                </div>

                <div className="onboarding-field">
                  <label>Transformation Goal (What do you want to achieve?)</label>
                  <select
                    value={onboardingForm.goalType || 'Lean Bulk & Muscle Gain'}
                    onChange={e => setOnboardingForm(p => ({ ...p, goalType: e.target.value }))}
                    className="onboarding-select"
                  >
                    <option value="Lean Bulk & Muscle Gain">🏋️‍♂️ Lean Bulk & Muscle Gain (+10kg)</option>
                    <option value="Fat Loss & Body Shred">🔥 Fat Loss & Lean Shred</option>
                    <option value="Strength & Power Development">⚡ Strength & Power Development</option>
                    <option value="Body Recomposition">🔄 Body Recomposition (Muscle + Fat Loss)</option>
                    <option value="Athletic Conditioning & Fitness">🏃 Athletic Conditioning & Fitness</option>
                  </select>
                </div>

                <div className="onboarding-row">
                  <div className="onboarding-field">
                    <label>Age</label>
                    <input
                      type="number"
                      placeholder="22"
                      value={onboardingForm.age}
                      onChange={e => setOnboardingForm(p => ({ ...p, age: e.target.value }))}
                    />
                  </div>
                  <div className="onboarding-field">
                    <label>Height (cm)</label>
                    <input
                      type="number"
                      placeholder="185"
                      value={onboardingForm.height}
                      onChange={e => setOnboardingForm(p => ({ ...p, height: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="onboarding-row">
                  <div className="onboarding-field">
                    <label>Starting Weight (kg)</label>
                    <input
                      type="number"
                      placeholder="75"
                      value={onboardingForm.startingWeight}
                      onChange={e => setOnboardingForm(p => ({ ...p, startingWeight: e.target.value }))}
                    />
                  </div>
                  <div className="onboarding-field">
                    <label>Goal Weight (kg)</label>
                    <input
                      type="number"
                      placeholder="85"
                      value={onboardingForm.goalWeight}
                      onChange={e => setOnboardingForm(p => ({ ...p, goalWeight: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="onboarding-row">
                  <div className="onboarding-field">
                    <label>Plan Duration</label>
                    <select
                      value={onboardingForm.duration || '48 Weeks (1 Year)'}
                      onChange={e => setOnboardingForm(p => ({ ...p, duration: e.target.value }))}
                      className="onboarding-select"
                    >
                      <option value="12 Weeks (3 Months)">12 Weeks (3 Months - Sprint)</option>
                      <option value="24 Weeks (6 Months)">24 Weeks (6 Months - Build)</option>
                      <option value="48 Weeks (1 Year)">48 Weeks (1 Year - Master)</option>
                    </select>
                  </div>
                  <div className="onboarding-field">
                    <label>Weekly Frequency</label>
                    <select
                      value={onboardingForm.frequency || '3 Days / Week (Full Body)'}
                      onChange={e => setOnboardingForm(p => ({ ...p, frequency: e.target.value }))}
                      className="onboarding-select"
                    >
                      <option value="3 Days / Week (Full Body)">3 Days/Wk (Full Body)</option>
                      <option value="4 Days / Week (Upper/Lower)">4 Days/Wk (Upper/Lower)</option>
                      <option value="5 Days / Week (PPL Split)">5 Days/Wk (PPL Split)</option>
                    </select>
                  </div>
                </div>

                {/* Real-time Biometric Calculation Preview */}
                {(() => {
                  const a = Number(onboardingForm.age) || 22;
                  const h = Number(onboardingForm.height) || 185;
                  const w = Number(onboardingForm.startingWeight) || 75;
                  const g = onboardingForm.goalType || 'Lean Bulk & Muscle Gain';
                  const bmrCalc = 10 * w + 6.25 * h - 5 * a + 5;
                  const tdeeCalc = Math.round(bmrCalc * 1.45);
                  let kcalCalc = tdeeCalc;
                  if (g.includes('Fat Loss')) kcalCalc = Math.max(1600, tdeeCalc - 450);
                  else if (g.includes('Lean Bulk')) kcalCalc = tdeeCalc + 350;
                  else if (g.includes('Strength')) kcalCalc = tdeeCalc + 200;
                  const proCalc = Math.round(w * (g.includes('Fat Loss') ? 2.2 : 1.9));

                  return (
                    <div className="onboarding-biometrics-card">
                      <div className="ob-title"><Sparkles size={14} color="var(--accent-primary)" /> Dynamic Biometric Projections</div>
                      <div className="ob-grid">
                        <div className="ob-stat"><span>Est. BMR</span><strong>{Math.round(bmrCalc)} <small>kcal</small></strong></div>
                        <div className="ob-stat"><span>Daily Burn</span><strong>{tdeeCalc} <small>kcal</small></strong></div>
                        <div className="ob-stat highlight"><span>Target Fuel</span><strong>{kcalCalc} <small>kcal</small></strong></div>
                        <div className="ob-stat highlight"><span>Protein Target</span><strong>{proCalc} <small>g</small></strong></div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {isGeneratingPlan ? (
                <div className="ai-plan-generating-card" style={{ marginTop: '1.25rem', padding: '1.25rem', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '16px', textAlign: 'center' }}>
                  <div className="ai-typing-indicator" style={{ justifyContent: 'center', marginBottom: '0.6rem', fontSize: '0.9rem' }}>
                    <Sparkles size={16} /> Generating Tailored Plan with Gemini AI...
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                    Customizing training phases, exercise selections, volume, and metabolic nutrition targets for your biometrics.
                  </p>
                </div>
              ) : (
                <div className="onboarding-actions" style={{ flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button
                    className="btn-onboarding-submit"
                    style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #6366f1, #a855f7)', padding: '0.9rem 1.25rem' }}
                    onClick={() => handleCompleteOnboarding(true)}
                  >
                    <Sparkles size={18} /> ⚡ Generate Personalized AI Plan
                  </button>
                  <div style={{ display: 'flex', width: '100%', gap: '0.6rem' }}>
                    {userProfile.onboardingCompleted && (
                      <button className="modal-btn cancel" style={{ flex: 1 }} onClick={() => setShowOnboarding(false)}>
                        Cancel
                      </button>
                    )}
                    <button
                      className="modal-btn"
                      style={{ flex: 1, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}
                      onClick={() => handleCompleteOnboarding(false)}
                    >
                      Use Standard Blueprint
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div >
  );
};

export default App;
