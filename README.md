Projeto Locação de Veículo - Happ


Projeto de uma api para locação de veículos, com autenticação via JWT.
Tecnologias utilizadas:
- Node v18.x
- TypeScript
- Express
- Prisma (ORM)
- Jsonwebtoken
- Repository Pattern

Login ✅
Rota para cadastramento de usuário ✅
Rota para edição e remoção de usuário ✅
Rota para cadastramentos de veículos ✅
Rota para edição e remoção de veículos ✅
Rota para listagem de veículos cadastrados ✅
Rota para reserva de veículo  ✅
Rota para liberação de veículo reservado ✅
Rota para a listagem de veículos associados a um usuário ✅

Rota para a documentação (Swagger): "/docs"

Como rodar o projeto com docker:
  - Rodar o comando: docker compose up -d --build

Como rodar o projeto sem o docker:
  - Rodar o comando: yarn install
  - Rodar o comando para iniciar o banco de dados (MongoDB): yarn run start:db
  - Rodar o comando para espelhar o schemas: yarn run migration
  - Rodar o comando para iniciar a api (DEV): yarn run dev
  - Rodar o comando para iniciar a api (PROD): yarn run start

Como rodar os testes:
-  Rodar o comando para baixar as dependências: yarn install
-  Rodar o comando para iniciar o banco de dados (MongoDB): yarn run start:db
-  Rodar o comando para espelhar o schemas: yarn run migration: yarn run migration
-  Rodar o comando para rodar os testes: yarn run test
-  Para verificar a cobertura de testes: yarn run coverage
