const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');


(async ()=>{
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox', '--headless']});
    const {lhr: {audits}} = await lighthouse('http://werkspot.nl/', {
        port: (new URL(browser.wsEndpoint())).port,
        output: 'json',
        logLevel: 'info',
    }, {
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
    });
    console.log('audits: ', audits);
    await browser.close();
})();