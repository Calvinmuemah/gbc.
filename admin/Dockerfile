# FROM node:18-alpine AS build

# # Set working directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy source code
# COPY . .

# # Build the admin frontend
# RUN npm run build

# # Stage 2: Serve with Nginx
# FROM nginx:alpine

# # Copy build output to Nginx html directory
# COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# # Expose port
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]


# Stage 1: Build
FROM node:18-alpine AS build

# working directory
WORKDIR /usr/src/app

# Accept API endpoint from build args
ARG VITE_API_ENDPOINT
ENV VITE_API_ENDPOINT=$VITE_API_ENDPOINT

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the admin frontend (Vite uses VITE_API_ENDPOINT)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build output to Nginx html directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
