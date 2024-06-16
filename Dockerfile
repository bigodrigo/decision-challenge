# Etapa de build
FROM node:18-alpine AS builder

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração e as dependências
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código do aplicativo
COPY . .

# Gere os arquivos do Prisma
RUN npx prisma generate

# Gere os arquivos de produção
RUN npm run build

# Etapa de execução
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de build do estágio anterior
COPY --from=builder /app ./

# Exponha a porta que a aplicação vai rodar
EXPOSE 3000

# Defina a variável de ambiente para o Prisma
ENV DATABASE_URL="file:./dev.db"

# Inicie a aplicação
CMD ["npm", "run", "start"]
