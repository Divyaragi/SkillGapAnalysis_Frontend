ARG BUILD_ENV=dev
# Set the base image to Node.js
FROM node:18-alpine AS builder
 
# Set the working directory to /app
WORKDIR /app
# Copy the package.json and package-lock.json to the working directory
COPY package.json ./
# Install dependencies
RUN npm install
# Copy the remaining application files to the working directory
COPY . .
# Build the application
RUN npm run build
 
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm -f /etc/nginx/sites-enabled/default
COPY --from=builder /app/nginx/default_dev.conf /etc/nginx/sites-enabled/default_dev.conf
COPY --from=builder /app/nginx/default_dev.conf /etc/nginx/conf.d/default_dev.conf
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]