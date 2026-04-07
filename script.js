// --- SIMULACIÓN DE DATOS CAYVER (NO CAMBIA) ---

const mockInventoryData = [
    { sku: "MEX-9812", desc: "Válvula Reguladora 3/4\"", local: 45, state: "OK", action: "N/A" },
    { sku: "MTR-0045", desc: "Motor Trifásico 5HP (Alum.)", local: 3, state: "CRÍTICO", action: "ORDENAR YA" },
    { sku: "BMB-3310", desc: "Bomba Centrífuga 10GPM", local: 12, state: "OK", action: "N/A" },
    { sku: "TB-FE-012", desc: "Tubería H. Galvanizado 2\"", local: 88, state: "OK", action: "N/A" },
    { sku: "F-RVS-99", desc: "Filtro Inox. (Repuesto)", local: 1, state: "CRÍTICO", action: "ORDENAR YA" }
];

const tableBody = document.getElementById('cayver-data-body');
const syncStatus = document.getElementById('sync-status');
const lastSyncTime = document.getElementById('last-sync-time');
const syncButton = document.getElementById('sync-button');

function updateDashboardData() {
    tableBody.innerHTML = '';
    mockInventoryData.forEach(item => {
        if (item.state === "CRÍTICO") { item.local = Math.floor(Math.random() * 5) + 1; } 
        else { item.local = Math.floor(Math.random() * 40) + 30; }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.sku}</td>
            <td>${item.desc}</td>
            <td>${item.local} uds.</td>
            <td class="${item.state === 'CRÍTICO' ? 'stock-critico' : 'stock-ok'}">${item.state}</td>
            <td><span class="${item.action !== 'N/A' ? 'accion-req' : ''}">${item.action}</span></td>
        `;
        tableBody.appendChild(row);
    });
    const now = new Date();
    lastSyncTime.innerText = `Última actualización: ${now.toLocaleTimeString()}`;
}

function simulateSync() {
    syncButton.disabled = true;
    syncButton.innerHTML = 'Actualizando... <i class="fas fa-spinner fa-spin"></i>';
    syncStatus.innerText = 'Sincronizando...';
    syncStatus.style.background = '#fef3c7'; // Amarillo alerta
    syncStatus.style.color = '#92400e';

    setTimeout(() => {
        updateDashboardData();
        syncStatus.innerText = 'Sincronizado';
        syncStatus.style.background = '#d1fae5'; // Verde OK
        syncStatus.style.color = '#065f46';
        syncButton.disabled = false;
        syncButton.innerHTML = 'Actualizar Datos <i class="fas fa-sync-alt"></i>';
    }, 1200);
}

syncButton.addEventListener('click', simulateSync);
updateDashboardData(); // Carga inicial

// --- EFECTO TYPEWRITER (ACTUALIZADO CON TUS EJEMPLOS) ---

const typewriterText = document.getElementById('typewriter-text');
const words = [
    "Middleware ERP (Cayver)",
    "Plataforma Ruta-LMD (Logística)",
    "Seguimiento Integrado de Procesos",
    "Gestión de Datos & Backups Críticos"
];
let wordIdx = 0, charIdx = 0, deleting = false;

function playTyping() {
    const currentWord = words[wordIdx];
    typewriterText.innerText = currentWord.substring(0, charIdx);
    let typingSpeed = deleting ? 30 : 60;

    if (!deleting && charIdx < currentWord.length) {
        charIdx++;
    } else if (deleting && charIdx > 0) {
        charIdx--;
    } else {
        deleting = !deleting;
        if (!deleting) wordIdx = (wordIdx + 1) % words.length;
        typingSpeed = 2000;
    }
    setTimeout(playTyping, typingSpeed);
}
window.onload = playTyping;
