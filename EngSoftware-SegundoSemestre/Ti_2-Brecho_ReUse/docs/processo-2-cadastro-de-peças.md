### 3.3.2 Processo 2 – cadastro de peças

_Cadastro de roupas, para melhorar o processo do ponto de vista do usuário, algumas otimizações poderiam ser implementadas para tornar o fluxo mais claro e eficiente. Uma sugestão seria adicionar uma validação automática ao preencher as informações da peça, garantindo a consistência dos dados e evitando cadastros duplicados. Além disso, a exclusão de peças poderia contar com uma etapa de confirmação adicional para prevenir remoções acidentais. Outra melhoria seria a inclusão de uma tarefa de serviço que envie uma notificação automática ao usuário após o cadastro ou edição de uma peça, confirmando a ação realizada. Também seria interessante unificar os pontos de finalização do processo, tornando o fluxo mais coeso. Por fim, uma etapa de feedback permitiria coletar percepções dos usuários, auxiliando em futuras melhorias do sistema.

![Exemplo de um Modelo BPMN do PROCESSO 2](images/cadastoPeças2.png "Modelo BPMN do Processo 2.")


#### Detalhamento das atividades

O processo começa com Consultar roupas cadastradas (tarefa do tipo Usuário), onde o usuário acessa a lista de roupas já registradas no sistema. Em seguida, no Gateway Escolher operação (gateway exclusivo), o usuário decide entre três opções: Cadastrar peça, Excluir peça ou Editar dados da peça. Se a escolha for Excluir peça, o fluxo segue para Escolher peça que vai ser removida (tarefa do tipo Usuário), onde o usuário seleciona a roupa que deseja excluir. Depois, na tarefa Confirmar remoção (tarefa do tipo Usuário), a exclusão é confirmada, encerrando esse fluxo. Caso a opção escolhida seja Cadastrar peça, o usuário preenche as informações da roupa, como tamanho, cor, estado de conservação, upload de fotos e categoria, na tarefa Preencher as informações da roupa (tarefa do tipo Usuário). Em seguida, confirma o cadastro na tarefa Confirmar cadastro da peça (tarefa do tipo Usuário), finalizando esse caminho. Se a escolha for Editar dados da peça, o processo segue para Escolher peça a ser editada (tarefa do tipo Usuário), onde o usuário seleciona a roupa que deseja modificar. Depois, em Preencher os campos a serem editados (tarefa do tipo Usuário), ele altera as informações necessárias e finaliza a edição, encerrando assim o processo.
._

_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - campo texto de múltiplas linhas_

_* **Caixa de texto** - campo texto de uma linha_

_* **Número** - campo numérico_

_* **Data** - campo do tipo data (dd-mm-aaaa)_

_* **Imagem** - campo contendo uma imagem_

_* **Seleção única** - campo com várias opções de valores que são mutuamente exclusivas (tradicional radio button ou combobox)_

_* **Seleção múltipla** - campo com várias opções que podem ser selecionadas mutuamente (tradicional checkbox ou listbox)_

_* **Arquivo** - campo de upload de documento_




Consultar peças cadastradas

![Consultar peças cadastradas](https://github.com/user-attachments/assets/55151843-0f4e-4bcc-bc40-70f9763144af)


| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|   buscar              |   caixa de texto               |                |                   |
|categoria	 | Caixa de texto	 |Escolha a categoria da peça  |	Não preenchido |
 |tamanho	 |Caixa de texto	 |Definir o tamanho da peça	 | Não preenchido |
 |conservação	 |Caixa de texto	 |Descrever a condição da peça	 | Não preenchido |
 |cor	 |Caixa de texto	 | Definir a cor da peça	 | Não preenchido |
 |imagem	 |imagem	 |  |  |
  |preço |campo numerico |  |  |
| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|    icone de excluir             |    pagina de exclusão                       |              |
|        icone de adicionar peça          |       pagina de cadastro de peça                    |              |
|      icone de voltar            |      pagina inicial                     |              |
|     icone de editar             |        pagina de edição da peça                   |              |


**Cadastrar peça**

![cadastrar peça](https://github.com/user-attachments/assets/7a05edd7-b655-4d52-b7f5-9ec47dc97304)

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|     titulo             |   caixa de texto                        |              |
| selecione categoria   | seleçao única    | opçoes: camiseta,caça,vestido,vestido acessório|                |
| tamanho         | Caixa de Texto   | máximo de 10 caractere(ex:P,M,42) |           |
| cor             |    caixa de texto            |           |                   |
| conservação |       seleçao unica           |  opções: novo,seminovo,usado              |                |
|   fotos da peça       |          imagem     |      formato: JPEG,PNG      |             |
|   descrição          |  area de texto            |   máximo 500 caracteres        |             |


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| confirmar           | confirmação             | default           |
| icone voltar      |        pagina inicial                       |                 |


**Editar peça**

![editar peça](https://github.com/user-attachments/assets/58e66fe6-5047-48a3-8048-1c492ee9ba47)


| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|     titulo             |   caixa de texto                        |              |
| selecione categoria   | seleçao única    | opçoes: camiseta,caça,vestido,vestido acessório|                |
| tamanho         | Caixa de Texto   | máximo de 10 caractere(ex:P,M,42) |           |
| cor             |    caixa de texto            |           |                   |
| conservação |       seleçao unica           |  opções: novo,seminovo,usado              |                |
|   fotos da peça       |          imagem     |      formato: JPEG,PNG      |             |
|   descrição          |  area de texto            |   máximo 500 caracteres        |             |


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| confirmar           | confirmação             | default           |
| icone voltar      |      pagina anterior                        |                 |
| icone de excluir                |  pagina de exclusão                        |              |

**Excluir peça**

![Excluir peça](https://github.com/user-attachments/assets/a8002b5d-6dfd-45b9-b3c2-4a6317093cc4)


| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|cor	 |Caixa de texto	 | Definir a cor da peça	 | Não preenchido |
 |imagem	 |imagem	 |  |  |
|   buscar              |   caixa de texto               |                |                   |
|categoria	 | Caixa de texto	 |Escolha a categoria da peça  |	Não preenchido |
 |tamanho	 |Caixa de texto	 |Definir o tamanho da peça	 | Não preenchido |
 |conservação	 |Caixa de texto	 |Descrever a condição da peça	 | Não preenchido |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|    icone de excluir             |    pagina de exclusão                       |              |
|        icone de adicionar peça          |       pagina de cadastro de peça                    |              |
|      icone de voltar            |      pagina inicial                     |              |
|     icone de editar             |        pagina de edição da peça                   |              |

**Confirmar remoção**

![Confirmar remoção](https://github.com/user-attachments/assets/8294969d-ff71-416c-ae54-9a3956c8805f)

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| confirmar | remoção confirmada | default |
| cancelar                | cancelamento                            | ---               |



**Confirmar cadastro da peça**

![Confirmar cadastro de peça](https://github.com/user-attachments/assets/2aa6c000-92c3-41fd-86e5-bed8f02b25ed)


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| confirmar | remoção confirmada | default |
| cancelar                | cancelamento                            | ---               |







