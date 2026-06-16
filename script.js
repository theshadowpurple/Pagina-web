// 1. CONFIGURACIÓN DEL REPRODUCTOR DE AUDIO
const musica = new Audio('https://theshadowpurple.github.io/Pagina-web/musica/amor-completo.mp3');
musica.loop = true; 
musica.load(); // Fuerza la carga en dispositivos móviles

// 2. SELECCIÓN DE ELEMENTOS DEL HTML
const botonMusica = document.getElementById('botonMusica');
const contador = document.getElementById('contador');

// FUNCIÓN AUXILIAR: Transforma segundos sueltos a formato "Minutos:Segundos" (0:00)
function formatearTiempo(segundos) {
    if (isNaN(segundos) || !isFinite(segundos)) return "0:00";
    const minutos = Math.floor(segundos / 60);
    const segRestantes = Math.floor(segundos % 60);
    return `${minutos}:${segRestantes < 10 ? '0' : ''}${segRestantes}`;
}

// EVENTO DE ESCUCHA: Actualiza la barra de tiempo en tiempo real mientras la música avanza
musica.addEventListener('timeupdate', () => {
    const tiempoActual = formatearTiempo(musica.currentTime);
    const tiempoTotal = formatearTiempo(musica.duration);
    
    if (contador) {
        contador.innerHTML = `${tiempoActual} / ${tiempoTotal}`;
    }
});

// LÓGICA DEL BOTÓN DE MÚSICA (Play / Pausa)
botonMusica.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita interferencias de eventos

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


// =========================================================================
// SCRIPT DE LA GALERÍA CON ENRUTAMIENTO POR HASH (#) Y CONTROL DE INTERFAZ
// =========================================================================

// Cambia la URL en la barra de direcciones del navegador
function irAlMes(idDelMes) {
    window.location.hash = idDelMes;
}

// Limpia el hash de la URL para regresar al inicio
function volverAlInicio() {
    window.location.hash = "";
}

// Enrutador inteligente: lee la URL actual y oculta/muestra lo que corresponde
function enrutador() {
    const hashActual = window.location.hash; // Captura el "#mes-1", "#mes-2", etc.
    const seccionInicio = document.getElementById("seccion-inicio");
    const seccionGaleria = document.getElementById("seccion-galeria");
    const todosLosMeses = document.querySelectorAll('.contenedor-mes');

    // CASO A: Si estamos en la página de inicio (URL limpia sin hash)
    if (hashActual === "" || hashActual === "#") {
        if (seccionGaleria) seccionGaleria.classList.add("oculto");
        if (seccionInicio) seccionInicio.classList.remove("oculto");
        
        // Muestra el reproductor y el contador en la pantalla de inicio
        if (botonMusica) botonMusica.classList.remove("oculto");
        if (contador) contador.classList.remove("oculto");
    } 
    // CASO B: Si la URL cambió a la sección de algún mes (ej: #mes-1)
    else {
        if (seccionInicio) seccionInicio.add ? seccionInicio.classList.add("oculto") : seccionInicio.classList.add("oculto");
        if (seccionGaleria) seccionGaleria.classList.remove("oculto");
        
        // Oculta el reproductor y el contador dentro de las fotos de los meses
        if (botonMusica) botonMusica.classList.add("oculto");
        if (contador) contador.classList.add("oculto");

        // Ocultamos todos los meses para evitar que se pisen visualmente
        todosLosMeses.forEach(mes => mes.classList.add("oculto"));

        // Quitamos el carácter '#' para obtener el ID limpio del contenedor HTML (ej: "mes-1")
        const idLimpio = hashActual.replace("#", "");
        const mesActivo = document.getElementById(idLimpio);

        // Si el contenedor existe en el HTML, lo encendemos
        if (mesActivo) {
            mesActivo.classList.remove("oculto");
        }
    }
}

// Oyentes de eventos globales para monitorear los cambios de URL
window.addEventListener('hashchange', enrutador); 
window.addEventListener('load', enrutador);       


// =========================================================================
// LÓGICA PARA LA PANTALLA COMPLETA (LIGHTBOX)
// =========================================================================

// Detecta clics en las imágenes de las galerías para abrirlas en pantalla completa
document.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG" && e.target.closest(".galeria-fotos")) {
        const srcDeLaFoto = e.target.src; 
        
        const contenedorLightbox = document.getElementById("lightbox");
        const imagenLightbox = document.getElementById("img-lightbox");
        
        if (contenedorLightbox && imagenLightbox) {
            imagenLightbox.src = srcDeLaFoto; 
            contenedorLightbox.classList.remove("oculto"); 
        }
    }
});

// Función global vinculada al HTML para cerrar la imagen al hacer clic fuera o en la X
function cerrarImagen() {
    const contenedorLightbox = document.getElementById("lightbox");
    if (contenedorLightbox) {
        contenedorLightbox.classList.add("oculto"); 
    }
}