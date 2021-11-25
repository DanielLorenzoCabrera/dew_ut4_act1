document.addEventListener("DOMContentLoaded", init);

function init() {
    let inputMail = document.querySelector('#mail');
    inputMail.addEventListener('blur',validarMail);
    
}


function validarMail() {
    let object = document.getElementById('mail');
    const message =  document.querySelector(".message");
    const valueForm = object.value;

    const patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if(valueForm.search(patron) === 0) {
        object.className = 'colorBlack';
        message.innerHTML = `El email <span>${object.value}</span> es válido`;
        return;
    }
    object.className = 'colorRed';
    message.innerHTML = `El email <span>${object.value}</span> no es válido`;
}

