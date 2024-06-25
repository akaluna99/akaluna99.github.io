$(document).ready(function() {
    // Función para manejar el evento de soltar la imagen en el dropzone
    $('#dropzone').on('drop', function(e) {
        e.preventDefault();
        let file = e.originalEvent.dataTransfer.files[0];
        let reader = new FileReader();
        reader.onload = function(event) {
            $('#uploaded-image').attr('src', event.target.result);
        };
        reader.readAsDataURL(file);
    });

    // Evitar comportamiento predeterminado al arrastrar y soltar
    $(document).on('dragenter', function(e) {
        e.preventDefault();
    });
    $(document).on('dragover', function(e) {
        e.preventDefault();
    });

    // Función para centrar la imagen en las guías al 50% vertical y horizontal
    $('#uploaded-image').on('load', function() {
        let image = $(this);
        let container = $('#image-container');
        let containerWidth = container.width();
        let containerHeight = container.height();
        let imageWidth = image.width();
        let imageHeight = image.height();

        let leftPos = (containerWidth - imageWidth) / 2;
        let topPos = (containerHeight - imageHeight) / 2;

        image.css({
            'position': 'absolute',
            'left': leftPos,
            'top': topPos
        });
    });
});
