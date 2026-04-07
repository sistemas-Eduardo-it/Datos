// --- LÓGICA DE LA SIMULACIÓN DE CAYVER ---

const mockInventoryData = [
    { sku: "MEX-9812", desc: "Válvula Reguladora de Presión 3/4\"", local: 45, state: "OK", action: "N/A" },
    { sku: "MTR-0045", desc: "Motor Trifásico 5HP (Carcasa Aluminio)", local: 3, state: "CRÍTICO", action: "ORDENAR YA" },
    { sku: "BMB-3310", desc: "Bomba Centrífuga Industrial 10GPM", local: 12, state: "OK", action: "N/A" },
    { sku: "TB-FE-012", desc: "Tubería Hierro Galvanizado 2\" (Tramo 6m)", local: 88, state: "OK", action: "N/A" },
    { sku: "F-RVS-99", desc: "Filtro de Acero Inoxidable (Repuesto)", local: 1, state: "CRÍTICO", action: "ORDENAR YA" }
];

const tableBody = document.getElementById('cayver-data-body');
const syncStatus = document.getElementById('sync-status');
const lastSyncTime = document.getElementById('last-sync-time');
const syncButton = document.getElementById('sync-button');

function updateDashboardData() {
    tableBody.innerHTML = ''; // Limpiar tabla
    
    // Simular variación aleatoria de datos localmente
    mockInventoryData.forEach(item => {
        // Simulación: los valores críticos pueden cambiar ligeramente
        if (item.state === "CRÍTICO") {
            item.local = Math.floor(Math.random() * 5) + 1;
        } else {
            item.local = Math.floor(Math.random() * 50) + 30;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.sku}</td>
            <td>${item.desc}</td>
            <td>${item.local} unidades</td>
            <td class="${item.state === 'CRÍTICO' ? 'stock-critico' : 'stock-ok'}">${item.state}</td>
            <td><span class="${item.action !== 'N/A' ? 'accion-req' : ''}">${item.action}</span></td>
        `;
        tableBody.appendChild(row);
    });

    // Actualizar Timestamp
    const now = new Date();
    lastSyncTime.innerText = `Última actualización (simulada): ${now.toLocaleTimeString()}`;
}

function simulateSync() {
    syncButton.disabled = true;
    syncButton.innerHTML = 'Sincronizando... <i class="fas fa-spinner fa-spin"></i>';
    syncStatus.innerText = 'Sincronizando...';
    syncStatus.style.background = '#fef3c7'; // Amarillo alerta
    syncStatus.style.color = '#92400e';

    // Simular el retraso del proceso de extracción (C++/SQL)
    setTimeout(() => {
        updateDashboardData();
        syncStatus.innerText = 'Sincronizado';
        syncStatus.style.background = '#d1fae5'; // Verde OK
        syncStatus.style.color = '#065f46';
        syncButton.disabled = false;
        syncButton.innerHTML = 'Sincronizar Manualmente <i class="fas fa-sync-alt"></i>';
    }, 1800);
}

syncButton.addEventListener('click', simulateSync);

// Carga inicial
updateDashboardData();


// --- LÓGICA DEL EFECTO TYPEWRITER (PROFESIONAL) ---

const typewriterText = document.getElementById('typewriter-text');
const words = [
    "Arquitectura de Middleware ERP (Cayver)",
    "Sincronización SQL Server <-> MySQL",
    "Administración de Servidores Ubuntu (VMWare)",
    "Optimización Full Stack con C++ / PHP / Python"
];
let wordIdx = 0, charIdx = 0, deleting = false;

function playTyping() {
    const currentWord = words[wordIdx];
    typewriterText.innerText = currentWord.substring(0, charIdx);
    
    let typingSpeed = deleting ? 40 : 80;

    if (!deleting && charIdx < currentWord.length) {
        charIdx++;
    } else if (deleting && charIdx > 0) {
        charIdx--;
    } else {
        deleting = !deleting;
        if (!deleting) wordIdx = (wordIdx + 1) % words.length;
        typingSpeed = 1800; // Pausa profesional al final
    }
    setTimeout(playTyping, typingSpeed);
}

window.onload = playTyping;
