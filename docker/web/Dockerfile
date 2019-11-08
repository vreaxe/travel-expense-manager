FROM node:slim

# Create directory
RUN mkdir -p /data/web
WORKDIR /data/web

# Copy code
COPY ./clients/web /data/web

# Copy environment variables
COPY ./clients/.env /data/web/.env

EXPOSE 3000
