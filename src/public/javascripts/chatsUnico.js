const socket = io();
// La siguiente línea se comenta porque no es posible 'require' en el lado del cliente
// const Message = require('../database/models/message.model');

const usuarioDestino = document.getElementById('nick').textContent;

let usuarioActual; // Esta variable necesita ser asignada de alguna manera

socket.on('mensaje', async (mensaje) => {
    agregarMensaje(mensaje);

    // Suponemos que esta función se comunica con el servidor para guardar el mensaje
    socket.emit('guardarMensaje', {
        sender: usuarioActual,
        receiver: usuarioDestino,
        content: mensaje
    });
});

// Función para guardar mensajes en la base de datos
async function guardarMensajeEnBD(mensaje) {
    const messageInstance = new Message(mensaje);
    try {
        await messageInstance.save();
    } catch (error) {
        console.error('Error al guardar mensaje en la base de datos:', error);
    }
}

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
document.getElementById('mensaje-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evitar que se añada una nueva línea en el textarea
        enviarMensaje();
    }
});

document.getElementById('salir').addEventListener('click', function () {
    // Redirigir a la página de chats
    window.location.href = '/chats';
});

