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


// logica del websocket
const mensajes = []

const io= new Server(server)

usuario="Andres"

io.on('connection', (socket) => {
console.log("Usuario conectado", socket.id)

socket.on('disconnect',()=>{
    console.log("Usuario desconectado", socket.id)
})

socket.on('mensaje-saliente', (data) => {
    mensajes.push(data);
    console.log(data);
    io.sockets.emit('mensaje-saliente',data)
});

})

