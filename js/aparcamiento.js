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


    setInterval(actualizarSalida,1000);
}

function comprobarEntrada(){
    
    if(!validarFecha()|| !validarHora()){
        alert("Introduce una fecha y una hora válida");
        return;
    }
    
    calcularPrecio();
}

function borrarEntrada(){
    const fecha = document.querySelector(".fecha");
    const hora = document.querySelector(".hora");
    const precio = document.querySelector(".precio");

    fecha.value = "";
    hora.value = "";
    precio.innerHTML = "";

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
    fecha.day =  numerosEnteros[0];
    fecha.month = numerosEnteros[1] -1 ;
    fecha.year = numerosEnteros[2];

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
    const spanPrecio = document.querySelector(".precio");
    const horas = calcularDiferenciaTiempo();
    let precio = 0;
    let horasRestantes = horas;
    while(horasRestantes > 0){
        if(horasRestantes >= 24){
            horasRestantes -= 24;
            precio += 20;
        }else{
            if(precio > 0){
                precio += horasRestantes * 1.2;
                horasRestantes = 0;
            }else{
                precio += 1.5 ;
                horasRestantes--;
                precio += horasRestantes * 1.2;
                horasRestantes = 0;
            }
        }
    }
   spanPrecio.innerHTML = `${precio.toFixed(2)}€`
}

function calcularDiferenciaTiempo(){
    if(fecha.year !== 2021){
        alert("El año debe de ser el actual");
        return;
    }
    const dateTimeUser = new Date(fecha.year, fecha.month, fecha.day, fecha.hour, fecha.minutes, 0, 0);
    const actualDate = Date.now();
    if(dateTimeUser > actualDate){
        alert("La fecha de entrada es posterior a la de salida");
        return;
    }
    const rest = actualDate - dateTimeUser; // Diferencia en milisegundos
    
    const horas = Math.ceil((Math.floor(rest/60000))/60);
    return horas
}



