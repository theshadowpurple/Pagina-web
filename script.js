// Seleccionamos el botón por su ID
const boton = document.getElementById('elBoton');

// Escuchamos cuando el usuario hace clic
boton.addEventListener('click', () => {
    alert('Te invito a tomar unas tapiocas el dia sabado, aceptas amor?');
    cancelbutton = confirm('¿Quieres aceptar la invitación?');
    if (cancelbutton) {
        alert('¡Genial! Nos vemos el sábado para disfrutar de unas deliciosas tapiocas juntos. ¡Estoy emocionado/a por nuestra cita!');
    } else {
        alert('Entiendo, no hay problema. Si cambias de opinión, estaré aquí para disfrutar de unas tapiocas contigo en otro momento. ¡Cuídate!');
    }
})