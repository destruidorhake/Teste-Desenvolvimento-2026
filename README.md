📋 Projéto iniciado:
- Usuário: admin
- Senha: admin123

👉 Links utilizados para constução:
- http://localhost:4200
- http://localhost:8080
- http://localhost:8080/h2-console
- http://localhost:8080/swagger-ui/index.html 

📋 Pré-requisitos para inicializar o projeto
Antes de iniciar, certifique-se de ter as seguintes versões instaladas em seu ambiente de desenvolvimento:

Tecnologias do Frontend
- Node.js: 22.19.0
- Angular CLI: 21.2.12
- Angular: 21.2.14
- npm: 11.15.0
- Bootstrap: 5.3.8

Tecnologias do Backend
- Java SDK: 22
- Spring Boot: v4.0.6
- Apache Tomcat: 11.0.21
- Database driver: H2 JDBC Driver
- 

🚀 Como Inicializar o Projeto
1. Clonar o Repositório
Certifique-se de baixar as duas pastas do projeto (Frontend-Angular e people-api) para o seu diretório local.

2. Configurando o Frontend
Abra o terminal na pasta Frontend-Angular.

Instale as dependências:
- npm install
- npm install -g @angular/cli

Inicie o servidor de desenvolvimento local:
- ng serve
👉 O projeto estará disponível em http://localhost:4200.

🚀 Como Executar o Projeto Backend
1. Configurando o Backend
Abra o terminal na pasta people-api.
Certifique-se de que sua variável de ambiente JAVA_HOME esteja apontando para o JDK 22.

Compile e execute a aplicação (PeopleApiApplication):
👉 A API estará disponível em http://localhost:8080.

🚀 Acessando banco de dados H2
Console do H2: Você pode visualizar os dados em tempo real acessando: 
👉 http://localhost:8080/h2-console
Configuração:
- spring.datasource.url=jdbc:h2:mem:testdb
- spring.datasource.driverClassName=org.h2.Driver
- spring.datasource.username=sa
- spring.datasource.password=    (Vazío)

📚 Documentação da API (Swagger)
A API possui uma interface de documentação interativa utilizando o Swagger (OpenAPI). Através dela, você pode visualizar todos os endpoints disponíveis, consultar os modelos de dados e realizar requisições de teste diretamente pelo navegador.

Como acessar:
Com a aplicação backend rodando (people-api), acesse o endereço abaixo:

👉 http://localhost:8080/swagger-ui/index.html

O que você pode fazer no Swagger:
- Explorar Endpoints: Visualize todos os métodos (GET, POST, DELETE) mapeados na API.
- Testar Requisições: Utilize o botão "Try it out" em qualquer endpoint para preencher os dados (JSON) e executar uma chamada real contra o banco de dados H2.
- Verificar Contratos: Entenda exatamente quais campos são obrigatórios e os formatos esperados pela aplicação.


