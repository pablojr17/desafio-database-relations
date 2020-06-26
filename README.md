<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
  Desafio 09: Relacionamentos com banco de dados no Node.js
</h3>

<blockquote align="center">“Mude você e todo o resto mudará naturalmente”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafios?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  

  <a href="https://github.com/Rocketseat/bootcamp-gostack-desafios/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rocketseat/bootcamp-gostack-desafios?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  
</p>

## :rocket: Sobre o desafio

Nesse desafio, você vai estar criando uma nova aplicação para aprender novas coisas e treinar o que você aprendeu até agora no Node.js junto ao TypeScript, incluindo o uso de banco de dados com o TypeORM, e relacionamentos ManyToMany!

Essa será uma aplicação que deve permitir a criação de clientes, produtos e pedidos, onde o cliente pode gerar novos pedidos de compra de certos produtos, como um pequeno e-commerce.

### Template da aplicação

Para te ajudar nesse desafio, criamos para você um modelo que você deve utilizar como um template do Github.

O template está disponível na seguinte url: **[Acessar Template](https://github.com/Rocketseat/gostack-template-typeorm-relations)**

**Dica**: Caso não saiba utilizar repositórios do Github como template, temos um guia em **[nosso FAQ](https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/faq-desafios).**

Agora navegue até a pasta criada e abra no Visual Studio Code, lembre-se de executar o comando `yarn` no seu terminal para instalar todas as dependências.

### Rotas da aplicação

Agora que você já está com o template clonado e pronto para continuar, você deve verificar os arquivos da pasta `src` e completar onde não possui código com o código para atingir os objetivos de cada rota.

- **`POST /customers`**: A rota deve receber `name` e `email` dentro do corpo da requisição, sendo o `name` o nome do cliente a ser cadastrado. Ao cadastrar um novo cliente, ele deve ser armazenado dentro do seu banco de dados e deve ser retornado o cliente criado. Ao cadastrar no banco de dados, na tabela `customers` ele deverá possuir os campos possuindo os campos `name`, `email`, `created_at`, `updated_at`.

**Dica**: Antes de criar um novo cliente, sempre verifique se já existe um cliente com o mesmo e-mail. Caso ela exista, retorne um erro.

- **`POST /products`**: Essa rota deve receber `name`, `price` e `quantity` dentro do corpo da requisição, sendo o `name` o nome do produto a ser cadastrado, `price` o valor unitário e `quantity` a quantidade existente em estoque do produto. Com esses dados devem ser criados no banco de dados um novo produto com os seguitnes campos: `name`, `price`, `quantity`, `created_at`, `updated_at`.

**Dica 1**: Antes de criar um novo produto, sempre verifique se já existe um produto com o mesmo nome. Caso ela exista, retorne um erro.

**Dica 2**: Para o campo `price`, você pode utilizar o `type` como `decimal` na sua migration, passando também as propriedades `precision` e `scale`.

- **`POST /orders/`**: Nessa rota você deve receber no corpo da requisição o `customer_id` e um array de products, contendo o `id` e a `quantity` que você deseja adicionar a um novo pedido. Aqui você deve cadastrar na tabela `order` um novo pedido, que estará relacionado ao `customer_id` informado, `created_at` e `updated_at` . Já na tabela `orders_products`, você deve armazenar o `product_id`, `order_id`, `price` e `quantity`, `created_at` e `updated_at`.

**Dica 1**: Nessa funcionalidade, você precisará fazer um relacionamento de N:N entre produtos e pedidos, onde vários produtos podem estar em vários pedidos, com isso você deve sempre armazenar o valor do produto no momento da compra e a quantidade pedida na tabela pivô com nome de `orders_products`, essa tabela vai ter os campos `id`, `order_id`, `product_id`, `quantity`, `price`, `created_at` e `updated_at`. Para esse tipo de relacionamento, você pode verificar na documentação do TypeORM sobre [como fazer relacionamento muitos-para-muitos com propriedades customizadas](https://github.com/typeorm/typeorm/blob/master/docs/many-to-many-relations.md#many-to-many-relations-with-custom-properties).

**Dica 2**: Além disso, você pode também utilizar o método de cascade do TypeORM, que irá adicionar na sua tabela `order_products` os produtos que você passar por parametro para a entidade de `orders` automaticamente, você pode saber mais sobre isso aqui: [Opção de cascade](https://github.com/typeorm/typeorm/blob/master/docs/relations.md#cascade-options)

**Dica 3**: A sua requisição do insomnia deve enviar um JSON com o formato parecido com esse:

```json
{
  "customer_id": "e26f0f2a-3ac5-4c21-bd22-671119adf4e9",
  "products": [
    {
      "id": "ce0516f3-63ae-4048-9a8a-8b6662281efe",
      "quantity": 5
    },
    {
      "id": "82612f2b-3f31-40c6-803d-c2a95ef35e7c",
      "quantity": 7
    }
  ]
}
```

**Dica 4**: Uma chamada a essa rota deve retornar os dados do cliente, produtos do pedido e id do pedido, num formato parecido com o seguinte:

```json
{
  "id": "5cbc4aa2-b3dc-43f9-b121-44c1e416fa92",
  "created_at": "2020-05-11T07:09:48.767Z",
  "updated_at": "2020-05-11T07:09:48.767Z",
  "customer": {
    "id": "e26f0f2a-3ac5-4c21-bd22-671119adf4e9",
    "name": "Rocketseat",
    "email": "oi@rocketseat.com.br",
    "created_at": "2020-05-11T06:20:28.729Z",
    "updated_at": "2020-05-11T06:20:28.729Z"
  },
  "order_products": [
    {
      "product_id": "ce0516f3-63ae-4048-9a8a-8b6662281efe",
      "price": "1400.00",
      "quantity": 5,
      "order_id": "5cbc4aa2-b3dc-43f9-b121-44c1e416fa92",
      "id": "265b6cbd-3ab9-421c-b358-c2e2b5b3b542",
      "created_at": "2020-05-11T07:09:48.767Z",
      "updated_at": "2020-05-11T07:09:48.767Z"
    },
    {
      "product_id": "82612f2b-3f31-40c6-803d-c2a95ef35e7c",
      "price": "500.00",
      "quantity": 7,
      "order_id": "5cbc4aa2-b3dc-43f9-b121-44c1e416fa92",
      "id": "ae37bcd6-7be7-47b9-b277-afee35aab4e4",
      "created_at": "2020-05-11T07:09:48.767Z",
      "updated_at": "2020-05-11T07:09:48.767Z"
    }
  ]
}
```

- **`GET /orders/:id`**: Essa rota deve retornar as informações de um pedido específico, com todas as informações que podem ser recuperadas através dos relacionamentos entre a tabela `orders`, `customers` e `orders_products`.

**Dica**: Aqui você pode utilizar a opção [eager do TypeORM](https://github.com/typeorm/typeorm/blob/master/docs/eager-and-lazy-relations.md#eager-relations) ou passar a opção [relations](https://github.com/typeorm/typeorm/blob/master/docs/find-options.md) para o método findOne do TypeORM, informando os nomes das tabelas que você deseja buscar o relacionamento.

### Links úteis

- [Cascade option TypeORM](https://github.com/typeorm/typeorm/blob/master/docs/relations.md#cascade-options)
- [Relacionamento many-to-many personalizado](https://github.com/typeorm/typeorm/blob/master/docs/many-to-many-relations.md#many-to-many-relations-with-custom-properties)
- [Eager loading com TypeORM](https://github.com/typeorm/typeorm/blob/master/docs/eager-and-lazy-relations.md#eager-relations)
- [Opções de relacionamentos do TypeORM](https://github.com/typeorm/typeorm/blob/master/docs/find-options.md)

### Específicação dos testes

Em cada teste, tem uma breve descrição no que sua aplicação deve cumprir para que o teste passe.

Caso você tenha dúvidas quanto ao que são os testes, e como interpretá-los, dê uma olhada em **[nosso FAQ](https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/faq-desafios).**

Para esse desafio, temos os seguintes testes:

<h4 align="center">
  ⚠️ Antes de rodar os testes, crie um banco de dados com o nome "gostack_desafio09_tests" para que todos os testes possam executar corretamente ⚠️
</h4>

- **`should be able to create a new customer`**: Para que esse teste passe, sua aplicação deve permitir que um cliente seja criado, e retorne um json com o cliente criado.

- **`should not be able to create a customer with one e-mail thats already registered`**: Para que esse teste passe, sua aplicação deve retornar um erro quando você tentar cadastrar um cliente com um e-mail que já esteja cadastrado no banco de dados.

- **`should be able to create a new product`**: Para que esse teste passe, sua aplicação deve permitir que um produto seja criado, e retorne um json com o produto criado.

- **`should not be able to create a duplicated product`**: Para que esse teste passe, sua aplicação deve retornar um erro quando você tentar cadastrar um produto com um nome que já esteja cadastrado no banco de dados.

- **`should be able to create a new order`**: Para que esse teste passe, sua aplicação deve permitir que um pedido seja criado, e retorne um json com o todos os dados do pedido criado.

- **`should not be able to create an order with a invalid customer`**: Para que esse teste passe, sua aplicação não deve permitir a criação de um novo pedido com um cliente que não existe no banco de dados, retornando um erro.

- **`should not be able to create an order with invalid products`**: Para que esse teste passe, sua aplicação não deve permitir a criação de um novo pedido com um produtos que não existem no banco de dados, retornando um erro caso um ou mais dos produtos enviados não exista no banco de dados.

- **`should not be able to create an order with products with insufficient quantities`**: Para que esse teste passe, sua aplicação não deve permitir a criação de um novo pedido com um produtos que não possuem quantidade disponível, retornando um erro caso um ou mais dos produtos enviados não possua a quantidade necessária.

- **`should be able to subtract an product total quantity when it is ordered`**: Para que esse teste passe, sua aplicação deve permitir que, quando um novo pedido for criado, seja alterada a quantidade total dos produtos baseado na quantidade pedida.

- **`should be able to list one specific order`**: Para que esse teste passe, você deve permitir que a rota `orders/:id` retorne um pedido, contendo todas as informações do pedido com o relacionamento de `customer` e `order_products`.
