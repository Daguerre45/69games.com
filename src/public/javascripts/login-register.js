const fs = require('fs');

// Ruta al archivo JSON que contiene la información de los usuarios
const usersFilePath = '../data/users.json';

// Función para cargar usuarios desde el archivo JSON
function loadUsers() {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        return [];
    }
}

// Función para guardar usuarios en el archivo JSON
function saveUsers(users) {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error al guardar usuarios:', error);
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = loadUsers();

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert('Inicio de sesión exitoso');
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

function register() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    const users = loadUsers();

    // Verificar si el usuario ya existe
    if (users.find(u => u.username === newUsername)) {
        alert('El usuario ya existe. Por favor, elige otro nombre de usuario.');
        return;
    }

    // Guardar nuevo usuario
    const newUser = { username: newUsername, password: newPassword };
    users.push(newUser);

    saveUsers(users);

    alert('Registro exitoso. Ahora puedes iniciar sesión.');
}

function loginAsGuest() {
    document.getElementById('username').value = 'invitado';
    document.getElementById('password').value = 'invitado';
    document.getElementById('form').submit();
}
