const socket = io();
// La siguiente línea se comenta porque no es posible 'require' en el lado del cliente
// const Message = require('../database/models/message.model');

const usuarioDestino = document.getElementById('nick').textContent;


socket.on('mensaje', async (mensaje) => {
    agregarMensaje(mensaje, true);

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
    const contenidoMensaje = mensajeInput.value;

    if (contenidoMensaje.trim() !== '') {
        const mensaje = {
            sender: currentUser.username,
            receiver: usuarioDestino,
            content: currentUser.username + ": " + contenidoMensaje
        };

        socket.emit('mensaje', mensaje);

        socket.emit('guardarMensaje', {
            sender: currentUser.username,
            receiver: usuarioDestino,
            content: mensaje
        });

        // Limpiar el área de entrada
        mensajeInput.value = '';
    }
}


function agregarMensaje(mensaje, esUsuarioActual) {
    const chatMessages = document.getElementById('chat-messages');
    const nuevoMensaje = document.createElement('div');
    nuevoMensaje.className = `message ${esUsuarioActual ? 'sent' : 'received'}`;

    const nombreUsuario = document.createElement('div');
    nombreUsuario.className = 'usuario-nombre';
    nombreUsuario.textContent = esUsuarioActual ? '' : mensaje.sender;
    nombreUsuario.style.color = esUsuarioActual ? '#fff' : '#000';

    const mensajeContent = document.createElement('div');
    mensajeContent.className = 'message-content';
    mensajeContent.textContent = mensaje.content;

    nuevoMensaje.appendChild(nombreUsuario);
    nuevoMensaje.appendChild(mensajeContent);
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

