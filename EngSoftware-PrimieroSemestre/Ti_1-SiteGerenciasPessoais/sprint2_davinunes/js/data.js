
const data = {
    "empresas": [
        {
            "nome": "Horizonte Financeiro",
            "logo": "images/csas.jpg",
            "descricao": "A melhor loja de produtos eletrônicos.",
            "usuario": {
                "nome": "João"
            },
            "cashbacks": [
                {
                    "valorTotal": 60.00,
                    "percentual": 10,
                    "dataExpiracao": "31 de Dezembro de 2024",
                    "condicoes": [
                        "Válido apenas para compras acima de R$ 200,00.",
                        "O cashback será creditado em até 30 dias após a compra."
                    ]
                }
            ],
            "cupons": [
                {
                    "codigo": "CUPOM10",
                    "descricao": "Desconto de 10% na sua compra.",
                    "validade": "15 de Novembro de 2024",
                    "diasParaUsar": 14,
                    "condicoes": [
                        "Válido apenas para novos clientes.",
                        "Não acumulativo com outras promoções."
                    ]
                },
                {
                    "codigo": "CUPOMFRETE",
                    "descricao": "Frete grátis em compras acima de R$ 150,00.",
                    "validade": "30 de Novembro de 2024",
                    "diasParaUsar": 29,
                    "condicoes": [
                        "Aplicável apenas para a região Sul.",
                        "Válido para todos os produtos."
                    ]
                }
            ],
            "produtos": [
                {
                    "nome": "Smartphone iphone",
                    "preco": 4000.00,
                    "cashbackAplicavel": 200.00
                },
                {
                    "nome": "Laptop dell",
                    "preco": 2500.00,
                    "cashbackAplicavel": 250.00
                }
            ]
        }
    ]
};
