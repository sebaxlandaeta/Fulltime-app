// ELEMENTOS DEL DOM
const selects = document.querySelectorAll('.alarm__select');
const contenedorAlarmas = document.getElementsByClassName('alarm__list')[0];
const noAlarmsMessage = document.querySelector('.no-alarms');
const alarmList = document.querySelector('.alarm__list');
const spanError = document.getElementById('alarm__error');
const btnAdd = document.getElementById('btn__add-alarm');
const currentTimeDisplay = document.getElementById('current-time-display');
const currentPeriodoDisplay = document.getElementById('current-period-display');
const audioAlarm = document.getElementById('audio-alarm');

// Array global para almacenar las alarmas activas
let alarmasActivas = [];

// CONFIGURACIÓN DE ZONA HORARIA
const ZONA_HORARIA_OBJETIVO = Intl.DateTimeFormat().resolvedOptions().timeZone; 

// Rellena los selectores numéricos
function imprimirOptions(inicio, fin, parent) {
    if (!parent) return;
    for (let i = inicio; i <= fin; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = i < 10 ? '0' + i : i;
        parent.appendChild(option);
    }
}

// Controla si se muestra el mensaje de "No hay alarmas" o la lista de alarmas
function actualizarEstadoLista() {
    if (!noAlarmsMessage) return;
    
    if (alarmasActivas.length === 0) {
        noAlarmsMessage.style.display = 'block';
        alarmList.style.display = 'none';
    } else {
        noAlarmsMessage.style.display = 'none'; 
        alarmList.style.display = 'block';
    }
}

// Carga las alarmas guardadas en LocalStorage al iniciar la página
function cargarAlarmasDeLocalStorage() {
    const alarmasGuardadas = localStorage.getItem('mis_alarmas');
    if (alarmasGuardadas) {
        alarmasActivas = JSON.parse(alarmasGuardadas);
        // Volvemos a dibujar cada alarma en la pantalla
        alarmasActivas.forEach(alarma => {
            imprimirAlarma(alarma.id, alarma.hora, alarma.minuto, alarma.periodo);
        });
    }
    actualizarEstadoLista(); // Verifica el estado al cargar los datos
}

// Renderiza la alarma en la interfaz
function imprimirAlarma(id, hora, minuto, periodo) {
    const alarmItem = document.createElement('div');
    alarmItem.classList.add('alarm__item');
    alarmItem.setAttribute('data-id', id);
    alarmItem.innerHTML = `
        <div class="alarm__time-wrapper">
            <span class="alarm__time">${hora}:${minuto} ${periodo}</span>
        </div>
        <div class="alarm__actions">
            <button class="alarm__button alarm__button--delete">Eliminar</button>
            <button class="alarm__button alarm__button--stop">Detener</button>
        </div>
    `;

    const btnEliminar = alarmItem.querySelector('.alarm__button--delete');
    const btnDetener = alarmItem.querySelector('.alarm__button--stop');

    // Por defecto, el botón detener empieza oculto
    btnDetener.style.display = 'none';

    // Evento para Eliminar la alarma por completo
    btnEliminar.onclick = () => {
        if (btnDetener.style.display === 'block') {
            btnDetener.click(); 
        }
        alarmItem.remove();
        
        // Filtramos el array y actualizamos LocalStorage
        alarmasActivas = alarmasActivas.filter(alarma => alarma.id !== id);
        guardarEnLocalStorage();
        actualizarEstadoLista(); // Verifica si la lista quedó vacía para mostrar el mensaje
    };

    // Evento para Detener la música de la alarma
    btnDetener.onclick = () => {
        if (audioAlarm) {
            audioAlarm.pause();
            audioAlarm.currentTime = 0; 
            audioAlarm.loop = false;    
        }
        btnDetener.style.display = 'none';
        btnEliminar.style.display = 'block';
    };

    contenedorAlarmas.appendChild(alarmItem);
}

// RELOJ Y MONITOREO BASADO EN ZONA HORARIA ESPECÍFICA
function iniciarRelojyMonitoreo() {
    setInterval(() => {
        const ahora = new Date();

        const horaLocalString = ahora.toLocaleTimeString('en-US', {
            timeZone: ZONA_HORARIA_OBJETIVO,
            timeZoneName: 'short',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const [tiempo, periodo] = horaLocalString.split(' ');
        const [horasString, minutos, segundos] = tiempo.split(':');

        if (currentTimeDisplay) {
            currentTimeDisplay.innerHTML = `${horasString}:${minutos}:${segundos} <span id="period">${periodo}</span>`;
            currentPeriodoDisplay.innerText = `${ZONA_HORARIA_OBJETIVO}`
        }

        if (segundos === "00") {
            alarmasActivas.forEach(alarma => {
                if (alarma.hora === horasString && alarma.minuto === minutos && alarma.periodo === periodo) {
                    dispararAlarma(alarma.id); 
                }
            });
        }
    }, 1000);
}

// Acción al activarse la alarma
function dispararAlarma(id) {
    if (audioAlarm) {
        audioAlarm.loop = true; 
        audioAlarm.play().catch(error => {
            console.log("Interactúa con la página para permitir reproducción de audio:", error);
        });
    }

    const alarmItem = document.querySelector(`[data-id="${id}"]`);
    if (alarmItem) {
        const btnEliminar = alarmItem.querySelector('.alarm__button--delete');
        const btnDetener = alarmItem.querySelector('.alarm__button--stop');

        if (btnEliminar) btnEliminar.style.display = 'none';
        if (btnDetener) btnDetener.style.display = 'block';
    }
}

// Guarda el estado actual del array en LocalStorage
function guardarEnLocalStorage() {
    localStorage.setItem('mis_alarmas', JSON.stringify(alarmasActivas));
}

// EVENTO DE AGREGAR ALARMA
btnAdd.onclick = () => {
    if (selects[0].value === "" || selects[1].value === "") {
        if (spanError) {
            spanError.innerText = 'La hora y los minutos son obligatorios.';
            spanError.style.display = 'block';
        }   
    } else {
        if (spanError) {
            spanError.innerText = '';
            spanError.style.display = 'none';
        }
        
        // 1. Primero capturamos los valores reales que eligió el usuario
        const selectHora = String(selects[0].value).padStart(2, '0');
        const selectMinutos = String(selects[1].value).padStart(2, '0');
        const selectPeriodo = selects[2].value;
        const idUnico = Date.now(); 

        // 2. Guardamos en nuestro array global
        alarmasActivas.push({
            id: idUnico,
            hora: selectHora,
            minuto: selectMinutos,
            periodo: selectPeriodo
        });

        // 3. Dibujamos en pantalla y respaldamos en LocalStorage
        imprimirAlarma(idUnico, selectHora, selectMinutos, selectPeriodo);
        guardarEnLocalStorage();
        actualizarEstadoLista(); // Oculta el mensaje de lista vacía

        // 4. ¡Y POR ÚLTIMO limpiamos los selectores para la siguiente alarma!
        for (let i = 0; i < selects.length - 1 ; i++) {
            selects[i].value = '';
        }
    }
};

// INICIALIZACIÓN
const defaultOptionHora = document.createElement('option');
defaultOptionHora.value = "";
defaultOptionHora.innerText = "HH";
selects[0].appendChild(defaultOptionHora);

const defaultOptionMin = document.createElement('option');
defaultOptionMin.value = "";
defaultOptionMin.innerText = "MM";
selects[1].appendChild(defaultOptionMin);

imprimirOptions(1, 12, selects[0]);
imprimirOptions(0, 59, selects[1]);

// Cargar datos previos antes de iniciar el monitoreo
cargarAlarmasDeLocalStorage();
actualizarEstadoLista(); // Asegura el estado inicial correcto

// Arrancar el reloj y el monitoreo
iniciarRelojyMonitoreo();