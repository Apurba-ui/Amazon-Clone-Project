# Use an official Node.js image as the base
FROM node:16

# Set the working directory to /backend
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your application will run on
EXPOSE 8002

# Define the command to run your application
CMD ["npm", "start"]
