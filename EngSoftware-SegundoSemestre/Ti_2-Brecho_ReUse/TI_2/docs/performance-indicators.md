## 5. Indicadores de desempenho

_Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no modelo relacional. Defina no mínimo 3 indicadores de desempenho._
Para garantir uma visão completa da eficiência e do impacto do re.use, vamos acompanhar quatro indicadores-chave:
1. **Percentual de roupas vendidas**: mostra a proporção de peças cadastradas que realmente saem do estoque por venda. É o termômetro da aderência do nosso portfólio ao gosto dos clientes e orienta ajustes de seleção, preço e campanhas de marketing.
2. **Percentual de roupas doadas**: revela quantas peças seguem o fluxo de doação em vez de venda, refletindo nosso compromisso social e a eficácia na gestão de estoque gratuito. Esse indicador ajuda a equilibrar os objetivos financeiros e o impacto comunitário.
3. **Ticket médio por venda**: calcula o valor médio de cada transação, indicando o poder de compra do público e a eficácia das nossas estratégias de precificação. Acompanhar sua evolução permite afinar promoções, faixas de preço e condições de pagamento.
4. **Taxa de Conversão de Usuários Cadastrados em Compradores**:O objetivo desse indicador é medir a eficiência da plataforma em converter usuários cadastrados em compradores ativos. 
_Usar o seguinte modelo:_

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Percentual de roupas vendidas | Acompanhar o aproveitamento do estoque para vendas | % das peças cadastradas que foram efetivamente vendidas | Tabela Pecas, Vendas | (nº peças vendidas / nº peças cadastradas) × 100 |
| Percentual de roupas doadas | Monitorar o impacto social e rotatividade de estoque| % das peças cadastradas que foram doadas | Tabela Pecas, Vendas (modalidade=‘doação’) | (nº peças doadas / nº peças cadastradas) × 100 |
| Ticket médio por venda | Avaliar o valor médio gerado por transação | Valor médio (R$) de cada venda | Tabela NotaFiscal, Vendas | (Soma valorTotal de NotaFiscal / nº de vendas) |
|Taxa de Conversão de Usuários Cadastrados em Compradores | Medir a eficiência da plataforma em converter usuários cadastrados em compradores efetivos.| % de usuários cadastrados que realizaram pelo menos uma compra |Tabela Usuários, Tabela Compra | (nº de usuários que realizaram compras / nº total de usuários cadastrados) × 100 |
_Obs.: todas as informações para gerar os indicadores devem estar no modelo relacional._
