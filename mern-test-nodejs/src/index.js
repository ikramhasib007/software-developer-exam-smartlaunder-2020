const express = require('express')
const socketio = require('socket.io')
const path = require('path')
require('./db/mongoose')
var cors = require('cors')
const http = require('http')
const userRouter = require('./routers/users')
const fundriserRouter = require('./routers/products')
const app = express();
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const eventemitter = require('./events');

const server = http.createServer(app)
io = socketio(server)

const port = process.env.PORT;

const publicdirectory = path.join(__dirname, './public')

app.use(express.static(publicdirectory))
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(fundriserRouter)


io.on('connection', (socket) => {
    console.log('user connected');
    eventemitter.on('newBid', () => {
        console.log('new prod');
        socket.emit('newBid')
    });

})

server.listen(port, async () => {
    let res = await User.find({ admin: true })
    if (res.length === 0) {
        let adminPass = await bcrypt.hash('admin', 8);
        let adminUser = new User({ email: "admin@admin.com", password: adminPass, admin: true })
        adminUser.save().then(() => {
            console.log('admin created successfully credentials are email: "admin@admin.com", password: "admin"');
        })
    }
    console.log('Server is on port' + port);
})
