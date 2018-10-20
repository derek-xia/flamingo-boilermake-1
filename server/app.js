const express = require('express');
const app = express();
const port = 3000;

app.get('/', function (req, res) {
    res.send('Hello World!');
})

app.listen(port, function(req, res) {
    console.log(`Example app listening on port ${port}!`);
});

// DOESN'T DO ANYTHING; Don't use this