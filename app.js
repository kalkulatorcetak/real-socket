const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 2500;
var online = 0;

app.get('/', (req, res, next) => {
    res.send('Hello World!');
})

io.on('connection', (socket) => {

    online++;

    socket.on('newuser', () => {
        io.emit('new', online)
    })

    socket.on('data_masuk', (data) => {
        io.emit('data_masuk', data);
    })

    socket.on('disconnect', () => {
        online--;
        io.emit('new', online)
    })

})

http.listen(port, () => {
    console.log('Port ada di ' + port);
})