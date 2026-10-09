const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// 1. Better Light Theme for Warmup Preview Cards
content = content.replace(/\.wp-vol\s*\{([^}]*?)opacity:\s*0\.7;/, '.wp-vol {$1opacity: 1; color: var(--text-secondary);');
content = content.replace(/\.wp-phase\s*\{([^}]*?)color:\s*var\(--accent-primary\);/, '.wp-phase {$1color: var(--accent-primary); font-weight: 800; letter-spacing: 0.05em;');

// 2. Fix Warmup Overlay and Session Text
content = content.replace(/\.warmup-overlay\s*\{[^}]*?background:[^;]*?;/, '.warmup-overlay {\n  background: var(--bg-dark) !important;');
content = content.replace(/\.session-description-text\s*\{[^}]*?color:[^;]*?;/, '.session-description-text {\n  font-size: 1.1rem;\n  line-height: 1.6;\n  color: var(--text-secondary);');

// 3. Add missing session and timer styles
const additionalStyles = `
/* Missing Session & Timer Styles for Warmup */
.session-phase-tag {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: var(--bg-dot-muted);
  border: 1px solid var(--accent-primary);
  border-radius: 100px;
  color: var(--accent-primary);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.timer-circle-wrap {
  position: relative;
  width: 100%;
  max-width: 250px;
  aspect-ratio: 1/1;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.timer-bg {
  fill: none;
  stroke: var(--bg-dot-muted);
  stroke-width: 8;
}

.timer-progress {
  fill: none;
  stroke: var(--accent-primary);
  stroke-width: 12;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s linear;
}

.timer-text-overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.timer-current {
  font-family: 'Outfit';
  font-size: 4rem;
  font-weight: 900;
  color: var(--text-primary);
  line-height: 1;
}

.timer-label {
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--text-secondary);
  letter-spacing: 0.2em;
  margin-top: 0.5rem;
}

.session-main-title {
  color: var(--text-primary) !important;
}

.session-header-title {
  color: var(--text-primary) !important;
}

.warmup-step-indicator {
  color: var(--accent-primary) !important;
}
`;

// Append additional styles safely before the last closing brace if there's a global block, or just at the end.
content += additionalStyles;

fs.writeFileSync(path, content);
console.log('Warmup session theme fixes applied.');
