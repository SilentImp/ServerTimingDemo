const express = require('express');
const reportTo = require('report-to');
const NEL = require('network-error-logging');
const earlyHints = require('early-hints');

const port = 4000;
const app = express();

const reportTo = 'http://localhost:4000/reports/';
// const reportTo = 'https://fb1953ab.ngrok.io/reports/';

app.use(NEL({
    "report_to":"default",
    "max_age":0,
    "include_subdomains":true
}));

app.use(reportTo({
    groups: [
		{
            "group":"default",
            "max_age":0,
            "endpoints":[{"url":reportTo}],
            "include_subdomains":true
        }
	]
}))

app.use('/104.js', function (req, res, next) {
    res.set('Content-Type','application/javascript');
    res.status(500).end();
    next();
});

app.use('/reports/', function (req, res, next) {
    console.log(req.headers);
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.status(200).end();
    next();
});

app.use(/^\//, function (req, res, next) {
    // res.set('Report-To', `{"max_age": 10886400,"endpoints": [{"url": "/report/"}]}`);
    res.status(200).end(`<!DOCTYPE html><html><head><title>reporting api</title><script>
    <!--
        document.registerElement('fancy');
    // -->
    <\/script><script src="http://localhost:4000/104.js"></script></head><body>blocked content</body></html>`);
});

app.use(express.static('static'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));