# Use a base image with Node.js
FROM node:latest

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to the PATH
ENV PATH="/root/.bun/bin:$PATH"

# Clone your GitHub repository
RUN git clone https://github.com/KDanisme/walmart-home-assignment.git .

# Install dependencies
RUN bun install

# Expose the port your application uses
EXPOSE 3000

# Command to run when starting the container
CMD ["bun", "run", "src/index.ts"]
