// Agrega aquí todas las canciones que quieras dedicarle
const listaCanciones = [
    {
        titulo: "Amor Completo 🌹",
        url: "https://theshadowpurple.github.io/Pagina-web/musica/amor-completo.mp3"
    },
    {
        titulo: "Mi Canción Favorita ❤️",
        url: "https://theshadowpurple.github.io/Pagina-web/musica/otra-cancion.mp3" // <-- Reemplaza con tus URLs reales cuando las tengas
    },
    {
        titulo: "Nuestra Historia ✨",
        url: "https://theshadowpurple.github.io/Pagina-web/musica/tercera-cancion.mp3"
    }
];

let indiceActual = 0; 
const musica = new Audio();
musica.loop = false; // Falso para que al terminar salte automáticamente a la siguiente

// SELECTORES DEL HTML
const botonMusica = document.getElementById('botonMusica');
const contador = document.getElementById('contador');
const tituloCancion = document.getElementById('titulo-cancion');

// Carga los datos de la canción en el reproductor sin darle play aún
function cargarCancion(indice) {
    if (listaCanciones[indice]) {
        musica.src = listaCanciones[indice].url;
        if (tituloCancion) {
            tituloCancion.innerHTML = `Sonando: ${listaCanciones[indice].titulo}`;
        }
        musica.load();
    }
}

// Inicializamos cargando la primera canción al abrir el sitio
cargarCancion(indiceActual);

// FUNCIÓN AUXILIAR: Transforma segundos sueltos a formato "Minutos:Segundos" (0:00)
function formatearTiempo(segundos) {
    if (isNaN(segundos) || !isFinite(segundos)) return "0:00";
    const minutos = Math.floor(segundos / 60);
    const segRestantes = Math.floor(segundos % 60);
    return `${minutos}:${segRestantes < 10 ? '0' : ''}${segRestantes}`;
}

// ACTUALIZACIÓN DE TIEMPO: Corre mientras el audio avanza
musica.addEventListener('timeupdate', () => {
    const tiempoActual = formatearTiempo(musica.currentTime);
    const tiempoTotal = formatearTiempo(musica.duration);
    
    if (contador) {
        contador.innerHTML = `${tiempoActual} / ${tiempoTotal}`;
    }
});

// CAMBIO AUTOMÁTICO: Salta a la siguiente canción al terminar la actual
musica.addEventListener('ended', () => {
    siguienteCancion();
});

// FUNCIONES DE REPRODUCCIÓN (Play / Pausa)
function reproducirAudio() {
    musica.play()
        .then(() => {
            if (botonMusica) {
                botonMusica.innerHTML = "Pausar música ⏸️";
                botonMusica.style.color = "#000000";
            }
        })
        .catch(error => console.log("Error al reproducir:", error));
}

function pausarAudio() {
    musica.pause();
    if (botonMusica) {
        botonMusica.innerHTML = "Reanudar música 🎵";
        botonMusica.style.color = "#000000";
    }
}

// Lógica de interacción del botón central de Play/Pausa
if (botonMusica) {
    botonMusica.addEventListener('click', (e) => {
        e.stopPropagation();
        if (musica.paused) {
            reproducirAudio();
        } else {
            pausarAudio();
        }
    });
}

// CONTROLES DE NAVEGACIÓN (Siguiente / Anterior)
function siguienteCancion() {
    const estabaReproduciendose = !musica.paused;
    indiceActual++;
    
    if (indiceActual >= listaCanciones.length) {
        indiceActual = 0; // Vuelve al inicio si llega al final
    }
    
    cargarCancion(indiceActual);
    if (estabaReproduciendose) reproducirAudio();
}

function anteriorCancion() {
    const estabaReproduciendose = !musica.paused;
    indiceActual--;
    
    if (indiceActual < 0) {
        indiceActual = listaCanciones.length - 1; // Va a la última si retrocede desde la primera
    }
    
    cargarCancion(indiceActual);
    if (estabaReproduciendose) reproducirAudio();
}


// =========================================================================
// 2. SCRIPT DE LA GALERÍA CON ENRUTAMIENTO POR HASH (#)
// =========================================================================

function irAlMes(idDelMes) {
    window.location.hash = idDelMes;
}

function volverAlInicio() {
    window.location.hash = "";
}

function enrutador() {
    const hashActual = window.location.hash; 
    const seccionInicio = document.getElementById("seccion-inicio");
    const seccionGaleria = document.getElementById("seccion-galeria");
    const todosLosMeses = document.querySelectorAll('.contenedor-mes');
    const reproductorContenedor = document.querySelector('.reproductor-contenedor');

    if (hashActual === "" || hashActual === "#") {
        if (seccionGaleria) seccionGaleria.classList.add("oculto");
        if (seccionInicio) seccionInicio.classList.remove("oculto");
        
        // Muestra el reproductor completo en el inicio
        if (reproductorContenedor) reproductorContenedor.classList.remove("oculto");
    } 
    else {
        if (seccionInicio) seccionInicio.classList.add("oculto"); // CORRECCIÓN: Código limpio sin ternarios raros
        if (seccionGaleria) seccionGaleria.classList.remove("oculto");
        
        // Oculta el reproductor completo dentro de las galerías
        if (reproductorContenedor) reproductorContenedor.classList.add("oculto");

        todosLosMeses.forEach(mes => mes.classList.add("oculto"));

        const idLimpio = hashActual.replace("#", "");
        const mesActivo = document.getElementById(idLimpio);

        if (mesActivo) {
            mesActivo.classList.remove("oculto");
        }
    }
}

window.addEventListener('hashchange', enrutador); 
window.addEventListener('load', enrutador);       


// =========================================================================
// 3. LÓGICA PARA LA PANTALLA COMPLETA (LIGHTBOX)
// =========================================================================

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

function cerrarImagen() {
    const contenedorLightbox = document.getElementById("lightbox");
    if (contenedorLightbox) {
        contenedorLightbox.classList.add("oculto"); 
    }
}


// =========================================================================
// 4. EFECTO DE CORAZONES FLOTANTES CON MOVIMIENTO LIBRE
// =========================================================================

function crearCorazon() {
    const corazon = document.createElement("div");
    corazon.classList.add("corazon-flotante");
    
    const models = ["❤️", "💖", "💝", "💕"];
    corazon.innerText = models[Math.floor(Math.random() * models.length)];
    
    corazon.style.left = Math.random() * 100 + "vw";
    
    const tamaño = Math.random() * 15 + 15; 
    corazon.style.fontSize = tamaño + "px";
    
    const duracion = Math.random() * 5 + 6;
    corazon.style.animationDuration = duracion + "s";
    
    const vaivenHorizontal = (Math.random() * 160 - 80) + "px";
    const inclinacionAleatoria = (Math.random() * 70 - 35) + "deg";
    
    corazon.style.setProperty('--desplazamiento-x', vaivenHorizontal);
    corazon.style.setProperty('--rotacion', inclinacionAleatoria);
    
    corazon.style.opacity = Math.random() * 0.5 + 0.3;

    document.body.appendChild(corazon);

    setTimeout(() => {
        corazon.remove();
    }, duracion * 1000);
}

setInterval(crearCorazon, 400);