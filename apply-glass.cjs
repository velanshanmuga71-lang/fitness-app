const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// Use a regex to catch the button and replace with glassmorphism
const glassButton = `.warmup-finish-btn {
  background: var(--bg-card) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid var(--border-glass) !important;
  color: var(--text-primary) !important;
  box-shadow: var(--shadow-premium) !important;
}`;

content = content.replace(/\.warmup-finish-btn\s*\{[^}]*?\}/, glassButton);

fs.writeFileSync(path, content);
console.log('Warmup button glassmorphism applied.');
