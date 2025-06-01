# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN echo "Installing dependencies" && npm install

COPY . .
RUN echo "Running Vite build" && npm run build && echo "Build complete, contents:" && ls -la dist

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Replace default Nginx config properly
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
