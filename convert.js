const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function convert_20(inputPaths, chosenPath) {
  return new Promise((resolve, reject) => {
    const lasFileName = path.basename(inputPaths[0], path.extname(inputPaths[0]));
    const outputPath = path.join(chosenPath, lasFileName);

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    const exe = './PotreeConverter2/PotreeConverter.exe';
    const parameters = [
      ...inputPaths,
      "-o", outputPath
    ];

    const converter = spawn(exe, parameters);

    let outputBuffer = "";
    converter.stdout.on('data', (data) => {
      outputBuffer += data.toString();

      const regexp = /(.*AABB): ({[.\s\S]*?})/g;
      let match;
      while ((match = regexp.exec(outputBuffer)) !== null) {
        try {
          const aabb = JSON.parse(match[2]);
          if (match[1] === "cubicAABB") {
            outputBuffer = "";
          }
        } catch (e) {
          console.error(match[0]);
          console.error(e);
        }
      }
    });

    converter.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    converter.on('exit', (code) => {
      if (code === 0) {
        const cloudJS = lasFileName;
        resolve(cloudJS);
      } else {
        reject(new Error(`child process exited with code ${code}`));
      }
    });
  });
}

module.exports = { convert_20 };
