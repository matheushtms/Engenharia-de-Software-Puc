### 3.3.4 Processo 4 – venda para usuário

Após a listagem da peça na plataforma de vendas, o cliente pode navegar pelo nosso catálogo e encontrar o item desejado por meio de filtros e categorias. Cada peça conta com fotos e uma descrição, incluindo informações sobre tamanho, marca, material e condição do produto.

Quando o cliente escolhe um produto, ele pode adicioná-lo ao carrinho e seguir para o checkout. Nesse momento, oferecemos diferentes formas de pagamento. Após a confirmação do pagamento, a peça é separada e passa por uma última inspeção para garantir que está em perfeitas condições antes do envio.

padrão BPMN._ :
![venda de roupas Diagrama (4)](https://github.com/user-attachments/assets/6784c0f3-089d-40ac-aef7-c9f7e5dabf05)




#### Detalhamento das atividades

O processo se inicia com Consultar peças disponíveis para venda (tarefa do tipo Usuário), onde o cliente acessa a plataforma para visualizar os produtos ofertados pelo brechó. Em seguida, o usuário pode Adicionar peças de interesse ao carrinho (tarefa do tipo Usuário), selecionando os itens que deseja adquirir. Com os produtos escolhidos, o fluxo segue para Gerenciar carrinho (tarefa do tipo Usuário), onde é possível revisar, remover ou alterar a quantidade de itens selecionados. Após a revisão, o cliente avança para Finalizar carrinho de compras (tarefa do tipo Usuário), iniciando o processo de checkout. Na etapa seguinte, o cliente deve Preencher o endereço (tarefa do tipo Usuário), informando os dados necessários para a entrega. Após isso, ocorre a Finalização da compra (tarefa do tipo Usuário), onde o pagamento é processado e a transação é concluída. Por fim, o processo é encerrado com a confirmação do pedido, finalizando a jornada de compra do usuário.

_Os tipos de dados a serem utilizados são:_

_* **Caixa de texto** – campo texto de uma linha, como título da peça, categoria, conservação, cor, CEP, endereço, número da residência, bairro, cidade, estado_

 _* **Área de texto** – campo texto de múltiplas linhas, como a descrição da peça_
 
_* **Número** – número de telefone ou número de documento (ex: usado em CEP e número da residência quando tratado como numérico)_

 _* **Data e Hora** - campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)_
 
_* **Imagem** – campo contendo uma imagem, como a foto da peça ou ícones ilustrativos dos produtos_

_* **Seleção única**  – campo com várias opções de valores que são mutuamente exclusivas, como o tamanho da peça ou os botões de navegação inferiores_

_* **Arquivo** – campo de upload de documento, como o upload da imagem da peçao_

_* **Tabela** – listagem com nome, categoria, tamanho, conservação e valor de cada item_


**Consultar peças disponiveis pela venda**

![Consultar peças para venda](https://github.com/user-attachments/assets/d45d530e-7f49-4a5c-929d-385fd2ef2327)

| **Campo**         | **Tipo**          | **Restrições**                      | **Valor default** |
|------------------|------------------|-----------------------------------|-------------------|
| barra de busca    | Caixa de Texto    | Texto livre                        | -                 |
| nome da peça    | Caixa de Texto    | Texto livre                        | -                 |
|categoria	 | Caixa de texto	 |Escolha a categoria da peça  |	Não preenchido |
|tamanho	 |Caixa de texto	 |Definir o tamanho da peça	 | Não preenchido |
|conservação	 |Caixa de texto	 |Descrever a condição da peça	 | Não preenchido |
|cor	 |Caixa de texto	 | Definir a cor da peça	 | Não preenchido |
|imagem	 |imagem	 |  |  |
|preço |campo numerico |  |  |


| **Comandos**          | **Destino**                 | **Tipo**    |
|----------------------|----------------------------|-------------|
| buscar               | Atualiza listagem de peças | default     |
| voltar               | Tela anterior              | cancel      |
| adicionar   | Ícone (+)         | default               |

**Adicionar peças de interesse ao carrinho**

![Captura de tela 2025-06-09 222904](https://github.com/user-attachments/assets/fa5b8caf-aeba-4d82-8e54-f6a5dd02a7be)

| **Campo**             | **Tipo**         | **Restrições**                          | **Valor default** |
|----------------------|------------------|----------------------------------------|-------------------|
| upload de imagem      | Área de upload    | Apenas imagem, obrigatório              | -                 |
| título da peça        | Caixa de Texto    | Texto obrigatório                       | -                 |
| categoria             | Caixa de Texto    | Texto obrigatório                       | -                 |
| tamanho               | Seleção única     | P, M, G, GG ou personalizado            | -                 |
| conservação           | Caixa de Texto    | Texto obrigatório                       | -                 |
| cor                   | Caixa de Texto    | Texto obrigatório                       | -                 |
| descrição             | Área de Texto     | Mínimo de 10 caracteres                 | -                 |
  |preço |campo numerico |  |  |

| **Comandos**                   | **Destino**                 | **Tipo**    |
|-------------------------------|-----------------------------|-------------|
| voltar                        | Tela anterior               | cancel      |
| adicionar ao carrinho | Botão           | default                |

**Gerenciar carrinho**

![gerenciar carrinho](https://github.com/user-attachments/assets/95780d24-2095-4c4b-a6a3-4441b7894d1e)

| **Campo**                | **Tipo**         | **Restrições**                          | **Valor default** |
|--------------------------|------------------|----------------------------------------|-------------------|
| total da compra           | Texto dinâmico    | Soma dos valores dos itens             | -                 |
|categoria	 | Caixa de texto	 |Escolha a categoria da peça  |	Não preenchido |
|tamanho	 |Caixa de texto	 |Definir o tamanho da peça	 | Não preenchido |
| nome da peça    | Caixa de Texto    | Texto livre                        | -                 |
|conservação	 |Caixa de texto	 |Descrever a condição da peça	 | Não preenchido |
|imagem	 |imagem	 |  |  |
  |preço |campo numerico |  |  |



| **Comandos**                | **Destino**                  | **Tipo**    |
|----------------------------|------------------------------|-------------|
| voltar                      | Tela anterior                | cancel      |
| finalizar pedido    | Botão             |default                |

**Preencher o endereço**

![WhatsApp Image 2025-04-07 at 21 11 09 (3)](https://github.com/user-attachments/assets/e64cfa17-9226-4528-8735-4cb56ea9fd83)

| **Campo**                    | **Tipo**         | **Restrições**                                  | **Valor default** |
|-----------------------------|------------------|------------------------------------------------|-------------------|
| CEP                         | Caixa de Texto   | Apenas números, 8 dígitos                      | -                 |
| Endereço                    | Caixa de Texto   | Mínimo de 10 caracteres                         | -                 |
| Número da residência        | Caixa de Texto   | Obrigatório                                     | -                 |
| Complemento (opcional)      | Caixa de Texto   | Opcional                                        | -                 |
| Bairro                      | Caixa de Texto   | Obrigatório                                     | -                 |
| Cidade                      | Caixa de Texto   | Obrigatório                                     | -                 |
| Estado                      | Caixa de Texto   | Obrigatório                                     | -                 |



| **Comandos**              | **Destino**               | **Tipo**    |
|--------------------------|---------------------------|-------------|
| voltar                   | Tela anterior             | cancel      |
| confirmar             | Botão            | default            |

**Finalizar compra**

![finalizar compra](https://github.com/user-attachments/assets/cc4b20f1-63a1-400b-825d-74946342c886)

| **Campo**                        | **Tipo**              | **Restrições**                              | **Valor default** |
|-----------------------------------|-----------------------|--------------------------------------------|-------------------|
|Tipo de chave |caixa de texto |tipo da peça | |
|Chave|caixa de texto | Numero da chave | |
|Cvv |Caixa de texto | Código de Verificação do Cartão  | |
|Nome do cartão |caixa de texto | Nome do titular do cartão | |
|Numero do cartão |caixa de texto |Numero do titular do cartão | |
|Data de vencimento|caixa de texto | Data de vencimento da fatura| |


| **Comandos**                      | **Destino**                 | **Tipo**    |
|------------------------------------|-----------------------------|-------------|
| Pix                          | Finalizar pagamento               | check-box      |
| Cartão de credito         | Finalizar pagamento                 |  check-box        |
| voltar                             | Tela anterior               | cancel      |
| finalizar compra            | Botão                 |         default          |
