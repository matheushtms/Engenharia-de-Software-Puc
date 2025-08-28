let historicoInvestimentos = [];
let editIndex = null;

function cadastrarInvestimento() {
    const valor = parseFloat(document.getElementById("valor").value);
    const meses = parseInt(document.getElementById("meses").value);
    const tipoInvestimento = document.getElementById("tipo_investimento").value;
    const taxaPersonalizada = parseFloat(document.getElementById("taxa_personalizada").value);

    if (isNaN(valor) || isNaN(meses) || meses <= 0 || valor <= 0) {
        alert("Por favor, insira valores válidos para o cadastro.");
        return;
    }

    let taxa = !isNaN(taxaPersonalizada) && taxaPersonalizada > 0 ? taxaPersonalizada / 100 : 0.12;
    const taxaMensal = Math.pow(1 + taxa, 1 / 12) - 1;
    const montante = valor * Math.pow(1 + taxaMensal, meses);
    const rendimento = montante - valor;

    const investimento = { valor, meses, tipoInvestimento, montante, rendimento };

    if (editIndex !== null) {
        historicoInvestimentos[editIndex] = investimento;
        editIndex = null;
        alert("Investimento editado com sucesso!");
    } else {
        historicoInvestimentos.push(investimento);
        alert("Investimento cadastrado com sucesso!");
    }

    atualizarHistorico();
    limparFormulario();
}

function editarInvestimento(index) {
    const item = historicoInvestimentos[index];

    document.getElementById("valor").value = item.valor;
    document.getElementById("meses").value = item.meses;
    document.getElementById("tipo_investimento").value = item.tipoInvestimento;
    document.getElementById("taxa_personalizada").value = "";

    editIndex = index;
}

function excluirInvestimento(index) {
    if (confirm("Tem certeza que deseja excluir este investimento?")) {
        historicoInvestimentos.splice(index, 1);
        atualizarHistorico();
        alert("Investimento excluído com sucesso!");
    }
}

function atualizarHistorico() {
    const tabela = document.getElementById("historico");
    tabela.innerHTML = "";

    historicoInvestimentos.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${obterNomeInvestimento(item.tipoInvestimento)}</td>
            <td>R$ ${item.valor.toFixed(2)}</td>
            <td>${item.meses}</td>
            <td>${item.montante ? `R$ ${item.montante.toFixed(2)}` : "-"}</td>
            <td>${item.rendimento ? `R$ ${item.rendimento.toFixed(2)}` : "-"}</td>
            <td>
                <button onclick="editarInvestimento(${index})">Editar</button>
                <button onclick="excluirInvestimento(${index})">Excluir</button>
            </td>
        `;
        tabela.appendChild(row);
    });

    atualizarGrafico();
}

function atualizarGrafico() {
    const ctx = document.getElementById("graficoRendimentos").getContext("2d");
    const tipos = historicoInvestimentos.map((item, index) => `#${index + 1} - ${obterNomeInvestimento(item.tipoInvestimento)}`);
    const rendimentos = historicoInvestimentos.map(item => item.rendimento || 0);

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tipos,
            datasets: [{
                label: 'Rendimentos (R$)',
                data: rendimentos,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Investimentos'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Rendimento (R$)'
                    }
                }
            }
        }
    });
}

function obterNomeInvestimento(tipo) {
    switch (tipo) {
        case "cdb":
            return "CDB";
        case "tesouro_direto":
            return "Tesouro Direto";
        case "lci_lca":
            return "LCI/LCA";
        default:
            return "Outros";
    }
}

function limparFormulario() {
    document.getElementById("valor").value = "";
    document.getElementById("meses").value = "";
    document.getElementById("tipo_investimento").value = "cdb";
    document.getElementById("taxa_personalizada").value = "";
    editIndex = null;
}
