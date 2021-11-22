document.addEventListener("DOMContentLoaded", start);

const date =  new Date;

const fecha = {
    day : 0,
    month : 0,
    year : 0,
    hour: 0,
    minutes : 0
}


function start(){

    const botonCalcular =  document.querySelector("input[value='calcular']");
    botonCalcular.addEventListener("click", comprobarEntrada);

    const botonReinicio =  document.querySelector("input[value='reiniciar']");
    botonReinicio.addEventListener("click", borrarEntrada);


    //setInterval(actualizarSalida,1000);
}

function comprobarEntrada(){
    
    if(!validarFecha()|| !validarHora()){
        alert("Introduce una fecha y una hora válida");
        return;
    }
    
    calcularPrecio();



}

function borrarEntrada(){

}

function actualizarSalida(){
    const salida =  document.querySelector(".salida");
    const date = new Date;
    let salidaDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}  ${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()} ` ;
    salida.textContent = salidaDate;
}


function validarFecha(){
    const fechaEntrada =  document.querySelector(".fecha");
    const numeros = fechaEntrada.value.split("/");
    numeros.forEach(number => {
        if(isNaN(number)){
            return false;
        }
    });
    const numerosEnteros = numeros.map(number => parseInt(number));
    [fecha.day,fecha.month, fecha.year] = numerosEnteros;

    if(fecha.day > 0 && fecha.day <= 31 && fecha.month >= 0 && fecha.month <= 11 && fecha.year >= 2020 && fecha.year <= date.getFullYear()){
        return true;
    }
    return false;

}

function validarHora(){
    const hora = ((document.querySelector(".hora")).value).split(":");
    fecha.hour = parseInt(hora[0]);
    fecha.minutes = parseInt(hora[1]);
    if(fecha.hour < 0 || fecha.hour > 23 || fecha.minutes < 0 || fecha.minutes > 59){
        return false;
    }
    return true;

}


function calcularPrecio(){
    const dateTimeUser = (new Date(fecha.year, fecha.month, fecha.day, fecha.hour, fecha.minutes, 0, 0)).getMilliseconds();
    const actualDate = Date.now();
    let rest = actualDate - dateTimeUser;
    let minutes = Math.floor(rest/60000);
    console.log(Math.floor(minutes/60))
}