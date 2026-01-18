# Use the official Node.js image as the base image
ARG NODE_VERSION=22.17.1

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Set pnpm store to a location that can be cached
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN pnpm config set store-dir $PNPM_HOME/store

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the app
RUN pnpm run build

# Prune dev dependencies for production
RUN pnpm prune --prod

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "dist/main.js"]