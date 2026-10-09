const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// Specific replacements for reported sections
const specificReplacements = [
    // Banner fixes
    { from: /.modern-phase-title\s*\{\s*[^}]*?color:\s*white;/g, to: (match) => match.replace('color: white;', 'color: var(--text-primary);') },
    { from: /.m-val-v2\s*\{\s*[^}]*?color:\s*white;/g, to: (match) => match.replace('color: white;', 'color: var(--text-primary);') },
    { from: /.phase-duration-tag\s*\{\s*[^}]*?color:\s*rgba\(255,\s*255,\s*255,\s*0\.6\);/g, to: (match) => match.replace('rgba(255, 255, 255, 0.6)', 'var(--text-secondary)') },

    // Body weight fixes
    { from: /.weight-num\s*\{\s*[^}]*?background:\s*linear-gradient\(180deg,\s*#fff\s*0%,\s*#94a3b8\s*100%\);/g, to: (match) => match.replace('linear-gradient(180deg, #fff 0%, #94a3b8 100%)', 'linear-gradient(180deg, var(--text-primary) 0%, var(--text-secondary) 100%)') },

    // Training plans fixes
    { from: /.sheet-header\s*h3\s*\{\s*[^}]*?background:\s*linear-gradient\(135deg,\s*#fff\s*0%,\s*#a5b4fc\s*100%\);/g, to: (match) => match.replace('linear-gradient(135deg, #fff 0%, #a5b4fc 100%)', 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent-primary) 100%)') },

    // Weekly streak dots (ensuring they are not black in light theme)
    { from: /\.day-dot\s*\{\s*[^}]*?background:\s*#0a0a0c;/g, to: (match) => match.replace('#0a0a0c', 'var(--bg-dot-muted)') },
    { from: /\.day-dot\s*\{\s*[^}]*?border:\s*2px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.05\);/g, to: (match) => match.replace('2px solid rgba(255, 255, 255, 0.05)', '1.5px solid var(--border-glass)') },

    // General alpha removals
    { from: /rgba\(255,\s*255,\s*255,\s*0\.03\)/g, to: 'var(--bg-dot-muted)' },
    { from: /rgba\(255,\s*255,\s*255,\s*0\.05\)/g, to: 'var(--border-glass)' },
    { from: /rgba\(255,\s*255,\s*255,\s*0\.08\)/g, to: 'var(--border-glass)' },
    { from: /color:\s*white\s*!important;/g, to: 'color: var(--text-primary) !important;' }
];

specificReplacements.forEach(r => {
    content = content.replace(r.from, r.to);
});

fs.writeFileSync(path, content);
console.log('Specific theme fixes applied.');
