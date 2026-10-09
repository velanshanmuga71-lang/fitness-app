const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix Macro headers in Dashboard
content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.9\)\s*!important;/g, 'color: var(--text-primary) !important;');

// 2. Fix Calorie labels opacity for better contrast
content = content.replace(/\.cal-label\s*\{([^}]*?)opacity:\s*0\.5;/g, '.cal-label {$1opacity: 0.7; color: var(--text-secondary);');

// 3. Fix Nutrition meter goal values
content = content.replace(/\.meter-goal-val\s*\{([^}]*?)color:\s*white;/g, '.meter-goal-val {$1color: var(--text-primary);');
content = content.replace(/\.meter-goal-label\s*\{([^}]*?)opacity:\s*0\.5;/g, '.meter-goal-label {$1color: var(--text-secondary); opacity: 0.7;');

// 4. Ensure progress bar bg contrast in macros
content = content.replace(/\.macro-mini-bar\s*\{([^}]*?)background:\s*rgba\(255,\s*255,\s*255,\s*0\.03\)\s*!important;/g, '.macro-mini-bar {$1background: var(--bg-dot-muted) !important;');

fs.writeFileSync(path, content);
console.log('Dashboard text theme fixes applied.');
