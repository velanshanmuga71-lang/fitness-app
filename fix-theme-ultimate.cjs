const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// The Ultimate Light Theme Fixer
const finalFixes = [
    // 1. Banner titles must be dark in light theme
    { from: /.modern-phase-title\s*\{/g, to: '.modern-phase-title { color: var(--text-primary);' },
    { from: /.workout-title\s*\{/g, to: '.workout-title { color: var(--text-primary);' },

    // 2. Body Weight Metrics
    {
        from: /.weight-num\s*\{[^}]*?background:[^;]*?;[^}]*?\}/g, to: `.weight-num {
  font-family: 'Outfit';
  font-size: 3.2rem;
  font-weight: 900;
  line-height: 1;
  color: var(--text-primary);
}` },
    { from: /.weight-unit\s*\{/g, to: '.weight-unit { color: var(--text-secondary);' },
    { from: /.weight-label-mini\s*\{/g, to: '.weight-label-mini { color: var(--text-secondary);' },

    // 3. Training Plans Modal Header
    {
        from: /.sheet-header\s*h3\s*\{[^}]*?\}/g, to: `.sheet-header h3 {
  font-family: 'Outfit';
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text-primary);
}` },

    // 4. Resolve remaining rgba white borders/bg that look dark in light theme
    { from: /border:\s*2px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.05\);/g, to: 'border: 1px solid var(--border-glass);' },
    { from: /border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.\d+\);/g, to: 'border: 1px solid var(--border-glass);' },
    { from: /background:\s*rgba\(255,\s*255,\s*255,\s*0\.03\);/g, to: 'background: var(--bg-dot-muted);' },
    { from: /background:\s*rgba\(255,\s*255,\s*255,\s*0\.05\);/g, to: 'background: var(--bg-dot-muted);' },

    // 5. Ensure Weekly Streak dots are visible
    { from: /.day-dot\s*\{[^}]*?background:\s*#0a0a0c;/g, to: (match) => match.replace('#0a0a0c', 'var(--bg-dot-muted)') },

    // 6. Clean up text-fill-color transparent that was making text invisible
    { from: /text-fill-color:\s*transparent;/g, to: 'text-fill-color: inherit;' },
    { from: /-webkit-text-fill-color:\s*transparent;/g, to: '-webkit-text-fill-color: inherit;' }
];

finalFixes.forEach(r => {
    content = content.replace(r.from, r.to);
});

// Remove potential double colors
content = content.replace(/color:\s*var\(--text-primary\);\s*color:\s*var\(--text-primary\);/g, 'color: var(--text-primary);');

fs.writeFileSync(path, content);
console.log('Final theme sanitization complete.');
