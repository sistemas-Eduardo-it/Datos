document.addEventListener('DOMContentLoaded', () => {

    // 1. EFECTO REVEAL AL HACER SCROLL (Elegancia visual)
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => revealOnScroll.observe(reveal));


    // 2. SIMULADOR DE MÓDULO IA (Nuevo)
    const btnRunAi = document.getElementById('btn-run-ai');
    const aiResponseLine = document.getElementById('ai-typewriter');
    
    if (btnRunAi) {
        btnRunAi.addEventListener('click', function() {
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Analizando con IA...';
            
            aiResponseLine.style.display = 'block';
            aiResponseLine.innerHTML = ''; // Limpiar
            
            const aiText = "Diagnóstico completado: Se detecta un cuello de botella del 43% en el Centro de Trabajo 'SOLDADURA'. Recomendación: Redistribuir cargas de trabajo de la orden PT-25-0001 o habilitar línea paralela para optimizar tiempos de entrega.";
            let i = 0;
            
            setTimeout(() => {
                const typeWriter = setInterval(() => {
                    if (i < aiText.length) {
                        aiResponseLine.innerHTML += aiText.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeWriter);
                        btnRunAi.innerHTML = '<i class="fas fa-check"></i> Diagnóstico Finalizado';
                        btnRunAi.classList.replace('btn-action', 'btn-outline');
                    }
                }, 20); // Velocidad de tipeo
            }, 500);
        });
    }


    // 3. GRÁFICA DE TIEMPOS (Colores Corporativos Premium)
    const btnGraficar = document.getElementById('btn-graficar-tiempos');
    let chartTiempos = null;

    if (btnGraficar) {
        btnGraficar.addEventListener('click', function() {
            const placeholder = document.getElementById('chart-placeholder');
            const canvasWrapper = document.getElementById('chart-container-box');
            const canvas = document.getElementById('tiemposChart');
            const wrapper = document.getElementById('chart-wrapper');
            
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Consultando BD...';

            setTimeout(() => {
                placeholder.style.display = 'none';
                canvasWrapper.style.display = 'block';
                wrapper.style.border = 'none'; // Quitar borde punteado
                wrapper.style.background = 'transparent';

                if (chartTiempos) chartTiempos.destroy();

                const ctx = canvas.getContext('2d');
                // Paleta Premium: Slate 800, Teal 500, Slate 300
                const bgColors = ['#1e293b', '#14b8a6', '#cbd5e1'];

                chartTiempos = new Chart(ctx, {
                    type: 'doughnut', // Doughnut luce más profesional en dashboards SaaS que Pie
                    data: {
                        labels: ['PINTURA (57%)', 'SOLDADURA (43%)'],
                        datasets: [{
                            data: [200, 150],
                            backgroundColor: bgColors,
                            borderWidth: 0,
                            hoverOffset: 5
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '70%', // Efecto anillo delgado
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: { font: { family: "'Inter', sans-serif", size: 12 }, color: '#475569' }
                            }
                        }
                    }
                });

                this.innerHTML = '<i class="fas fa-sync-alt"></i> Actualizar Datos';
                this.disabled = false;
            }, 800); 
        });
    }

    // 4. LÓGICA DE PESTAÑAS LDM (Estilo SaaS)
    const ldmData = {
        'st': [
            { seq: '0010', desc: 'SOMBRILLA ESTRUCTURA (ST)', cant: 1.0 },
            { seq: '0020', desc: 'TELA CORTADA Y COSIDA', cant: 1.0 }
        ],
        'proc': [
            { seq: '0030', desc: 'CORTE Y DOBLADO DE TUBERÍA CNC', cant: 1.0 },
            { seq: '0040', desc: 'PREPARACIÓN Y SANDBLAST', cant: 1.0 },
            { seq: '0050', desc: 'SOLDADURA ESTRUCTURAL MIG', cant: 1.0 },
            { seq: '0060', desc: 'PINTURA ELECTROSTÁTICA EN HORNO', cant: 1.0 }
        ],
        'mat': [
            { seq: '0090', desc: 'TORNILLO 1/4 x 2"', cant: 12.0 },
            { seq: '0100', desc: 'TAPÓN PLÁSTICO TUBULAR', cant: 4.0 },
            { seq: '0110', desc: 'CAJA CARTÓN CORRUGADO', cant: 1.0 }
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
                    <div class="c-seq">SEQ: ${item.seq}</div>
                    <div class="k-title">${item.desc}</div>
                    <div class="k-qty">Cant: ${item.cant.toFixed(2)}</div>
                `;
                scrollContent.appendChild(card);
            });
        } else {
            containerScroll.style.display = 'none';
            containerTable.style.display = 'block';
            tbodyLdm.innerHTML = '';

            data.forEach(item => {
                const tr = document.createElement('tr');
                let iconColor = type === 'st' ? 'color: var(--teal-600);' : 'color: var(--slate-400);';
                let icon = type === 'st' ? '<i class="fas fa-cube" style="'+iconColor+' margin-right:8px;"></i>' : '<i class="fas fa-circle" style="font-size:8px; '+iconColor+' margin-right:10px;"></i>';
                
                tr.innerHTML = `
                    <td style="color: var(--slate-500); font-family: monospace;">${item.seq}</td>
                    <td>${icon} ${item.desc}</td>
                    <td style="text-align: right; font-weight: 700;">${item.cant.toFixed(2)}</td>
                `;
                tbodyLdm.appendChild(tr);
            });
        }
    }

    if (tbodyLdm) renderLdmView('st'); // Carga inicial

    btnsLdm.forEach(btn => {
        btn.addEventListener('click', function() {
            btnsLdm.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const target = this.getAttribute('data-target');
            
            // Simular carga ligera
            if(target !== 'proc'){
                tbodyLdm.innerHTML = '<tr><td colspan="3" style="text-align:center; padding: 20px; color: var(--slate-400);"><i class="fas fa-circle-notch fa-spin"></i> Cargando...</td></tr>';
            } else {
                scrollContent.innerHTML = '<div style="padding: 20px; color: var(--slate-400); width:100%; text-align:center;"><i class="fas fa-circle-notch fa-spin"></i> Cargando procesos...</div>';
            }

            setTimeout(() => { renderLdmView(target); }, 250);
        });
    });
});
