Projeto Shopper - Leitura de Conta consumo de água/gás.

**Para rodar, certifique que você tenha criado um arquivo .env com a api-key do Gemini**


Projeto de uma api para enviar uma conta de consumo, usar uma LLM (Gemini) para identificar o valor da conta e guardar em um banco de dados.
Tecnologias utilizadas:
- Node v20.x
- TypeScript
- Express
- Prisma (ORM)

Features: 

- Rota para upload de conta ✅
- Rota para confirmação de valor da conta ✅
- Rota para listagem de contas de determinado consumidor ✅


Como rodar o projeto com docker:
  - Rodar o comando: docker compose up -d --build

Como rodar o projeto sem o docker:
  - Rodar o comando: yarn install
  - Rodar o comando para iniciar o banco de dados (PostgreSQL): yarn start:db
  - Rodar o comando para espelhar o schemas: yarn push
  - Rodar o comando para iniciar a api (DEV): yarn dev
  - Rodar o comando para buildar a aplicação: yarn build
  - Rodar o comando para iniciar a api (PROD): yarn start

