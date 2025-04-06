const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Create a simple HTML file that will help us convert SVG to PNG using browser rendering
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Icon Generator</title>
  <style>
    body { margin: 0; padding: 0; background: white; }
    .container { display: flex; flex-direction: column; align-items: center; margin: 20px; }
    .size-label { margin-bottom: 10px; font-family: sans-serif; }
  </style>
</head>
<body>
  <div class="container">
    <div id="svg-container"></div>
  </div>

  <script>
    // Load the SVG file
    fetch('/icon.svg')
      .then(response => response.text())
      .then(svgContent => {
        const container = document.getElementById('svg-container');
        container.innerHTML = svgContent;
        
        // Set the SVG attributes for size
        const svg = container.querySelector('svg');
        svg.setAttribute('width', '512px');
        svg.setAttribute('height', '512px');
      });
  </script>
</body>
</html>
`;

// Write the HTML file
fs.writeFileSync(path.join(__dirname, 'public', 'icon-generator.html'), htmlContent);

console.log('Created icon-generator.html in the public folder');
console.log('Please follow these steps:');
console.log('1. Run your Next.js app (npm run dev)');
console.log('2. Open http://localhost:3000/icon-generator.html in your browser');
console.log('3. Take a screenshot of the SVG at different sizes (16x16, 32x32, 192x192, 512x512)');
console.log('4. Save the screenshots as favicon.ico, icon-16.png, icon-32.png, icon-192.png, icon-512.png, and apple-touch-icon.png in the public folder');

// Open the browser
console.log('Opening browser to the generator page...');
const openCommand = process.platform === 'win32' ? 'start' : (process.platform === 'darwin' ? 'open' : 'xdg-open');
exec(`${openCommand} http://localhost:3000/icon-generator.html`); 