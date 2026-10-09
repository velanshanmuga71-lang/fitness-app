const fs = require('fs');

const phase5 = {
    id: 5,
    name: "Compound Hybrid Load",
    months: "13-15",
    goal: "Transition to Absolute Strength. Spike testosterone via heavy compound lifts.",
    frequency: "3 days/week (Mon, Tue, Thu)",
    restBetweenExercises: 120,
    workouts: [
        {
            name: "Hybrid Push",
            days: ["Monday"],
            exercises: [
                {
                    name: "Barbell Bench Press",
                    sets: 3,
                    reps: "10",
                    restTime: 120,
                    focus: "Absolute Strength",
                    image: "/Exercise images/Barbell Bench Press.gif",
                    instruction: "Lie flat on the bench with feet firmly planted. Grip the bar slightly wider than shoulder-width. Lower the bar slowly to your mid-chest while keeping elbows at a 45-degree angle. Pause briefly when the bar hovers 2 inches above your chest, then explosively push upward until arms are straight.",
                    breathing: "Inhale deeply during the lowering (eccentric) phase; exhale forcefully during the upward (concentric) press."
                },
                {
                    name: "Dumbbell Incline Press",
                    sets: 3,
                    reps: "10",
                    restTime: 120,
                    focus: "Upper Pecs",
                    image: "/Exercise images/Dumbbell Incline Press.gif",
                    instruction: "Set your bench to a 30-45 degree angle. Hold dumbbells at chest level with elbows directly under wrists. Press upward in a slight arc until arms are straight. Lower under control to the upper chest.",
                    breathing: "Inhale as you lower the weights; exhale as you press them up."
                },
                {
                    name: "Barbell Overhead Press",
                    sets: 3,
                    reps: "10",
                    restTime: 120,
                    focus: "Shoulder Mass",
                    image: "/Exercise images/Barbell Overhead Press.gif",
                    instruction: "Stand with the bar racked at shoulder height, hands just outside shoulders. Bracing your glutes and core, press the bar in a straight vertical line until your elbows are locked. Shrug your shoulders toward the ceiling at the top to protect the joints.",
                    breathing: "Inhale and brace at the bottom; exhale as you press the weight overhead. For maximal loads, use a brief Valsalva hold during the initial push."
                },
                {
                    name: "Dumbbell Lateral Raise",
                    sets: 3,
                    reps: "10",
                    restTime: 90,
                    focus: "Side Delts",
                    image: "/Exercise images/Dumbbell Lateral Raise.gif",
                    instruction: "Stand tall with weights at your sides. With a slight bend in the elbows, raise the dumbbells out to your sides until they reach shoulder height. Ensure your thumbs stay slightly higher than your pinkies to target the lateral deltoid.",
                    breathing: "Exhale as you lift the weights; inhale as you lower them slowly."
                },
                {
                    name: "Weighted Dips",
                    sets: 3,
                    reps: "10",
                    restTime: 120,
                    focus: "Triceps/Chest",
                    image: "/Exercise images/Dips.gif",
                    instruction: "Suspend yourself over parallel bars. Lower your body until shoulders are below elbows. Push back up. Add weight via a belt or holding a dumbbell between feet.",
                    breathing: "Inhale down, Exhale up."
                },
                {
                    name: "Dumbbell Tricep Extensions",
                    sets: 3,
                    reps: "10",
                    restTime: 90,
                    focus: "Tricep Isolation",
                    image: "/Exercise images/DB Tricep Extension.gif",
                    instruction: "Hold a dumbbell overhead with both hands. Lower it behind your head by bending your elbows, then extend back up.",
                    breathing: "Inhale down, Exhale up."
                }
            ]
        },
        {
            name: "Hybrid Pull",
            days: ["Tuesday"],
            exercises: [
                {
                    name: "Weighted Pull-Ups",
                    sets: 3,
                    reps: "10",
                    restTime: 120,
                    focus: "Back Width",
                    image: "/Exercise images/Pull Ups.gif",
                    instruction: "Hang from a bar with hands wider than shoulders. Pull your chin over the bar. Add weight vest or belt.",
                    breathing: "Exhale up, Inhale down."
                },
                {
                    name: "Barbell Row",
                    sets: 3,
                    reps: "10",
                    restTime: 120,
                    focus: "Back Thickness",
                    image: "/Exercise images/Barbell Row.gif",
                    instruction: "Hinge at the hips so your torso is nearly parallel to the floor, knees slightly bent. Grip the bar with an overhand grip. Pull the bar toward your lower chest/ribcage by retracting your shoulder blades. Squeeze hard at the top before lowering with control.",
                    breathing: "Inhale as you lower the bar; exhale as you pull the weight toward your body."
                },
                {
                    name: "One-Arm Dumbbell Row",
                    sets: 3,
                    reps: "10",
                    restTime: 90,
                    focus: "Unilateral Lats",
                    image: "/Exercise images/One Arm DB Row.gif",
                    instruction: "Place one knee and hand on a bench. Pull a dumbbell from the floor to your hip with the free hand, keeping your back flat.",
                    breathing: "Exhale up, Inhale down."
                },
                {
                    name: "Dumbbell Hammer Curls",
                    sets: 3,
                    reps: "10",
                    restTime: 90,
                    focus: "Brachialis",
                    image: "/Exercise images/Hammer Curls.gif",
                    instruction: "Stand holding dumbbells with palms facing your body. Curl weights up keeping palms facing each other.",
                    breathing: "Exhale up, Inhale down."
                },
                {
                    name: "Hand Gripper",
                    sets: 3,
                    reps: "15",
                    restTime: 60,
                    focus: "Forearm Crush",
                    image: "/Exercise images/Hand Gripper.jpg",
                    instruction: "Squeeze the handles together until they touch. Hold the closed position for 2 seconds, focusing on maximal tension in the forearm. Release slowly over a 3-second count.",
                    breathing: "Maintain a steady, rhythmic diaphragmatic breathing pattern throughout the set."
                }
            ]
        },
        {
            name: "Hybrid Legs",
            days: ["Thursday"],
            exercises: [
                {
                    name: "Barbell Back Squat",
                    sets: 3,
                    reps: "12",
                    restTime: 150,
                    focus: "Leg Mass",
                    image: "/Exercise images/Barbell Squat.gif",
                    instruction: "Rack the bar on your upper trapezius. Stand with feet shoulder-width apart and toes pointed slightly outward. Lower your hips until thighs are at least parallel to the floor, keeping your spine neutral and chest up. Drive through your heels to return to a standing position.",
                    breathing: "Take a deep diaphragmatic breath at the top and brace your core (Valsalva maneuver); hold this breath through the descent and the initial drive upward. Exhale only after passing the 'sticking point' or returning to the top."
                },
                {
                    name: "Bulgarian Split Squat",
                    sets: 3,
                    reps: "12 per leg",
                    restTime: 120,
                    focus: "Unilateral Quads",
                    image: "/Exercise images/Bulgarian-split-squat.jpg",
                    instruction: "Stand on one leg with the other foot rested on a bench behind you. Lower your hips until your front thigh is parallel to the ground. Keep your torso upright and drive back up through the front heel.",
                    breathing: "Inhale as you descend; exhale as you drive back up to standing."
                },
                {
                    name: "Barbell RDL",
                    sets: 3,
                    reps: "12",
                    restTime: 120,
                    focus: "Hamstrings/Glutes",
                    image: "/Exercise images/Barbell RDL.gif",
                    instruction: "Hold bar at hips. Hinge back, sliding bar down legs until you feel a deep hamstring stretch. Keep back flat. Squeeze glutes to stand.",
                    breathing: "Inhale down, Exhale up."
                },
                {
                    name: "Nordic Hamstring Negatives",
                    sets: 3,
                    reps: "12",
                    restTime: 120,
                    focus: "Eccentric Hamstring",
                    image: "/Exercise images/Nordic Curl Eccentrics.webp",
                    instruction: "Kneel with your ankles anchored under a weighted barbell. Keeping a straight line from knees to shoulders, lower your torso forward as slowly as possible. Catch yourself with your hands when you can no longer hold the weight.",
                    breathing: "Inhale during the 4-5 second slow descent (eccentric phase); exhale as you push back up to reset."
                },
                {
                    name: "Calf Raises",
                    sets: 3,
                    reps: "12",
                    restTime: 90,
                    focus: "Calves",
                    image: "/Exercise images/Calf Raises.jpg",
                    instruction: "Stand on edge of step, lower heels down, raise up high on toes.",
                    breathing: "Exhale up, Inhale down."
                }
            ]
        }
    ],
    restDays: ["Wednesday", "Friday", "Saturday", "Sunday"],
    nutrition: { kcal: 3250, pro: 170, carb: 450, fat: 85 }
};

const phase6 = {
    id: 6,
    name: "Mechanical Overload",
    months: "16-18",
    goal: "Increase myofibrillar density (muscle 'hardness'). Use Double Progression.",
    frequency: "3 days/week (Mon, Tue, Thu)",
    restBetweenExercises: 120,
    workouts: [
        {
            name: "Power Push",
            days: ["Monday"],
            exercises: [
                {
                    name: "Barbell Bench Press",
                    sets: 5,
                    reps: "5",
                    restTime: 180,
                    focus: "Power",
                    image: "/Exercise images/Barbell Bench Press.gif",
                    instruction: "Lie flat on the bench with feet firmly planted. Grip the bar slightly wider than shoulder-width. Lower the bar slowly to your mid-chest while keeping elbows at a 45-degree angle. Pause briefly when the bar hovers 2 inches above your chest, then explosively push upward until arms are straight.",
                    breathing: "Inhale deeply during the lowering (eccentric) phase; exhale forcefully during the upward (concentric) press."
                },
                {
                    name: "Weighted Pike Push-Ups",
                    sets: 5,
                    reps: "5",
                    restTime: 120,
                    focus: "Shoulder Strength",
                    image: "/Exercise images/Pike Push Ups.png",
                    instruction: "Downward dog position. Lower head to floor. Wear weight vest or balance plate on back.",
                    breathing: "Inhale down, Exhale up."
                },
                {
                    name: "Dumbbell Arnold Press",
                    sets: 5,
                    reps: "5",
                    restTime: 120,
                    focus: "Shoulder Range",
                    image: "/Exercise images/Arnold Press.gif",
                    instruction: "Seated. Start with palms facing you. Press up while rotating palms out. Reverse on way down.",
                    breathing: "Exhale up, Inhale down."
                },
                {
                    name: "Dumbbell Chest Flyes",
                    sets: 5,
                    reps: "5",
                    restTime: 120,
                    focus: "Chest Stretch",
                    image: "/Exercise images/DB Flyes.gif",
                    instruction: "Lie flat on a bench. Lower the weights out to your sides in a wide arc until you feel a deep stretch in your chest (maintain a 15-degree elbow bend). Use your chest muscles to bring the weights back together over your mid-line.",
                    breathing: "Inhale during the opening (eccentric) arc; exhale as you close the arc."
                },
                {
                    name: "Dips",
                    sets: 5,
                    reps: "5",
                    restTime: 120,
                    focus: "Triceps/Chest",
                    image: "/Exercise images/Dips.gif",
                    instruction: "Dip down until shoulders below elbows. Push up to lockout.",
                    breathing: "Inhale down, Exhale up."
                }
            ]
        },
        {
            name: "Power Pull",
            days: ["Tuesday"],
            exercises: [
                {
                    name: "Weighted Pull-Ups",
                    sets: 5,
                    reps: "5",
                    restTime: 180,
                    focus: "Lat Power",
                    image: "/Exercise images/Pull Ups.gif",
                    instruction: "Weighted pullups. Full ROM.",
                    breathing: "Exhale up, Inhale down."
                },
                {
                    name: "Barbell Yates Row",
                    sets: 5,
                    reps: "5",
                    restTime: 120,
                    focus: "Upper Back",
                    image: "/Exercise images/Barbell Row.gif",
                    instruction: "Reverse grip (underhand) row. Torso slightly more upright (45 degrees). Pull to lower belly.",
                    breathing: "Inhale down, Exhale up."
                },
                {
                    name: "Dumbbell Incline Curls",
                    sets: 4,
                    reps: "8",
                    restTime: 90,
                    focus: "Bicep Peak",
                    image: "/Exercise images/Incline Curls.gif",
                    instruction: "Seated on incline bench. Curl DBs with full stretch at bottom.",
                    breathing: "Exhale up, Inhale down."
                },
                {
                    name: "Reverse Snow Angels",
                    sets: 4,
                    reps: "8",
                    restTime: 90,
                    focus: "Rear Delts",
                    image: "/Exercise images/Reverse Snow Angels.gif",
                    instruction: "Face down on ground/bench. Move arms from hips to overhead in wide arc.",
                    breathing: "Nasal breathing."
                },
                {
                    name: "Hand Gripper",
                    sets: 3,
                    reps: "15",
                    restTime: 60,
                    focus: "Grip",
                    image: "/Exercise images/Hand Gripper.jpg",
                    instruction: "Squeeze the handles together until they touch. Hold the closed position for 2 seconds. Release slowly.",
                    breathing: "Steady breathing."
                }
            ]
        },
        {
            name: "Power Legs",
            days: ["Thursday"],
            exercises: [
                {
                    name: "Barbell Deadlift",
                    sets: 3,
                    reps: "5",
                    restTime: 180,
                    focus: "Posterior Chain",
                    image: "/Exercise images/Deadlift.gif",
                    instruction: "Stand with feet hip-width apart and the bar over your mid-foot. Hinge at the hips and bend knees to grip the bar. Keeping a flat back and engaged lats, pull the bar up by extending your hips and knees simultaneously. Stand tall without leaning back at the top.",
                    breathing: "Inhale and brace your core hard at the bottom before lifting. Hold your breath through the most strenuous part of the lift. Exhale at the top."
                },
                {
                    name: "Barbell Back Squat",
                    sets: 5,
                    reps: "5",
                    restTime: 180,
                    focus: "Leg Power",
                    image: "/Exercise images/Barbell Squat.gif",
                    instruction: "Rack the bar on your upper trapezius. Lower hips until thighs parallel. Drive up.",
                    breathing: "Deep breath and brace at top. Exhale at top."
                },
                {
                    name: "Dumbbell Walking Lunges",
                    sets: 3,
                    reps: "5 per leg",
                    restTime: 120,
                    focus: "Dynamic Legs",
                    image: "/Exercise images/Walking Lunges.gif",
                    instruction: "Hold DBs. Lunge forward continuously.",
                    breathing: "Rhythmic."
                },
                {
                    name: "L-Sit Practice",
                    sets: 3,
                    reps: "Failure",
                    restTime: 90,
                    focus: "Core",
                    image: "/Exercise images/L-Sits.webp",
                    instruction: "Hold L-Sit position as long as possible.",
                    breathing: "Short sips of air."
                }
            ]
        }
    ],
    restDays: ["Wednesday", "Friday", "Saturday", "Sunday"],
    nutrition: { kcal: 3150, pro: 175, carb: 420, fat: 85 }
};

const phase7 = {
    id: 7,
    name: "Functional Definition",
    months: "19-21",
    goal: "Aesthetic 'Superhero' symmetry. Target lateral delts and upper pecs with adjustable plates.",
    frequency: "4 days/week (Mon, Tue, Thu, Fri)",
    restBetweenExercises: 90,
    workouts: [
        {
            name: "Upper Sculpt A",
            days: ["Monday"],
            exercises: [
                {
                    name: "Dumbbell Incline Press",
                    sets: 4,
                    reps: "12",
                    restTime: 60,
                    focus: "Upper Pecs",
                    image: "/Exercise images/Dumbbell Incline Press.gif",
                    instruction: "Set your bench to a 30-45 degree angle. Hold dumbbells at chest level with elbows directly under wrists. Press upward in a slight arc until arms are straight. Lower under control to the upper chest.",
                    breathing: "Inhale as you lower the weights; exhale as you press them up."
                },
                {
                    name: "Dumbbell Lateral Raise",
                    sets: 4,
                    reps: "12",
                    restTime: 60,
                    focus: "Side Delt",
                    image: "/Exercise images/Dumbbell Lateral Raise.gif",
                    instruction: "Stand tall with weights at your sides. With a slight bend in the elbows, raise the dumbbells out to your sides until they reach shoulder height. Ensure your thumbs stay slightly higher than your pinkies to target the lateral deltoid.",
                    breathing: "Exhale as you lift the weights; inhale as you lower them slowly."
                },
                {
                    name: "Dumbbell Rear Delt Fly",
                    sets: 4,
                    reps: "12",
                    restTime: 60,
                    focus: "Rear Delt",
                    image: "/Exercise images/Rear Delt Fly.gif",
                    instruction: "Hinge at hips, flat back. Fly DBs out to side focusing on rear delts.",
                    breathing: "Exhale up, Inhale down."
                },
                {
                    name: "Close-Grip Push-Ups",
                    sets: 4,
                    reps: "12",
                    restTime: 60,
                    focus: "Triceps/Inner Chest",
                    image: "/Exercise images/Diamond Push-Ups.png",
                    instruction: "Hands close together. Keep elbows tucked.",
                    breathing: "Inhale down, Exhale up."
                }
            ]
        },
        {
            name: "Back Density",
            days: ["Tuesday"],
            exercises: [
                {
                    name: "Barbell Clean",
                    sets: 4,
                    reps: "10",
                    restTime: 60,
                    focus: "Power",
                    image: "/Exercise images/Barbell Clean.gif",
                    instruction: "Stand over the bar with feet hip-width apart. Forcefully drive your hips forward as you pull the bar up. Quickly drop under the bar and 'catch' it on your shoulders in a front rack position, dipping into a quarter squat.",
                    breathing: "Deep inhale to brace before the pull; a sharp exhale during the explosive hip drive; hold the breath briefly as you catch the bar for stability."
                },
                {
                    name: "Dumbbell Pullover",
                    sets: 4,
                    reps: "10",
                    restTime: 60,
                    focus: "Lats/Serratus",
                    image: "/Exercise images/DB Pullover.gif",
                    instruction: "Lie perpendicular across a bench with only your upper back supported. Lower a single dumbbell in a controlled arc behind your head until upper arms are parallel to the floor. Pull the weight back over your chest using your lats and chest.",
                    breathing: "Inhale deeply as you lower the weight to expand the ribcage; exhale as you pull the weight back to the start."
                },
                {
                    name: "One-Arm Dumbbell Row",
                    sets: 4,
                    reps: "10",
                    restTime: 60,
                    focus: "Lats",
                    image: "/Exercise images/One Arm DB Row.gif",
                    instruction: "Row with one arm, back flat.",
                    breathing: "Exhale up, Inhale down."
                },
                {
                    name: "Towel Pulls",
                    sets: 4,
                    reps: "10",
                    restTime: 60,
                    focus: "Back Squeeze",
                    image: "/Exercise images/Towel Rows.png",
                    instruction: "Use towel on door handle or bar. Pull forcefully.",
                    breathing: "Exhale pull."
                },
                {
                    name: "Face Pulls",
                    sets: 4,
                    reps: "10",
                    restTime: 60,
                    focus: "Rear Delts/Rotators",
                    image: "/Exercise images/Face Pulls.gif",
                    instruction: "Pull band/rope towards face, separating hands.",
                    breathing: "Exhale pull."
                },
                {
                    name: "Hand Gripper",
                    sets: 3,
                    reps: "15",
                    restTime: 60,
                    focus: "Forearms",
                    image: "/Exercise images/Hand Gripper.jpg",
                    instruction: "Squeeze and hold.",
                    breathing: "Steady."
                }
            ]
        },
        {
            name: "Leg Detail",
            days: ["Thursday"],
            exercises: [
                {
                    name: "Goblet Squat",
                    sets: 3,
                    reps: "15",
                    restTime: 90,
                    focus: "Quads",
                    image: "/Exercise images/Goblet Squat.gif",
                    instruction: "Hold DB at chest. Squat deep.",
                    breathing: "Inhale down, Exhale up."
                },
                {
                    name: "Single-Leg RDL",
                    sets: 3,
                    reps: "15",
                    restTime: 90,
                    focus: "Balance/Hams",
                    image: "/Exercise images/Single-Leg RDL.png",
                    instruction: "Stand on one leg, hinge forward extending other leg back. Feel hamstring stretch.",
                    breathing: "Inhale down, Exhale up."
                },
                {
                    name: "Sissy Squats",
                    sets: 3,
                    reps: "15",
                    restTime: 90,
                    focus: "Direct Quad",
                    image: "/Exercise images/Sissy Squat.gif",
                    instruction: "Lean back keeping hips extended, knees travel forward. Heels up.",
                    breathing: "Inhale down, Exhale up."
                },
                {
                    name: "Nordic Curls",
                    sets: 3,
                    reps: "15",
                    restTime: 90,
                    focus: "Hamstrings",
                    image: "/Exercise images/Nordic Hamstring Curl.webp",
                    instruction: "Eccentric focus lowering.",
                    breathing: "Inhale down."
                },
                {
                    name: "Elevated Calf Raises",
                    sets: 3,
                    reps: "15",
                    restTime: 60,
                    focus: "Calves",
                    image: "/Exercise images/Calf Raises.jpg",
                    instruction: "Toes on block/step. Full stretch at bottom.",
                    breathing: "Exhale up."
                }
            ]
        },
        {
            name: "Full Finish",
            days: ["Friday"],
            exercises: [
                {
                    name: "Dips",
                    sets: 4,
                    reps: "12",
                    restTime: 60,
                    focus: "Push",
                    image: "/Exercise images/Dips.gif",
                    instruction: "Dip down, push up.",
                    breathing: "Exhale up."
                },
                {
                    name: "Chin-Ups",
                    sets: 4,
                    reps: "12",
                    restTime: 60,
                    focus: "Pull",
                    image: "/Exercise images/Pull Ups.gif",
                    instruction: "Underhand grip. Chin over bar.",
                    breathing: "Exhale up."
                },
                {
                    name: "Dumbbell Bicep Curls",
                    sets: 4,
                    reps: "12",
                    restTime: 60,
                    focus: "Biceps",
                    image: "/Exercise images/Bicep Curls.gif",
                    instruction: "Curl DBs with supination.",
                    breathing: "Exhale up."
                },
                {
                    name: "Dumbbell Overhead Press",
                    sets: 4,
                    reps: "12",
                    restTime: 60,
                    focus: "Shoulders",
                    image: "/Exercise images/DB Overhead Press.gif",
                    instruction: "Press DBs overhead.",
                    breathing: "Exhale up."
                },
                {
                    name: "Plank",
                    sets: 4,
                    reps: "60s",
                    restTime: 60,
                    focus: "Core",
                    image: "/Exercise images/Plank.png",
                    instruction: "Straight line hold.",
                    breathing: "Steady."
                },
                {
                    name: "Dragon Flags",
                    sets: 4,
                    reps: "12",
                    restTime: 60,
                    focus: "Advanced Core",
                    image: "/Exercise images/Dragon Flag.gif",
                    instruction: "Lie on a bench and grip the support behind your head. Lift your entire body as a solid unit until your feet point at the ceiling. Slowly lower your body, keeping it perfectly straight, until you are hovering just above the bench.",
                    breathing: "Exhale forcefully as you lift your body; inhale as you slowly lower back down."
                }
            ]
        }
    ],
    restDays: ["Wednesday", "Saturday", "Sunday"],
    nutrition: { kcal: 3000, pro: 180, carb: 400, fat: 80 }
};

const phase8 = {
    id: 8,
    name: "Peak Cut & Reveal",
    months: "22-24",
    goal: "Reveal muscle gains by dropping to 10% body fat using Treadmill HIIT and circuits.",
    frequency: "5 days/week (Mon, Tue, Wed, Thu, Fri)",
    restBetweenExercises: 45,
    workouts: [
        {
            name: "Push/Pull Circuit",
            days: ["Monday", "Tuesday"],
            exercises: [
                {
                    name: "Circuit: Push-Ups",
                    sets: 4,
                    reps: "Failure",
                    restTime: 10,
                    focus: "Chest",
                    image: "/Exercise images/Pushups.gif",
                    instruction: "Standard pushups to failure.",
                    breathing: "Continuous."
                },
                {
                    name: "Circuit: OHP",
                    sets: 4,
                    reps: "Failure",
                    restTime: 10,
                    focus: "Shoulders",
                    image: "/Exercise images/Barbell Overhead Press.gif",
                    instruction: "Light OHP for reps.",
                    breathing: "Continuous."
                },
                {
                    name: "Circuit: Row",
                    sets: 4,
                    reps: "Failure",
                    restTime: 10,
                    focus: "Back",
                    image: "/Exercise images/Barbell Row.gif",
                    instruction: "Barbell or DB Row.",
                    breathing: "Continuous."
                },
                {
                    name: "Circuit: Curl",
                    sets: 4,
                    reps: "Failure",
                    restTime: 10,
                    focus: "Arms",
                    image: "/Exercise images/Bicep Curls.gif",
                    instruction: "Bicep Curls.",
                    breathing: "Continuous."
                },
                {
                    name: "Circuit: Dips",
                    sets: 4,
                    reps: "Failure",
                    restTime: 45,
                    focus: "Finish",
                    image: "/Exercise images/Dips.gif",
                    instruction: "Dips to failure. Rest 45s after this station.",
                    breathing: "Continuous."
                }
            ]
        },
        {
            name: "Cardio 12-3-30",
            days: ["Wednesday"],
            exercises: [
                {
                    name: "Treadmill Walk (12-3-30)",
                    sets: 1,
                    reps: "30 Mins",
                    restTime: 0,
                    focus: "Fat Oxidation",
                    image: "/Exercise images/Treadmill.gif",
                    instruction: "For 12-3-30, maintain a 12% incline at 3 mph for 30 minutes.",
                    breathing: "Use deep, rhythmic diaphragmatic breathing."
                }
            ]
        },
        {
            name: "Legs Circuit",
            days: ["Thursday"],
            exercises: [
                {
                    name: "Circuit: Jump Squats",
                    sets: 3,
                    reps: "15",
                    restTime: 10,
                    focus: "Explosive",
                    image: "/Exercise images/Jump Squats.gif",
                    instruction: "Squat down and jump up.",
                    breathing: "Exhale jump."
                },
                {
                    name: "Circuit: Goblet Squats",
                    sets: 3,
                    reps: "15",
                    restTime: 10,
                    focus: "Quads",
                    image: "/Exercise images/Goblet Squat.gif",
                    instruction: "Weighted goblet squats.",
                    breathing: "Rhythmic."
                },
                {
                    name: "Circuit: Calf Raises",
                    sets: 3,
                    reps: "20",
                    restTime: 10,
                    focus: "Calves",
                    image: "/Exercise images/Calf Raises.jpg",
                    instruction: "Rapid calf raises.",
                    breathing: "Rhythmic."
                },
                {
                    name: "Circuit: Burpees",
                    sets: 3,
                    reps: "10",
                    restTime: 60,
                    focus: "Metabolic",
                    image: "/Exercise images/Burpees.gif",
                    instruction: "Full burpee with pushup. Rest 60s after this station.",
                    breathing: "Exhale jump."
                }
            ]
        },
        {
            name: "HIIT Day",
            days: ["Friday"],
            exercises: [
                {
                    name: "Treadmill HIIT",
                    sets: 10,
                    reps: "30s Run / 60s Walk",
                    restTime: 0,
                    focus: "EPOC",
                    image: "/Exercise images/Sprint.gif",
                    instruction: "Alternate 30s max speed sprints (Speed 12) with 60s walking rest.",
                    breathing: "Sync your breaths with your stride (e.g., inhale for 2 steps, exhale for 2 steps)."
                }
            ]
        },
        {
            name: "Active Recovery",
            days: ["Saturday"],
            exercises: [
                {
                    name: "Light Walk & Stretch",
                    sets: 1,
                    reps: "20 Mins",
                    restTime: 0,
                    focus: "Recovery",
                    image: "/Exercise images/Walk.gif",
                    instruction: "Low intensity walk.",
                    breathing: "Relaxed."
                },
                {
                    name: "Gripper Burnout",
                    sets: 1,
                    reps: "Failure",
                    restTime: 0,
                    focus: "Forearms",
                    image: "/Exercise images/Hand Gripper.jpg",
                    instruction: "Squeeze until you can't.",
                    breathing: "Steady."
                }
            ]
        }
    ],
    restDays: ["Sunday"],
    nutrition: { kcal: 2750, pro: 185, carb: 350, fat: 70 }
};

const newPhases = [phase5, phase6, phase7, phase8];

// Read and append
let currentData = fs.readFileSync('src/data/program.js', 'utf8');

// Find the generalRules key, which usually follows the closing array
const anchor = "generalRules:";
const anchorIndex = currentData.indexOf(anchor);

if (anchorIndex === -1) {
    console.log("Could not find generalRules anchor.");
    process.exit(1);
}

// Search backwards from generalRules to find the closing bracket of the phases array ']'
// It should be fairly close.
const closingBracketIndex = currentData.lastIndexOf(']', anchorIndex);
if (closingBracketIndex === -1) {
    console.log("Could not find phases array closer.");
    process.exit(1);
}

if (currentData.includes('id: 5,')) {
    console.log("Phase 5 already exists. Skipping update.");
    process.exit(0);
}

const before = currentData.substring(0, closingBracketIndex);
const after = currentData.substring(closingBracketIndex);

function serialize(obj) {
    let str = JSON.stringify(obj, null, 2);
    str = str.replace(/"([^"]+)":/g, '$1:');
    str = str.split('\n').map(line => '    ' + line).join('\n');
    return str;
}

const p5Str = serialize(phase5);
const p6Str = serialize(phase6);
const p7Str = serialize(phase7);
const p8Str = serialize(phase8);

let trimmedBefore = before.trimEnd();
if (!trimmedBefore.endsWith(',')) {
    trimmedBefore += ',';
}

const newContent = trimmedBefore + '\n' + p5Str + ',\n' + p6Str + ',\n' + p7Str + ',\n' + p8Str + '\n' + after;

fs.writeFileSync('src/data/program.js', newContent);
console.log('Year 2 phases added successfully (using generalRules anchor).');
