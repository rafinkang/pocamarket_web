# Use the official Node.js runtime as a base image
FROM node:22-bullseye
WORKDIR /src

# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install

# Copy the project files to the container
COPY . .

EXPOSE 3000
# Run the Next.js server
CMD ["npm", "run", "dev"]