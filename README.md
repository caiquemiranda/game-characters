# Sistema de Personalização de Personagens

Um aplicativo web para criar e personalizar personagens de jogos com sistema de login seguro.

## Funcionalidades

- Sistema de login e cadastro de usuários
- Criação e personalização de personagens
- Gerenciamento de múltiplos personagens
- Personalização de atributos como força e inteligência
- Personalização de aparência como cor de pele, cabelo e estilo de cabelo

## Tecnologias Utilizadas

### Backend
- Node.js com Express
- MySQL para banco de dados
- JWT para autenticação
- Bcrypt para criptografia de senhas

### Frontend
- React
- React Router para navegação
- Axios para requisições HTTP
- React Toastify para notificações

## Configuração do Projeto

### Pré-requisitos
- Node.js
- MySQL Server

### Instalação

1. Clone o repositório:
```
git clone https://caiquemiranda/game-characters.git
cd game-characters
```

2. Instale as dependências do servidor:
```
cd server
npm install
```

3. Configure o banco de dados:
- Crie um banco de dados MySQL chamado `game_characters`
- Ajuste as configurações no arquivo `.env` se necessário

4. Instale as dependências do cliente:
```
cd ../client
npm install
```

5. Inicie o servidor:
```
cd ../server
npm run dev
```

6. Inicie o cliente:
```
cd ../client
npm start
```

7. Acesse o aplicativo em seu navegador:
```
http://localhost:3000
```

## Estrutura do Projeto

```
game-characters/
  ├── client/                # Frontend em React
  │   ├── public/            # Arquivos públicos
  │   └── src/               # Código fonte React
  │       ├── components/    # Componentes React
  │       └── context/       # Contextos para gerenciamento de estado
  └── server/                # Backend Node.js/Express
      ├── config/            # Configurações
      ├── models/            # Modelos de dados
      └── routes/            # Rotas da API
```

## Licença

Este projeto está licenciado sob a licença MIT.