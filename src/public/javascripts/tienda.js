function updatePlayerImage(imagePath) {
    fetch('/tienda/updatePlayerImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: "<%= username %>", // Replace with the actual user data
        image: imagePath,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update image');
        }
      })
      .then(data => {
        // Handle the response if needed
        console.log(data);
      })
      .catch(error => console.error('Error:', error));
  }
  