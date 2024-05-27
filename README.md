# Descrição do projeto

    - Projeto criado usando React com vite, usando typescript para deixar o projeto tipado e mais seguro
     afim de evitar erros, para a criação das rotas optei pelo react router dom, para manusear os
      formulários foi usado o react hook form pela facilidade de manusear envios de dados.

    - O desing system foi a partir do material ui para compor os componente

    - Para mocar os dados foi usado o json server, para simular um consumo de api rest externo.

    - Para gerenciar estados globais optei por utilizar o context api, por ser uma aplicação pequena que não
     iria precisar escalar tanto não usei gerenciadores de estado externo como redux (mas sei trabalhar
      com eles como: redux, mobX,Zustand) e um ponto considerado foi a rápidez para se criar o código com menos
       complexidade possível.

## Funcionamento

    - Projeto foi elaborado fazendo uso do json server e caso nao esteja operante , faz uso do local store com
     dados ja mocados somente se nao conseguir consumir do json server

    - Senha precisa ter mais de 7 dígitos

    - Ao entrar o sistema adiciona uma lista de usuários no local storage caso não esteja usando o json server
    local , assim é possível faz as interações CRUD

## Logar na aplicação

### perfil admin

    user: "Anderson"

    password: "123445"

### perfil user

    user: "Diane"
    password: "123445"

## Tecnologias utilizadas

- react-hook-form
- react-router-dom
- axios
- mui(material ui)
- json server
- vite
- typescript
- vitest
- jsdom

## Instalar o projeto

### Comandos

OBS:Para captação dos dados é preciso rodar o json server primeiro, caso não rodar a api, o projeto foi desenvolvido para mocar dados no localstorage e ir fazendo as operações
manuseando dados pelo localstorage

### Instalar dependênias

- npm install
- yarn

### Json server

- yarn jsonserver
- npm run jsonserver

### Rodar projeto

- yarn dev
- npm run dev

### Rodar testes

- yarn test
- npm run test
- yarn testcoverage
- npm run testcoverage

### Vercel
