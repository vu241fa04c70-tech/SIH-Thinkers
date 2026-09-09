const https = require('https');
const fs = require('fs');
const path = require('path');

const FILE_ID = '1h0pt48eJAq-wAHUf5-gFA9PlibOxVyk0';
const RAW_DIR = path.join(__dirname, '..', '..', '..', 'data', 'raw');
fs.mkdirSync(RAW_DIR, { recursive: true });

const dest = path.join(RAW_DIR, 'dataset_downloaded.bin');

function download(url, destPath) {
  https.get(url, (res) => {
    if (res.statusCode === 302 || res.statusCode === 301 || res.statusCode === 303) {
      download(res.headers.location, destPath);
      return;
    }

    const file = fs.createWriteStream(destPath);
    res.pipe(file);

    file.on('finish', () => {
      file.close(() => {
        console.log(`Download finished! File size: ${fs.statSync(destPath).size} bytes`);
      });
    });
  }).on('error', (err) => {
    console.error('Error downloading:', err.message);
  });
}

const initialUrl = `https://docs.google.com/uc?export=download&id=${FILE_ID}`;
console.log(`Starting download from ${initialUrl}...`);
download(initialUrl, dest);
