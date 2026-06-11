// Seleccionamos el botón por su ID
const boton = document.getElementById('elBoton');

// Escuchamos cuando el usuario hace clic
boton.addEventListener('click', () => {
    // confirm() abre la ventana con dos opciones (Aceptar / Cancelar)
    const acepto = confirm('Te invito a tomar una tapioca el dia sabado, aceptas amor?');
    
    // Si le da clic a "Aceptar", la variable 'acepto' será true
    if (acepto) {
        alert('¡Siii! Sabía que aceptarías. 🧋✨ Nos vemos el sábado, te amo.');
    } else {
        // Si le da clic a "Cancelar" (No acepto)
        alert('¿Cómo que no? 😱 Jajaja, ¡inténtalo de nuevo! ❤️');
    }
});