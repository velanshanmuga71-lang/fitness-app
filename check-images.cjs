const fs = require('fs');
const path = require('path');

const programPath = path.join(__dirname, 'src', 'data', 'program.js');
const publicDir = path.join(__dirname, 'public');

try {
    const content = fs.readFileSync(programPath, 'utf8');
    const imageRegex = /image:\s*["']([^"']+)["']/g;
    let match;
    const missingImages = new Set();
    const foundImages = new Set();

    while ((match = imageRegex.exec(content)) !== null) {
        const imagePathRelative = match[1];

        // Some paths might already start with /, some might not.
        // The public directory serves from root.
        // e.g. /Exercise images/foo.png -> public/Exercise images/foo.png

        // Normalize path separation
        const cleanPath = imagePathRelative.startsWith('/') ? imagePathRelative.substring(1) : imagePathRelative;
        const fullPath = path.join(publicDir, decodeURIComponent(cleanPath));

        if (!fs.existsSync(fullPath)) {
            missingImages.add(cleanPath);
        } else {
            foundImages.add(cleanPath);
        }
    }

    console.log("--- Missing Images List ---");
    if (missingImages.size === 0) {
        console.log("Great! All images referenced in program.js exist.");
    } else {
        Array.from(missingImages).sort().forEach(img => {
            console.log(`- [ ] ${img}`);
        });
    }

    console.log(`\n(Total missing: ${missingImages.size})`);

} catch (err) {
    console.error("Error:", err);
}
