# Brain-ag
Uma API RESTful desenvolvida para gerenciar Produtores, Fazendas e Safras. Esta aplicação fornece um sistema de backend para registrar, atualizar, deletar e consultar dados da produção rural.

## 📋 Funcionalidades
 - Operações completas de CRUD para: Producers, Farms, Harvests

 - RESTful endpoints

 - Testes unitários das funcionalidades principais

 - Script de seed para popular o banco de dados com dados iniciais

 - Página de documentação interativa via [OpenAPI](https://gustavofont.github.io/brain-ag/)

## 🧭 Estrutura da API
A API segue os princípios RESTful e é organizada em torno de três entidades principais: Producer, Farm e Harvest. Cada recurso possui rotas específicas para operações de CRUD e relacionamentos bem definidos entre si.

### 🔗 Endpoints Principais
 - 👨‍🌾 Produtores (/producers)

GET /producer — Lista todos os produtores

GET /producer/:id — Busca um produtor pelo ID

POST /producer — Cria um novo produtor

PUT /producer/:id — Atualiza um produtor existente

DELETE /producer/:id — Remove um produtor

 - 🌾 Fazendas (/farms)

GET /farm — Lista todas as fazendas

GET /farm/:id — Busca uma fazenda pelo ID

POST /farm — Cria uma nova fazenda (relacionada a um produtor)

PUT /farm/:id — Atualiza uma fazenda existente

DELETE /farm/:id — Remove uma fazenda

 - 🌱 Safras (/harvests)

GET /harvest — Lista todas as safras

GET /harvest/:id — Busca uma safra pelo ID

POST /harvest — Cria uma nova safra (relacionada a uma fazenda)

PUT /harvest/:id — Atualiza uma safra existente

DELETE /harvest/:id — Remove uma safra

### 🔄 Relacionamentos Entre Entidades
Produtor possui múltiplas Fazendas

Fazenda pertence a um único Produtor e possui múltiplas Safras

Safra pertence a uma única Fazenda

## 🚀 Como rodar o projeto
### Pré-requisitos

 - Docker Compose (v2.29+)

 - Git

 - Docker (v27+)

### Passos
 - Clone o repositório:

```
git clone https://github.com/gustavofont/brain-ag
```
 - Entrar na raiz do projeto:
```
cd brain-ag
```
 - Entrar no diretório /compose:
```
cd compose
```
 - Instale o projeto (opcional):
```
npm i
```
 - Iniciar o projeto:
```
docker compose up --build
```
 - Acesse no navegador:
[http://localhost:3000](http://localhost:3000) (deve aparecer uma mensagem da api)

## 📫 Coleção Postman
 O projeto inclui um arquivo de configuração para o Postman, contendo todas as rotas da API organizadas por categoria (Producer, Farm, Harvest).

 ``` 
  brain_ag.postman_collection.json
 ```

 ### Como Usar:
 - Importe o arquivo de configuração na interface do postman
## 🛠️ Tecnologias Utilizadas
 - Node.js / NestJs (Aplicação)

 - PostgreSQL / Sequelize (Banco de dados)

 - Jest (Testes unitários)
 
 - Zod (Validação de campos) 
   
## 🌱 Populando o Banco de Dados
 - Obs: Os pacotes do projeto precisam estar instalados, caso não tenha instalado :
```
npm i
```
 - Popular o banco de dados :
```
npm run db:seed
```
 - O script padrão cria : 100 Poducers, 200 Farms, 600 harvest
## 🧪 Executando Testes
 - Os testes unitários pode ser executados com o comando :
```
npm run test
```
