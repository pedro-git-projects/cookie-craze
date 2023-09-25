# Cookie Craze

## Descrição
Bem-vindo ao Cookie Craze, um jogo viciante de cliques de cookies desenvolvido usando React Native, Typescript e NestJS. Neste jogo, sua missão é obter o máximo de cookies possível, acumular recursos e expandir seu império de biscoitos. Prepare-se para uma experiência divertida e cativante!

## Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:
- Node.js: [Instalação do Node.js](https://nodejs.org/)
- Docker: [Instalação do Docker](https://docs.docker.com/desktop/install/linux-install/)

## Configuração do Projeto
1. Clone este repositório para sua máquina local:

   ```bash
   git clone https://github.com/pedro-git-projects/cookie-craze.git
   ```

2. Navegue até o diretório do projeto e a pasta mobile:

   ```bash
   cd cookie-craze/mobile
   ```

3. Instale as dependências do projeto usando o npm:

   ```bash
   npm install
   ```
4. Crie um arquivo .env com o seu endereço de IP público:
    ```bash
    touch .env 
    ```

    ```bash
    EXPO_PUBLIC_IP_ADDRESS=127.0.0.1
    ```


## Executando o Servidor
O servidor do Cookie Craze é construído usando NestJS. Para iniciá-lo, siga as instruções abaixo:

1. Navegue até o diretório `server`:

   ```bash
   cd api 
   ```

2. Instale as dependências do servidor:

   ```bash
   npm install
   ```
3. Crie um arquivo .env com a string do banco de dados e o segredo do jwt:

```bash
DATABASE_URL="postgresql://username:password@host:port/database_name?schema=schema_name"


JWT_SECRET="Muito Sigiloso"
```

4. Suba o docker com o banco de dados:

   ```bash
    docker-compose up -d
   ```
5. Inicialize o servidor:

   ```bash
   npm start
   ```


O servidor estará em execução em `http://localhost:3000`.

# Executando o Aplicativo (Android/iOS)
O aplicativo móvel Cookie Craze é construído usando React Native e Expo. Siga as etapas abaixo para executá-lo no seu dispositivo ou emulador:

1. Navegue até o diretório raiz do projeto:

   ```bash
   cd mobile 
   ```

2. Inicie o aplicativo com Expo:

   ```bash
   npx expo start
   ```

3. Abra o aplicativo Expo Go no seu dispositivo móvel ou inicie um emulador no seu computador.

4. Use a câmera do dispositivo para escanear o código QR gerado no terminal ou na página Expo DevTools no seu navegador.

5. O aplicativo Cookie Craze será carregado no seu dispositivo e estará pronto para ser jogado.

## Funcionalidades Principais
- **Clique em Cookies:** Toque na tela para assar cookies e acumular pontos.
- **Expansão:** Use os pontos acumulados para expandir seu império de biscoitos, comprando items que multiplicam os cookies por clique.
