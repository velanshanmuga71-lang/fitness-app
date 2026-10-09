const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// 1. Add Greeting Color Variables
const rootVars = `
  /* Greeting Colors - Dark Mode Default */
  --color-greeting-morning: #f59e0b;
  --color-greeting-evening: #818cf8;
`;

const lightThemeVars = `
  /* Greeting Colors - Light Mode (Darker for Contrast) */
  --color-greeting-morning: #d97706; /* Amber 600 */
  --color-greeting-evening: #4f46e5; /* Indigo 600 */
`;

// Insert into :root
content = content.replace(/:root\s*\{/, `:root {${rootVars}`);
// Insert into .light-theme
content = content.replace(/\.light-theme\s*\{/, `.light-theme {${lightThemeVars}`);

// 2. Fix Header Date Readability in Light Theme
const headerDateFix = `
.light-theme .h-greet-date {
  opacity: 1 !important;
  color: var(--text-secondary) !important;
  font-weight: 500;
}

.light-theme .greeting-icon-sun {
  color: var(--color-greeting-morning) !important;
}

.light-theme .greeting-icon-moon {
  color: var(--color-greeting-evening) !important;
}
`;

if (!content.includes('.light-theme .h-greet-date')) {
    content += headerDateFix;
}

fs.writeFileSync(path, content);
console.log('Header readability fixes applied.');
