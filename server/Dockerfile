FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma

# Allow skipping Prisma generation via build arg
ARG SKIP_PRISMA_GENERATE=false

# Install dependencies
RUN npm install

COPY . .

# Conditionally generate Prisma client
RUN if [ "$SKIP_PRISMA_GENERATE" != "true" ]; then npm run prisma:generate; fi

# Build TypeScript
RUN npm run build

EXPOSE 4000

# At container startup: always run full setup
CMD npx prisma generate && npx prisma db push && npm run upsert:all && npm start
