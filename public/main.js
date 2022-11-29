const socket = io()
 
// Aqui los elementos del dom
const output = document.getElementById('output')
const btn =document.getElementById("send")
const message = document.getElementById('message')
const username = document.getElementById('username')



getNow = () => {
    const FyH = new Date();
    return `${FyH.getHours()}:${FyH.getMinutes()}`;
}
const date=getNow()


 btn.addEventListener('click',function (){
    socket.emit("mensaje-saliente",{    
        username: username.value,
        message: message.value,
        date: date
    }
    )
     });
  
 
 socket.on('mensaje-saliente', function(data){
     console.log(data);
     output.innerHTML +=  
     `<div class="output">
                    <div>
                    <p class="Mensaje">${data.message}</p>
                    <p class="Username">${data.username} - ${data.date}</p>
                    </div>
                    <div class="">
                    </div>
            </div>`
 })


 





















































function agregarMensaje(mensaje) {
    const html = `<div class="contenedor"
    <div class="mensajito">
    <p>${cajaChat}</p>
    </div>
    <div class="has-text-dark">
    ${usuario} - ${fecha}
    </div>
</div>`

cajaChat.innerHTML += html;

}