# Dockerfile

FROM node:14

# Instalar o cliente PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia o script wait-for-postgres.sh para o diretório de trabalho
COPY wait-for-postgres.sh /usr/src/app/wait-for-postgres.sh

# Define permissões de execução para o script
RUN chmod +x /usr/src/app/wait-for-postgres.sh

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código fonte da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "index.js"]
