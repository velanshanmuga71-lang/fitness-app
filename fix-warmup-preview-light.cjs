const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// Add specific override for warmup preview items in light theme
const lightThemeOverride = `
.light-theme .warmup-preview-item {
  background: #ffffff !important;
  border: 1px solid rgba(0, 0, 0, 0.15) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important;
}
`;

if (!content.includes('.light-theme .warmup-preview-item')) {
    content += lightThemeOverride;
}

fs.writeFileSync(path, content);
console.log('Warmup preview item styles updated for light theme.');
