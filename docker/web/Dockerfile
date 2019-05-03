FROM node:alpine

# Create directory
RUN mkdir -p /data/web
WORKDIR /data/web

# Install dependencies
COPY ./clients/web/package.json /data/web/
RUN npm install

# Copy environment variables
COPY ./clients/.env /data/web/

# Copy code
COPY ./clients/web /data/web

EXPOSE 3000
