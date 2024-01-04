document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('boton_cambiar_foto').addEventListener('click', function () {
        document.getElementById('input_foto').click();
    });

    document.getElementById('input_foto').addEventListener('change', function (event) {
        const fileInput = event.target;
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById('profile_image').src = e.target.result;
            };

            reader.readAsDataURL(file);
        }
    });
});
