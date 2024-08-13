# Leilão Online de Gado Leiteiro

## Descrição
Este projeto foi desenvolvido na matéria de Programação Web do 3° ano de Engenharia de Software do IFPR - Campus Paranavaí. Trata-se de uma plataforma de leilão online focada na venda e compra de gado leiteiro. O sistema permite que os usuários registrem lotes de gado para leilão, façam lances e acompanhem os resultados em tempo real.

## Funcionalidades
- **Cadastro de Usuários:** Permite o registro e login de criadores e compradores.
- **Registro de Lotes:** Criadores podem registrar lotes de gado leiteiro com detalhes como raça, idade, produção de leite, etc.
- **Leilão em Tempo Real:** Sistema de leilão que permite lances em tempo real e atualizações automáticas.
- **Histórico de Lances:** Registra todos os lances feitos em cada lote, permitindo aos usuários acompanhar a evolução.
- **Sistema de Notificações:** Envia alertas quando um usuário é superado em um lance ou quando o leilão termina.

## Tecnologias Utilizadas
- **Front-end:** React, CSS, JavaScript
- **Back-end:** Java, Spring boot
- **Banco de Dados:** MySQL
- **Autenticação:** JWT (JSON Web Tokens)
- **Real-time:** WebSockets para atualizações de lances em tempo real

## Requisitos de Instalação
1. **Node.js:** Certifique-se de ter o Node.js instalado. [Baixe aqui](https://nodejs.org/)
2. **MySQL:** Instale e configure o MySQL. [Baixe aqui](https://www.mysql.com/)

## Como Executar
1. Clone este repositório:
    ```bash
    git clone https://github.com/usuario/leilao-online-gado-leiteiro.git
    cd leilao-online-gado-leiteiro
    ```
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Configure o banco de dados:
    - Crie um banco de dados no MySQL e atualize as credenciais no arquivo `.env`.

4. Execute as migrações:
    ```bash
    npx sequelize db:migrate
    ```

5. Inicie o servidor:
    ```bash
    npm start
    ```

6. Acesse o sistema:
    - O servidor estará rodando em `http://localhost:3000`.

## Estrutura do Projeto
- **/models**: Contém os modelos do banco de dados.
- **/controllers**: Lida com a lógica de negócios e interações com o banco de dados.
- **/routes**: Define as rotas da aplicação.
- **/public**: Arquivos estáticos como CSS, JavaScript e imagens.
- **/views**: Páginas renderizadas no front-end.

## Contribuição
Sinta-se à vontade para contribuir com este projeto enviando *pull requests* ou abrindo *issues* para discutir mudanças que podem ser feitas.
