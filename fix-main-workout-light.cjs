const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// 1. Light Theme for Exercise Items
// Change background to white, keep border
const lightThemeExercise = `
/* Light Theme Exercise Items */
.light-theme .exercise-item {
  background: #ffffff !important;
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03) !important;
}

.light-theme .exercise-item:hover {
  background: #ffffff !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important;
  border-color: var(--accent-primary) !important;
}

.light-theme .main-session-btn {
  background: var(--gradient-accent) !important;
  border: 1px solid var(--border-glass) !important;
  color: #ffffff !important;
  box-shadow: 0 8px 20px -5px rgba(79, 70, 229, 0.4) !important;
}
`;

if (!content.includes('.light-theme .exercise-item')) {
    // Insert before the closing brace of light theme if it existed, or just append
    content += lightThemeExercise;
}

// 2. Fix Start Main Session Button (Global & Light)
// Use the same glass/gradient style as the warmup button
const mainSessionBtn = `
.main-session-btn {
  background: var(--bg-card);
  backdrop-filter: blur(15px);
  color: var(--text-primary);
  border: 1px solid var(--border-glass);
}
`;
// Note: We already added a specific override for light theme above to make it pop more.
// If .main-session-btn doesn't exist in CSS, append it.
if (!content.includes('.main-session-btn {')) {
    content += mainSessionBtn;
}

// 3. Style Reset Warmup Button
const resetWarmupStyle = `
.reset-warmup-inline-btn {
  background: transparent;
  border: 1px solid var(--border-glass);
  color: var(--text-secondary);
  font-size: 0.7rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
}

.reset-warmup-inline-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}

.light-theme .reset-warmup-inline-btn {
  border-color: rgba(0,0,0,0.1);
  background: #ffffff;
}
`;

// Replace existing .reset-warmup-inline-btn if it's there, or append
if (content.includes('.reset-warmup-inline-btn {')) {
    // It might be hard to safely replace via regex due to braces. 
    // Since we see it in the previous output around line 3603, let's append overrides at the end which is safer.
    content += resetWarmupStyle;
} else {
    content += resetWarmupStyle;
}

fs.writeFileSync(path, content);
console.log('Main workout UI polished for light theme.');
