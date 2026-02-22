// 1. Efecto de Escritura (Typewriter)
const textElement = document.getElementById('typewriter-text');
const phrases = ["Head of Systems", "Fullstack Developer", "IT Architect"];
let i = 0, j = 0, isDeleting = false;

function type() {
    let currentPhrase = phrases[i];
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, j--);
    } else {
        textElement.textContent = currentPhrase.substring(0, j++);
    }

    if (!isDeleting && j === currentPhrase.length + 1) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 150);
    }
}

// 2. Animación al hacer Scroll (Reveal)
function reveal() {
    let reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
window.onload = () => { type(); reveal(); };