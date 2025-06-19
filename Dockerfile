# Use official Node.js image as base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the app source code
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the port your app runs on (default 3000)
EXPOSE 3000

# Start the NestJS server (use the compiled dist folder)
CMD ["node", "dist/main"]
