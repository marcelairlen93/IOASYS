# Esquema de banco de dados

Para saber como foi desenhado o banco de dados acesse: [Diagrama de BD](https://drive.google.com/file/d/1hXjWmuN_UVuR-gkL8ZA2pvhBbt527COg/view?usp=sharing)

# Preparação de ambientes e testes
- Você deve ter o docker instalado na máquina
- Executar no terminal ```docker run --name ioasys-db -e POSTGRES_USER=ioasys-test -e POSTGRES_PASSWORD=ioasys-test -e POSTGRES_DB=ioasys-test -p 5432:5432 -d postgres``` para criar o banco de dados
- Você deve acessar o banco de dados via terminal ou por algum client como o PGAdmin ou DBeaver
- Você deve realizar dois **insert** no banco de dados, na tabela **user_roles**, o primeiro passando ```name = ADMIN``` e o segundo ```name = USER```
- Após isso você deve realizar o clone deste repositório para a sua máquina
- Vocẽ deve executar no terminal, na pasta do projeto, `yarn` ou `npm -i`
- Por fim você poderá ter o projeto rodando com `yarn dev`

**Ps: Para execução de testes você pode utilizar postman ou insomnia, as rotas estarão declaradas abaixo** ~(por falta de tempo para documentar no swagger)~
# Rotas
## Auth
- `POST` -> `http://localhost:3333/auth/login` => Rota responsável por logar o usuário, recebe `{ "email": "string", "password": "string" }` como body
- `POST` -> `http://localhost:3333/auth/change-password` => Rota responsável por mudar a senha de um usuário, recebe `{ "oldPassword": "string", "newPassword": "string" }` como body

## Usuários (Admin e usuário comum)
- `GET` -> `http://localhost:3333/user/` => Rota responsável por trazer uma lista com todos os usuários cadastrados (apenas ADMIN possui acesso)
- `GET` -> `http://localhost:3333/user/:id` => Rota responsável por buscar um usuário pelo seu ID (apenas ADMIN possui acesso)
- `POST` -> `http://localhost:3333/user/` => Rota responsável por CRIAR um usuário, recebe `{ "email": "string", "password": "string", "role": "ADMIN" || "USER" }` como body
- `PATCH` -> `http://localhost:3333/user/:id` => Rota responsável por EDITAR um usuário, recebe `{ "email": "string", "role": "ADMIN" || "USER", "enabled": "boolean" }` como body (usuário logados podem acessar) ~(falta validar para o usuário comum ser permitido alterar apenas o seu próprio usuário)~
- `DELETE` -> `http://localhost:3333/user/:id` => Rota responsável por DESABILITAR um usuário (apenas ADMIN possui acesso)

## Filme (Admin e usuário comum)
- `GET` -> `http://localhost:3333/film/` => Rota responsável por trazer uma lista com todos os filmes cadastrados (todos os usuário, e visitante, possuem acesso) ou (se for passado um termo de busca `?search="titulo | genero | diretor | ator"` a lista virá filtrada pelas ocorrências que fazem match com o termo)
- `GET` -> `http://localhost:3333/film/:id` => Rota responsável por buscar um filme pelo seu ID e trazer seus detalhes (todos os usuários, e visitante, possuem acesso)
- `POST` -> `http://localhost:3333/film/` => Rota responsável por CADASTRAR um filme, recebe `{"title": "string", "actors": ["string"], "directors": ["string"], "genres": ["string"], "synopsis": "string" }` como body (apenas ADMIN possui acesso) ~(NÃO FUNCIONAL, sem tempo hábil para desenvolver)~
- `PATCH` -> `http://localhost:3333/film/:id` => Rota responsável por EDITAR um filme, recebe `{"title": "string", "actors": ["string"], "directors": ["string"], "genres": ["string"], "synopsis": "string" }` como body ~(NÃO FUNCIONAL, sem tempo hábil para desenvolver)~
- `DELETE` -> `http://localhost:3333/film/:id` => Rota responsável por DESABILITAR um filme (apenas ADMIN possui acesso)

## Voto (Usuário comum)
- `GET` -> `http://localhost:3333/rating/` => Rota responsável por cadastrar um voto recebe `{"filmId": "string", "rating": [0 | 1 | 2 | 3 | 4] }` como body (apenas usuários comuns possuem acesso)

**Ps: Infelizmente não foi possível completar todos os requisitos do teste**

## tecnologias e pacotes utilizados:
- NodeJS
- TypeORM
- Docker
- EsLint
- Typescript
- Postgres
- JWT
- BCrypt

---

# Sobre

Estes documento README tem como objetivo fornecer as informações necessárias para realização do projeto de avaliação de candidatos.

# 🏗 O que fazer?

- Você deve realizar um fork deste repositório e, ao finalizar, enviar o link do seu repositório para a nossa equipe. Lembre-se, NÃO é necessário criar um Pull Request para isso, nós iremos avaliar e retornar por email o resultado do seu teste.

# 🚨 Requisitos

- A API deverá ser construída em **NodeJS** ou **Rails**
- Implementar autenticação e deverá seguir o padrão **JWT**, lembrando que o token a ser recebido deverá ser no formato **Bearer**
- Caso seja desenvolvida em NodeJS o seu projeto terá que ser implementado em **ExpressJS** ou **SailsJS**
- Para a comunicação com o banco de dados utilize algum **ORM**/**ODM**
- Bancos relacionais permitidos:
  - MySQL
  - MariaDB
  - Postgre
- Bancos não relacionais permitidos:
  - MongoDB
- Sua API deverá seguir os padrões Rest na construção das rotas e retornos
- Sua API deverá conter a collection/variáveis do postman ou algum endpoint da documentação em openapi para a realização do teste
- É desejável que o teste esteja na liguagem  **JavaScript** buscando avaliar o entendimento completo da linguagem e não de estruturas ou dependências que abstraiam determinadas definições não alheias ao ECMAScript. No entanto, testes realizados em **TypeScript** também serão aceitos.

# 🕵🏻‍♂️ Itens a serem avaliados

- Estrutura do Projeto
- Segurança da API, como autenticação, senhas salvas no banco, SQL Injection e outros
- Boas práticas da Linguagem/Framework
- Seu projeto deverá seguir tudo o que foi exigido na seção [O que desenvolver?](##--o-que-desenvolver)
- Migrations para a criação das tabelas do banco relacional

# 🎁 Extra

Esses itens não são obrigatórios, porém desejados.

- Testes unitários
- Linter
- Code Formater

**Obs.: Lembrando que o uso de algum linter ou code formater irá depender da linguagem que sua API for criada**

# 🖥 O que desenvolver?

Você deverá criar uma API que o site [IMDb](https://www.imdb.com/) irá consultar para exibir seu conteúdo, sua API deve conter as seguintes features:

- Admin

  - Cadastro
  - Edição
  - Exclusão lógica (Desativação)

- Usuário

  - Cadastro
  - Edição
  - Exclusão lógica (Desativação)

- Filmes

  - Cadastro (Somente um usuário administrador poderá realizar esse cadastro)
  - Voto (A contagem dos votos será feita por usuário de 0-4 que indica quanto o usuário gostou do filme)
  - Listagem (deverá ter filtro por diretor, nome, gênero e/ou atores)
  - Detalhe do filme trazendo todas as informações sobre o filme, inclusive a média dos votos

**Obs.: Apenas os usuários poderão votar nos filmes e a API deverá validar quem é o usuário que está acessando, ou seja, se é admin ou não**

# 🔗 Links

- Documentação JWT https://jwt.io/
- Frameworks NodeJS:

  1. https://expressjs.com/pt-br/
  2. https://sailsjs.com/

- Guideline rails http://guides.rubyonrails.org/index.html
