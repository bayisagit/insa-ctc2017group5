FROM oven/bun:latest

# Install OpenSSL
RUN apt-get update && apt-get install -y openssl

WORKDIR /app

# Copy package files first for better caching
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy all other files
COPY . .

# Generate Prisma client
RUN bunx prisma generate

EXPOSE 3000

CMD ["bun", "run", "dev"]