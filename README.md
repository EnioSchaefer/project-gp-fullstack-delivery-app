<h1 align="center"> 🛵 Projeto Delivery App 🛵 </h1>

<h2 align="center">Projeto Full-Stack em Grupo</h2>

<h4 align="center">Qual o objetivo deste projeto?</h4>

<p>O projeto Delivery App é uma aplicação web desenvolvida em Javascript + Node de geração e administração de pedidos. A aplicação oferece funcionalidades de login e criação de contas, com os clientes podendo gerar e acompanhar o status dos pedidos. Possui funcionalidade de atualização e acompanhamentos de pedido por parte da pessoa vendedora, e um painel de administração de vendedores para o usuário administrador.</p>

<details>
<summary>Observações de desenvolvedor:</summary>

<br>
<p>1. O projeto faz uso da arquitetura MSC(Model, Service, Controller) para mais fácil manutenção e escalabilidade de código.</p>
<p>2. O projeto faz uso de Docker, possuindo um arquivo docker-compose que cria e inicia um container com o banco de dados.</p>
<p>3. O projeto faz uso da biblioteca Axios para integração do Front-End com o Back-End.</p>
<p>4. O projeto faz uso da ORM Sequelize, para agilidade e facilitação de requisições do banco de dados, além de melhorar a legibilidade e a manutenção do código.</p>
<p>5. O projeto faz uso de um sistema de autenticação e autorização utilizando JWT(Json Web Token), possuindo permissões de <strong>Cliente</strong>, <strong>Vendedor</strong> e <strong>Administrador</strong>.</p>
<p>6. Rodando o comando "npm start" na raiz do projeto, faz com que o banco de dados seja populado e inicia ambos o Front-End e o Back-End.</p>
<p>7. As senhas no banco de dados são encriptadas utilizando md5, as senhas decriptadas para teste se encontram no arquivo de seeders de usuários no caminho back-end/src/database/seeders/.</p>
<p>8. Para acessar o banco de dados utilize user = "root" e password = "password".</p>

</details>

<h2>Aprendizados com este projeto</h2>

<ul>
<li>Javascript</li>
<li>Node</li>
<li>React.js</li>
<li>MySQL</li>
<li>Arquitetura MSC</li>
<li>React Hooks</li>
<li>Context API</li>
<li>Sequelize</li>
<li>Docker</li>
<li>JWT (Json Web Token)</li>
<li>Encriptação com md5</li>
<li>MySQL Workbench</li>
<li>E mais...</li>
</ul>

<h2>Tabela de Conteúdo</h2>

<p>-- Obs.: Algumas telas são diferentes ou ficam indisponíveis dependendo do tipo do usuário (Cliente, Vendedor ou Administrador) --</p>

- [Login e Registro](#login-e-registro)
  - [Tela de login](#tela-de-login)
  - [Tela de registro](#tela-de-registro)
- [Componentes e Telas de Cliente](#componentes-e-telas-de-cliente)
  - [Barra de navegação](#barra-de-navegacao)
  - [Tela de produtos](#tela-de-produtos)
  - [Tela de checkout](#tela-de-checkout)
  - [Tela de detalhes do pedido](#tela-de-detalhes-do-pedido)
  - [Tela de lista de pedidos](#tela-de-lista-de-pedidos)
- [Componentes e Telas de Vendedor](#componentes-e-telas-de-vendedor)
  - [Barra de navegação](#barra-de-navegacao)
  - [Tela de lista de pedidos](#tela-de-lista-de-pedidos-2)
  - [Tela de detalhes do pedido](#tela-de-detalhes-do-pedido-2)
- [Tela de Administrador](#tela-de-administrador)
  - [Painel de administrador](#painel-de-administrador)
- [Status](#status)
  - [Pendente](#pendente)
  - [Preparando](#preparando)
  - [Em trânsito](#em-transito)
  - [Entregue](#entregue)
- [Ações e Interações](#acoes-e-interacoes)
  - [Características](#caracteristicas)
- [Equipe de Desenvolvimento](#equipe-de-desenvolvimento)

<br>

<h1>Login e Registro</h1>

<strong> Tela responsável por realizar login de usuário: </strong>

<details>
<summary><strong>Tela de Login</strong></summary>

<h3>Imagem da tela:</h3>

![login-screen](/images/login-screen.png)

<h3>Apresenta erro em caso de falha no login</h3>

![login-error](/images/login-error.png)

</details>

<details>
<summary><strong>Tela de Registro</strong></summary>

<h3>Imagem da tela:</h3>

![register-screen](/images/register-screen.png)

<h3>Obs.: Pode apresentar erro em caso de falha no registro</h3>

</details>
<br>

<h1>Componentes e Telas de Cliente</h1>

<strong> Telas disponíveis para usuário cliente: </strong>

<details>
<summary><strong>Barra de Navegação</strong></summary>
<h3>Imagem da tela:</h3>

![navbar-customer](/images/navbar-customer.png)

</details>

<details>
<summary><strong>Tela de Produtos</strong></summary>
<h3>Imagem da tela:</h3>

![products-customer-screen](/images/products-customer-screen.png)

</details>

<details>
<summary><strong>Tela de Checkout</strong></summary>
<h3>Imagem da tela:</h3>

![checkout-screen](/images/checkout-screen.png)

</details>

<details>
<summary><strong>Tela de Detalhes do Pedido</strong></summary>
<h3>Imagem da tela:</h3>

![order-details-customer-screen](/images/order-details-customer-screen.png)

</details>

<details>
<summary><strong>Tela de pedidos</strong></summary>
<h3>Imagem da tela:</h3>

![orders-customer-screen](/images/orders-customer-screen.png)

</details>
<br>

<h1>Componentes e Telas de Vendedor</h1>

<strong> Telas disponíveis para usuário vendedor: </strong>

<details>
<summary><strong>Barra de Navegação</strong></summary>
<h3>Imagem da tela:</h3>

![navbar-seller](/images/navbar-seller.png)

</details>

<details>
<summary><strong>Tela de pedidos</strong></summary>
<h3>Imagem da tela:</h3>

![orders-seller-screen](/images/orders-seller-screen.png)

</details>

<details>
<summary><strong>Tela de Detalhes do Pedido</strong></summary>
<h3>Imagem da tela:</h3>

![order-details-seller-screen](/images/order-details-seller-screen.png)

</details>
<br>

<h1>Tela de Administrador</h1>

<strong> Tela disponível para usuário administrador: </strong>

<details>
<summary><strong>Barra de Navegação</strong></summary>
<h3>Imagem da tela:</h3>

![navbar-admin](/images/navbar-admin.png)

</details>

<details>
<summary><strong>Tela de administração</strong></summary>
<h3>Imagem da tela:</h3>

![admin-panel-screen](/images/admin-panel-screen.png)

</details>
<br>

<h1>Status</h1>

<h3>Possíveis status dos pedidos:</h3>

<details>
<summary><strong>Pendente</strong></summary>

<p>Na tela de detalhes do pedido:</p>

![order-details-status-pending](/images/order-details-status-pending.png)

<p>Na tela de pedidos:</p>

![orders-status-pending](/images/order-status-pending.png)

</details>

<details>
<summary><strong>Preparando</strong></summary>

<p>Na tela de detalhes do pedido:</p>

![order-details-status-preparing](/images/order-details-status-preparing.png)

<p>Na tela de pedidos:</p>

![orders-status-preparing](/images/orders-status-preparing.png)

</details>

<details>
<summary><strong>Em Trânsito</strong></summary>

<p>Na tela de detalhes do pedido:</p>

![order-details-status-delivering](/images/order-details-status-delivering.png)

<p>Na tela de pedidos:</p>

![orders-status-delivering](/images/orders-status-delivering.png)

</details>

<details>
<summary><strong>Entregue</strong></summary>

<p>Na tela de detalhes do pedido:</p>

![order-details-status-delivered](/images/order-details-status-delivered.png)

<p>Na tela de pedidos:</p>

![orders-status-delivered](/images/orders-status-delivered.png)

</details>
<br>

<h1>Ações e Interações</h1>

<p>Algumas ações ficam bloqueadas enquanto o status do pedido não for o esperado, e estas mesmas ações podem ser realizadas apenas por usuários com a permissão correta.</p>
<p>1. A ação de atualizar o status de <strong>Pendente</strong> para <strong>Preparando</strong> só pode ser realizada por uma pessoa <strong>vendedora</strong>.</p>
<p>2. A ação de atualizar o status de <strong>Preparando</strong> para <strong>Em Trânsito</strong> só pode ser realizada por uma pessoa <strong>vendedora</strong>.</p>
<p>3. A ação de atualizar o status de <strong>Em Trânsito</strong> para <strong>Entregue</strong> só pode ser realizada pelo <strong>cliente</strong> que realizou o pedido.</p>
<br>

<h1>Equipe de Desenvolvimento</h1>

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/EnioSchaefer" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/89549102?v=4" width="180px" alt="Enio Schaefer"/>
        <p>Enio Schaefer</p>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/FelipeMalentaqui" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/102374645?v=4" width="180px" alt="Felipe Malentaqui"/>
        <p>Felipe Malentaqui</p>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/FlavynN" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/62638728?v=4" width="180px" alt="Flávio Silva"/>
        <p>Flávio Silva</p>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/PatriciaPSP" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/98499978?v=4" width="180px" alt="Patrícia Pedroso"/>
        <p>Patrícia Pedroso</p>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/renanbfreitas" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/109007554?v=4" width="180px" alt="Renan Freitas"/>
        <p>Renan Freitas</p>
      </a>
    </td>
  </tr>
</table>
