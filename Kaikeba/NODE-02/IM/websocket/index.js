// IM服务器的实现[Soket.IO]
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', async (soket) => {
    console.log('a user conneted');

    // 响应某用户发送消息
    soket.on('chat message', async (msg) => {
        console.log('chat message: ' + msg);

        // 广播给所有人
        io.emit('chat message', msg);
        // 广播给除了发送者外所有人
        // socket.broadcast.emit('chat message', msg);
    });

    soket.on('disconnect', async () => {
        console.log('user disconnected');
    });
});

http.listen(3000, async () => {
    console.log('listening on *:3000');
})