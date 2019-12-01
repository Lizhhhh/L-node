const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect('mongodb://localhost/course', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

const close = async () => {
    await mongoose.connection.close();
}

module.exports = { connect, close }