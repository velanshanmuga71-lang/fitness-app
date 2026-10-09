const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// 1. Soften the shadow variables
content = content.replace(/--shadow-premium:\s*0\s*15px\s*45px\s*-15px\s*rgba\(0,\s*0,\s*0,\s*0\.5\);/, '--shadow-premium: 0 10px 30px -10px rgba(0, 0, 0, 0.3);');
content = content.replace(/--shadow-premium:\s*0\s*10px\s*30px\s*-10px\s*rgba\(0,\s*0,\s*0,\s*0\.1\);/, '--shadow-premium: 0 8px 25px -8px rgba(0, 0, 0, 0.06);');

// 2. Replace hardcoded dark shadows with the variable
content = content.replace(/box-shadow:\s*0\s*15px\s*35px\s*rgba\(0,\s*0,\s*0,\s*0\.4\);/g, 'box-shadow: var(--shadow-premium);');
content = content.replace(/box-shadow:\s*0\s*15px\s*30px\s*-10px\s*rgba\(0,\s*0,\s*0,\s*0\.5\);/g, 'box-shadow: var(--shadow-premium);');
content = content.replace(/box-shadow:\s*0\s*25px\s*50px\s*-12px\s*rgba\(0,\s*0,\s*0,\s*0\.5\);/g, 'box-shadow: var(--shadow-premium);');

fs.writeFileSync(path, content);
console.log('Drop shadows reduced and standardized.');
