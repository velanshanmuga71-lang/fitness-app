const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// 1. Text Readability Fixes in Light Theme (Instruction & Breathing)
const textReadabilityFix = `
/* Light Theme Session Readability */
.light-theme .instruction-content,
.light-theme .breathing-text {
  color: var(--text-secondary) !important; /* Was fixed rgba opaque white */
  font-weight: 500;
}

.light-theme .session-instruction-box,
.light-theme .breathing-box {
  background: #f8fafc !important; /* Very light slate */
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
}
`;

if (!content.includes('.light-theme .instruction-content')) {
    content += textReadabilityFix;
}

// 2. Complete Set & Next Button Styling (Standardize)
// We want to make sure the primary action button is properly styled in both themes, 
// but especially clean in light theme.
const actionBtnFix = `
/* Primary Action Button (Complete Set / Next) */
.btn-complete-premium {
  background: var(--gradient-accent) !important;
  color: #ffffff !important;
  border: none !important;
  box-shadow: 0 8px 16px -4px rgba(79, 70, 229, 0.4) !important;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Hover state for desktop */
@media (min-width: 768px) {
  .btn-complete-premium:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 20px -5px rgba(79, 70, 229, 0.5) !important;
  }
}

/* Light theme specific tweaks if needed (mostly handled by the gradient above) */
.light-theme .btn-complete-premium {
   box-shadow: 0 8px 20px -6px rgba(79, 70, 229, 0.5) !important;
}
`;

if (!content.includes('/* Primary Action Button (Complete Set / Next) */')) {
    // Check if .btn-complete-premium is already defined and replace/append
    // Appending is safer to override previous styles due to specificity
    content += actionBtnFix;
}

fs.writeFileSync(path, content);
console.log('Session text readability and button styles updated.');
