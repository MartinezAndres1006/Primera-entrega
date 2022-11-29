const socket = io()

const cajaChat = document.getElementById('messages')
const btn= document.getElementById('send')
const contenido= document.getElementById('texto')
const usuario="document.getElementById('nombre')"



socket.on('newUser',alert(`bienvenido ${usuario}`))


socket.emit('set-name', usuario);
socket.on('user-connected', (name)=>{
       console.log('user-connected',name);
});



btn.addEventListener('click', () => {
    const texto = contenido.value;
    contenido.value = '';


    socket.emit('new-message', {
        user: usuario,
        text: texto,
        date: getNow()
    });
});

socket.on('messages', (messages)=>{
    console.log('mensaje recibido');
    console.log(messages);
    cajaChat.innerHTML = messages.map(message => {

      if(message.user === usuario){
      return `<div class=" is-danger is-light"
               style="text-align: justify; margin-left: 35px;     padding: 15px;
               border-radius: 20px;">
                   <div>
                   <p>${cajaChat.contenido}</p>
                   </div>
                   <div
                       style="text-align: end; font-style: italic; font-weight: 400"
                       class="has-text-dark">
                   ${cajaChat.usuario} - ${cajaChat.date}
                   </div>
           </div>`;
      }else{
       return `<div
       class="notification is-primary is-light"
       style=" text-align: justify; margin-rigth:35px;     padding: 15px;
       border-radius: 20px;">
           <div>
           <p>${cajaChat.contenido}</p>
           </div>
           <div
           style="text-align: end; font-style: italic; font-weight: 400"
           class="has-text-dark"
           >
           ${cajaChat.usuario} - ${cajaChat.date}
           </div>
       </div>`;
      }
   }).join("");
})


getNow = () => {
   const now = new Date();
   return `${now.getHours()}:${now.getMinutes()}`;}