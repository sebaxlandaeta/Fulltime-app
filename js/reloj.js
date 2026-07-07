'use strict';

// TRADUCCIÓN DE CONTINENTES A PAISES.
const traduccionesZonas = {
    Asia: {
        'Tokyo': 'Japón (Tokio)',
        'Shanghai': 'China (Shanghái)',
        'Urumqi': 'China (Urumqi)',
        'Hong_Kong': 'Hong Kong',
        'Seoul': 'Corea del Sur (Seúl)',
        'Pyongyang': 'Corea del Norte (Pyongyang)',
        'Kolkata': 'India (Calcuta)',
        'Calcutta': 'India (Calcuta)',
        'Singapore': 'Singapur',
        'Bangkok': 'Tailandia (Bangkok)',
        'Jakarta': 'Indonesia (Yakarta)',
        'Makassar': 'Indonesia (Macasar)',
        'Jayapura': 'Indonesia (Jayapura)',
        'Manila': 'Filipinas (Manila)',
        'Kuala_Lumpur': 'Malasia (Kuala Lumpur)',
        'Ho_Chi_Minh': 'Vietnam (Ho Chi Minh)',
        'Taipei': 'Taiwán (Taipéi)',
        'Dubai': 'Emiratos Árabes (Dubái)',
        'Riyadh': 'Arabia Saudita (Riad)',
        'Jerusalem': 'Israel (Jerusalén)',
        'Beirut': 'Líbano (Beirut)',
        'Tehran': 'Irán (Teherán)',
        'Baghdad': 'Irak (Bagdad)',
        'Dhaka': 'Bangladés (Daca)',
        'Karachi': 'Pakistán (Karachi)',
        'Kathmandu': 'Nepal (Katmandú)',
        'Colombo': 'Sri Lanka (Colombo)',
        'Vladivostok': 'Rusia (Vladivostok)',
        'Yakutsk': 'Rusia (Yakutsk)',
        'Novosibirsk': 'Rusia (Novosibirsk)',
        'Qatar': 'Catar (Doha)',
        'Doha': 'Catar (Doha)',
        'Maldives': 'Maldivas'
    },
    America: {
        'New_York': 'Estados Unidos (Nueva York)',
        'Chicago': 'Estados Unidos (Chicago)',
        'Denver': 'Estados Unidos (Denver)',
        'Los_Angeles': 'Estados Unidos (Los Ángeles)',
        'Anchorage': 'Estados Unidos (Alaska)',
        'Phoenix': 'Estados Unidos (Arizona)',
        'Mexico_City': 'México (CDMX)',
        'Cancun': 'México (Cancún)',
        'Tijuana': 'México (Tijuana)',
        'Bogota': 'Colombia (Bogotá)',
        'Buenos_Aires': 'Argentina (Buenos Aires)',
        'Cordoba': 'Argentina (Córdoba)',
        'Sao_Paulo': 'Brasil (São Paulo)',
        'Noronha': 'Brasil (Fernando de Noronha)',
        'Manaus': 'Brasil (Amazonas)',
        'Caracas': 'Venezuela (Caracas)',
        'Lima': 'Perú (Lima)',
        'Santiago': 'Chile (Santiago)',
        'Guayaquil': 'Ecuador (Guayaquil)',
        'Asuncion': 'Paraguay (Asunción)',
        'Montevideo': 'Uruguay (Montevideo)',
        'La_Paz': 'Bolivia (La Paz)',
        'Panama': 'Panamá',
        'Costa_Rica': 'Costa Rica',
        'Havana': 'Cuba (La Habana)',
        'Toronto': 'Canadá (Toronto)',
        'Vancouver': 'Canadá (Vancouver)'
    },
    Europe: {
        'Madrid': 'España (Madrid)',
        'Paris': 'Francia (París)',
        'London': 'Reino Unido (Londres)',
        'Berlin': 'Alemania (Berlín)',
        'Rome': 'Italia (Roma)',
        'Moscow': 'Rusia (Moscú)',
        'Athens': 'Grecia (Atenas)',
        'Zurich': 'Suiza (Zúrich)',
        'Istanbul': 'Turquía (Estambul)',
        'Lisbon': 'Portugal (Lisboa)',
        'Amsterdam': 'Países Bajos (Ámsterdam)',
        'Brussels': 'Bélgica (Bruselas)',
        'Vienna': 'Austria (Viena)',
        'Prague': 'República Checa (Praga)',
        'Warsaw': 'Polonia (Varsovia)',
        'Budapest': 'Hungría (Budapest)',
        'Stockholm': 'Suecia (Estocolmo)',
        'Oslo': 'Noruega (Oslo)',
        'Copenhagen': 'Dinamarca (Copenhague)',
        'Dublin': 'Irlanda (Dublín)',
        'Helsinki': 'Finlandia (Helsinki)',
        'Bucharest': 'Rumanía (Bucarest)',
        'Kyiv': 'Ucrania (Kiev)',
        'Kiev': 'Ucrania (Kiev)',
        'Belgrade': 'Serbia (Belgrado)',
        'Sofia': 'Bulgaria (Sofía)',
        'Reykjavik': 'Islandia (Reikiavik)',
        'Luxembourg': 'Luxemburgo',
        'Monaco': 'Mónaco',
        'Andorra': 'Andorra',
        'Malta': 'Malta'
    },
    Africa: {
        'Cairo': 'Egipto (El Cairo)',
        'Johannesburg': 'Sudáfrica (Johannesburgo)',
        'Casablanca': 'Marruecos (Casablanca)',
        'Nairobi': 'Kenia (Nairobi)',
        'Tunis': 'Túnez',
        'Lagos': 'Nigeria (Lagos)',
        'Tripoli': 'Libia (Trípoli)',
        'Algiers': 'Argelia (Argel)',
        'Khartoum': 'Sudán (Jartum)',
        'Addis_Ababa': 'Etiopía (Adís Abeba)',
        'Dakar': 'Senegal (Dakar)',
        'Accra': 'Ghana (Acra)',
        'Luanda': 'Angola (Luanda)',
        'Dar_es_Salaam': 'Tanzania (Dar es Salaam)',
        'Maputo': 'Mozambique (Maputo)',
        'Abidjan': 'Costa de Marfil (Abiyán)',
        'Harare': 'Zimbabue (Harare)',
        'Asmara': 'Eritrea (Asmara)',
        'Antananarivo': 'Madagascar (Antananarivo)'
    },
    Pacific: {
        'Honolulu': 'Estados Unidos (Hawái)',
        'Auckland': 'Nueva Zelanda (Auckland)',
        'Fiji': 'Fiyi',
        'Galapagos': 'Ecuador (Islas Galápagos)',
        'Easter': 'Chile (Isla de Pascua)',
        'Port_Moresby': 'Papúa Nueva Guinea (Port Moresby)',
        'Guam': 'Guam (EE.UU)',
        'Tahiti': 'Polinesia Francesa (Tahití)',
        'Samoa': 'Samoa (Apia)',
        'Chatham': 'Nueva Zelanda (Islas Chatham)',
        'Noumea': 'Nueva Caledonia (Nouméa)',
        'Rarotonga': 'Islas Cook (Rarotonga)',
        'Tarawa': 'Kiribati (Tarawa)',
        'Palau': 'Palaos'
    },
    Atlantic: {
        'Canary': 'España (Islas Canarias)',
        'Azores': 'Portugal (Azores)',
        'Cape_Verde': 'Cabo Verde (Praia)'
    },
    Australia: {
        'Sydney': 'Australia (Sídney)',
        'Perth': 'Australia (Perth)',
        'Melbourne': 'Australia (Melbourne)',
        'Brisbane': 'Australia (Brisbane)',
        'Adelaide': 'Australia (Adelaida)',
        'Darwin': 'Australia (Darwin)',
        'Hobart': 'Australia (Hobart)'
    },
    Indian: {
        'Mauritius': 'Mauricio',
        'Seychelles': 'Seychelles'
    }
};

// BUSCAMOS LOS ELEMENTOS DEL DOM
const clockTime = document.getElementById('clock-time');
const clockDate = document.getElementById('clock-date');
const dataList = document.getElementById('zonas-horarias');
const spanZone = document.getElementById('zone');
const btnSearch = document.getElementById('btn-search');
const countryContainer = document.querySelector('.country-time__container');
const inputSearch = document.getElementById('input-search'); 

// ZONAS HORARIAS
const zonaHoraria = Intl.DateTimeFormat().resolvedOptions().timeZone;
const listaZonasHorarias = Intl.supportedValuesOf('timeZone');

// ARREGLO GLOBAL DE LAS CARDS INSERTADAS
let activeCards = [];

// Arreglo en memoria para guardar todas las opciones generadas en español
let todasLasOpciones = [];

// FUNCIÓN PARA MOSTRAR EL GMT
function formatGMT(zonaIana) {
    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: zonaIana,
            timeZoneName: 'longOffset'
        });
        
        const parts = formatter.formatToParts(new Date());
        const gmtString = parts.find(part => part.type === 'timeZoneName').value; 

        if (gmtString === 'GMT' || gmtString === 'UTC') {
            return 'GMT+00';
        }

        const [gmtConHora] = gmtString.split(':');
        return gmtConHora;
    } catch (error) {
        return 'GMT+00';
    }
}

// FUNCIÓN PARA ACTUALIZAR LA HORA LOCAL
function updateClock() {
    const now = new Date();
    
    const horaLimpia = now.toLocaleTimeString('en-US', {
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        timeZone: zonaHoraria
    });

    const ciudadLocal = zonaHoraria.split('/')[1].replace('_', ' ');
    const gmtFormateado = formatGMT(zonaHoraria);

    clockTime.innerText = horaLimpia;
    spanZone.innerText = `${ciudadLocal} ${gmtFormateado}`;
}

// FUNCIÓN PARA ACTUALIZAR LA FECHA LOCAL
function updateDate() {
    const now = new Date();
    const fechaFormateada = now.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: zonaHoraria
    });

    const fechaFinal = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
    clockDate.innerText = 'Hoy es ' + fechaFinal;
}

// FUNCIÓN PARA ACTUALIZAR TODAS LAS CARDS DINÁMICAMENTE
function updateActiveCards() {
    const now = new Date();

    activeCards.forEach( cardData => {
        const horaCard = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: cardData.zonaIana
        });

        const timeContainer = cardData.element.querySelector('.card__time');
        if (timeContainer) {
            timeContainer.innerText = horaCard;
        }
    });
}

// IMPRIMIR EL DATALIST CON SOPORTE COMPLETO EN ESPAÑOL Y ORDENAR ALFABÉTICAMENTE
function inicializarDatosZonas() {
    let opcionesTemporales = [];

    listaZonasHorarias.forEach((zone) => {
        if (!zone.includes('/') || zone.startsWith('Etc/') || zone.startsWith('SystemV/')) return;

        const [continente, ...resto] = zone.split('/');
        const ciudad = resto.join('/').replace(/_/g, ' ');

        // Valor por defecto si no se encuentra mapeado explícitamente
        let nombreFinalOption = ciudad;
        if (traduccionesZonas[continente]) {
            const claveEncontrada = Object.keys(traduccionesZonas[continente]).find(key => zone.includes(key));
            if (claveEncontrada) {
                nombreFinalOption = traduccionesZonas[continente][claveEncontrada];
            }
        }

        // Casos excepcionales o dinámicos que no son 1 a 1
        if (continente === 'Asia' && zone.includes('India') && !zone.includes('Kolkata') && !zone.includes('Calcutta')) {
            nombreFinalOption = `India (${ciudad})`; 
        }

        if (zone.startsWith('US/')) {
            nombreFinalOption = `EE.UU (${ciudad})`;
        }

        opcionesTemporales.push({ textoMostrar: nombreFinalOption, ianaZone: zone });
    });

    // Ordenamos alfabéticamente la lista basándonos en el nombre en español
    opcionesTemporales.sort((a, b) => a.textoMostrar.localeCompare(b.textoMostrar, 'es'));

    todasLasOpciones = opcionesTemporales;
}

// RENDERIZA OPCIONES EN EL DATALIST FILTRANDO ÚNICAMENTE LAS QUE COMIENZAN CON EL TEXTO INTRODUCIDO
function renderizarDatalistFiltrado(textoBusqueda) {
    dataList.innerHTML = ''; 
    
    const textoLimpioBusqueda = limpiarTexto(textoBusqueda);

    todasLasOpciones.forEach(opcion => {
        const textoOpcionLimpio = limpiarTexto(opcion.textoMostrar);
        
        if (textoOpcionLimpio.startsWith(textoLimpioBusqueda)) {
            const newOption = document.createElement('option');
            newOption.value = opcion.textoMostrar;
            newOption.dataset.zone = opcion.ianaZone;
            dataList.appendChild(newOption);
        }
    });
}

// FUNCIÓN AUXILIAR PARA QUITAR ACENTOS Y NORMALIZAR EL TEXTO
function limpiarTexto(texto) {
    return texto
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""); 
}

// FUNCIÓN PARA CREAR Y AGREGAR UNA NUEVA TARJETA DE TIEMPO
function crearTarjetaZonaHoraria() {
    const valorInputLimpio = limpiarTexto(inputSearch.value);
    
    const opcionSeleccionada = todasLasOpciones.find (
        opcion => limpiarTexto(opcion.textoMostrar) === valorInputLimpio
    );

    if (inputSearch.value.trim() === '') {
        mostrarAlert('¡No puedes ingresar un valor vacío!');
        return;
    } else if (!opcionSeleccionada) {
        mostrarAlert('¡Debes seleccionar una opción válida de la lista!');
        return;
    }

    const zonaBuscada = opcionSeleccionada.ianaZone;
    const now = new Date();

    const horaCard = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: zonaBuscada
    });

    const gmtFormateadoCard = formatGMT(zonaBuscada);

    const fechaCard = now.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        timeZone: zonaBuscada
    });
    const fechaFinalCard = fechaCard.charAt(0).toUpperCase() + fechaCard.slice(1);

    const card = document.createElement('div');
    card.classList.add('country-time__card');

    card.innerHTML = `
        <h3 class="card__title">${opcionSeleccionada.textoMostrar}</h3>
        <div>
            <div class="card__time">${horaCard}</div>
            <div class="card__date">${fechaFinalCard}.</div>
            <div class="card__gtm-zone">${gmtFormateadoCard}</div>
        </div>
    `;

    countryContainer.appendChild(card);

    activeCards.push({
        zonaIana: zonaBuscada,
        element: card
    });

    inputSearch.value = '';
    inputSearch.removeAttribute('list');
}

// FUNCIÓN PARA ALERTAS DE SWEETALERT
function mostrarAlert(msj) {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: msj,
        background: "#ffffff", 
        color: "#333333",
        confirmButtonColor: "#176ab9",
        confirmButtonText: "Aceptar",
    });
}

// FUNCIÓN PRINCIPAL
function initClock() {
    updateClock();
    updateDate();
    updateActiveCards();
}

// Inicialización de la app
inicializarDatosZonas(); 
initClock();
setInterval(initClock, 1000);

// EVENTO CLICK DEL BOTON BUSCAR
btnSearch.addEventListener('click', crearTarjetaZonaHoraria);

// EVENTO INPUT PARA MOSTRAR EL DATALIST
inputSearch.addEventListener('input', (e) => {
    const valor = e.target.value;
    const valorLimpio = limpiarTexto(valor);

    const esSeleccionExacta = todasLasOpciones.some (
        opcion => limpiarTexto(opcion.textoMostrar) === valorLimpio
    );

    if (valor.trim().length <= 1 || esSeleccionExacta) {
        inputSearch.removeAttribute('list');
        dataList.innerHTML = '';
        return; 
    }

    renderizarDatalistFiltrado(valor);
    inputSearch.setAttribute('list', 'zonas-horarias');
});