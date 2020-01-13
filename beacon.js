const express = require('express');
const formidable = require('express-formidable');
const path = require('path');
const port = 3333;
const app = express();

app.use(formidable({
    encoding: 'utf-8',
    uploadDir: path.join(__dirname, 'uploads'),
    multiples: true,
    keepExtensions:true// req.files to be arrays of files
}));

app.use('/reports', function (req, res) {
    console.log(req.fields)
    res.status(204).end();
});

app.use('/', function (req, res) {
    res.status(200).end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));