// BASE DEL ALGORITMO (modelo CourseMash adaptado a videojuegos)

const videojuegos = [
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

let juegoA;
let juegoB;
let totalComparaciones = 0;

const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");
const listaRanking = document.getElementById("listaRanking");
const contador = document.getElementById("contador");

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

function votar(juegoElegido) {
    juegoElegido.puntos += 1;
    totalComparaciones++;
    contador.textContent = totalComparaciones;

    actualizarRanking();
    seleccionarJuegos();
}

function actualizarRanking() {

    listaRanking.innerHTML = "";

    const ordenados = [...videojuegos].sort((a, b) => b.puntos - a.puntos);

    ordenados.forEach((juego, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${juego.nombre} - ${juego.puntos} pts`;
        listaRanking.appendChild(li);
    });
}

btnA.addEventListener("click", () => votar(juegoA));
btnB.addEventListener("click", () => votar(juegoB));

seleccionarJuegos();
actualizarRanking();
