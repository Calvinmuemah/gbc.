# FROM node:18-alpine AS build

# # working directory
# WORKDIR /usr/src/app

# # Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy the rest of the source code
# COPY . .

# # Build the frontend
# RUN npm run build

# # Use Nginx to serve the built app
# FROM nginx:alpine

# # Copy the build to Nginx html folder
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

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the frontend (Vite will use VITE_API_ENDPOINT)
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Copy the build to Nginx html folder
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
