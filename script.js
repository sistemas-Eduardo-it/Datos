// 1. Seguimiento de Cursor (CÓDIGO ORIGINAL MANTENIDO)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Cambiar tamaño del cursor en enlaces y botones
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.background = 'rgba(0, 240, 255, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.background = 'transparent';
    });
});

// 2. Efecto de Escritura Mejorado (CÓDIGO ORIGINAL MANTENIDO CON NUEVOS TEXTOS)
const text = document.getElementById('typewriter-text');
const words = ["Middleware CAYVER", "Plataforma Ruta-LMD", "Automatización en Python", "Infraestructura VMWare"];
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
playTyping();

// 3. Revelación de elementos al Scroll (CÓDIGO ORIGINAL MANTENIDO)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// -------------------------------------------------------------
// 4. LÓGICA DE LOS DEMOS INTERACTIVOS (NUEVO)
// -------------------------------------------------------------

// Demo 1: Cayver
document.getElementById('btn-cayver').addEventListener('click', function() {
    const status = document.getElementById('cayver-status');
    const tbody = document.getElementById('cayver-tbody');
    this.disabled = true;
    this.innerText = 'Procesando C++...';
    
    setTimeout(() => {
        tbody.innerHTML = `
            <tr><td>MTR-0045</td><td>15</td><td class="alert-green">OK (Repuesto)</td></tr>
            <tr><td>VLV-9812</td><td>44</td><td class="alert-green">OK</td></tr>
        `;
        status.innerText = 'Sincronizado vía MySQL';
        this.innerText = 'Datos Actualizados';
        this.style.borderColor = '#00ff66';
        this.style.color = '#00ff66';
    }, 1500);
});

// Demo 2: Ruta LMD
document.getElementById('btn-ruta').addEventListener('click', function() {
    const dest = document.getElementById('route-dest');
    this.disabled = true;
    this.innerText = 'Calculando ruta...';
    
    // Anima la barra mediante CSS inyectado
    document.getElementById('route-line').style.background = 'linear-gradient(90deg, var(--neon-purple) 100%, #333 100%)';
    
    setTimeout(() => {
        dest.classList.add('active');
        this.innerText = 'Paquete Entregado';
        this.style.borderColor = var(--neon-purple);
    }, 1000);
});

// Demo 3: Seguimiento Ticket
let progress = 50;
document.getElementById('btn-ticket').addEventListener('click', function() {
    if(progress < 100) {
        progress += 50;
        document.getElementById('ticket-progress').style.width = progress + '%';
        document.getElementById('ticket-status').innerText = progress === 100 ? 'Completado (100%)' : 'En Progreso ('+progress+'%)';
        if(progress === 100) {
            this.innerText = 'Ticket Cerrado';
            this.disabled = true;
        }
    }
});

// Demo 4: Terminal Backups
document.getElementById('btn-backup').addEventListener('click', function() {
    const term = document.getElementById('term-body');
    this.disabled = true;
    term.innerHTML = "> Iniciando mysqldump...<br>";
    
    setTimeout(() => { term.innerHTML += "> Comprimiendo a .tar.gz...<br>"; }, 800);
    setTimeout(() => { term.innerHTML += "> Enviando a VMWare Backup Server...<br>"; }, 1600);
    setTimeout(() => { 
        term.innerHTML += "> <span style='color:#fff'>[OK] Respaldo finalizado con éxito.</span>"; 
        this.innerText = 'Backup Completado';
    }, 2400);
});
