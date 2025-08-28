# RE.USE

A indústria da moda é uma das mais poluentes do mundo, devido ao alto consumo de recursos naturais e ao grande volume de resíduos gerados. Nos últimos anos, o crescimento do consumo consciente e da economia circular tem impulsionado o mercado de roupas de segunda mão. Muitas pessoas buscam alternativas mais sustentáveis e acessíveis, mas ainda enfrentam dificuldades para vender ou doar roupas usadas, seja pela falta de informação, pela ausência de plataformas eficazes ou pela complexidade do processo. Como resultado, muitas peças em bom estado acabam descartadas, aumentando o desperdício têxtil. 

Diante desse problema, o Re.use surge como uma solução para facilitar a compra e doação de roupas usadas, promovendo um modelo de consumo mais sustentável. A proposta do projeto é conectar pessoas que desejam desapegar de suas roupas a consumidores que buscam peças de qualidade por um preço acessível ou sem custo. Atualmente, vender ou doar roupas exige um esforço considerável, tanto para encontrar interessados quanto para organizar a logística de entrega. O Re.use pretende simplificar esse processo, oferecendo um sistema intuitivo para cadastro, triagem e redistribuição das peças de forma eficiente. 

O objetivo geral do projeto é criar uma plataforma digital que incentive a economia circular no setor têxtil, reduzindo o desperdício de roupas em bom estado e facilitando o acesso à moda sustentável. Para alcançar esse propósito, os objetivos específicos são: 

* Criar um sistema eficiente para o cadastro de peças, tornando o processo mais rápido e acessível; 
* Implementar um mecanismo de triagem para garantir que os itens disponibilizados estejam em boas condições; 
* Oferecer ferramentas que facilitem a busca, seleção e compra de roupas na plataforma; 
* Estabelecer parcerias com instituições para receber e redistribuir as doações de maneira organizada.
  
A relevância do Re.use está na promoção de uma mudança de comportamento no consumo de moda. O projeto contribui para a redução do impacto ambiental da indústria têxtil, incentiva o reaproveitamento de peças e amplia o acesso a alternativas sustentáveis. Em um cenário onde a preocupação com o meio ambiente cresce, soluções como essa são fundamentais para tornar hábitos sustentáveis mais acessíveis e viáveis para a população. 

## Integrantes

* Davi Nunes Carvalho
* Josue Carlos Goulart dos Reis 
* Luiz Fernando Batista Moreira 
* Matheus Henrique Tavares Malta Soares 
* Nicolas Kiffer de Oliveira Soares 

## Professor

* Eveline Alonso Veloso 
* Juliana Amaral Baroni de Carvalho
* 
## Instruções de utilização

Instruções de Utilização Atualizadas - RE.USE
Pré-requisitos
Java JDK 11 ou superior

Maven instalado
Banco de dados MySQL
Node.js (para o frontend)
Visual Studio Code (ou outra IDE)

Configuração do Backend (Spring Boot)
Banco de dados:
Crie um banco MySQL chamado reuse_db
Configure as credenciais no application.properties:

text
spring.datasource.url=jdbc:mysql://localhost:3306/reuse_db
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha 

Execução:

Navegue até a pasta do projeto
Execute: mvn spring-boot:run
O servidor iniciará em http://localhost:8080

Funcionalidades Principais
Cadastro de Usuário:
Acesse /register
Preencha os dados necessários

Login:
Acesse /login
Insira suas credenciais

Cadastro de Roupas:
Após login, acesse /add-clothing
Preencha os detalhes da peça

Venda/Doação:
Na página da peça, selecione "Vender" ou "Doar"
Siga o fluxo correspondente

## Histórico de versões


Acessar:

Abra http://localhost:3000 no navegador

Histórico de Versões
3.0 (Atual)
Fix: Atualização de toda a aplicação, aplicação rodando e com tudo integrado. 

2.2 
ADD: Integração completa com banco de dados
ADD: API REST funcional
FIX: Problemas de autenticação

2.1
ADD: Migrações de banco de dados
CHANGE: Melhoria nas entidades JPA

2.0
ADD: Configuração do Spring Data JPA
ADD: Modelagem inicial do banco

1.3
ADD: Tela de listagem de peças
ADD: Componente de filtros

1.2
ADD: Tela de cadastro de peças
ADD: Upload de imagens

1.1
ADD: Dashboard principal
ADD: Menu de navegação

1.0
ADD: Telas de login e cadastr
ADD: Validação de formulários

0.1.1
CHANGE: Atualização das documentações

0.1.0
Versão inicial do projeto
