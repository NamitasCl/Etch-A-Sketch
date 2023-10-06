const AREA_DEFAULT = 640; 
const container = document.createElement('div');
const boardCont = document.createElement('div');
const board = document.createElement('div');
const pickerCont = document.createElement('div');
const sizePicker = document.createElement('input');

let color;
let colorR;
let colorG;
let colorB;

const botonBorrar = document.createElement('button');
botonBorrar.innerText = 'Borrar';
botonBorrar.classList = 'btn';
pickerCont.appendChild(botonBorrar);
botonBorrar.onclick = () => {
    const divs = document.querySelectorAll('.cuadro');
    divs.forEach(cuadro => {
        cuadro.style.backgroundColor = '';
    });
};

const botonArcoiris = document.createElement('button');
botonArcoiris.innerText = 'Arcoiris';
botonArcoiris.classList = 'btn';
pickerCont.appendChild(botonArcoiris);
let activoArcoiris = false;
botonArcoiris.onclick = () => {
    activoArcoiris = true
};

const botonGris = document.createElement('button');
botonGris.innerText = 'Default';
botonGris.classList = 'btn';
pickerCont.appendChild(botonGris);
botonGris.onclick = () => {
    activoArcoiris = false;
    color = 'darkgrey'
    console.log(color);
};



boardCont.className = 'boardCont';
boardCont.appendChild(board);

pickerCont.className = 'pickerCont';
pickerCont.appendChild(sizePicker);

container.className = 'contenedor';
board.className = 'board';

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

sizePicker.type = 'range';
sizePicker.className = 'sizepicker';
sizePicker.value = 1;
sizePicker.min = 1;
sizePicker.max = 64;
sizePicker.step = 1;
sizePicker.display = 'block';

board.style.display = 'grid';
board.style.width = `${AREA_DEFAULT}px`;
board.style.height = `${AREA_DEFAULT}px`;

container.appendChild(pickerCont);
container.appendChild(boardCont);

document.body.appendChild(container);


sizePicker.onchange = cambiador;

function generaDivs (a) {
    board.innerHTML = "";
    for(i = 1; i<=a*a; i++) {
        const cuadro = document.createElement('div');
        cuadro.className = 'cuadro';
        cuadro.addEventListener('mouseover', cambiaColor);
        cuadro.addEventListener('mousedown', cambiaColor);
        board.appendChild(cuadro);
    }
    
}

function cambiaColor(e) {
    if(e.type == 'mouseover' && !mouseDown) return;

    if(activoArcoiris) {
        colorR = Math.round((Math.random() * 1000000000000) % 255) 
        colorG = Math.round((Math.random() * 1000000000000) % 255) 
        colorB = Math.round((Math.random() * 1000000000000) % 255)

        color = `rgb(${colorR}, ${colorG}, ${colorB})`;
    }

    e.target.style.backgroundColor = color;
}

function cambiador() {
    let a = sizePicker.value;
    board.style.gridTemplateColumns = `repeat(${a}, ${AREA_DEFAULT/a}px)`;
    board.style.gridTemplateRows = `repeat(${a}, ${AREA_DEFAULT/a}px)`;
    generaDivs(a);
}