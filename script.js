document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // DEMO 1: GRÁFICA DE TIEMPOS (Estilo Cayver)
    // ==========================================
    const btnGraficar = document.getElementById('btn-graficar-tiempos');
    let chartTiempos = null;

    if (btnGraficar) {
        btnGraficar.addEventListener('click', function() {
            const wrapper = document.getElementById('chart-wrapper');
            const placeholder = document.getElementById('chart-placeholder');
            const canvas = document.getElementById('tiemposChart');
            
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando datos...';

            setTimeout(() => {
                placeholder.style.display = 'none';
                canvas.style.display = 'block';

                // Si ya existe, destruirla para redibujar
                if (chartTiempos) chartTiempos.destroy();

                const ctx = canvas.getContext('2d');
                
                // Colores en tonos Tierra/Moca de la paleta
                const bgColors = ['#8a6d5c', '#bfa48f', '#d6c5b3'];

                chartTiempos = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['PINTURA (57%)', 'SOLDADURA (43%)'],
                        datasets: [{
                            data: [200, 150], // Minutos basados en la tabla
                            backgroundColor: bgColors,
                            borderWidth: 2,
                            borderColor: '#ffffff',
                            hoverOffset: 10
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: { font: { family: "'Inter', sans-serif", weight: 'bold' } }
                            }
                        }
                    }
                });

                this.innerHTML = '<i class="fas fa-check"></i> Gráfica Generada';
                // Rehabilitar el botón después de 3 segundos por si quieren volver a darle
                setTimeout(() => {
                    this.disabled = false;
                    this.innerHTML = '<i class="fas fa-chart-pie"></i> Actualizar Gráfica';
                }, 3000);

            }, 800); // Pequeño retraso simulando carga
        });
    }

    // ==========================================
    // DEMO 2: RUTA LDM (Listado de Materiales)
    // ==========================================
    
    // Datos simulados extraídos de la lógica de tu código PHP
    const ldmData = {
        'st': [
            { seq: '0010', desc: 'SOMBRILLA ESTRUCTURA (ST)', cant: 1.0 },
            { seq: '0020', desc: 'TELA CORTADA Y COSIDA', cant: 1.0 }
        ],
        'proc': [
            { seq: '0030', desc: 'ENSAMBLE ESTRUCTURA', cant: 1.0 },
            { seq: '0040', desc: 'PINTURA ELECTROSTÁTICA', cant: 1.0 },
            { seq: '0050', desc: 'EMPAQUE FINAL', cant: 1.0 }
        ],
        'mat': [
            { seq: '0060', desc: 'TORNILLO 1/4 x 2"', cant: 12.0 },
            { seq: '0070', desc: 'TAPÓN PLÁSTICO TUBULAR', cant: 4.0 },
            { seq: '0080', desc: 'CAJA CARTÓN CORRUGADO', cant: 1.0 },
            { seq: '0090', desc: 'ETIQUETA IDENTIFICACIÓN', cant: 1.0 }
        ]
    };

    const tbodyLdm = document.getElementById('ldm-tbody');
    const btnsLdm = document.querySelectorAll('.ldm-controls .btn-cat');

    function renderTable(type) {
        tbodyLdm.innerHTML = '';
        const data = ldmData[type];
        
        if (!data) return;

        data.forEach(item => {
            // Asignar colores sutiles dependiendo del tipo para que se vea genial
            let color = '#292524';
            let icon = '';
            if(type === 'st') { color = '#8a6d5c'; icon = '📦 '; }
            if(type === 'proc') { color = '#0369a1'; icon = '⚙️ '; }
            if(type === 'mat') { color = '#b91c1c'; icon = '🔩 '; }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 800; color: #78716c;">${item.seq}</td>
                <td style="font-weight: 600; color: ${color};">${icon}${item.desc}</td>
                <td style="text-align: center; font-weight: 800;">${item.cant.toFixed(2)}</td>
            `;
            tbodyLdm.appendChild(tr);
        });
    }

    // Cargar ST por defecto
    if (tbodyLdm) renderTable('st');

    btnsLdm.forEach(btn => {
        btn.addEventListener('click', function() {
            btnsLdm.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const target = this.getAttribute('data-target');
            
            tbodyLdm.innerHTML = '<tr><td colspan="3" style="text-align:center;"><i class="fas fa-spinner fa-spin"></i> Cargando...</td></tr>';
            
            setTimeout(() => {
                renderTable(target);
            }, 300); // Simulamos carga de base de datos
        });
    });

    // ==========================================
    // DEMO 3: TERMINAL DE BACKUPS (Ubuntu)
    // ==========================================
    const btnBackup = document.getElementById('btn-backup');
    
    if (btnBackup) {
        btnBackup.addEventListener('click', function() {
            const term = document.getElementById('term-body');
            this.disabled = true;
            this.innerText = "Ejecutando proceso en segundo plano...";
            
            term.innerHTML = "<span class='text-cmd'>$ mysqldump -u admin -p cayver_db > backup_hoy.sql</span><br>";
            
            setTimeout(() => { 
                term.innerHTML += "$ Comprimiendo archivo SQL a formato .tar.gz...<br>"; 
            }, 1000);
            
            setTimeout(() => { 
                term.innerHTML += "$ Transfiriendo a servidor VMWare seguro...<br>"; 
            }, 2200);
            
            setTimeout(() => { 
                term.innerHTML += "<span class='text-success'>[OK] Respaldo finalizado y auditado correctamente en la ruta /backups/db/</span>"; 
                this.disabled = false;
                this.innerHTML = '<i class="fas fa-check"></i> Respaldo Completado';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-database"></i> Ejecutar Respaldo SQL';
                }, 4000);

            }, 3500);
        });
    }
});
