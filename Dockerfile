# Use Node.js base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY .env .env

# Install dependencies 
RUN npm install  

# Copy the application code
COPY . .

# Expose the application port (default is 8080 in your code)
EXPOSE 8080

# Start the application
CMD ["node", "index"]
