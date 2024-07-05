# Use an official Node.js runtime as a parent image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies including devDependencies
RUN npm install --only=prod

# # Install TypeScript globally
RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port 3000 (or whichever port your application uses)
EXPOSE 3000

# Command to run the application
CMD ["node", "build/index.js"]
