'use strict'; 

// Elementos del DOM
const timerDisplay = document.getElementById('time-chronometer');
const miliSecondsDisplay = document.getElementById('mlSeconds-chronometer');
const msjInit = document.querySelector('.msj-init');
const timerButtons = document.getElementsByClassName('btn');

// Asignación de variables para identificar los botones fácilmente
const btnIniciar = timerButtons[0];
const btnPausar = timerButtons[1];
const btnDetener = timerButtons[2];

// Variables numéricas para el tiempo.
let horas = 0;
let minutos = 0;
let segundos = 0;
let milisegundos = 0; 
let intervalo = null; 

// Logica para contar los segundos, minutos y horas.
function updateChronometer() {
    milisegundos += 10; 

    if (milisegundos === 1000) {
        segundos++;
        milisegundos = 0;
    } 

    if (segundos === 60) {
        segundos = 0;
        minutos++;
    }

    if (minutos === 60) {
        minutos = 0;
        horas++;
    }
}

// Verifica si el LocalStorage ya existe.
function existeStorage () {
    const storage = localStorage.getItem('Tiempo');
    const estado = localStorage.getItem('Estado');

    if (storage) {
        try {
            const tiempoPlano = JSON.parse(storage);
            milisegundos = tiempoPlano[0];
            segundos = tiempoPlano[1];
            minutos = tiempoPlano[2];
            horas = tiempoPlano[3];   
            mostrarTiempo();

            // Si se fue de la página estando "corriendo", inicia automáticamente y ajusta botones.
            if (estado === 'corriendo') {
                iniciarCronometro();
                btnIniciar.style.display = 'none'; 
                btnPausar.style.display = 'block'; 
                btnDetener.style.display = 'block';
            } else {
                // Si estaba pausado, mostramos Iniciar y ocultamos Pausar
                btnIniciar.style.display = 'block';
                btnPausar.style.display = 'none';
                if (milisegundos !== 0) {
                    miliSecondsDisplay.style.display = 'block';
                    btnDetener.style.display = 'block';
                } else {
                    btnDetener.style.display = 'none';
                }
            }
        } catch (e) {
            console.log('Error' + e);
        }
    } else {
        // Estado inicial por defecto si no hay localStorage
        btnIniciar.style.display = 'block';
        btnPausar.style.display = 'none';
        btnDetener.style.display = 'none';
    }
}

// Función centralizada para iniciar el temporizador.
function iniciarCronometro() {
    resetearIntervalo();
    miliSecondsDisplay.style.display = 'block';
    localStorage.setItem('Estado', 'corriendo');
    btnDetener.disabled = false; 
    
    intervalo = setInterval(() => {
       updateChronometer();
       mostrarTiempo(); 
    }, 10); 
}

// Guarda el tiempo continuamente cada 10ms en el LocalStorage.
function guardarTiempo () {
    setInterval(() => {
        const tiempo = [milisegundos, segundos, minutos, horas];
        localStorage.setItem('Tiempo', JSON.stringify(tiempo)); 
    }, 10);
}

// Limpia el intervalo correctamente cambiando la variable global.
function resetearIntervalo() {
    if (intervalo !== null) {
        clearInterval(intervalo);
        intervalo = null;
    }
}

// Muestra el tiempo en la página.
function mostrarTiempo () {
    timerDisplay.innerText = `${concatenarCero(horas)}:${concatenarCero(minutos)}:${concatenarCero(segundos)}`;
    miliSecondsDisplay.innerText = milisegundos.toString().padStart(3, '0');
}

// Resetea los valores de guardados en el localstorage y en las variables globales.
function resetearValores () {
    localStorage.removeItem('Tiempo'); 
    localStorage.removeItem('Estado'); 
    resetearIntervalo();
    horas = 0;
    minutos = 0;
    segundos = 0;
    milisegundos = 0;
    miliSecondsDisplay.style.display = 'none';
    timerDisplay.innerText = `00:00:00`;
    miliSecondsDisplay.innerText = `000`;
}

// Función para concatenar 0 al izquierda
function concatenarCero(valor) {
    return valor < 10 ? '0' + valor : valor;
}

// EJECUCIÓN INICIAL
guardarTiempo();
existeStorage();

// Evento del --> BOTÓN INICIAR
btnIniciar.onclick = () => { 
    miliSecondsDisplay.style.display = 'block';
    iniciarCronometro();
    btnIniciar.style.display = 'none'; 
    btnPausar.style.display = 'block'; 
    btnDetener.style.display = 'block'; 
    msjInit.innerText = 'Puedes pausar o detener el conteo'
}

// Evento del --> BOTÓN PAUSAR
btnPausar.onclick = () => {
    resetearIntervalo();
    localStorage.setItem('Estado', 'pausado');
    btnIniciar.style.display = 'block'; 
    btnPausar.style.display = 'none';
    msjInit.innerText = 'Puedes iniciar o detener el conteo'   
}

// Evento del --> BOTÓN DETENER
btnDetener.onclick = () => { 
    resetearValores();
    btnIniciar.style.display = 'block'; 
    btnPausar.style.display = 'none';   
    btnDetener.style.display = 'none'; 
    msjInit.innerText = '¡Presiona iniciar para comenzar el conteo!'
}