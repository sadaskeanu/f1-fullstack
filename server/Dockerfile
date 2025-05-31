# Stage 1: Build the application
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Copy Prisma schema 
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Generate Prisma client & build TS
RUN npm run prisma:generate

# Build the server app 
RUN npm run build

# Expose the port your app runs on
EXPOSE 4000

# Run migration, data seeding, and start the backend server
CMD npx prisma db push && npm run upsert:all && npm start
