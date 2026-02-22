// 1. Seguimiento de Cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 2. Efecto de Escritura Mejorado
const text = document.getElementById('typewriter-text');
const words = ["Head of Systems", "Python Developer", "3D Hobbyist"];
let wordIdx = 0, charIdx = 0, deleting = false;

function playTyping() {
    const currentWord = words[wordIdx];
    text.innerText = currentWord.substring(0, charIdx);
    
    if (!deleting && charIdx < currentWord.length) {
        charIdx++;
        setTimeout(playTyping, 100);
    } else if (deleting && charIdx > 0) {
        charIdx--;
        setTimeout(playTyping, 50);
    } else {
        deleting = !deleting;
        if (!deleting) wordIdx = (wordIdx + 1) % words.length;
        setTimeout(playTyping, 1500);
    }
}

// 3. Revelación de elementos al Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.onload = playTyping;