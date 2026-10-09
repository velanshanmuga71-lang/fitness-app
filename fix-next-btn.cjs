const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// Fix .warmup-action-btn
const updatedBtn = `.warmup-action-btn {
  background: linear-gradient(135deg, var(--accent-primary) 0%, #1d4ed8 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 8px 16px -4px var(--accent-primary) !important;
  border: none !important;
}`;

content = content.replace(/\.warmup-action-btn\s*\{[^}]*?\}/, updatedBtn);

fs.writeFileSync(path, content);
console.log('Next Exercise button contrast fixed.');
