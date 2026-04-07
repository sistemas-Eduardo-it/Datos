document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // DEMO 1: GRÁFICA DE TIEMPOS (Estilo Cayver)
    // ==========================================
    const btnGraficar = document.getElementById('btn-graficar-tiempos');
    let chartTiempos = null;

    if (btnGraficar) {
        btnGraficar.addEventListener('click', function() {
            const placeholder = document.getElementById('chart-placeholder');
            const canvasWrapper = document.getElementById('chart-container-box');
            const canvas = document.getElementById('tiemposChart');
            
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando datos...';

            setTimeout(() => {
                placeholder.style.display = 'none';
                canvasWrapper.style.display = 'block';

                if (chartTiempos) chartTiempos.destroy();

                const ctx = canvas.getContext('2d');
                const bgColors = ['#8a6d5c', '#bfa48f', '#d6c5b3'];

                chartTiempos = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['PINTURA (57%)', 'SOLDADURA (43%)'],
                        datasets: [{
                            data: [200, 150],
                            backgroundColor: bgColors,
                            borderWidth: 2,
                            borderColor: '#ffffff',
                            hoverOffset: 10
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false, /* Importante para que no rompa la pantalla en celular */
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: { font: { family: "'Inter', sans-serif", weight: 'bold' } }
                            }
                        }
                    }
                });

                this.innerHTML = '<i class="fas fa-check"></i> Gráfica Generada';
                setTimeout(() => {
                    this.disabled = false;
                    this.innerHTML = '<i class="fas fa-chart-pie"></i> Actualizar Gráfica';
                }, 3000);

            }, 800); 
        });
    }

    // ==========================================
    // DEMO 2: RUTA LDM (Tabla vs Scroll Horizontal)
    // ==========================================
    
    // Base de datos ampliada con más ejemplos de procesos
    const ldmData = {
        'st': [
            { seq: '0010', desc: 'SOMBRILLA ESTRUCTURA (ST)', cant: 1.0 },
            { seq: '0020', desc: 'TELA CORTADA Y COSIDA', cant: 1.0 }
        ],
        'proc': [
            { seq: '0030', desc: 'CORTE Y DOBLADO DE TUBERÍA CNC', cant: 1.0 },
            { seq: '0040', desc: 'PREPARACIÓN Y SANDBLAST', cant: 1.0 },
            { seq: '0050', desc: 'SOLDADURA ESTRUCTURAL MIG', cant: 1.0 },
            { seq: '0060', desc: 'PINTURA ELECTROSTÁTICA EN HORNO', cant: 1.0 },
            { seq: '0070', desc: 'ENSAMBLE FINAL DE COMPONENTES', cant: 1.0 },
            { seq: '0080', desc: 'EMPAQUE, FLEJADO Y TARIMA', cant: 1.0 }
        ],
        'mat': [
            { seq: '0090', desc: 'TORNILLO 1/4 x 2"', cant: 12.0 },
            { seq: '0100', desc: 'TAPÓN PLÁSTICO TUBULAR', cant: 4.0 },
            { seq: '0110', desc: 'CAJA CARTÓN CORRUGADO', cant: 1.0 },
            { seq: '0120', desc: 'ETIQUETA IDENTIFICACIÓN', cant: 1.0 }
        ]
    };

    const tbodyLdm = document.getElementById('ldm-tbody');
    const containerTable = document.getElementById('ldm-table-container');
    const containerScroll = document.getElementById('ldm-scroll-container');
    const scrollContent = document.getElementById('ldm-scroll-content');
    const btnsLdm = document.querySelectorAll('.ldm-controls .btn-cat');

    function renderLdmView(type) {
        const data = ldmData[type];
        if (!data) return;

        if (type === 'proc') {
            containerTable.style.display = 'none';
            containerScroll.style.display = 'block';
            scrollContent.innerHTML = '';

            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'k-card';
                card.innerHTML = `
                    <span class="c-seq">SEQ: ${item.seq}</span>
                    <div class="k-title">⚙️ ${item.desc}</div>
                    <div class="k-qty">Cant. Requerida: ${item.cant.toFixed(2)}</div>
                `;
                scrollContent.appendChild(card);
            });
        } else {
            containerScroll.style.display = 'none';
            containerTable.style.display = 'block';
            tbodyLdm.innerHTML = '';

            data.forEach(item => {
                let color = '#292524';
                let icon = '';
                if(type === 'st') { color = '#8a6d5c'; icon = '📦 '; }
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
    }

    if (tbodyLdm) renderLdmView('st');

    btnsLdm.forEach(btn => {
        btn.addEventListener('click', function() {
            btnsLdm.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const target = this.getAttribute('data-target');
            
            if (target === 'proc') {
                containerTable.style.display = 'none';
                containerScroll.style.display = 'block';
                scrollContent.innerHTML = '<div style="padding: 20px; color: #78716c;"><i class="fas fa-spinner fa-spin"></i> Cargando flujo de procesos...</div>';
            } else {
                containerScroll.style.display = 'none';
                containerTable.style.display = 'block';
                tbodyLdm.innerHTML = '<tr><td colspan="3" style="text-align:center;"><i class="fas fa-spinner fa-spin"></i> Cargando materiales...</td></tr>';
            }
            
            setTimeout(() => {
                renderLdmView(target);
            }, 300);
        });
    });

});
