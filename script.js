// Esperar a que todo el HTML cargue para que los botones funcionen
document.addEventListener('DOMContentLoaded', () => {

    // 1. Seguimiento de Cursor (Ahora respeta el mouse original)
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '45px'; cursor.style.height = '45px';
                cursor.style.background = 'rgba(59, 130, 246, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '30px'; cursor.style.height = '30px';
                cursor.style.background = 'transparent';
            });
        });
    }

    // 2. Efecto de Escritura (Mantenido y funcionando)
    const text = document.getElementById('typewriter-text');
    if (text) {
        const words = ["Middleware CAYVER", "Administración de Servidores", "Desarrollo Full Stack PHP/C++"];
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
    }

    // ==========================================
    // LÓGICA DE BOTONES Y CAYVER (AHORA SÍ FUNCIONAN)
    // ==========================================

    // DEMO 1: Sincronización Cayver (ERP -> Web)
    const btnSync = document.getElementById('btn-sync-cayver');
    if (btnSync) {
        btnSync.addEventListener('click', function() {
            const localNum = document.getElementById('local-records');
            const cloudNum = document.getElementById('cloud-records');
            const msg = document.getElementById('sync-msg');
            
            this.disabled = true;
            this.innerText = "Extrayendo datos de ERP...";
            msg.innerText = "";
            msg.style.color = "#3b82f6";

            // Simular cambio en base de datos local
            localNum.innerText = "1,450"; 

            setTimeout(() => {
                this.innerText = "Procesando en C++ y subiendo...";
            }, 1000);

            setTimeout(() => {
                cloudNum.innerText = "1,450"; // La nube se actualiza
                msg.style.color = "#10b981";
                msg.innerText = "¡Sincronización completada con éxito!";
                this.innerText = "Simular Sincronización de ERP";
                this.disabled = false;
            }, 2500);
        });
    }

    // DEMO 2: Gráfica de Producción
    const ctxProd = document.getElementById('produccionChart');
    if (ctxProd && typeof Chart !== 'undefined') {
        const produccionChart = new Chart(ctxProd.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Enderezado', 'Pulido', 'Sand Blast', 'Lavado'],
                datasets: [{
                    label: 'Piezas Procesadas',
                    data: [0, 0, 0, 0], // Inicia vacío
                    backgroundColor: '#3b82f6',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: 20, grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } }
            }
        });

        // Botones de la tabla para graficar
        document.querySelectorAll('.btn-graficar').forEach(btn => {
            btn.addEventListener('click', function() {
                const modelo = this.getAttribute('data-modelo');
                const valores = this.getAttribute('data-vals').split(',').map(Number);
                
                produccionChart.data.datasets[0].label = 'Avance: ' + modelo;
                produccionChart.data.datasets[0].data = valores;
                produccionChart.update();
            });
        });
    }

    // DEMO 3: Pestañas de Ruta LDM
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Quitar clase active a todos
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active'); // Poner al que se le hizo clic

            const tabId = this.getAttribute('data-tab');
            const statusEl = document.getElementById('ruta-status');
            const progressEl = document.getElementById('ruta-progress');

            if (tabId === 'Semi') {
                statusEl.innerText = "Preparación de Semiterminados";
                progressEl.style.width = "30%";
            } else if (tabId === 'Proc') {
                statusEl.innerText = "Procesos en piso (Enderezado/Pulido)";
                progressEl.style.width = "65%";
            } else if (tabId === 'Mat') {
                statusEl.innerText = "Materiales y Empaque Validado";
                progressEl.style.width = "100%";
            }
        });
    });

    // DEMO 4: Botón de Backup en Terminal
    const btnBackup = document.getElementById('btn-backup');
    if (btnBackup) {
        btnBackup.addEventListener('click', function() {
            const term = document.getElementById('term-body');
            this.disabled = true;
            this.innerText = "Ejecutando...";
            
            term.innerHTML = "> Iniciando mysqldump de cayver_db...<br>";
            
            setTimeout(() => { 
                term.innerHTML += "> Comprimiendo archivo SQL a formato .tar.gz...<br>"; 
            }, 1000);
            
            setTimeout(() => { 
                term.innerHTML += "> Transfiriendo a servidor VMWare de respaldos...<br>"; 
            }, 2000);
            
            setTimeout(() => { 
                term.innerHTML += "> <span style='color:#3b82f6'>[OK] Respaldo finalizado y verificado correctamente.</span>"; 
                this.disabled = false;
                this.innerText = "Ejecutar Script de Respaldo";
            }, 3000);
        });
    }
});
