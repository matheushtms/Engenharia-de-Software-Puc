fetch('dados.json')
    .then(response => response.json())
    .then(data => {

        const dataPie = {
            labels: data.gastos.map(gasto => gasto.categoria),
            datasets: [{
                data: data.gastos.map(gasto => gasto.valor),
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
                hoverOffset: 4
            }]
        };

        const configPie = {
            type: 'pie',
            data: dataPie,
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                let value = tooltipItem.raw;
                                return 'R$ ' + value.toLocaleString('pt-BR');
                            }
                        }
                    }
                }
            }
        };

        new Chart(document.getElementById('gastosChart'), configPie);


        const dataLine = {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Gastos Totais',
                data: [3000, 3500, 4000, 4500, 5000, 5500],
                fill: false,
                borderColor: '#36a2eb',
                tension: 0.1
            }]
        };

        const configLine = {
            type: 'line',
            data: dataLine,
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                let value = tooltipItem.raw;
                                return 'R$ ' + value.toLocaleString('pt-BR');
                            }
                        }
                    }
                },
                scales: {
                    x: { display: true, title: { display: true, text: 'Mês' } },
                    y: { display: true, title: { display: true, text: 'Valor (R$)' } }
                }
            }
        };

        new Chart(document.getElementById('lineChart'), configLine);


        const gastosList = document.querySelector('.gastos ul');
        gastosList.innerHTML = '';

        data.gastos.forEach(gasto => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${gasto.categoria}:</strong> <span>R$ ${gasto.valor.toLocaleString('pt-BR')}</span>`;
            listItem.style.backgroundColor = getBackgroundColor(gasto.categoria);
            gastosList.appendChild(listItem);
        });


        function getBackgroundColor(categoria) {
            switch (categoria) {
                case 'Alimentação': return '#ff6384';
                case 'Cuidados Pessoais': return '#36a2eb';
                case 'Lazer': return '#ffce56';
                case 'Assinaturas': return '#4bc0c0';
                default: return '#e0f7fa';
            }
        }
    })
    .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
