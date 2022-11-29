const express = require('express')
const handlebars = require('express-handlebars')
const app= express()
const productsRouter = require('./routes/products')
const { Server } = require('socket.io');
const server = app.listen(8080,()=> console.log("Servidor corriendo"))

// config
app.engine('handlebars', handlebars.engine())
app.set('views', './public/views')
app.set('view engine', 'ejs')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('views'))
app.use(express.static('public'))



app.use("/",productsRouter)
app.use("/products",productsRouter)

const mensajes = []

const io= new Server(server)

usuario="andres"


io.on('connection', (socket) => {
console.log("Usuario conectado")
socket.emit('message',`Bienvenido${usuario}`)
socket.on('disconnect',()=>{
    console.log("Usuario desconectado")
})
})

io.on('set-name', (name) => {
    console.log('set-name', name);
    socket.emit('user-connected', name);
    socket.broadcast.emit('user-connected', name);
});


io.on('new-message', (message) => {
    cajaChat.push(message);
    socket.emit('messages', messages);
    socket.broadcast.emit('messages', messages);})


