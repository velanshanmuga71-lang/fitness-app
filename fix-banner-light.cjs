const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// Disable the blue glow/overlay for light theme and set background to white
const bannerOverride = `
.light-theme .modern-phase-banner {
  background: #ffffff !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04) !important;
}

.light-theme .banner-image-overlay,
.light-theme .banner-glow-circle,
.light-theme .modern-banner-visual::after,
.light-theme .banner-visual-glow {
  display: none !important;
}
`;

if (!content.includes('.light-theme .modern-phase-banner')) {
    content += bannerOverride;
} else {
    // If it's already there (maybe from a partial fix), we just ensure the display:none is there
    content = content.replace(/\.light-theme \.modern-phase-banner \{[^}]*?\}/, (match) => {
        return `.light-theme .modern-phase-banner {
  background: #ffffff !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04) !important;
}`;
    });
}

fs.writeFileSync(path, content);
console.log('Training banner cleaned up for light theme (glow removed).');
