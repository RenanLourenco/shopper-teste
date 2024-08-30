Projeto Shopper - Leitura de Conta consumo de água/gás.


Projeto de uma api para enviar uma conta de consumo, usar uma LLM para identificar o valor da conta e guardar em um banco de dados.
Tecnologias utilizadas:
- Node v20.x
- TypeScript
- Express
- Prisma (ORM)

- Rota para upload de conta ✅
- Rota para confirmação de valor da conta ✅
- Rota para listagem de contas de determinado consumidor ✅


Como rodar o projeto com docker:
  - Rodar o comando: docker compose up -d --build

Como rodar o projeto sem o docker:
  - Rodar o comando: yarn install
  - Rodar o comando para iniciar o banco de dados (PostgreSQL): yarn run start:db
  - Rodar o comando para espelhar o schemas: yarn run push
  - Rodar o comando para iniciar a api (DEV): yarn run dev
  - Rodar o comando para buildar a aplicação: yarn run build
  - Rodar o comando para iniciar a api (PROD): yarn run start

