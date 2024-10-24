/* eslint-disable */


const piezas = document.querySelectorAll(".PiezasJuego");
const origX = [200, 304, 446, 200];
const origY = [100, 100, 233, 204];
const winAudio = document.getElementById("win");
let marcoMadera = document.getElementById("marcoMadera");
let miDiv = document.getElementById("mi-div");
let anchoDiv = miDiv.offsetWidth;
let altoDiv = miDiv.offsetHeight;
let coordenadaLeft = miDiv.offsetLeft;
let coordenadaTop = miDiv.offsetTop;
let anchoPorcentual = anchoDiv / 100;
let altoPorcentual = altoDiv / 100;
let piecesBoard = document.getElementById("piecesBoard");
let crayon = document.getElementById("crayon");
let bodyWidth = document.body.offsetWidth;
let bodyHeight = document.body.offsetHeight;
let nivel = 1;
let ubiacionPiezas = document.getElementById("pieces");
let nextButton = document.getElementById("nextButton")
let offsetLeft = coordenadaLeft + anchoPorcentual * 105;
let offsetTop = coordenadaTop + altoPorcentual * 40;
let puzzleImg = document.getElementById("puzzleImg")
let prevButtonCheck = 0
let levelInfo = document.getElementById("level-info")

let letraA = false;
let letraB = false;
let letraC = false;
let letraD = false;

let piezaAOK = false;
let piezaBOK = false;
let piezaCOK = false;
let piezaDOK = false;

let elementoLetraA = document.getElementById("letraA");
let elementoLetraB = document.getElementById("letraB");
let elementoLetraC = document.getElementById("letraC");
let elementoLetraD = document.getElementById("letraD");

nextButton.style.left = `${coordenadaLeft + anchoPorcentual * 137}px`
nextButton.style.top = `${coordenadaTop + anchoPorcentual * 30}px`
prevButton.style.left = `${coordenadaLeft + anchoPorcentual * 117}px`
prevButton.style.top = `${coordenadaTop + anchoPorcentual * 30}px`
restartButton.style.left = `${coordenadaLeft + anchoPorcentual * 157}px`
restartButton.style.top = `${coordenadaTop + anchoPorcentual * 30}px`
restartButton.style.width = "7%"
nextButton.style.width = "7%"
prevButton.style.width = "7%"
restartButton.style.height = "4%"
nextButton.style.height = "4%"
prevButton.style.height = "4%"
restartButton.style.fontSize = "90%"
nextButton.style.fontSize = "90%"
prevButton.style.fontSize = "90%"
restartButton.style.fontSize = "90%"
nextButton.style.fontSize = "90%"
prevButton.style.fontSize = "90%"
prevButton.style.background = "url('../img/gameBoard.jpg')"; 
nextButton.style.background = "url('../img/gameBoard.jpg')"; 
restartButton.style.background = "url('../img/gameBoard.jpg')";
prevButton.style.padding = "0"; 
nextButton.style.padding = "0"; 
restartButton.style.padding = "0";
prevButton.onclick = prev; 




piecesBoard.style.left = `${coordenadaLeft + anchoPorcentual * 110}px`;
piecesBoard.style.top = `${coordenadaLeft + anchoPorcentual * 39}px`;

crayon.style.left = `${coordenadaLeft + anchoPorcentual * 187}px`;
crayon.style.top = `${coordenadaLeft + anchoPorcentual * 80}px`;

elementoLetraA.style.left = `${coordenadaLeft + anchoPorcentual * 112}px`;
elementoLetraA.style.top = `${coordenadaTop + altoPorcentual * 45}px`;
elementoLetraB.style.left = `${coordenadaLeft + anchoPorcentual * 107}px`;
elementoLetraB.style.top = `${coordenadaTop + altoPorcentual * 36}px`;
elementoLetraC.style.left = `${coordenadaLeft + anchoPorcentual * 107}px`;
elementoLetraC.style.top = `${coordenadaTop + altoPorcentual * 35}px`;
elementoLetraD.style.left = `${coordenadaLeft + anchoPorcentual * 110}px`;
elementoLetraD.style.top = `${coordenadaTop + altoPorcentual * 40}px`;

let coordenadasVariables = 0;


piezas.forEach((pieza, index) => {
  const tamWidth = [134, 192, 134, 163];
  const tamHeight = [163, 134, 163, 134];
  
  pieza.width = `${tamWidth[index]}px`;
  pieza.height = `${tamHeight[index]}px`;
  pieza.style.position = "absolute";
  
  pieza.addEventListener("mousedown", seleccionarElemento);
  pieza.addEventListener("dragstart", (e) => e.preventDefault()); // Evitar el arrastre por defecto
  });
  
  let elementSelect = null;
  let offsetX = 0;
  let offsetY = 0;
  

  function prev(){
    if (nivel>1) {
      nivel = nivel -1;
    }
    prevButtonCheck = prevButtonCheck + 1;
    testing();
  }

  function seleccionarElemento(evt) {
    elementSelect = evt.target;
    if (elementSelect.id == "letraA") {
      letraA = true;
      letraB = false;
      letraC = false;
      letraD = false;
      }
      if (elementSelect.id == "letraB") {
        letraA = false;
        letraB = true;
        letraC = false;
        letraD = false;
        }
        if (elementSelect.id == "letraC") {
          letraA = false;
          letraB = false;
          letraC = true;
          letraD = false;
          }
          if (elementSelect.id == "letraD") {
            letraA = false;
            letraB = false;
            letraC = false;
            letraD = true;
            }
            offsetX = evt.clientX - parseFloat(elementSelect.style.left);
            offsetY = evt.clientY - parseFloat(elementSelect.style.top);
            
            elementSelect.style.zIndex = elementSelect.style.zIndex + 5;
            document.addEventListener("mousemove", moverElemento);
            document.addEventListener("mouseup", soltarElemento);
            }

function moverElemento(evt) {
  const posX = evt.clientX - offsetX;
  const posY = evt.clientY - offsetY;

  elementSelect.style.left = `${posX}px`;
  elementSelect.style.top = `${posY}px`;

  iman();
}

function soltarElemento() {
  document.removeEventListener("mousemove", moverElemento);
  document.removeEventListener("mouseup", soltarElemento);
  elementSelect = null;
  testing();
}

function iman() {
  piezas.forEach((pieza) => {
    pieza.addEventListener("mouseup", () => {
      const posx = parseFloat(pieza.style.left);
      const posy = parseFloat(pieza.style.top);
      let coordenadas = 0;

      // Define las coordenadas específicas para cada pieza
      if (coordenadasVariables == 0) {
        coordenadas = {
          A: {
            left: coordenadaLeft - anchoPorcentual * 4.8,
            top: coordenadaTop - altoPorcentual * 8.5,
          },
          B: {
            left: coordenadaLeft + anchoPorcentual * 36.6,
            top: coordenadaTop - altoPorcentual * 1.8,
          },
          C: {
            left: coordenadaLeft - anchoPorcentual * 9.2,
            top: coordenadaTop + altoPorcentual * 31.4,
          },
          D: {
            left: coordenadaLeft + anchoPorcentual * 30.8,
            top: coordenadaTop + altoPorcentual * 38.6,
          },
        };
      } else {
        coordenadas = coordenadasVariables;
      }

      // Aumenta la distancia de detección a 30 píxeles
      const distanciaDeteccion = 30;

      // Verifica si la pieza se soltó cerca de las coordenadas específicas
      if (
        letraA &&
        Math.abs(posx - coordenadas.A.left) < distanciaDeteccion &&
        Math.abs(posy - coordenadas.A.top) < distanciaDeteccion
      ) {
        // Mueve la pieza a las coordenadas específicas
        pieza.style.left = `${coordenadas.A.left}px`;
        pieza.style.top = `${coordenadas.A.top}px`;

        // Desactiva la capacidad de mover la pieza
        pieza.style.pointerEvents = "none";
        piezaAOK = true;
        pieza.style.zIndex = "0";

        // Aplica una transición suave para el acomodamiento
        pieza.style.transition = "top 0.3s, left 0.3s";
      }

      if (
        letraB &&
        Math.abs(posx - coordenadas.B.left) < distanciaDeteccion &&
        Math.abs(posy - coordenadas.B.top) < distanciaDeteccion
      ) {
        // Mueve la pieza a las coordenadas específicas
        pieza.style.left = `${coordenadas.B.left}px`;
        pieza.style.top = `${coordenadas.B.top}px`;

        // Desactiva la capacidad de mover la pieza
        pieza.style.pointerEvents = "none";
        piezaBOK = true;
        pieza.style.zIndex = "0";

        // Aplica una transición suave para el acomodamiento
        pieza.style.transition = "top 0.3s, left 0.3s";
      }

      if (
        letraC &&
        Math.abs(posx - coordenadas.C.left) < distanciaDeteccion &&
        Math.abs(posy - coordenadas.C.top) < distanciaDeteccion
      ) {
        // Mueve la pieza a las coordenadas específicas
        pieza.style.left = `${coordenadas.C.left}px`;
        pieza.style.top = `${coordenadas.C.top}px`;

        // Desactiva la capacidad de mover la pieza
        pieza.style.pointerEvents = "none";
        piezaCOK = true;
        pieza.style.zIndex = "0";

        // Aplica una transición suave para el acomodamiento
        pieza.style.transition = "top 0.3s, left 0.3s";
      }

      if (
        letraD &&
        Math.abs(posx - coordenadas.D.left) < distanciaDeteccion &&
        Math.abs(posy - coordenadas.D.top) < distanciaDeteccion
      ) {
        // Mueve la pieza a las coordenadas específicas
        pieza.style.left = `${coordenadas.D.left}px`;
        pieza.style.top = `${coordenadas.D.top}px`;

        // Desactiva la capacidad de mover la pieza
        pieza.style.pointerEvents = "none";
        piezaDOK = true;
        pieza.style.zIndex = "0";

        // Aplica una transición suave para el acomodamiento
        pieza.style.transition = "top 0.3s, left 0.3s";
      }
    });
  });
}

marcoMadera.style.left = coordenadaLeft;

window.onresize = resize;

function resize() {
  miDiv = document.getElementById("mi-div");
  anchoDiv = miDiv.offsetWidth;
  altoDiv = miDiv.offsetHeight;
  coordenadaLeft = miDiv.offsetLeft;
  coordenadaTop = miDiv.offsetTop;
  bodyWidth = document.body.offsetWidth;
  bodyHeight = document.body.offsetHeight;

  if (piezaAOK) {
    elementoLetraA.style.left = `${coordenadaLeft - (anchoDiv / 100) * 5}px`;
    elementoLetraA.style.top = `${coordenadaTop - (altoDiv / 100) * 9}px`;
  } else {
    elementoLetraA.style.left = `${coordenadaLeft + (anchoDiv / 100) * 110}px`;
    elementoLetraA.style.top = `${coordenadaTop + (altoDiv / 100) * 40}px`;
  }
  if (piezaBOK) {
    elementoLetraB.style.left = `${
      coordenadaLeft - (anchoDiv / 100) * -36.4
    }px`;
    elementoLetraB.style.top = `${coordenadaTop - (altoDiv / 100) * 2}px`;
  } else {
    elementoLetraB.style.left = `${coordenadaLeft + (anchoDiv / 100) * 110}px`;
    elementoLetraB.style.top = `${coordenadaTop + (altoDiv / 100) * 36}px`;
  }
  if (piezaCOK) {
    elementoLetraC.style.left = `${coordenadaLeft - (anchoDiv / 100) * 9.2}px`;
    elementoLetraC.style.top = `${coordenadaTop - (altoDiv / 100) * -31.5}px`;
  } else {
    elementoLetraC.style.left = `${coordenadaLeft + (anchoDiv / 100) * 111}px`;
    elementoLetraC.style.top = `${coordenadaTop + (altoDiv / 100) * 35}px`;
  }
  if (piezaDOK) {
    elementoLetraD.style.left = `${
      coordenadaLeft - (anchoDiv / 100) * -30.6
    }px`;
    elementoLetraD.style.top = `${coordenadaTop - (altoDiv / 100) * -38.4}px`;
  } else {
    elementoLetraD.style.left = `${coordenadaLeft + (anchoDiv / 100) * 110}px`;
    elementoLetraD.style.top = `${coordenadaTop + (altoDiv / 100) * 35}px`;
  }

  coordenadasVariables = {
    A: {
      left: coordenadaLeft - (anchoDiv / 100) * 5,
      top: coordenadaTop - (altoDiv / 100) * 8.5,
    },
    B: {
      left: coordenadaLeft - (anchoDiv / 100) * -36.5,
      top: coordenadaTop - (altoDiv / 100) * 2,
    },
    C: {
      left: coordenadaLeft - (anchoDiv / 100) * 9.2,
      top: coordenadaTop - (altoDiv / 100) * -31.5,
    },
    D: {
      left: coordenadaLeft - (anchoDiv / 100) * -30.9,
      top: coordenadaTop - (altoDiv / 100) * -38.7,
    },
  };

  piecesBoard.style.left = `${coordenadaLeft + (anchoDiv / 100) * 110}px`;
  piecesBoard.style.top = `${coordenadaLeft + (altoDiv / 100) * 39}px`;

  crayon.style.left = `${coordenadaLeft + (anchoDiv / 100) * 180}px`;
  crayon.style.top = `${coordenadaLeft + (altoDiv / 100) * 80}px`;
  nextButton.style.left = `${coordenadaLeft + (anchoDiv / 100) * 138}px`
  nextButton.style.top = `${coordenadaTop + (altoDiv / 100) * 30}px`
  prevButton.style.left = `${coordenadaLeft + (anchoDiv / 100) * 118}px`
  prevButton.style.top = `${coordenadaTop + (altoDiv / 100) * 30}px`
  restartButton.style.left = `${coordenadaLeft + (anchoDiv / 100) * 158}px`
  restartButton.style.top = `${coordenadaTop + (altoDiv / 100) * 30}px`
}

function testing() {
  // Obtén la referencia al elemento del switch
  const switchElement = document.getElementById("Activar");
  // Verifica si el switch está activado
  if (piezaAOK && piezaBOK && piezaCOK && piezaDOK) {
    nivel = nivel + 1;
    if (prevButtonCheck>0){
      if(nivel != (1&2)){
        nivel = nivel -1;
      }
      prevButtonCheck =  0;
      testing();
    }
    Swal.fire({
      title: `¡Felicidades, avanzaste al nivel ${nivel}!`,
      width: 540,
      color: "rgb(0, 0, 0)",
      background: "#fff",
      backdrop: `
        rgba(0, 0, 0, 0.421)
        url("../img/confetti.gif")
        center top
        no-repeat
      `,
    });
    if (switchElement.checked) {
      winAudio.play();
    }
    if (nivel == 2){

    }
    let primera = document.getElementById("letraA");
    primera.style.pointerEvents = "auto";
    primera.style.transition = "none";
    piezaAOK = false;
    let segunda = document.getElementById("letraB");
    segunda.style.pointerEvents = "auto";
    segunda.style.transition = "none";
    piezaBOK = false;
    let tercera = document.getElementById("letraC");
    tercera.style.pointerEvents = "auto";
    tercera.style.transition = "none";
    piezaCOK = false;
    let cuarta = document.getElementById("letraD");
    cuarta.style.pointerEvents = "auto";
    cuarta.style.transition = "none";
    piezaDOK = false;
    primera.style.left = `${coordenadaLeft + (anchoDiv / 100) * 110}px`;
    primera.style.top = `${coordenadaTop + (altoDiv / 100) * 40}px`;
    segunda.style.left = `${coordenadaLeft + (anchoDiv / 100) * 110}px`;
    segunda.style.top = `${coordenadaTop + (altoDiv / 100) * 36}px`;
    tercera.style.left = `${coordenadaLeft + (anchoDiv / 100) * 106}px`;
    tercera.style.top = `${coordenadaTop + (altoDiv / 100) * 36}px`;
    cuarta.style.left = `${coordenadaLeft + (anchoDiv / 100) * 110}px`;
    cuarta.style.top = `${coordenadaTop + (altoDiv / 100) * 35}px`;
    
    if (nivel == 1) {
      primera.src = "../img/Elefante/A.png";
      segunda.src = "../img/Elefante/B.png";
      tercera.src = "../img/Elefante/C.png";
      cuarta.src = "../img/Elefante/D.png";
    }
    
    if (nivel == 2) {
      primera.src = "../App/img/Jirafa/A.png";
      segunda.src = "../App/img/Jirafa/B.png";
      tercera.src = "../App/img/Jirafa/C.png";
      cuarta.src = "../App/img/Jirafa/D.png";
      puzzleImg.src = "../App/img/Jirafa.jpg";
    }
    if (nivel == 3) {
      primera.src = "../App/img/Elefante/A.png";
      segunda.src = "../App/img/Elefante/B.png";
      tercera.src = "../App/img/Elefante/C.png";
      cuarta.src = "../App/img/Elefante/D.png";
    }
  }
}
