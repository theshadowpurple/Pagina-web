// 1. CONFIGURACIÓN DE AUDIO (Usando la ruta absoluta correcta con mayúsculas para GitHub y celular)
const musica = new Audio('https://theshadowpurple.github.io/Pagina-web/musica/amor-completo.mp3');
musica.loop = true; 
musica.load(); // Fuerza la carga en celulares

// 2. SELECCIÓN DE ELEMENTOS DEL HTML
const boton = document.getElementById('elBoton');
const botonMusica = document.getElementById('botonMusica');
const contador = document.getElementById('contador');

// FUNCIÓN AUXILIAR: Transforma segundos sueltos a formato "Minutos:Segundos" (0:00)
function formatearTiempo(segundos) {
    if (isNaN(segundos) || !isFinite(segundos)) return "0:00";
    const minutos = Math.floor(segundos / 60);
    const segRestantes = Math.floor(segundos % 60);
    return `${minutos}:${segRestantes < 10 ? '0' : ''}${segRestantes}`;
}

// EVENTO DE ESCUCHA: Se activa constantemente mientras la música avanza
musica.addEventListener('timeupdate', () => {
    const tiempoActual = formatearTiempo(musica.currentTime);
    const tiempoTotal = formatearTiempo(musica.duration);
    
    // Actualiza el texto en la pantalla en tiempo real
    if (contador) {
        contador.innerHTML = `${tiempoActual} / ${tiempoTotal}`;
    }
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

// LÓGICA DEL BOTÓN PRINCIPAL ("Toca aqui")
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
        window.close(); // Cierra la ventana del navegador
        window.location.href = "https://www.google.com"; // Respaldo por si el cel bloquea el close()
    }
});