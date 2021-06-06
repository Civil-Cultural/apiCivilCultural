<h1 align='center'>Documentação</h1>

<p>
  Informações relacionada a api. Rotas, nomes das rotas, arquivo de configurações etc. Se for um contribuidor deixe informações que você acha importante para outros contribuintes saberem como rodar em seu ambiente. Qualquer modificação nesse código e que esteja documentada nesse arquivo você deve atualiza-la (só se deve modificar o arquivo se as modificações no código forem para pull request). Não coloque informações sigilosas por exemplo informações da conexão do banco de dados. 
</p>

****

* [Rodar no Ambiente](#Rodar%20no%20Ambiente)
  
* [Rotas](#Rotas)


## Rodar no Ambiente
  Primeiro adicione todas as informações no arquivo `.env` para no seu ambiente. 
### Ambiente de desenvolvimento
Execute  `npm run/yarn dev`
### Ambiente de produção
Execute `npm run/yarn build` depois `npm run/yarn start`
## Rotas

  Rotas para solicitação da api

|Método|Rota|Nome da rota|Autenticar|
|---|---|---|---|
|GET |/apicvcl/authors/:page/:perPage|api.authors.index|sim|
|POST|/apicvcl/authors|api.authors.store|sim|
|GET|/apicvcl/authors/:id|api.authors.show|sim|
|PUT|/apicvcl/authors/:id|api.authors.update|sim|
|DELETE|/apicvcl/authors/:id|api.authors.destroy|sim|
|GET|/apicvcl/authors/:id/publications/:page/:perPage|api.authors.publications|sim|
|GET|/apicvcl/categories/:page/:perPage|api.categories.index|sim|
|POST|/apicvcl/categories|api.categories.store|sim|
|GET|/apicvcl/categories/:id|api.categories.show|sim|
|PUT|/apicvcl/categories/:id|api.categories.update|sim|
|DELETE|/apicvcl/categories/:id|api.categories.destroy|sim|
|GET|apicvcl/categories/:id/publications/:page/:perPage|api.categories.publications|sim|
|GET|/apicvcl/publications/:page/:perPage|api.publications.index|sim|
|POST|/apicvcl/publications|api.publications.store|sim|
|GET|/apicvcl/publications/:id|api.publications.show|sim|
|PUT|/apicvcl/publications/:id|api.publications.update|sim|
|DELETE|/apicvcl/publications/:id|api.publications.destroy|sim|
|POST|/apicvcl/users/login|api.users.login|sim|
|GET|/apicvcl/users/:page/:perPage|api.users.index|sim|
|POST|/apicvcl/users|api.users.store|sim|
|GET|/apicvcl/users/:id|api.users.show|sim|
|PUT|/apicvcl/users/:id|api.users.update|sim|
|DELETE|/apicvcl/users/:id|api.users.destroy|sim|
|GET|/apicvcl/users/:id/categories/:page/:perPage|api.users.indexCategories|sim|
|POST|/apicvcl/users/categories|api.users.storeCategories|sim|
|GET|/apicvcl/users/categories/:userId/:categoryId|api.user.showCategories|sim|
|DELETE|/apicvcl/users/categories/:userId/:categoryId|api.users.removeCategories|sim|
|GET|/apicvcl/users/:id/publications/:page/:perPage|api.users.indexPublications|sim|
|POST|/apicvcl/users/publications|api.users.storePublications|sim|
|GET|/apicvcl/users/publications/:userId/:publicationId|api.user.showPublications|sim|
|DELETE|/apicvcl/users/publications/:userId/:publicationId|api.users.removePublications|sim|
|POST|/apicvcl/auth/login|api.auth.login|sim|
|POST|/apicvcl/auth|api.auth.store|sim|
|GET|/apicvcl/auth|api.auth.logout|sim|
|GET|/apicvcl/status |api.auth.status|não|