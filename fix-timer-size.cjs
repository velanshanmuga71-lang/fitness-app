const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// 1. Reduce Timer Size in Warmup Session
const timerSizeFix = `
/* Reduce timer size in warmup session */
.timer-circle-wrap {
  width: 100%;
  max-width: 180px !important; /* Reduced from 250px */
}

.timer-current {
  font-size: 3rem !important; /* Reduced from 4rem */
}

.timer-svg {
  width: 100%;
  height: 100%;
}
`;

if (!content.includes('max-width: 180px !important')) {
    content += timerSizeFix;
}

fs.writeFileSync(path, content);
console.log('Timer size reduced.');
