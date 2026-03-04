// ===============================
// BASE DEL ALGORITMO A/B
// ===============================

const videojuegosBase = [
    { nombre: "The Witcher 3", puntos: 0 },
    { nombre: "Elden Ring", puntos: 0 },
    { nombre: "Fortnite", puntos: 0 },
    { nombre: "Minecraft", puntos: 0 },
    { nombre: "Call of Duty", puntos: 0 },
    { nombre: "GTA V", puntos: 0 },
    { nombre: "Zelda: Breath of the Wild", puntos: 0 },
    { nombre: "FIFA 24", puntos: 0 },
    { nombre: "League of Legends", puntos: 0 },
    { nombre: "Red Dead Redemption 2", puntos: 0 }
];

// Cargar datos guardados si existen
let videojuegos = JSON.parse(localStorage.getItem("videojuegos")) || videojuegosBase;
let historial = JSON.parse(localStorage.getItem("historial")) || [];
let totalComparaciones = historial.length;

let juegoA;
let juegoB;

const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");
const listaRanking = document.getElementById("listaRanking");
const contador = document.getElementById("contador");
const exportarRankingBtn = document.getElementById("exportarBtn");
const exportarHistorialBtn = document.getElementById("exportarHistorialBtn");

// ===============================
// SELECCIÓN A/B
// ===============================

function seleccionarJuegos() {
    const indexA = Math.floor(Math.random() * videojuegos.length);
    let indexB = Math.floor(Math.random() * videojuegos.length);

    while (indexA === indexB) {
        indexB = Math.floor(Math.random() * videojuegos.length);
    }

    juegoA = videojuegos[indexA];
    juegoB = videojuegos[indexB];

    btnA.textContent = juegoA.nombre;
    btnB.textContent = juegoB.nombre;
}

// ===============================
// VOTACIÓN
// ===============================

function votar(juegoElegido) {

    juegoElegido.puntos += 1;

    historial.push({
        juegoA: juegoA.nombre,
        juegoB: juegoB.nombre,
        ganador: juegoElegido.nombre
    });

    totalComparaciones++;
    contador.textContent = totalComparaciones;

    guardarDatos();
    actualizarRanking();
    seleccionarJuegos();
}

// ===============================
// RANKING
// ===============================

function actualizarRanking() {
    listaRanking.innerHTML = "";

    const ordenados = [...videojuegos].sort((a, b) => b.puntos - a.puntos);

    ordenados.forEach((juego, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${juego.nombre} - ${juego.puntos} pts`;
        listaRanking.appendChild(li);
    });
}

// ===============================
// GUARDAR EN LOCALSTORAGE
// ===============================

function guardarDatos() {
    localStorage.setItem("videojuegos", JSON.stringify(videojuegos));
    localStorage.setItem("historial", JSON.stringify(historial));
}

// ===============================
// EXPORTAR RANKING
// ===============================

function exportarRanking() {

    let contenido = "Posicion,Videojuego,Puntos\n";

    const ordenados = [...videojuegos].sort((a, b) => b.puntos - a.puntos);

    ordenados.forEach((juego, index) => {
        contenido += `${index + 1},${juego.nombre},${juego.puntos}\n`;
    });

    descargarCSV(contenido, "ranking_videojuegos.csv");
}

// ===============================
// EXPORTAR HISTORIAL
// ===============================

function exportarHistorial() {

    let contenido = "Juego A,Juego B,Ganador\n";

    historial.forEach(item => {
        contenido += `${item.juegoA},${item.juegoB},${item.ganador}\n`;
    });

    descargarCSV(contenido, "historial_comparaciones.csv");
}

// ===============================
// FUNCIÓN DESCARGA CSV
// ===============================

function descargarCSV(contenido, nombreArchivo) {
    const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const enlace = document.createElement("a");
    enlace.setAttribute("href", url);
    enlace.setAttribute("download", nombreArchivo);
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}

// ===============================
// EVENTOS
// ===============================

btnA.addEventListener("click", () => votar(juegoA));
btnB.addEventListener("click", () => votar(juegoB));

exportarRankingBtn.addEventListener("click", exportarRanking);
exportarHistorialBtn.addEventListener("click", exportarHistorial);

// ===============================
// INICIO
// ===============================

contador.textContent = totalComparaciones;
seleccionarJuegos();
actualizarRanking();
