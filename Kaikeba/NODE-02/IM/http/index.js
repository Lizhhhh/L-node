const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());

const list = ['ccc', 'ddd'];

app.get('/', (req, res) => {
    // cors(req, res);
    res.sendFile(path.resolve('./index.html'));
})

app.get('/list', (req, res) => {
    // cors(req, res);
    res.end(JSON.stringify(list))
})

app.post('/send', (req, res) => {
    // cors(req, res);
    list.push(req.body.message);
    res.end(JSON.stringify(list))
})

app.post('/clear', (req, res) => {
    // cors(req, res);
    list.length = 0;
    res.end(JSON.stringify(list))
})

app.listen(3000, () => {
    console.log(`[Server] server is running at http://localhost:3000 `);
})


function cors(req, res) {
    // res.setHeader("Content-Type", "text/json");
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader("Access-Control-Allow-Headers", "X-Token,Content-Type");
}