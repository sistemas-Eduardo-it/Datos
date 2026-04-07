// 1. Seguimiento de Cursor (Mantenido)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    if(cursor.style.display !== 'none') {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

document.querySelectorAll('a, button, .interactive-row').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px'; cursor.style.height = '40px';
        cursor.style.background = 'rgba(14, 165, 233, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px'; cursor.style.height = '20px';
        cursor.style.background = 'transparent';
    });
});

// 2. Efecto Typewriter
const text = document.getElementById('typewriter-text');
const words = ["Arquitectura de Software", "Integración C++ / PHP", "Dashboards ERP (Cayver)"];
let wordIdx = 0, charIdx = 0, deleting = false;

function playTyping() {
    const currentWord = words[wordIdx];
    text.innerText = currentWord.substring(0, charIdx);
    
    if (!deleting && charIdx < currentWord.length) {
        charIdx++; setTimeout(playTyping, 80);
    } else if (deleting && charIdx > 0) {
        charIdx--; setTimeout(playTyping, 40);
    } else {
        deleting = !deleting;
        if (!deleting) wordIdx = (wordIdx + 1) % words.length;
        setTimeout(playTyping, 1500);
    }
}
playTyping();

// -------------------------------------------------------------
// 3. LÓGICA DE GRÁFICAS INTERACTIVAS (CHART.JS)
// -------------------------------------------------------------

// Configuración global para Chart.js (Tema oscuro)
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Space Grotesk', sans-serif";

// --- GRÁFICA 1: PRODUCCIÓN (Basada en tus procesos) ---
const ctxProd = document.getElementById('produccionChart').getContext('2d');
let produccionChart = new Chart(ctxProd, {
    type: 'bar',
    data: {
        labels: ['Enderezado', 'Pulido', 'Sand Blast', 'Lavado'], // Procesos de tu imagen
        datasets: [{
            label: 'Piezas Completadas (PT-25-0001)',
            data: [16, 16, 13, 17],
            backgroundColor: '#10b981', // Verde éxito
            borderRadius: 4
        }]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, title: {display: true, text: 'Avance por Proceso'} },
        scales: { y: { beginAtZero: true, max: 20, grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } }
    }
});

// Función que se ejecuta al hacer clic en la tabla
window.updateProductionChart = function(modelo, datos) {
    produccionChart.data.datasets[0].label = 'Piezas Completadas (' + modelo + ')';
    produccionChart.data.datasets[0].data = datos;
    produccionChart.update();
};

// --- GRÁFICA 2: RUTA LDM (Distribución) ---
const ctxRuta = document.getElementById('rutaChart').getContext('2d');
let rutaChart = new Chart(ctxRuta, {
    type: 'doughnut',
    data: {
        labels: ['Semi terminados', 'Procesos', 'Materiales'],
        datasets: [{
            data: [7, 10, 14],
            backgroundColor: ['#eab308', '#ef4444', '#0ea5e9'], // Amarillo, Rojo, Cyan
            borderWidth: 0
        }]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        cutout: '70%',
        plugins: { legend: { position: 'bottom' } }
    }
});

// Función para las pestañas de Ruta
window.switchTab = function(btn, tipo) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Simular actualización de estado
    const statusEl = document.getElementById('ruta-status');
    if(tipo.includes('Semi')) statusEl.innerText = "Preparación (7 uds)";
    if(tipo.includes('Proc')) statusEl.innerText = "Enderezado (12 uds)";
    if(tipo.includes('Mat')) statusEl.innerText = "Almacén Validado";
};

// --- GRÁFICA 3: MONITOREO DE SERVIDOR ---
const ctxServer = document.getElementById('serverChart').getContext('2d');
const initData = Array.from({length: 10}, () => Math.floor(Math.random() * 30) + 10);
let serverChart = new Chart(ctxServer, {
    type: 'line',
    data: {
        labels: ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', 'Now'],
        datasets: [{
            label: 'Uso de CPU (%)',
            data: initData,
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0
        }]
    },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, title: {display: true, text: 'Carga de Servidor Ubuntu'} },
        scales: { y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } }
    }
});

// Simular botón de estrés
document.getElementById('btn-stress').addEventListener('click', function() {
    this.disabled = true; this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando...';
    
    let stressInterval = setInterval(() => {
        let newData = serverChart.data.datasets[0].data.slice(1);
        newData.push(Math.floor(Math.random() * 30) + 65); // Sube el uso de CPU a 65-95%
        serverChart.data.datasets[0].data = newData;
        serverChart.update();
    }, 500);

    setTimeout(() => {
        clearInterval(stressInterval);
        this.disabled = false; this.innerHTML = '<i class="fas fa-bolt"></i> Simular Carga SQL';
        // Volver a la normalidad
        serverChart.data.datasets[0].data = initData; serverChart.update();
    }, 4000);
});

// Terminal Backup
document.getElementById('btn-backup').addEventListener('click', function() {
    const log = document.getElementById('backup-log');
    this.disabled = true;
    log.innerHTML = "> mysqldump cayver_db...<br>";
    setTimeout(() => { log.innerHTML += "> Comprimiendo .gz...<br>"; }, 800);
    setTimeout(() => { log.innerHTML += "> <span style='color:#0ea5e9'>[OK] Backup en VMWare.</span>"; this.disabled = false; }, 1800);
});
