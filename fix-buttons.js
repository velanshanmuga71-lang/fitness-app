const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix .log-btn color
content = content.replace(/\.log-btn\s*\{([^}]*?)color:\s*white;/, (match, group) => {
    return `.log-btn {${group}color: var(--text-primary);`;
});

// 2. Fix .warmup-finish-btn
content = content.replace(/\.warmup-finish-btn\s*\{[^}]*?\}/, `.warmup-finish-btn {
  background: var(--gradient-accent) !important;
  border: none !important;
  color: white !important;
  box-shadow: 0 8px 16px -4px var(--accent-primary) !important;
}`);

// 3. Fix other hardcoded white buttons if they are prominent
content = content.replace(/\.btn-save-weight\s*\{([^}]*?)color:\s*white;/, (match, group) => {
    return `.btn-save-weight {${group}color: white;`; // Save weight usually has primary bg, so white is fine.
});

fs.writeFileSync(path, content);
console.log('Button theme fixes applied via script.');
