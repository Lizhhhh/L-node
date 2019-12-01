const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test1', {
    poolSize: 10
});
const db = mongoose.connection;
db.on('error', err => {
    console.log(err);
});
db.on('open', () => {
    console.log('ok!');
})