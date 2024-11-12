# Use the official Node.js LTS version
FROM node:lts

# Set the working directory inside the container
WORKDIR /local-db

# Copy the current directory contents into the container at /code
COPY . /local-db

# Expose the desired port (this should be the port your app will listen to)
EXPOSE 5000

# Install the dependencies (based on the package.json in the context)
RUN npm install

CMD ["npm", "start"]
