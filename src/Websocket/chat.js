const { Server } = require('socket.io');

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
    socket.emit('mensaje-saliente',data)
    socket.broadcast.emit('mensaje-saliente',data)
});

})
