const inputs = {
    text : "",
    seeVector : "",
    orderVector : "",
    reverseOrderVector : "",
    array : "",
    result : ""
}



document.addEventListener("DOMContentLoaded", ()=>{

    inputs.text = document.querySelector("input[name='vector']");
    inputs.seeVector = document.querySelector(".see");
    inputs.orderVector = document.querySelector(".order");
    inputs.reverseOrderVector = document.querySelector(".reverse");
    inputs.result = document.querySelector(".result");

    inputs.seeVector.addEventListener("click", seeVector);
    inputs.orderVector.addEventListener("click", order);
    inputs.reverseOrderVector.addEventListener("click", reverseOrder);


});


function seeVector(){
    if((inputs.text.value).trim() === ""){
        inputs.result.innerHTML = "Introduce valores por favor";
    }else{
        inputs.array = inputToArray();
        inputs.result.innerHTML = `[ ${inputs.array} ]`;
    }
}


function inputToArray(){
    const content = (inputs.text.value).split(",");
    const filtered = content.filter(value =>{ return value !== ""});
    return filtered;
}

function order(){
    if((inputs.text.value).trim() === ""){
        inputs.result.innerHTML = "Introduce valores por favor";
    }else{
        inputs.array = inputToArray();
        let numbers = getNumbers();
        let words = getWords();
        numbers.sort(( a, b) =>{ return a -b })
        words.sort()
        inputs.result.innerHTML = numbers.concat(words)

    }
    
}

function getNumbers(){
   const numbers = inputs.array.filter(value =>{
        return Number.isInteger(parseInt(value[0]));
    })
    return numbers;
}

function getWords(){
    const words = inputs.array.filter(value =>{
         return typeof value[0] === "string" && isNaN(value[0]);
     })
     return words;
 }



 function reverseOrder(){
    if((inputs.text.value).trim() === ""){
        inputs.result.innerHTML = "Introduce valores por favor";
    }else{
        inputs.array = inputToArray();
        let numbers = getNumbers();
        let words = getWords();
        numbers.sort(( a, b) =>{ return a - b })
        words.sort()
        numbers.reverse();
        words.reverse();
        inputs.result.innerHTML = words.concat(numbers)

    }
 }




