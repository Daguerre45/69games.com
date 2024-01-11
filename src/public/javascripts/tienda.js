function updatePlayerImage(imagePath, user) {
  fetch('/tienda/updatePlayerImage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, image: imagePath }),
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to update image');
    }
  })
  .then(data => {
    console.log(data);

    // Verifica si la actualización fue exitosa y si hay datos del usuario
    if (data.success && data.user) {
      // Actualiza la cantidad de monedas en la página
      const coinsElement = document.getElementById('coins');
      if (coinsElement) {
        coinsElement.textContent =  data.user.coins;
      }
    }
  })
  .catch(error => console.error('Error:', error));
}
