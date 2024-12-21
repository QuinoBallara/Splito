# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm cache clean --force && npm install

# Copy the rest of the application
COPY . .

# Expose port and start React app
EXPOSE 3000
CMD ["npm", "run", "dev"]
