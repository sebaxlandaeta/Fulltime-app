'use strict';

// BOTONES DEL HEADER
const sectionPrincipal = document.getElementById('main');
const navButtons = document.querySelectorAll('.list-items');
// SECTIONS DEL MAIN
const sections = [
    document.getElementById('clock'),
    document.getElementById('timer'),        
    document.getElementById('chronometer'), 
    document.getElementById('alarm'),
];

// FUNCIÓN PARA MOSTRAR EL SECTION
function showSection(indexToDisplay) {
    sections.forEach((section, index) => {
        if (index === indexToDisplay) {
            section.style.display = indexToDisplay === 0 ? 'block' : 'flex';
          
        } else {
            section.style.display = 'none';
        }
    });
}

// ASIGNAMOS EL EVENTO A CADA BOTON DEL HEADER
navButtons.forEach((button, index) => {
    button.onclick = () => {
        sectionPrincipal.style.display = 'none';
        showSection(index)     
    };
});