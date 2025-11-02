FROM node:18

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy app code
COPY . .

# Install curl for health check
RUN apt-get update && apt-get install -y curl

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
