FROM node:slim

# Create directory
RUN mkdir -p /data/web
WORKDIR /data/web

# Copy code
COPY ./clients/web /data/web

# Install dependencies
RUN npm install

# Copy environment variables
COPY ./clients/.env /data/web/.env

EXPOSE 3000
