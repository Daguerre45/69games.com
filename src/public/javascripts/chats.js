function buscarUsuarios() {
    const input = document.getElementById('search-input');
    const query = input.value.trim();

    // Enviar la consulta al servidor
    fetch(`/buscarUsuarios?query=${query}`)
      .then(response => response.json())
      .then(data => mostrarResultados(data));
  }

// Función para mostrar los resultados de la búsqueda
function mostrarResultados(resultados) {
    const resultadosContainer = document.getElementById('resultados-busqueda');
    resultadosContainer.innerHTML = '';

    resultados.forEach(usuario => {
        const listItem = document.createElement('li');
        listItem.classList.add('chat-item');
        listItem.textContent = usuario.username;
        listItem.addEventListener('click', () => {
          crearChatUnico(usuario.username);
          // Añadir un nuevo chat-item al chat-list
          const nuevoChatItem = document.createElement('li');
          nuevoChatItem.classList.add('chat-item');
          nuevoChatItem.textContent = usuario.username;
          document.querySelector('.chat-list').appendChild(nuevoChatItem);
        });
        resultadosContainer.appendChild(listItem);
    });
}

// Función para crear un chat único con el usuario seleccionado
function crearChatUnico(username) {
// Redirigir a la página del chat único con el usuario seleccionado
    window.location.href = `/chatsUnico/${username}`;
}