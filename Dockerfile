# ==========================================
# Stage 1: Build the frontend React app
# ==========================================
FROM node:26-alpine AS build

WORKDIR /app

# Install dependencies first (for docker caching)
COPY package.json ./
RUN npm install

# Copy source and configurations
COPY tsconfig.json tsconfig.node.json vite.config.ts index.html ./
COPY src/ ./src/

# Compile the production bundle
RUN npm run build

# ==========================================
# Stage 2: Serve the app in production with Nginx
# ==========================================
FROM nginx:stable-alpine

# Copy the static bundle from the build stage to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
