const socket = io();

const usuarioDestino = document.getElementById('nick').textContent;

// Escuchar eventos de mensajes desde el servidor
socket.on('mensaje', (mensaje) => {
    agregarMensaje(mensaje);

    // Guardar el mensaje en la base de datos
    guardarMensajeEnBD({
        sender: usuarioActual, // Assuming usuarioActual is defined somewhere
        receiver: usuarioDestino,
        content: mensaje
    });
});

// Función para enviar mensajes al servidor
function enviarMensaje() {
    const mensajeInput = document.getElementById('mensaje-input');
    const mensaje = mensajeInput.value;

    if (mensaje.trim() !== '') {
        socket.emit('mensaje', mensaje);

        // Limpiar el área de entrada
        mensajeInput.value = '';
    }
}

// Función para agregar mensajes al área de mensajes
function agregarMensaje(mensaje) {
    const chatMessages = document.getElementById('chat-messages');
    const nuevoMensaje = document.createElement('div');
    nuevoMensaje.className = 'message sent';
    nuevoMensaje.innerHTML = `<div class="message-content">${mensaje}</div>`;
    chatMessages.appendChild(nuevoMensaje);
}

// Evento de teclado para el área de entrada
document.getElementById('mensaje-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evitar que se añada una nueva línea en el textarea
        enviarMensaje();
    }
});

document.getElementById('salir').addEventListener('click', function() {
    // Redirigir a la página de chats
    window.location.href = '/chats';
});
