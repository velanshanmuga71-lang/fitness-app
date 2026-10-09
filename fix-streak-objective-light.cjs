const fs = require('fs');
const path = 'src/App.css';
let content = fs.readFileSync(path, 'utf8');

// Update Streak and Today's Objective styles for light theme
const lightThemeDesignOverrides = `
/* Balanced Light Theme Card Styles */
.light-theme .date-box,
.light-theme .weight-card-new,
.light-theme .activity-card,
.light-theme .food-summary-card,
.light-theme .extra-status-card {
  background: #ffffff !important;
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04) !important;
}

.light-theme .day-dot {
  background: #f1f5f9 !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
}

.light-theme .day-dot.active {
  background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%) !important;
  border: none !important;
}

.light-theme .streak-badge {
  background: rgba(99, 102, 241, 0.1) !important;
  color: #6366f1 !important;
  border: 1px solid rgba(99, 102, 241, 0.2) !important;
}

.light-theme .progress-track-bg {
  background: #f1f5f9 !important;
}
`;

// Append overrides to the end of the file
if (!content.includes('.light-theme .date-box')) {
    content += lightThemeDesignOverrides;
}

fs.writeFileSync(path, content);
console.log('Design overrides for Streak and Objective tags applied.');
