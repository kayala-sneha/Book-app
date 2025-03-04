# Use the official Node.js image as a base
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the backend code
COPY . ./

# Expose the port your backend app will run on
EXPOSE 5000

# Start the backend app
CMD ["node", "server.js"]
