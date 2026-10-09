const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix Roadmap Card and Header
// Already covered by previous global light theme card fix, but let's be sure about the Roadmap specifically
const roadmapFixes = `
.light-theme .roadmap-card {
  background: #ffffff !important;
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
}

.light-theme .roadmap-marker {
  background: #f1f5f9 !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
  color: var(--text-primary) !important;
}

.light-theme .roadmap-item.active {
  background: rgba(99, 102, 241, 0.04) !important;
}

.light-theme .roadmap-item.active .roadmap-marker {
  background: var(--gradient-accent) !important;
  color: #ffffff !important;
  box-shadow: 0 0 0 8px #ffffff, 0 10px 25px -5px rgba(59, 130, 246, 0.4) !important;
}

.light-theme .roadmap-marker {
  box-shadow: 0 0 0 6px #ffffff !important;
}

.light-theme .roadmap-list::before {
  background: rgba(0, 0, 0, 0.08) !important;
}

.light-theme .rm-name {
  color: var(--text-primary) !important;
}
`;

if (!content.includes('.light-theme .roadmap-card')) {
    content += roadmapFixes;
}

// Global cleanup for roadmaps
content = content.replace(/background:\s*#0d0d0f;/g, 'background: var(--bg-dot-muted);');
content = content.replace(/background:\s*#070709;/g, 'background: var(--bg-dark);');

fs.writeFileSync(path, content);
console.log('Roadmap theme fixes applied.');
