# Steg 1
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . . 
RUN npm run build 

# Steg 2
FROM nginx:1.27-alpine
COPY ngingx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80