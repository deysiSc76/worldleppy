const API_URL ="https://random-word-api.herokuapp.com/word?length=5&lang=es"; 
let intentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
let palabra1;
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];


window.addEventListener('load', init)

function init(){
    console.log('Esto se ejecuta solo cuando se carga la pagina web')
}
const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);
function intentar(){
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    const INTENTO = leerIntento();
    if (INTENTO === palabra1 ) {
        terminar("<h1>GANASTE!</h1>")
        return
    }
    
    else {
        for (let i in palabra){
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            if (INTENTO[i]===palabra1[i]){ //VERDE
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#79b851';
            } else if( palabra.includes(INTENTO[i]) ) { //AMARILLO
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#f3c237';
            } else {      //GRIS
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#a4aec4';
            }
            
            
            ROW.appendChild(SPAN)
        }
        intentos=intentos-1;
        if (intentos===0){
            terminar("<h1>PERDISTE!</h1>")
        }

   
    GRID.appendChild(ROW)

    }
}
		
    

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}


function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase(); 
    return intento;
}
fetch(API_URL).then((response) =>{
    response.json().then((body)=>{
        
        palabra1 = body[0].toUpperCase();
        console.log(palabra1);
    });
});
