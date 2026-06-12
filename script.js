const musica = new Audio('https://theshadowpurple.github.io/Pagina-web/musica/amor-completo.mp3');
// Seleccionamos el botón por su ID
const boton = document.getElementById('elBoton');
const botonMusica = document.getElementById('botonMusica');
const contador = document.getElementById('contador');
const musica = new Audio('./musica/amor-completo.mp3');
musica.loop = true; // Reproducir en bucle
musica.load(); // Carga la música para evitar retrasos al reproducir

// FUNCIÓN AUXILIAR: Transforma segundos sueltos a formato "Minutos:Segundos" (0:00)
function formatearTiempo(segundos) {
    if (isNaN(segundos)) return "0:00";
    const minutos = Math.floor(segundos / 60);
    const segRestantes = Math.floor(segundos % 60);
    // Agrega un cero a la izquierda si los segundos son menores a 10
    return `${minutos}:${segRestantes < 10 ? '0' : ''}${segRestantes}`;
}

// EVENTO DE ESCUCHA: Se activa constantemente mientras la música avanza
musica.addEventListener('timeupdate', () => {
    const tiempoActual = formatearTiempo(musica.currentTime);
    const tiempoTotal = formatearTiempo(musica.duration);
    
    // Actualiza el texto en la pantalla en tiempo real
    contador.innerHTML = `${tiempoActual} / ${tiempoTotal}`;
});



// LÓGICA DEL BOTÓN DE MÚSICA (Play / Pausa)
botonMusica.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita interferencias

    if (musica.paused) {
        musica.play()
            .then(() => {
                botonMusica.innerHTML = "Pausar música ⏸️";
                
                botonMusica.style.color = "#000000";
            })
            .catch(error => console.log("Error al reproducir:", error));
    } else {
        musica.pause();
        botonMusica.innerHTML = "Reanudar música 🎵";
        
        botonMusica.style.color = "#000000";
    }
});

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
        alert('¿Cómo que no? 😱');
        musica.pause();
        window.close(); // Cierra la ventana del navegador
    }

});