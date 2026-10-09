const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// Ensure logo fits nicely
content = content.replace(
    /.logo-box img {\s*width: 100%;\s*height: 100%;\s*object-fit: cover;\s*}/,
    `.logo-box img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Changed to contain for safety with new logo */
  padding: 2px; /* Slight padding */
}`
);

fs.writeFileSync(path, content);
console.log('Logo CSS updated for better fit.');
