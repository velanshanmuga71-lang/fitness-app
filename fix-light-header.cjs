const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// Add override for light theme header background
const headerFix = `
.light-theme .sticky-header,
.light-theme .header {
  background: #ffffff !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06) !important;
  backdrop-filter: blur(20px) !important;
}
`;

if (!content.includes('.light-theme .sticky-header')) {
    // Append to the end of file (or find a better place, end is safe)
    content += headerFix;
}

fs.writeFileSync(path, content);
console.log('Light theme header background set to white.');
