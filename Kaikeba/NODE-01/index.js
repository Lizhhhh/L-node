// const express = require('express');
// const app = express();
const lxpress = require('./lxpress');
const app = lxpress();

app.get('/', (req, res) => {
    res.end('Hello Express');
})
app.get('/users',(req, res)=>{
  res.end(JSON.stringify({name: 'abc'}))
})
app.listen(3000, ()=>{
  console.log('[server] server is running at http://localhost:3000 ');
})