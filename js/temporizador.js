// Elementos del DOM.
const timeDisplay = document.getElementById('time-timer');
const inputs = document.querySelectorAll('.timer-input'); 
const msjCumplido = document.getElementById('time-served');
const audio = document.getElementById('audio-timer');

// Referencias de botones
const btnStart = document.getElementById('btn-iniciar');  
const btnPause = document.getElementById('btn-pausar');
const btnStop = document.getElementById('btn-detener'); 

// Variables globales que almacenan el tiempo de los inputs.
let hours = 0;
let minutes = 0;
let seconds = 0;
let countdownInterval = null;
let isPaused = false; 

// Guarda el estado actual en el localStorage basándose en la fecha de finalización
function guardarEstadoEnStorage() {
    const tiempoTotalMs = ((hours * 3600) + (minutes * 60) + seconds) * 1000;
    const endTime = Date.now() + tiempoTotalMs;

    localStorage.setItem('timer_endTime', endTime);
    localStorage.setItem('timer_isPaused', isPaused);
    // Guardamos los valores desglosados por si está pausado
    localStorage.setItem('timer_hours', hours);
    localStorage.setItem('timer_minutes', minutes);
    localStorage.setItem('timer_seconds', seconds);
}

// Limpia los datos del localStorage cuando el timer se detiene o termina
function limpiarStorage() {
    localStorage.removeItem('timer_endTime');
    localStorage.removeItem('timer_isPaused');
    localStorage.removeItem('timer_hours');
    localStorage.removeItem('timer_minutes');
    localStorage.removeItem('timer_seconds');
}

// Carga el estado al iniciar la página
function cargarEstadoDesdeStorage() {
    const storedEndTime = localStorage.getItem('timer_endTime');
    const storedIsPaused = localStorage.getItem('timer_isPaused') === 'true';

    if (!storedEndTime) return; 

    if (storedIsPaused) {
        // Si estaba pausado, recuperamos los tiempos exactos congelados
        hours = parseInt(localStorage.getItem('timer_hours')) || 0;
        minutes = parseInt(localStorage.getItem('timer_minutes')) || 0;
        seconds = parseInt(localStorage.getItem('timer_seconds')) || 0;
        isPaused = true;

        showTime(hours, minutes, seconds);
        btnPause.style.display = 'none';
        btnStop.style.display = 'block';
        btnStart.style.display = 'block';
    } else {
        // Si estaba corriendo, calculamos cuánto tiempo queda comparando con la hora actual
        const msRestantes = parseInt(storedEndTime) - Date.now();

        if (msRestantes <= 0) {
            // El tiempo ya se cumplió mientras la página estaba cerrada
            limpiarStorage();
            timeDisplay.innerText = '00:00:00';
            btnPause.style.display = 'none';
            btnStop.style.display = 'none';
            btnStart.style.display = 'block';
            return;
        }

        // Convertimos los milisegundos restantes a horas, minutos y segundos
        let totalSeconds = Math.floor(msRestantes / 1000);
        hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        minutes = Math.floor(totalSeconds / 60);
        seconds = totalSeconds % 60;

        showTime(hours, minutes, seconds);
        
        // Ajustamos la interfaz y reanudamos el intervalo
        btnPause.style.display = 'block';
        btnStop.style.display = 'block';
        btnStart.style.display = 'none';

        countdownInterval = setInterval(() => {
            updateTimer();
        }, 1000);
    }
}

// Actualiza el tiempo mediante el interval.
function updateTimer() {
    if (hours === 0 && minutes === 0 && seconds === 0) {
        limpiarIntervalo(countdownInterval);
        limpiarStorage(); 
        msjCumplido.style.display = 'block';
        btnPause.style.display = 'none';
        btnStop.innerText = 'Terminar';
        if (audio) audio.play();
        return;
    }

    seconds--;
    if (seconds < 0) {
        seconds = 59; 
        minutes--;  
            
        if (minutes < 0) {
            minutes = 59; 
            hours--;     
        }
    }

    showTime(hours, minutes, seconds);
    guardarEstadoEnStorage(); 
}

// Mostramos el tiempo en la página.
function showTime(hours, minutes, seconds) {  
    timeDisplay.innerText = `${concatenarCero(hours)}:${concatenarCero(minutes)}:${concatenarCero(seconds)}`;
}

// Valida si los inputs están vacíos o todos están en cero.
function esVacio(hours, minutes, seconds) {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;
    return h === 0 && m === 0 && s === 0;
}

// Limpia o detiene el intervalo.
function limpiarIntervalo(intervalo) {
    if (intervalo != null) {
        clearInterval(intervalo);
    }
}

// Concatena ceros a las izquierda.
function concatenarCero(value) {
    return String(value).padStart(2, '0');
}

// Valida que minutos y segundos sean menores a 60.
function validarInputs() {
    const minutes = parseInt(inputs[1].value) || 0;
    const seconds = parseInt(inputs[2].value) || 0;
    
    if (minutes >= 60 || seconds >= 60) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: `¡Los ${minutes >= 60 ? 'minutos' : 'segundos'} no pueden ser mayores o iguales a 60!`,
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "rgb(35, 112, 179)",
        });
        return true; 
    }
    return false; 
}

// Resetea el value del input.
function limpiarInputs() {
    inputs.forEach((input) => {
        input.value = '';
    })
}

// Evento del botón --> INICIAR / REANUDAR
btnStart.onclick = () => {
    msjCumplido.style.display = 'none';
    btnPause.style.display = 'block';
    btnStop.style.display = 'block';
    btnStart.style.display = 'none';

    if (isPaused) {
        isPaused = false;
        guardarEstadoEnStorage();
        countdownInterval = setInterval(() => {
           updateTimer()
        }, 1000);
        return; 
    }

    limpiarIntervalo(countdownInterval);
    const inputHours = inputs[0].value;
    const inputMinutes = inputs[1].value;
    const inputSeconds =  inputs[2].value;
        
    if (esVacio(inputHours, inputMinutes, inputSeconds) || validarInputs()) {
        btnPause.style.display = 'none';
        btnStop.style.display = 'none';
        btnStart.style.display = 'block';
        
        if (esVacio(inputHours, inputMinutes, inputSeconds)) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "¡Debes ingresar al menos un valor mayor a cero!",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(35, 112, 179)",
            });
        }
        return;
    }

    limpiarInputs();
    hours = parseInt(inputHours) || 0;
    minutes = parseInt(inputMinutes) || 0;
    seconds = parseInt(inputSeconds) || 0;
    showTime(hours, minutes, seconds);

    guardarEstadoEnStorage();

    countdownInterval = setInterval(() => {
        updateTimer();
    }, 1000);
};

// Evento del botón --> PAUSAR
btnPause.onclick = () => {
    limpiarIntervalo(countdownInterval);
    isPaused = true; 
    guardarEstadoEnStorage();
    btnPause.style.display = 'none';
    btnStart.style.display = 'block';
}

// Evento del botón --> DETENER / TERMINAR
btnStop.onclick = () => {
    limpiarIntervalo(countdownInterval);
    countdownInterval = null;
    limpiarStorage();
    
    if (audio) {
        audio.pause();
        audio.currentTime = 0; 
    }
    
    isPaused = false; 
    hours = 0;
    minutes = 0;
    seconds = 0;
    
    timeDisplay.innerText = '00:00:00';
    msjCumplido.style.display = 'none';
    btnStop.innerText = 'Detener'; 
    
    btnStop.style.display = 'none';
    btnPause.style.display = 'none';
    btnStart.style.display = 'block';
    
    limpiarInputs();
}

// Evento unificado para los botones de control (+ y -)
const controlButtons = document.querySelectorAll('.btn-controls');
controlButtons.forEach((btn) => {
    btn.onclick = (event) => {
        const fieldContainer = event.target.closest('.timer-field');
        const input = fieldContainer.querySelector('.timer-input');
        let value = parseInt(input.value) || 0;
        const esHoras = input === inputs[0];

        if (event.target.innerText === '+') {
            value++;
            if (!esHoras && value > 59) value = 59;
        } else if (event.target.innerText === '-') {
            value--;
        }

        if (value < 0) value = 0;
        input.value = concatenarCero(value);
    };
});

// Inicializar el estado de la aplicación
cargarEstadoDesdeStorage();