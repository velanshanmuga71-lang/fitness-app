const fs = require('fs');
const path = 'src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update the 'flatRampWarmup' variable to use a getter function or simply keep the variable
// and we will update how we *use* it in the component.
// But first, we need to modify the App component to dynamically calculate the Primer Set.

// We need to find where 'flatRampWarmup' is defined and change the "Primer Set" entry.
// However, 'flatRampWarmup' is a const outside the component.
// We can't easily access 'currentWorkout' there.

// Strategy:
// 1. Change 'flatRampWarmup' from a const array to a function that takes 'currentWorkout' as an argument.
// OR
// 2. Keep it as an array but with a placeholder for Primer Set, and then substitute it inside the component render/logic.

// Let's go with option 2: Dynamic Substitution.

// First, find the "Primer Set" object in the array string and leave it be (it acts as a placeholder).
// Then, inside the component, we'll create a 'derivedWarmup' variable that maps over 'flatRampWarmup'.

const appComponentStart = 'const App = () => {';
const derivedWarmupLogic = `
  // Dynamic Warmup Logic to replace Primer Set
  const derivedWarmup = flatRampWarmup.map(ex => {
    if (ex.name === "Primer Set" && currentWorkout?.exercises?.[0]) {
      const firstMainEx = currentWorkout.exercises[0];
      return {
        ...ex,
        name: \`Primer: \${firstMainEx.name}\`,
        image: firstMainEx.image, // Use the image from the actual first exercise
        target: \`Light set of \${firstMainEx.name} to potentiate CNS\`,
        volume: "1 set x 15 reps (Light Weight)"
      };
    }
    return ex;
  });
`;

// Insert this logic right before the return statement or somewhere early in the render, 
// but it needs 'currentWorkout' which is derived from state.
// 'currentWorkout' is calculated around line 538 in the original file. 

// Let's find where 'currentWorkout' is defined.
// It's usually: const currentWorkout = programData.phases[currentPhaseIdx].workouts.find(...) ...

const currentWorkoutDefinitionRegex = /const currentWorkout =[\s\S]*?;/;

if (currentWorkoutDefinitionRegex.test(content)) {
    // We will insert the derivedWarmup logic immediately *after* currentWorkout is defined.
    content = content.replace(currentWorkoutDefinitionRegex, (match) => {
        return `${match}\n${derivedWarmupLogic}`;
    });
}

// Now we need to replace all usages of 'flatRampWarmup' with 'derivedWarmup' INSIDE the component.
// BE CAREFUL: 'flatRampWarmup' is also used outside (the const definition). We only want to replace usages *inside* App.

// We can replace specific known usages.
// 1. handleStartWarmupSession
content = content.replace(/const firstEx = flatRampWarmup\[0\];/g, 'const firstEx = derivedWarmup[0];');

// 2. handleNextWarmup
content = content.replace(/activeWarmupIdx < flatRampWarmup\.length - 1/g, 'activeWarmupIdx < derivedWarmup.length - 1');
content = content.replace(/const nextEx = flatRampWarmup\[nextIdx\];/g, 'const nextEx = derivedWarmup[nextIdx];');

// 3. Render loop (Warmup Preview Grid)
content = content.replace(/flatRampWarmup\.map\(\(ex, i\)/g, 'derivedWarmup.map((ex, i)');

// 4. Session Header (Step Indicator)
content = content.replace(/{flatRampWarmup\.length}/g, '{derivedWarmup.length}');

// 5. Session Content (Current Exercise Display)
// There are multiple usages like flatRampWarmup[activeWarmupIdx]
// We can do a global replace for this specific pattern within the file, 
// BUT we must exclude the initial definition.
// Since the definition is `const flatRampWarmup = [...]`, replacing `flatRampWarmup[` should be safe
// as long as we don't touch the definition.

content = content.replace(/flatRampWarmup\[activeWarmupIdx\]/g, 'derivedWarmup[activeWarmupIdx]');


fs.writeFileSync(path, content);
console.log('Primer set logic updated to dynamically use the first exercise of the day.');
