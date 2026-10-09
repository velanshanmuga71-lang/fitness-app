const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// Replacements
const replacements = [
    { from: /background:\s*rgba\(255,\s*255,\s*255,\s*0\.03\);/g, to: 'background: var(--bg-dot-muted);' },
    { from: /background:\s*rgba\(255,\s*255,\s*255,\s*0\.05\);/g, to: 'background: var(--bg-dot-muted);' },
    { from: /border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.05\);/g, to: 'border: 1px solid var(--border-glass);' },
    { from: /\.day-dot\s*\{\s*[^}]*?background:\s*var\(--bg-card\);/g, to: (match) => match.replace('var(--bg-card)', 'var(--bg-dot-muted)') },
    { from: /background:\s*rgba\(0,\s*0,\s*0,\s*0\.3\);/g, to: 'background: var(--bg-card);' }
];

replacements.forEach(r => {
    content = content.replace(r.from, r.to);
});

fs.writeFileSync(path, content);
console.log('Replacements completed.');
