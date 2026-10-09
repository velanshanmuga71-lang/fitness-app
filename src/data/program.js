export const programData = {
  user: {
    age: 22,
    weight: 75,
    height: 185,
    goalWeight: 85,
    targetGain: "7-10kg",
    macros: {
      calories: "3,100 - 3,250",
      protein: "150g - 165g",
      maintenance: 2792
    }
  },
  phases: [
    {
      id: 1,
      name: "Anatomical Adaptation",
      months: "1–1.5",
      weeks: "Weeks 1–6",
      goal: "Strengthen tendons, master form, and build a baseline work capacity.",
      frequency: "3 days/week (Mon, Wed, Fri) Full Body",
      restBetweenExercises: 90,
      workouts: [
        {
          name: "Full Body Foundation",
          days: ["Monday", "Wednesday", "Friday"],
          exercises: [
            {
              name: "Standard Push-Ups",
              sets: 3,
              reps: "10-15",
              restTime: 60,
              focus: "Form & Control",
              image: "/Exercise images/Standard Push-Ups.png",
              instruction: "Hands slightly wider than shoulders. Maintain a straight line from head to heels. Lower your chest until it's an inch from the floor, keeping elbows tucked at a 45-degree angle.",
              breathing: "Inhale down, Exhale as you push up."
            },
            {
              name: "Table Rows",
              sets: 3,
              reps: "8-12",
              restTime: 60,
              focus: "Full contraction",
              image: "/Exercise images/Table Rows.jpg",
              instruction: "Lie under a sturdy table. Grip the edge and pull your chest up to the tabletop. Keep your body straight like a reverse push-up.",
              breathing: "Exhale as you pull up, Inhale as you lower."
            },
            {
              name: "Air Squats",
              sets: 3,
              reps: "15-20",
              restTime: 60,
              focus: "Depth",
              image: "/Exercise images/Air Squats.jpg",
              instruction: "Feet shoulder-width apart. Sit back into your heels. Keep your chest up and spine neutral.",
              breathing: "Inhale down, Exhale as you stand."
            },
            {
              name: "Reverse Lunges",
              sets: 3,
              reps: "10 per leg",
              restTime: 60,
              focus: "Balance",
              image: "/Exercise images/Reverse Lunges.png",
              instruction: "Step one foot back and lower your back knee until it almost touches the floor. Both knees should be at 90 degrees.",
              breathing: "Inhale as you step back, Exhale as you push forward."
            },
            {
              name: "Plank",
              sets: 3,
              reps: "45-60s",
              restTime: 60,
              focus: "Core stability",
              image: "/Exercise images/Plank.png",
              instruction: "Hold a straight line from head to toe. For walkouts, start standing, touch toes, and 'walk' your hands out past a plank position.",
              breathing: "Consistent, shallow breaths."
            },
            {
              name: "Superman Holds",
              sets: 3,
              reps: "10 reps (3s hold)",
              restTime: 60,
              focus: "Posterior chain",
              image: "/Exercise images/Superman Holds.webp",
              instruction: "Lie on your belly. Lift arms and legs simultaneously. Squeeze your lower back.",
              breathing: "Exhale as you lift, Inhale as you lower."
            }
          ]
        }
      ],
      restDays: ["Tuesday", "Thursday", "Saturday", "Sunday"],
      recovery: "20 min walk",
      nutrition: { kcal: 3100, pro: 155, carb: 440, fat: 80 }
    },
    {
      id: 2,
      name: "Hypertrophy & Volume",
      months: "1.5–3",
      weeks: "Weeks 7–12",
      goal: "Maximize metabolic stress and sarcoplasmic hypertrophy.",
      frequency: "4 days/week Upper/Lower Split",
      restBetweenExercises: 90,
      workouts: [
        {
          name: "Upper Body",
          days: ["Monday", "Thursday"],
          exercises: [
            {
              name: "Decline Push-Ups",
              sets: 4,
              reps: "10-12",
              restTime: 75,
              focus: "Upper chest focus",
              image: "/Exercise images/Decline Push-Ups.png",
              instruction: "Place feet on a chair/couch. Hands on the floor. This shifts weight to your upper chest and shoulders.",
              breathing: "Inhale down, Exhale as you push up."
            },
            {
              name: "Archer Rows",
              sets: 4,
              reps: "8 per side",
              restTime: 75,
              focus: "Mechanical disadvantage",
              image: "/Exercise images/Archer Rows.png",
              instruction: "Using a doorframe or table, pull yourself up using primarily one arm while the other stays straight for balance/assistance.",
              breathing: "Exhale on the pull."
            },
            {
              name: "Diamond Push-Ups",
              sets: 3,
              reps: "12",
              restTime: 60,
              focus: "Triceps activation",
              image: "/Exercise images/Diamond Push-Ups.png",
              instruction: "Place hands together under your chest so your index fingers and thumbs form a diamond. Keep elbows closer to your sides.",
              breathing: "Inhale down, Exhale as you push up."
            },
            {
              name: "Towel Lat Pulldowns",
              sets: 3,
              reps: "15",
              restTime: 60,
              focus: "Focused squeeze",
              image: "/Exercise images/Towel Lat Pulldowns.png",
              instruction: "Hold a towel overhead, pulling it apart as hard as you can. Pull it down to your chest while maintaining that outward tension.",
              breathing: "Exhale as you pull the towel down."
            },
            {
              name: "Hollow Body Hold",
              sets: 3,
              reps: "45s",
              restTime: 60,
              focus: "Core compression",
              image: "/Exercise images/Hollow Body Hold.webp",
              instruction: "Lie on your back. Lift legs and shoulders off the floor. Press your lower back into the ground—no gaps!",
              breathing: "Small, 'tight' breaths to maintain core tension."
            }
          ]
        },
        {
          name: "Lower Body",
          days: ["Tuesday", "Friday"],
          exercises: [
            {
              name: "Bulgarian Split Squats",
              sets: 4,
              reps: "10-12 per leg",
              restTime: 90,
              focus: "Quad dominance",
              image: "/Exercise images/Bulgarian-split-squat.jpg",
              instruction: "Place one foot behind you on a couch or chair. Squat down on the leading leg. Keep your front knee tracked over your toes.",
              breathing: "Inhale down, Exhale as you push up."
            },
            {
              name: "Glute Bridges",
              sets: 4,
              reps: "15-20",
              restTime: 60,
              focus: "Posterior drive",
              image: "/Exercise images/Glute Bridges.png",
              instruction: "Lie on your back, knees bent. Lift your hips toward the ceiling by squeezing your glutes.",
              breathing: "Exhale at the top squeeze, Inhale as you lower."
            },
            {
              name: "Calf Raises",
              sets: 4,
              reps: "20",
              restTime: 45,
              focus: "High volume",
              image: "/Exercise images/Calf Raises.jpg",
              instruction: "Heels hanging off a step. Lower your heels below the level of the step, then rise up onto the balls of your feet.",
              breathing: "Exhale up, Inhale down."
            },
            {
              name: "Russian Twists",
              sets: 3,
              reps: "20 per side",
              restTime: 45,
              focus: "Obliques",
              image: "/Exercise images/Russian Twist.webp",
              instruction: "Sit with knees bent, feet off the floor. Rotate your torso from side to side, touching the floor beside you.",
              breathing: "Exhale on every twist."
            }
          ]
        }
      ],
      restDays: ["Wednesday", "Saturday", "Sunday"],
      nutrition: { kcal: 3150, pro: 160, carb: 435, fat: 85 }
    },
    {
      id: 3,
      name: "Maximal Strength & Leverage",
      months: "3–4.5",
      weeks: "Weeks 13–18",
      goal: "Increase mechanical tension by using harder variations and slow eccentrics.",
      frequency: "4 days/week Upper/Lower Split",
      restBetweenExercises: 120,
      workouts: [
        {
          name: "Upper Body (Strength)",
          days: ["Monday", "Thursday"],
          exercises: [
            {
              name: "Pike Push-Ups (Feet elevated)",
              sets: 4,
              reps: "6-10",
              restTime: 120,
              focus: "Shoulder strength",
              image: "/Exercise images/Pike Push Ups.png",
              instruction: "Get into a downward dog position (hips high). Lower the top of your head toward the floor in front of your hands, then push back up.",
              breathing: "Inhale down, Exhale as you push up."
            },
            {
              name: "Inverted Table Rows (Legs elevated)",
              sets: 4,
              reps: "8-10",
              restTime: 120,
              focus: "Pulling power",
              image: "/Exercise images/Table Rows.jpg",
              instruction: "Lie under a sturdy table. Grip the edge and pull your chest up to the tabletop. Keep your body straight like a reverse push-up.",
              breathing: "Exhale as you pull up, Inhale as you lower."
            },
            {
              name: "Pseudo Planche Push-Ups",
              sets: 3,
              reps: "8",
              restTime: 90,
              focus: "Protraction",
              image: "/Exercise images/Pseudo Planche Push-Ups.gif",
              instruction: "In a push-up position, lean your body forward so your shoulders are ahead of your wrists. Maintain this lean as you lower and lift.",
              breathing: "Inhale down, Exhale as you push up."
            },
            {
              name: "Towel Rows (Door handle)",
              sets: 3,
              reps: "10 (4s eccentric)",
              restTime: 90,
              focus: "Time under tension",
              image: "/Exercise images/Towel Rows.png",
              instruction: "Loop a towel around a door handle. Lean back and pull yourself toward the door.",
              breathing: "Exhale as you pull toward the door."
            }
          ]
        },
        {
          name: "Lower Body (Power)",
          days: ["Tuesday", "Friday"],
          exercises: [
            {
              name: "Assisted Pistol Squats",
              sets: 4,
              reps: "5-8 per leg",
              restTime: 120,
              focus: "Unilateral strength",
              image: "/Exercise images/assisted pistol squats.webp",
              instruction: "Stand on one leg, extending the other leg out in front. Lower your hips as low as possible. Use a doorframe for balance if needed.",
              breathing: "Inhale down, Exhale forcefully to stand up."
            },
            {
              name: "Nordic Hamstring Curls",
              sets: 4,
              reps: "5 (Slow lowering)",
              restTime: 120,
              focus: "Eccentric control",
              image: "/Exercise images/Nordic Hamstring Curl.webp",
              instruction: "Kneel and secure your ankles. Lower your torso to the floor as slowly as possible using only your hamstrings to resist gravity.",
              breathing: "Inhale and hold a tight core as you lower; Exhale as you push back up."
            },
            {
              name: "Single-Leg Glute Bridges",
              sets: 3,
              reps: "12 per leg",
              restTime: 90,
              focus: "Glute isolation",
              image: "/Exercise images/Single-Leg Glute Bridges.png",
              instruction: "Lie on your back, knees bent. Lift your hips toward the ceiling by squeezing your glutes.",
              breathing: "Exhale at the top squeeze, Inhale as you lower."
            },
            {
              name: "Wall Sit",
              sets: 3,
              reps: "60s",
              restTime: 60,
              focus: "Isometric endurance",
              image: "/Exercise images/wall-sits.webp",
              instruction: "Press your back against a wall and 'sit' so your thighs are parallel to the floor. Hold.",
              breathing: "Slow, rhythmic nasal breathing."
            }
          ]
        }
      ],
      restDays: ["Wednesday", "Saturday", "Sunday"],
      nutrition: { kcal: 3200, pro: 165, carb: 430, fat: 90 }
    },
    {
      id: 4,
      name: "Mastery & Metabolic Finishing",
      months: "4.5–6",
      weeks: "Weeks 19–24",
      goal: "Solidify gains and peak strength with advanced isometrics and skills.",
      frequency: "5 days/week (Push/Pull/Legs/Core/Skill)",
      restBetweenExercises: 90,
      workouts: [
        {
          name: "Day 1 (Push)",
          exercises: [
            {
              name: "Archer Push-Ups",
              sets: 3,
              reps: "Failure",
              restTime: 90,
              focus: "Unilateral push",
              image: "/Exercise images/Archer Push-Ups.gif",
              instruction: "Spread hands very wide. As you lower, shift your weight to one side, bending that arm while keeping the other arm straight.",
              breathing: "Inhale down, Exhale as you push back to center."
            },
            {
              name: "Wall Handstand Holds",
              sets: 3,
              reps: "Max duration",
              restTime: 120,
              focus: "Overhead stability",
              image: "/Exercise images/Wall Handstand Holds.jpeg",
              instruction: "Kick up against a wall. Push the floor away actively with your hands to 'lengthen' your body. Squeeze your glutes.",
              breathing: "Take deep, slow breaths through the nose. Do not hold your breath."
            },
            {
              name: "Diamond Push-Ups",
              sets: 3,
              reps: "Failure",
              restTime: 60,
              focus: "Final burn",
              image: "/Exercise images/Diamond Push-Ups.png",
              instruction: "Place hands together under your chest so your index fingers and thumbs form a diamond. Keep elbows closer to your sides.",
              breathing: "Inhale down, Exhale as you push up."
            }
          ]
        },
        {
          name: "Day 2 (Pull)",
          exercises: [
            {
              name: "Towel Lat Pulldowns",
              sets: 3,
              reps: "Max tension",
              restTime: 90,
              focus: "Mind-muscle connection",
              image: "/Exercise images/Towel Lat Pulldowns.png",
              instruction: "Hold a towel overhead, pulling it apart as hard as you can. Pull it down to your chest while maintaining that outward tension.",
              breathing: "Exhale as you pull the towel down."
            },
            {
              name: "One-Arm Table Rows",
              sets: 3,
              reps: "To failure",
              restTime: 90,
              focus: "Pulling mastery",
              image: "/Exercise images/One-Arm Table Rows.jpg",
              instruction: "Same as a table row, but use only one hand. Keep your hips and shoulders level (don't let them twist).",
              breathing: "Exhale on the pull."
            },
            {
              name: "Superman Pulses",
              sets: 3,
              reps: "20",
              restTime: 60,
              focus: "Lower back density",
              image: "/Exercise images/Superman Pulses.jpg",
              instruction: "Lie on your belly. Lift arms and legs simultaneously. Squeeze your lower back.",
              breathing: "Exhale as you lift, Inhale as you lower."
            }
          ]
        },
        {
          name: "Day 3 (Legs)",
          exercises: [
            {
              name: "Full Pistol Squats",
              sets: 3,
              reps: "5-8 per leg",
              restTime: 120,
              focus: "Leg mastery",
              image: "/Exercise images/Full Pistol Squats.png",
              instruction: "Stand on one leg, extending the other leg out in front. Lower your hips as low as possible. Use a doorframe for balance if needed.",
              breathing: "Inhale down, Exhale forcefully to stand up."
            },
            {
              name: "Jumping Lunges",
              sets: 3,
              reps: "12 per leg",
              restTime: 90,
              focus: "Explosive power",
              image: "/Exercise images/Jumping Lunges.gif",
              instruction: "Step one foot back and lower your back knee until it almost touches the floor. Both knees should be at 90 degrees.",
              breathing: "Inhale as you step back, Exhale as you push forward."
            },
            {
              name: "Nordic Curl eccentrics",
              sets: 3,
              reps: "8",
              restTime: 120,
              focus: "Hams of steel",
              image: "/Exercise images/Nordic Curl Eccentrics.webp",
              instruction: "Kneel and secure your ankles. Lower your torso to the floor as slowly as possible using only your hamstrings to resist gravity.",
              breathing: "Inhale and hold a tight core as you lower; Exhale as you push back up."
            }
          ]
        },
        {
          name: "Day 4 (Core/Skill)",
          exercises: [
            {
              name: "L-Sits (between chairs)",
              sets: 3,
              reps: "Max hold",
              restTime: 90,
              focus: "Abdominal compression",
              image: "/Exercise images/L-Sits.webp",
              instruction: "Sit between two chairs. Place hands on chairs and lift your entire body and legs off the ground so you form an 'L'.",
              breathing: "Very short, controlled breaths."
            },
            {
              name: "Plank Walkouts",
              sets: 3,
              reps: "10",
              restTime: 60,
              focus: "Anterior stability",
              image: "/Exercise images/plank walkouts.gif",
              instruction: "Hold a straight line from head to toe. For walkouts, start standing, touch toes, and 'walk' your hands out past a plank position.",
              breathing: "Consistent, shallow breaths."
            },
            {
              name: "Wall Handstand Practice",
              sets: 1,
              reps: "10 mins",
              restTime: 0,
              focus: "Skill work",
              image: "/Exercise images/Wall Handstand Practice.gif",
              instruction: "Kick up against a wall. Push the floor away actively with your hands to 'lengthen' your body. Squeeze your glutes.",
              breathing: "Take deep, slow breaths through the nose. Do not hold your breath."
            }
          ]
        },
        {
          name: "Day 5 (Full Body Density)",
          exercises: [
            {
              name: "Burpees",
              sets: 3,
              reps: "15",
              restTime: 60,
              focus: "Metabolic conditioning",
              image: "/Exercise images/Burpees.gif",
              instruction: "Drop to a push-up, jump your feet in, and then jump into the air.",
              breathing: "Exhale on the jump up."
            },
            {
              name: "Incline Push-Ups",
              sets: 3,
              reps: "High volume",
              restTime: 45,
              focus: "Upper chest finish",
              image: "/Exercise images/Incline pushups.gif",
              instruction: "Hands on an elevated surface like a table or chair. Feet on the floor. Maintain a straight line from head to heels.",
              breathing: "Inhale down, Exhale as you push up."
            },
            {
              name: "Air Squats",
              sets: 3,
              reps: "High volume",
              restTime: 45,
              focus: "Lower body pump",
              image: "/Exercise images/Air Squats.jpg",
              instruction: "Feet shoulder-width apart. Sit back into your heels. Keep your chest up and spine neutral.",
              breathing: "Inhale down, Exhale as you stand."
            }
          ]
        }
      ],
      restDays: ["Wednesday", "Sunday"],
      nutrition: { kcal: 3250, pro: 165, carb: 435, fat: 95 }
    },
    {
      id: 5,
      name: "Compound Hybrid Load",
      months: "6–7.5",
      weeks: "Weeks 25–30",
      goal: "Transition to Absolute Strength. Spike testosterone via heavy compound lifts.",
      frequency: "3 days/week (Mon, Tue, Thu)",
      restBetweenExercises: 120,
      workouts: [
        {
          name: "Hybrid Push",
          days: [
            "Monday"
          ],
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
          days: [
            "Tuesday"
          ],
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
          days: [
            "Thursday"
          ],
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
      restDays: [
        "Wednesday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      nutrition: {
        kcal: 3250,
        pro: 170,
        carb: 450,
        fat: 85
      }
    },
    {
      id: 6,
      name: "Mechanical Overload",
      months: "7.5–9",
      weeks: "Weeks 31–36",
      goal: "Increase myofibrillar density (muscle 'hardness'). Use Double Progression.",
      frequency: "3 days/week (Mon, Tue, Thu)",
      restBetweenExercises: 120,
      workouts: [
        {
          name: "Power Push",
          days: [
            "Monday"
          ],
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
          days: [
            "Tuesday"
          ],
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
          days: [
            "Thursday"
          ],
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
      restDays: [
        "Wednesday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      nutrition: {
        kcal: 3150,
        pro: 175,
        carb: 420,
        fat: 85
      }
    },
    {
      id: 7,
      name: "Functional Definition",
      months: "9–10.5",
      weeks: "Weeks 37–42",
      goal: "Aesthetic 'Superhero' symmetry. Target lateral delts and upper pecs with adjustable plates.",
      frequency: "4 days/week (Mon, Tue, Thu, Fri)",
      restBetweenExercises: 90,
      workouts: [
        {
          name: "Upper Sculpt A",
          days: [
            "Monday"
          ],
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
          days: [
            "Tuesday"
          ],
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
          days: [
            "Thursday"
          ],
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
          days: [
            "Friday"
          ],
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
      restDays: [
        "Wednesday",
        "Saturday",
        "Sunday"
      ],
      nutrition: {
        kcal: 3000,
        pro: 180,
        carb: 400,
        fat: 80
      }
    },
    {
      id: 8,
      name: "Peak Cut & Reveal",
      months: "10.5–12",
      weeks: "Weeks 43–48",
      goal: "Reveal muscle gains by dropping to 10% body fat using Treadmill HIIT and circuits.",
      frequency: "5 days/week (Mon, Tue, Wed, Thu, Fri)",
      restBetweenExercises: 45,
      workouts: [
        {
          name: "Push/Pull Circuit",
          days: [
            "Monday",
            "Tuesday"
          ],
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
          days: [
            "Wednesday"
          ],
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
          days: [
            "Thursday"
          ],
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
          days: [
            "Friday"
          ],
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
          days: [
            "Saturday"
          ],
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
      restDays: [
        "Sunday"
      ],
      nutrition: {
        kcal: 2750,
        pro: 185,
        carb: 350,
        fat: 70
      }
    }
],
  generalRules: {
    deload: "Every 4th week: Perform only 2 sets per exercise and stay 4-5 reps away from failure.",
    tempo: "3-4s eccentric, 1s pause, explosive concentric."
  }
};
