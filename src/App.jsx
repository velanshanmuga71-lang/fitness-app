import React, { useState, useEffect } from 'react';
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
  Cloud
} from 'lucide-react';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { motion, AnimatePresence } from 'framer-motion';
import { programData } from './data/program';
import { saveToCloud, loadFromCloud } from './firebase';
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

const App = () => {
  const [view, setView] = useState('workout'); // 'workout' or 'dashboard'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlansOpen, setIsPlansOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { msg: "Good Morning, Velan", icon: <Sun size={24} className="greeting-icon-sun" />, quote: "Let's start building.", color: "var(--color-greeting-morning)" };
    if (hour < 18) return { msg: "Good Afternoon, Velan", icon: <Sun size={24} className="greeting-icon-sun" />, quote: "Stay focused.", color: "var(--color-greeting-morning)" };
    return { msg: "Good Evening, Velan", icon: <Moon size={24} className="greeting-icon-moon" />, quote: "Finish the day strong.", color: "var(--color-greeting-evening)" };
  };

  const greeting = getGreeting();

  // Dynamic Nutrition Targets based on Phase
  const phaseNutrition = programData.phases[currentPhaseIdx]?.nutrition || { kcal: 2800, pro: 165, carb: 355, fat: 80 };
  const TARGET_KCAL = phaseNutrition.kcal;
  const TARGET_PRO = phaseNutrition.pro;
  const TARGET_CARB = phaseNutrition.carb;
  const TARGET_FAT = phaseNutrition.fat;

  // Persistence states
  const [workoutHistory, setWorkoutHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('workoutHistory')) || {};
  });

  // Progressive Overload Log: { "ExerciseName": [{ date, reps, sets, note }] }
  const [overloadLog, setOverloadLog] = useState(() => {
    return JSON.parse(localStorage.getItem('overloadLog')) || {};
  });
  const [showOverloadModal, setShowOverloadModal] = useState(false);
  const [overloadTarget, setOverloadTarget] = useState(null); // { name, currentReps, currentSets }
  const [overloadInput, setOverloadInput] = useState({ reps: '', sets: '', note: '' });

  // Custom Modal State
  const [showResetModal, setShowResetModal] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [weightLogs, setWeightLogs] = useState(() => {
    const existing = localStorage.getItem('weightLogs');
    return existing ? JSON.parse(existing) : [{ date: new Date().toISOString().split('T')[0], weight: 75 }];
  });
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
  const [activeExIdx, setActiveExIdx] = useState(0);
  const [activeSet, setActiveSet] = useState(1);
  const [timerRemaining, setTimerRemaining] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timerTotal, setTimerTotal] = useState(0);

  const announceVoice = async (text) => {
    try {
      await TextToSpeech.stop();
      await TextToSpeech.speak({
        text: text,
        lang: 'en-US',
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient',
      });
    } catch (e) {
      // Fallback for Web/Browser
      if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance();
        msg.text = text;
        msg.rate = 0.95; // Slightly slower for a more natural, less "hard" feel
        msg.pitch = 1.05; // Slightly higher pitch for a clearer female-leaning tone
        msg.volume = 1.0;

        window.speechSynthesis.cancel();

        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          // Look for common female/natural voice names
          const femaleVoice = voices.find(v =>
            (v.name.toLowerCase().includes('female') ||
              v.name.toLowerCase().includes('google us english') ||
              v.name.toLowerCase().includes('samantha') ||
              v.name.toLowerCase().includes('victoria')) &&
            v.lang.startsWith('en')
          );
          if (femaleVoice) msg.voice = femaleVoice;
        }
        window.speechSynthesis.speak(msg);
      }
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

  // Cloud Sync State
  const [cloudStatus, setCloudStatus] = useState('syncing'); // 'synced' | 'syncing' | 'offline'

  // Initial Cloud Sync: Fetch from Firebase Firestore on startup
  useEffect(() => {
    let isMounted = true;
    const fetchCloudBackup = async () => {
      try {
        const cloudData = await loadFromCloud();
        if (!isMounted) return;
        if (cloudData) {
          if (cloudData.workoutHistory) setWorkoutHistory(cloudData.workoutHistory);
          if (cloudData.weightLogs && Array.isArray(cloudData.weightLogs)) setWeightLogs(cloudData.weightLogs);
          if (cloudData.nutritionHistory) setNutritionHistory(cloudData.nutritionHistory);
          if (cloudData.dailyStats) setDailyStats(cloudData.dailyStats);
          if (cloudData.warmupCompleted) setWarmupCompleted(cloudData.warmupCompleted);
          if (cloudData.overloadLog) setOverloadLog(cloudData.overloadLog);
          if (cloudData.currentPhaseIdx !== undefined) setCurrentPhaseIdx(cloudData.currentPhaseIdx);
          setCloudStatus('synced');
        } else {
          // If Firestore is empty, seed it with current local state
          await saveToCloud({
            workoutHistory,
            weightLogs,
            nutritionHistory,
            dailyStats,
            warmupCompleted,
            overloadLog,
            currentPhaseIdx
          });
          setCloudStatus('synced');
        }
      } catch (err) {
        setCloudStatus('offline');
      }
    };
    fetchCloudBackup();
    return () => { isMounted = false; };
  }, []);

  // Auto-Sync to Firebase whenever state changes
  useEffect(() => {
    const syncTimer = setTimeout(async () => {
      setCloudStatus('syncing');
      const isSaved = await saveToCloud({
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
  }, [workoutHistory, weightLogs, nutritionHistory, dailyStats, warmupCompleted, overloadLog, currentPhaseIdx]);

  const currentWeight = weightLogs[weightLogs.length - 1].weight;
  const lastWeightDate = weightLogs[weightLogs.length - 1].date;
  const isWeighInDue = (new Date() - new Date(lastWeightDate)) / (1000 * 60 * 60 * 24) >= 7;

  const getWorkoutByDay = (dateObj) => {
    const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const phase = programData.phases[currentPhaseIdx];

    if (phase.restDays && phase.restDays.includes(weekday)) {
      return {
        name: "Rest & Active Recovery",
        isRest: true,
        recovery: phase.recovery || "20-30 min Zone 2 Walk + Mobility",
        exercises: []
      };
    }

    if (phase.id === 4) {
      const mapping = { "Monday": 0, "Tuesday": 1, "Thursday": 2, "Friday": 3, "Saturday": 4 };
      if (mapping[weekday] !== undefined) return phase.workouts[mapping[weekday]];
    }

    const workout = phase.workouts.find(w => w.days && w.days.includes(weekday));
    return workout || { name: "Rest Day", isRest: true, exercises: [] };
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
        image: firstMainEx.image, // Use the image from the actual first exercise
        target: `Light set of ${firstMainEx.name} to potentiate CNS`,
        volume: "1 set x 15 reps (Light Weight)"
      };
    }
    return ex;
  });

  const tomorrowWorkout = getWorkoutByDay(tomorrowObj);
  const currentPhase = programData.phases[currentPhaseIdx];

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

  const progress = currentWorkout.isRest ? 100 : (completedExercises.length / (currentWorkout.exercises?.length || 1)) * 100;
  const weightProgress = ((currentWeight - 75) / (85 - 75)) * 100;

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
            {programData.phases.map((phase, idx) => (
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
                                    {ex.image ? (
                                      <img src={ex.image} alt={ex.name} />
                                    ) : (
                                      <img src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${ex.name.toLowerCase().replace(/ /g, '_')}/0.jpg`} alt={ex.name} onError={(e) => { e.target.src = '/app-icon.jpg'; }} />
                                    )}
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
                      <div><h4 className="weight-title-new">Body Weight</h4><p className="weight-subtitle-new">Goal: 85.0 kg</p></div>
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
                      <div className="progress-labels"><span>75kg</span><span>{weightProgress.toFixed(0)}% to target</span><span>85kg</span></div>
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
                  <h3>12-Month Accelerated Performance Roadmap</h3>
                  <div className="roadmap-list">
                    {programData.phases.map((phase, idx) => {
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
                  <div className="ac-header">
                    <div className="ac-header-text">
                      <h4>Weight Trajectory</h4>
                      <p>Current: {currentWeight}kg • Goal: 85kg</p>
                    </div>
                    <div className="gain-summary">
                      <span className="gain-label">TOTAL GAIN</span>
                      <div className="gain-mini">+{(currentWeight - 75).toFixed(1)}kg</div>
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
                        d={`M 0 100 ${weightLogs.map((l, i) => `${(i / (weightLogs.length - 1 || 1)) * 100},${100 - ((l.weight - 70) / 20) * 100}`).join(' ')} L 100 100 Z`}
                        fill="url(#chartGradient)"
                      />
                      {/* Line */}
                      <polyline
                        fill="none"
                        stroke="var(--accent-primary)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={weightLogs.map((l, i) => `${(i / (weightLogs.length - 1 || 1)) * 100},${100 - ((l.weight - 70) / 20) * 100}`).join(' ')}
                      />
                      {/* Points */}
                      {weightLogs.map((l, i) => (
                        <circle
                          key={i}
                          cx={(i / (weightLogs.length - 1 || 1)) * 100}
                          cy={100 - ((l.weight - 70) / 20) * 100}
                          r="2"
                          fill="white"
                          stroke="var(--accent-primary)"
                          strokeWidth="1"
                        />
                      ))}
                    </svg>
                    <div className="chart-axis-labels">
                      <span>{new Date(weightLogs[0].date).toLocaleDateString('en-US', { month: 'short' })}</span>
                      <span>TODAY</span>
                    </div>
                  </div>
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
                      <img src={currentWorkout.exercises[activeExIdx].image} alt={currentWorkout.exercises[activeExIdx].name} />
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
                <h3>Training Plans</h3>
                <button className="sheet-close" onClick={() => setIsPlansOpen(false)}><X size={20} /></button>
              </div>
              <div className="plans-sheet-grid">
                {programData.phases.map((phase, idx) => (
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
      </nav>

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

    </div >
  );
};

export default App;
