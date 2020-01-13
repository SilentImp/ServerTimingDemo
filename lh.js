const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

function measure(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      return chrome.kill().then(() => results)
    });
  });
}

const opts = {
    onlyCategories: ['performance'],
    chromeFlags: ['--headless'],
};


measure('https://werkspot.nl', opts, {
        extends: 'lighthouse:default',
        settings: {
         onlyCategories: ['performance'],
          onlyAudits: [
            'first-meaningful-paint',
            'speed-index-metric',
            'estimated-input-latency',
            'first-interactive',
            'consistently-interactive',
          ],
        },
}).then(results => {
  fs.writeFileSync('audit.json', results);
  console.log(results.audits);
});