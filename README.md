# start-payments

## Desafio backend - Sênior

Vamos iniciar com o setup da aplicação pela descrição sugerida no desafio. Criar uma aplicação que receba resultados enviados pela StarkBank via webhook e um cenário ficticio de envios a cada 3 horas para processamento de dados.

## setup

Versões e ferramentas utilizadas:

- Nodejs 18.18.0
- Docker
- Terraform

Explicação de cada biblioteca no setup da aplicação.

```bash
# express for api framework
# starkbank sdk
# dotend env vars
# node-cron for schedules requesting for processing data
# body parser for utils to framework
npm install express starkbank dotenv node-cron body-parser
# loggers
npm install winston
# tests
npm i jest
```

Variáveis de ambiente

```bash
# Porta da aplicação facilidade em esteiras CI/CD e clusters (ECS | EKS)
PORT=9444
# Chave secreta para interação com StarkBank SDK ou API
SECRET_STARKBANK="very_secret"
# Chave do projeto na plataforma da StarkBank.
STARKBANK_PROJECT_ID="id_project"
```

## Modelagem do projeto

Utilizei uma forma simples e objetiva para realização do teste, as pastas criadas são separadas por responsabilidade e forma de programação foi mais objetiva no sentido de funções com única responsabilidade contribuindo para siplicidade das ações a serem realizadas. Contudo abordando as principais funcionalidades do desafio.

Explicação modelagem dos arquivos

src       : source padrão de mercado e padronização do código fonte.
controller: responsável pela camada controladora para nosso desafio e padrão de API.
jobs      : responsável pelo gerenciamento das tarefas agendadas.
services  : responsável pelas regras de negócio sugeridas e algumas para funcionalidade do projeto (conexão externa, segurança)
utils     : responsável para funções utilitárias no nosso desenvolvimento.
