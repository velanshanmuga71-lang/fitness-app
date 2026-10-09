const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix custom modal background and text
content = content.replace(/\.custom-modal\s*\{([^}]*?)background:\s*rgba\(20,\s*20,\s*30,\s*0\.95\);/, (match, group) => {
    return `.custom-modal {${group}background: var(--bg-card); backdrop-filter: blur(25px); color: var(--text-primary);`;
});

// 2. Fix modal overlay background for light theme (make it less dark)
// We already have .light-theme overrides, but let's see if we can add one for overlay
if (!content.includes('.light-theme .custom-modal-overlay')) {
    content = content.replace(/\.light-theme\s*\{([^}]*?)\}/, (match, group) => {
        return `.light-theme {${group}  --modal-overlay: rgba(0, 0, 0, 0.4);\n}`;
    });
    content = content.replace(/\.custom-modal-overlay\s*\{([^}]*?)background:\s*rgba\(0,\s*0,\s*0,\s*0\.7\);/, (match, group) => {
        return `.custom-modal-overlay {${group}background: var(--modal-overlay, rgba(0, 0, 0, 0.7));`;
    });
}

fs.writeFileSync(path, content);
console.log('Modal theme fixes applied.');
