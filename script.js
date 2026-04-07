const text = document.getElementById('typewriter-text');
const words = [
    "Desarrollo Full Stack (PHP / C++)",
    "Gestión de Infraestructura Crítica",
    "Arquitectura de Bases de Datos SQL",
    "Automatización de Procesos TI"
];
let wordIdx = 0, charIdx = 0, deleting = false;

function playTyping() {
    const currentWord = words[wordIdx];
    text.innerText = currentWord.substring(0, charIdx);
    
    let typingSpeed = deleting ? 50 : 100;

    if (!deleting && charIdx < currentWord.length) {
        charIdx++;
    } else if (deleting && charIdx > 0) {
        charIdx--;
    } else {
        deleting = !deleting;
        if (!deleting) wordIdx = (wordIdx + 1) % words.length;
        typingSpeed = 1500; // Pausa al final de la palabra
    }
    setTimeout(playTyping, typingSpeed);
}

window.onload = playTyping;
