FROM node:18-alpine

# Instalar mysql-client para verificar a conexão
RUN apk add --no-cache mysql-client

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Garantir que o script tenha permissão de execução
RUN chmod +x wait-for-db.sh

EXPOSE 5000

# Usar o script para aguardar o MySQL antes de iniciar
CMD ["sh", "-c", "./wait-for-db.sh mysql && npm run dev"] 