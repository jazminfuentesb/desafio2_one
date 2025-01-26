//Declaramos las variables
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

//Declaramos la función
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}
function obtenerNumeroMaximo() {
    let inputUsuario;

    // Bucle para pedir la entrada al usuario hasta que sea válida
    while (true) {
        inputUsuario = prompt("Seleccione el número máximo al que quiera jugar:", numeroMaximo);

        if (inputUsuario === null) {
            alert("No se ingresó ningún número. Debe ingresar un número");
            return numeroMaximo; // Usar el valor por defecto
        }

        let nuevoNumeroMaximo = parseInt(inputUsuario);

        if (isNaN(nuevoNumeroMaximo)) {
            alert("Entrada inválida: Debe ingresar un número.");
        } else if (!Number.isInteger(nuevoNumeroMaximo)) {
            alert("Entrada inválida: Debe ingresar un número entero.");
        } else if (nuevoNumeroMaximo <= 0) {
            alert("Entrada inválida: Debe ingresar un número mayor que cero.");
        } else {
            // Entrada válida, salir del bucle
            return nuevoNumeroMaximo;
        }
    }
}
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');
    numeroMaximo = obtenerNumeroMaximo();
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Pedir número máximo
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    
}

condicionesIniciales();