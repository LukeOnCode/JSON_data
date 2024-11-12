# Use the official Node.js LTS version
FROM node:lts

# Define build-time arguments
ARG NODE_ENV=production
ARG PORT=80

# Set the working directory inside the container
WORKDIR /code

# Copy the current directory contents into the container at /code
COPY . /code

# Expose the desired port (this should be the port your app will listen to)
EXPOSE 80

# Install the dependencies (based on the package.json in the context)
RUN npm install

# Set the default command to start the app
CMD ["npm", "start"]
