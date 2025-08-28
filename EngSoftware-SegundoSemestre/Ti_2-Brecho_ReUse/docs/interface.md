
# 6. Interface do sistema

_A interação do usuário com a plataforma abrange três fluxos principais: o gerenciamento de conta, o gerenciamento de peças e o processo de venda/doação.Inicialmente, o usuário interage com as telas de autenticação, onde pode realizar o login ou criar uma nova conta, aceitando os Termos de Compromisso e fornecendo seus dados pessoais, de endereço e de pagamento. Uma vez logado, o usuário tem acesso ao seu perfil, onde pode consultar, editar suas informações ou excluir sua conta. O principal da plataforma para o vendedor é a interface de gerenciamento de peças. Através dela, o usuário pode cadastrar novos itens de vestuário, fornecendo detalhes como fotos, categoria, tamanho, estado de conservação e descrição. Ele também pode visualizar seu inventário de peças cadastradas, editar suas informações ou removê-las do sistema. Quando uma peça é colocada à venda, o usuário interage com o fluxo de transação. Ele é notificado sobre propostas de compra, podendo aceitá-las ou recusá-las. Ao confirmar uma venda, a interface o guia através das instruções detalhadas para embalagem e postagem do item, resultando na confirmação do envio com a inserção do código de rastreamento._

Finalmente, a plataforma possui uma interface pública, que funciona como a vitrine do brechó, permitindo que todos os visitantes pesquisem, filtrem e visualizem os itens disponíveis para compra._

# 6.1. Tela principal do sistema

_A tela principal do sistema é a interface de marketplace, a vitrine pública do brechó Re.Use. Ela serve como a página inicial e o ponto central de navegação para os usuários interessados em adquirir peças. Seu principal objetivo é exibir de forma atrativa o catálogo de produtos disponíveis e facilitar a busca por itens de interesse. No topo da tela, um banner com o slogan "MODA SUSTENTÁVEL E MODA QUE VOLTA A VIVER" reforça o propósito da plataforma. Logo abaixo, uma barra de pesquisa e filtros permite que os visitantes encontrem peças específicas por nome, categoria, tamanho, estado de conservação e cor. A área de conteúdo principal exibe os produtos em um layout de grade, onde cada item é apresentado em um card individual contendo sua imagem, nome, principais características e o preço. A partir desta tela, o usuário pode selecionar um item para ver mais detalhes e iniciar o processo de compra._

Tela principal do sistema
![Captura de tela 2025-06-17 101440](https://github.com/user-attachments/assets/7870cb75-a9f2-4a42-901b-3768f1c5bba6)


# 6.2. Telas do processo 1 : Cadastro de usuário 


## login na Conta
_O formulário é dividido em duas abas, "Login" e "Cadastre-se". Na aba "Login", o usuário encontra campos para inserir seu Email e Senha, o campo  senha é  acompanhado de um ícone que permite visualizar o texto digitado. Logo abaixo, um link para "Recuperar senha" oferece uma opção para usuários que esqueceram suas credenciais. A ação principal é realizada através do botão "Entrar". Onde, após o preenchimento, o sistema verifica a existência do usuário._

Tela da atividade: login na Conta

![Captura de tela 2025-06-02 183300](https://github.com/user-attachments/assets/f465c258-d586-42fd-864c-337ab87146fa)



## Preencher termos de compromisso
_Apresentada aos novos usuários após indicarem que não possuem conta, esta tela é intitulada "Termos de Compromisso". Ela detalha as condições de uso da plataforma através de um texto, organizado em seções numeradas que cobrem o Objeto, Aceitação, Regras de Uso, Responsabilidades, Privacidade e Dados, Penalidades e Disposições Finais. O usuário deve ler para, implicitamente, concordar e prosseguir com o cadastro._

Tela da atividade: Preencher termos de compromisso
![Captura de tela 2025-06-02 183342](https://github.com/user-attachments/assets/033bbae3-b6d8-4816-adf3-9438ce6d6b76)



## Cadastrar usuário 
_Destinada ao registro de novos usuários que já aceitaram os termos, esta tela mantém a estrutura visual com as abas "Login" e "Cadastre-se", com a segunda opção selecionada. O formulário de cadastro solicita diversas informações pessoais, como Email, Nome completo, CPF e Data de Nascimento. Além disso, são requisitados os campos para Senha e Confirmação de Senha. Mais abaixo, uma seção denominada "Escolha o método de pagamento" oferece as opções "Chave Pix" e "Cartão", indicando a necessidade de configurar uma forma de transação. Bem-sucedida concluiria o processo de registro para o novo usuário._

Tela da atividade : Cadastrar usuário
![Captura de tela 2025-06-02 185634](https://github.com/user-attachments/assets/dcd7dc1a-fa5e-4a25-aa43-27657a211d70)



## Consultar usuário
_Um ícone de usuário verificado é posicionado abaixo do menu. A área principal é dedicada às "Informações pessoais", apresentando campos como Email, Nome, CPF e Data de Nascimento, além de um campo para Telefone.  Um pequeno ícone de lápis no canto da tela sugere a possibilidade de edição dessas informações._

Tela da atividade : Consultar usuário
![Captura de tela 2025-06-02 183610](https://github.com/user-attachments/assets/529d26bd-b550-49be-8b5c-c42d47b42f4d)



## Editar perfil
_Sendo a continuação da visualização do perfil do usuário, esta parte da tela foca na seção "Endereço". São apresentados campos para CEP, Endereço, Número da residência, Complemento (opcional), Bairro, Cidade e Estado. Na parte inferior, destacam-se dois botões de ação principais: "Excluir usuário", acompanhado de um ícone de lixeira, e "Sair da conta", com um ícone de saída. Esta tela complementa a tarefa "Consultar usuário" e serve como ponto de partida para ações como editar o perfil, excluir a conta (levando à "Opção excluir") ou encerrar a sessão ("opção fechar")._

Tela da atividade : Editar perfil
![Captura de tela 2025-06-02 183618](https://github.com/user-attachments/assets/6b2b123d-5b7e-49b5-905d-81c9bf64b8d1)



## Excluir perfil
_Sobreposta à tela de perfil do usuário, que permanece visível ao fundo, esta tela apresenta um pop-up modal de confirmação. Ele surge quando o usuário seleciona a opção de excluir seu perfil. O modal exibe um ícone de alerta, seguido pelo título "Tem certeza?" e a mensagem explicativa "Essa ação não poderá ser desfeita!". Para prosseguir ou desistir da exclusão, são oferecidos dois botões distintos: "Sim, excluir", em destaque verde, e "Cancelar", em vermelho. Este pop-up é um componente da tarefa "Excluir Perfil" no BPMN, acionada pela "Opção excluir", e a escolha do usuário determinará se o processo de exclusão é finalizado ou interrompido._

Tela da atividade : Excluir perfil
![Captura de tela 2025-06-02 183644](https://github.com/user-attachments/assets/a6fec9d9-f66a-4a6c-a92d-c1b40ac28df6)



# 6.3. Telas do processo 2 : Consultar roupas cadastradas


## Consultar roupas cadastradas
_Esta tela apresenta a lista de roupas cadastradas pelo usuário, servindo como painel central para gerenciamento. No topo, um menu de navegação horizontal oferece acesso a "Home", "Adicionar Peça", "Carrinho" e "Perfil", com "Adicionar Peça" aparentemente sendo a seção ativa ou de origem para esta visualização de itens. Abaixo do menu, uma barra de filtros permite ao usuário buscar por "Nome da peça" e selecionar "Categoria", "Tamanho", "Conservação" e "Cor", com um botão "Buscar" para aplicar os filtros. A área principal exibe os itens de vestuário em cards individuais, mostrando uma imagem da peça, seu nome, categoria, tamanho, conservação e cor; alguns itens possuem um status como "Peça vendida" ou "Peça doada". Cada card de item possui um ícone de lixeira para exclusão. Notavelmente, um item "Calça da Nike" na parte inferior exibe ícones adicionais que sugerem opções de metodo de venda (doar ou vender) e editar a peça. Um botão flutuante com um ícone de "+" no canto inferior direito indica a funcionalidade para adicionar uma nova peça. Esta tela é onde o usuário pode iniciar as operações de "escolher peça que vai ser removida", "escolher peça a ser editada" ou navegar para o cadastro de uma nova peça._

Tela da atividade: Consultar roupas cadastradas
![Captura de tela 2025-06-02 204633](https://github.com/user-attachments/assets/d80647e9-c07e-43f0-b441-5c131f3fe47a)



## Preencher as informações da roupa
_Esta tela é dedicada ao cadastro de uma nova peça de roupa, acessada provavelmente através do botão "+" da tela de consulta ou da opção "Adicionar Peça" no menu. Sob o cabeçalho padrão da aplicação, um formulário centralizado solicita as informações do item. No topo do formulário, um espaço demarcado com um ícone de "+" sugere uma área para upload da foto da peça. Abaixo, seguem-se os campos para "Título", menus dropdown para "Selecione a categoria", "Selecione o tamanho", "Conservação" e "Cor", e um campo de texto para "Descrição". Um botão "Confirmar" na parte inferior submete os dados para registro._

Tela da atividade: Preencher as informações da roupa
![Captura de tela 2025-06-02 203936](https://github.com/user-attachments/assets/f53828ba-3ab0-4b92-97cb-f79b3d5b4a01)



## Confirmar cadastro da peça 
_Sobrepondo-se à tela de cadastro de peça, esta tela exibe um pop-up de confirmação de sucesso. O pop-up apresenta um ícone de visto  em verde, indicando êxito na operação. A mensagem principal é "Peça cadastrada!", complementada pelo texto "Sua peça foi registrada com sucesso." Um botão "OK" permite ao usuário fechar o pop-up e, retornar à tela de consulta de roupas ou continuar navegando._

Tela da atividade : Confirmar cadastro da peça
![Captura de tela 2025-06-02 204609](https://github.com/user-attachments/assets/14f69ded-0e28-4839-8483-abe35b13e80a)



##  Preencher os campos a serem editados
_Esta tela apresenta um formulário para edição dos dados de uma peça de roupa existente, acessada após selecionar uma peça na tela de consulta e optar por editá-la. O layout é similar ao formulário de cadastro, com uma área para a imagem da peça no topo e campos para suas informações. Na imagem, os campos estão preenchidos com dados da "Calça da Nike", incluindo Categoria "Calça", Tamanho "42", Conservação "Novo", Cor "Preto" e uma descrição "aleatoria". Um botão "Confirmar" na parte inferior permite salvar as alterações. Um detalhe novo desta tela de edição é a presença de um botão "Excluir peça" com um ícone de lixeira, localizado no canto superior direito da área do formulário, oferecendo uma opção de remoção direta do item que está sendo editado._

Tela da atividade :  Preencher os campos a serem editados
![Captura de tela 2025-06-02 204852](https://github.com/user-attachments/assets/f9678c14-a810-4ff4-91a9-801c111280ec)



## Confirmar remoção
_Sobreposta ao formulário de edição de uma peça, esta tela exibe um pop-up que confirma o sucesso da atualização dos dados do item. O pop-up apresenta um ícone de visto dentro de um círculo verde, simbolizando a conclusão bem-sucedida da operação. A mensagem principal exibida é "Peça atualizada!", seguida pelo texto de suporte "As informações foram salvas com sucesso.". Um botão "OK" permite ao usuário fechar o pop-up, retornando à tela de visualização da peça atualizada ou à lista de roupas._

Tela da atividade : Confirmar remoção
![Captura de tela 2025-06-02 211155](https://github.com/user-attachments/assets/cf2113a5-07cc-49e8-906e-143f1d9a91f8)



## Confirmar remoção
_Exibida como um pop-up sobre a tela de listagem de roupas, esta tela serve para confirmar a intenção do usuário de excluir uma peça. O pop-up é acionado após o usuário clicar no ícone de lixeira de um item específico. Ele apresenta um ícone de alerta, o título "Excluir peça?" e a advertência "Essa ação não pode ser desfeita.". Para prosseguir, o usuário tem as opções "Sim, excluir", destacado em verde, e "Cancelar", em vermelho. Esta etapa de confirmação é crucial, garantindo que a exclusão não seja acidental._

Tela da atividade : Confirmar remoção
![Captura de tela 2025-06-02 204700](https://github.com/user-attachments/assets/cc2109b8-f4f8-4bfa-b347-a033a615bcb0)


# 6.4. Telas do processo 3 : Venda/Doação para o brecho


# Pesquisar roupas cadastradas
Esta tela apresenta a lista de roupas que o próprio usuário cadastrou na plataforma, funcionando como seu inventário pessoal para gerenciamento. O usuário visualiza o status de cada item, como "À venda" ou "Peça doada", e tem acesso a ações como exclusão ou edição. Esta visualização corresponde à tarefa inicial "Pesquisar roupas cadastradas" do BPMN, onde o usuário (vendedor/doador) analisa seus itens antes de decidir a próxima operação

Tela da atividade : Pesquisar roupas cadastradas
![Captura de tela 2025-06-17 095354](https://github.com/user-attachments/assets/9041ccc3-88f5-4f56-95a2-2862d64f4736)


# Confirmar proposta

Esta tela materializa a tarefa "Confirmar proposta" do fluxo de venda. Ela informa ao usuário que uma proposta foi recebida por um item, detalhando o nome da peça, o valor oferecido e a forma de pagamento. O usuário deve decidir se aceita ou não a oferta através dos botões "Confirmar" e "Recusar", que o direcionam para o gateway seguinte "Aceita proposta".

Tela da atividade : Confirmar proposta
![Captura de tela 2025-06-17 095402](https://github.com/user-attachments/assets/c0faeea2-8939-4cab-a05e-6a7db6b7692d)

# Receber instruções para envio da peça
Esta tela corresponde diretamente à tarefa "Receber instruções para envio da peça". Ela fornece ao vendedor um guia detalhado com os procedimentos necessários para embalar e postar o item nos Correios, garantindo que o envio seja feito de forma correta. O botão "Confirmar" ao final indica que o usuário deve avançar após estar ciente das instruções.

Tela da atividade : Receber instruções para envio da peça
![Captura de tela 2025-06-17 095541](https://github.com/user-attachments/assets/28802520-a874-46db-b32e-4226db608fe2)


# Confirmar envio da peça

Representando a tarefa "Confirmar envio da peça", esta tela solicita que o usuário insira o "Número de rastreamento" obtido após postar o item nos Correios. A submissão desta informação através do botão "Confirmar" é o passo que efetivamente confirma o despacho da peça dentro do sistema.

Tela da atividade : Confirmar envio da peça
![Captura de tela 2025-06-17 095550](https://github.com/user-attachments/assets/406c7b5a-90ed-4240-8a66-dac70f13fd47)

# Confirmar envio da peça (Sucesso)

Este pop-up final de "Envio confirmado!" valida a conclusão da tarefa "Confirmar envio da peça". Ele informa que o número de rastreamento foi salvo com sucesso, e o botão "Voltar para a Home" permite ao usuário sair do fluxo. Esta tela representa a última ação do usuário antes de o processo atingir o estado de "Fim" no diagrama BPMN.

Tela da atividade : Confirmar envio da peça
![Captura de tela 2025-06-17 095557](https://github.com/user-attachments/assets/eec5eb8f-48eb-4d1a-acef-6223636e26aa)

# 6.5. Telas do processo 4 : Venda para usuário

 # Consultar peças disponíveis e Adicionar ao Carrinho

O processo de compra começa na tela principal, onde o usuário pode navegar pelo catálogo de roupas. Cada item é exibido com foto, nome, detalhes (categoria, tamanho, conservação, cor) e preço. O usuário pode usar filtros para refinar a busca. Ao encontrar um item de interesse, ele o adiciona ao seu pedido clicando no botão "Adicionar ao carrinho".

Tela da atividade : Consultar e adicionar peças
![Captura de tela 2025-06-17 101440](https://github.com/user-attachments/assets/c8562771-e6e6-4d76-aa56-def08b7876ce)

 # Confirmar Carrinho de Compras

Após adicionar as peças, o usuário acessa a tela "Meu Carrinho". Aqui, ele pode revisar a lista de itens selecionados, verificar os detalhes e o preço de cada um, e ver o valor total da compra. Para seguir para o pagamento, o usuário clica em "Finalizar Compra", o que dispara um modal de confirmação "Carrinho pronto!", informando que ele será redirecionado para a etapa final.

Tela da atividade : Meu Carrinho
![Captura de tela 2025-06-17 101500](https://github.com/user-attachments/assets/37578022-86ed-4260-acc3-c1a11b577d40)

Tela da atividade : Modal de confirmação do carrinho
![Captura de tela 2025-06-17 101516](https://github.com/user-attachments/assets/4b756a7d-5916-4510-93c8-05a1c0dab2ed)

 # Preencher Endereço e Efetuar Pagamento

Na tela de "Finalizar Compra", o usuário deve preencher ou confirmar seu endereço de entrega. Logo abaixo, ele seleciona o método de pagamento desejado, como "PIX" ou "Cartão", e preenche os dados correspondentes. Com todas as informações fornecidas, o botão "Confirmar" finaliza a transação.

Tela da atividade : Preenchimento de Endereço
![Captura de tela 2025-06-17 101535](https://github.com/user-attachments/assets/cf66e4d9-7075-4986-8ffc-3c931ed5c2f6)


Tela da atividade : Seleção de Método de Pagamento
![Captura de tela 2025-06-17 101544](https://github.com/user-attachments/assets/66a25870-8346-4c90-996c-41fe0a1d3c86)


 # Confirmação da Compra

Uma vez que o pagamento é processado com sucesso, o sistema exibe um modal de confirmação sobre a tela de checkout. Com um ícone de sucesso e a mensagem "Compra finalizada! Seu pedido foi concluído com sucesso.", o fluxo de compra é encerrado, garantindo ao usuário que a operação foi bem-sucedida.

Tela da atividade : Confirmação de Compra Finalizada
![Captura de tela 2025-06-17 101744](https://github.com/user-attachments/assets/98a1972c-795b-46ba-b689-94e931398650)

# 6.6. Telas de indicadores

Esta tela apresenta um dashboard de "Visão Geral da Plataforma", projetado para fornecer uma análise do desempenho e das métricas chave do sistema. Acessível a partir do menu principal, esta interface é destinada a administradores ou usuários com permissões de gerenciamento, e exibe a data e hora da "Última atualização" dos dados para garantir a relevância das informações. A tela é organizada em um layout de cards que destacam seis indicadores de performance principais: o número total de "Peças Vendidas", o "Total Arrecadado" em Reais, o "Percentual Vendido" e o "Percentual Doado" (ambos representados visualmente por barras de progresso), o valor do "Ticket Médio" por transação e a "Taxa de Conversão" da plataforma.

Tela de indicadores:
![WhatsApp Image 2025-06-23 at 15 13 52](https://github.com/user-attachments/assets/ead42aff-0bf2-4e2d-ab52-1e0fc6434cf4)



