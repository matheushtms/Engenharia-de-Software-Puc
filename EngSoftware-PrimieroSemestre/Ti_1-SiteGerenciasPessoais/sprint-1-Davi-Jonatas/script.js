async function carregarDados() {
    const response = await fetch('dados.json');
    const data = await response.json();
    return data;
}

function calculaGastos() {
    const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
    const dados = getItensBD();

    const gastosMensais = {};
    const gastosSemanais = {};

    // Função para formatar datas em intervalos semanais
    function getSemana(data) {
        const diaInicio = new Date(data);
        diaInicio.setDate(diaInicio.getDate() - diaInicio.getDay()); // Início da semana (domingo)
        const diaFim = new Date(diaInicio);
        diaFim.setDate(diaFim.getDate() + 6); // Fim da semana (sábado)

        const formatarData = (data) =>
            `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1)
                .toString()
                .padStart(2, '0')}/${data.getFullYear()}`;

        return `${formatarData(diaInicio)} a ${formatarData(diaFim)}`;
    }

    // Processa os dados do localStorage
    dados.forEach((item) => {
        const data = new Date(item.data);
        const mesAno = `${data.toLocaleString('default', { month: 'long' })}/${data.getFullYear()}`;
        const semana = getSemana(data);
        const saldo = parseFloat(item.saldo);

        // Ignorar saldos positivos (considerando apenas gastos)
        if (saldo < 0) {
            const gasto = Math.abs(saldo);

            // Agrupando por mês
            if (!gastosMensais[mesAno]) {
                gastosMensais[mesAno] = { total: 0, count: 0 };
            }
            gastosMensais[mesAno].total += gasto;
            gastosMensais[mesAno].count += 1;

            // Agrupando por semana
            if (!gastosSemanais[semana]) {
                gastosSemanais[semana] = { total: 0, count: 0 };
            }
            gastosSemanais[semana].total += gasto;
            gastosSemanais[semana].count += 1;
        }
    });

    // Monta o JSON final para meses e semanas
    const relatorioMensal = {};
    for (const mesAno in gastosMensais) {
        const { total, count } = gastosMensais[mesAno];
        relatorioMensal[mesAno] = {
            media: total / count || 0,
            total: total,
        };
    }

    const relatorioSemanal = {};
    for (const semana in gastosSemanais) {
        const { total, count } = gastosSemanais[semana];
        relatorioSemanal[semana] = {
            media: total / count || 0,
            total: total,
        };
    }

    // Resultado final
    const resultado = {
        gastosRelatorio: relatorioMensal,
        gastosSemanalRelatorio: relatorioSemanal,
    };

    console.log(JSON.stringify(resultado, null, 2));
    return JSON.stringify(resultado, null, 2);
}

// Executa a função


async function renderizarGrafico(filtro = 'mensal') {
    const dados = await calculaGastos();
    var dados2
    dados2 = JSON.parse(dados);
    const gastosRelatorio = filtro === 'semanal' ? dados2.gastosSemanalRelatorio : dados2.gastosRelatorio;
    
    const labels = Object.keys(gastosRelatorio);
    const totais = labels.map(key => gastosRelatorio[key].total);
    const medias = labels.map(key => gastosRelatorio[key].media);

    const ctx = document.getElementById('graficoLinha').getContext('2d');

    if (window.grafico) {
        window.grafico.destroy();
    }

    window.grafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Total de Gastos',
                    data: totais,
                    borderColor: 'rgba(0, 175, 255, 1)',
                    backgroundColor: 'rgba(0, 175, 255, 0.2)',
                    borderWidth: 2,
                    fill: true,
                },
                {
                    label: 'Média de Gastos',
                    data: medias,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    fill: true,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Gastos (R$)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: filtro === 'semanal' ? 'Semanas' : 'Meses'
                    }
                }
            }
        }
    });

    const relatorioBody = document.querySelector('.relatorio-content tbody');
    relatorioBody.innerHTML = '';
    
    labels.forEach(periodo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${periodo}</td>
            <td>R$ ${gastosRelatorio[periodo].media}</td>
            <td>R$ ${gastosRelatorio[periodo].total}</td>
        `;
        relatorioBody.appendChild(tr);
    });
}

document.querySelector('.filtrobtn').addEventListener('click', function() {
    document.querySelector('.filtro-opcoes').classList.toggle('show');
});

document.querySelectorAll('.filtro-opcoes button').forEach(button => {
    button.addEventListener('click', function() {
        const filtro = this.getAttribute('data-filtro');
        renderizarGrafico(filtro);
        document.querySelector('.filtro-opcoes').classList.remove('show');
    });
});

document.addEventListener('click', function(event) {
    const filtroBtn = document.querySelector('.filtrobtn');
    const filtroOpcoes = document.querySelector('.filtro-opcoes');
    if (!filtroBtn.contains(event.target) && !filtroOpcoes.contains(event.target)) {
        filtroOpcoes.classList.remove('show');
    }
});

renderizarGrafico();