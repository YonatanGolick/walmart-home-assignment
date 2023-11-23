# Use a base image with Node.js (as Bun isn't widely available in base images yet)
FROM node:latest

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Install Bun (adjust this if the installation method changes)
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to the PATH
ENV PATH="/root/.bun/bin:$PATH"

# Clone your GitHub repository
# Replace 'your-github-repo-url' with the actual URL of your GitHub repository
RUN git clone https://github.com/KDanisme/walmart-home-assignment.git .

# Install dependencies (assuming your project has a package.json)
RUN bun install

# Expose the port your application uses
# Replace '3000' with your actual port if different
EXPOSE 3000

# Command to run when starting the container
CMD ["bun", "run", "src/index.ts"]
