document.addEventListener("DOMContentLoaded", start);

const partida = {
    palabra : "",
    letrasCorrectas : [],
    letrasIncorrectas: [],
    errores : 0
}

const palabras = ["chocolate", "papiroflexia","pasatiempo", "feromonas","sombra", "solsticio", "vacaciones", "desarrollador", "aguacate","Polonio","Armario","servilleta"];



function start(){
    reiniciarValores();
    generarPalabra();
    mostrarPalabra();

    const enviarLetra =  document.querySelector(".letra");
    enviarLetra.addEventListener("keyup", chequearLetra);

    


}


function generarPalabra(){
    const randNum =  Math.floor(Math.random() * palabras.length);
    partida.palabra = palabras[randNum];
}

function mostrarPalabra(){
    const palabra =  document.querySelector(".adivinar");
    let palabraOculta =  "";
    for(let i = 0; i < partida.palabra.length; i++){
        palabraOculta = palabraOculta.concat(" ","_");
    }
    palabra.textContent = palabraOculta;
}

function chequearLetra(){
    const regexp = /^[a-zA-Z]+$/gi;
    const letra =  this.value.toLowerCase();
    this.value = "";
    if(!isNaN(letra) || !regexp.test(letra)){
        alert("el carácter introducido no es válido")
    }else{
        buscarLetra(letra);
    }
    
}


function buscarLetra(letra){
    if(partida.letrasCorrectas.includes(letra) || partida.letrasIncorrectas.includes(letra)){
        alert("Letra ya introducida");
        return;
    }
    if(partida.palabra.includes(letra)){
        partida.letrasCorrectas.push(letra);
    }else{
        partida.letrasIncorrectas.push(letra);
        partida.errores++;
    }
    actualizarPuntuacion();
    actualizarImagen();
    actualizarPalabra();
    chequarEstadoPartida();


}


function actualizarPuntuacion(){
    const letrasCorrectas =  document.querySelector(".correctas");
    const letrasInorrectas =  document.querySelector(".incorrectas");

    letrasCorrectas.value = partida.letrasCorrectas.toString();
    letrasInorrectas.value = partida.letrasIncorrectas.toString()
}

function actualizarImagen(){
    const ahorcado = document.querySelector(".ahorcado");
    ahorcado.src = `../ahorcado/${partida.errores}.png`;


}

function reiniciarValores(){
    document.querySelector(".correctas").value = "";
    document.querySelector(".incorrectas").value = "";

}

function actualizarPalabra(){
    const palabra =  document.querySelector(".adivinar");
    let contenidoPalabra = "";
    for(let i = 0; i < partida.palabra.length; i++){
        if(partida.letrasCorrectas.includes(partida.palabra[i])){
            contenidoPalabra = contenidoPalabra.concat(partida.palabra[i]);
        }else{
            contenidoPalabra = contenidoPalabra.concat(" ","_");
        }
    }
    palabra.innerHTML = contenidoPalabra;
}

function chequarEstadoPartida(){
    const palabra =  document.querySelector(".adivinar").textContent;
    if(partida.errores === 6){
        alert("Has perdido, mala suerte");
        location.reload();
    }
    if(!palabra.includes("_")){
        alert("¡Has ganado! Vaya crack");
        location.reload();
    }
}