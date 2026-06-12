// Seleccionamos el botón por su ID
const boton = document.getElementById('elBoton');
const musica = new Audio('./musica/amor-completo.mp3');
musica.loop = true; // Reproducir en bucle

window.onload = () => {
    musica.play().catch(error => {
        console.log("Autoplay bloqueado por el navegador. Esperando interacción del usuario.");
    });
};
// Escuchamos cuando el usuario hace clic
boton.addEventListener('click', () => {
    // confirm() abre la ventana con dos opciones (Aceptar / Cancelar)
    const acepto = confirm('Te invito a tomar una tapioca el dia sabado, aceptas amor?');
    
    // Si le da clic a "Aceptar", la variable 'acepto' será true
    if (acepto) {
        alert('¡Siii! Sabía que aceptarías. 🧋✨ Nos vemos el sábado, te amo.');
    } else {
        musica.pause();
        // Si le da clic a "Cancelar" (No acepto)
        alert('¿Cómo que no? 😱 Jajaja, ¡inténtalo de nuevo! ❤️');
        
        window.close(); // Cierra la ventana del navegador
    }

});