# Stage 1: Build the application
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose Vite’s default port
EXPOSE 5173

# Run the dev server
CMD [ "npm", "run", "dev" ]