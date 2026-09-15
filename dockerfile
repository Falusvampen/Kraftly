# Steg 1
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . . 
RUN npm run build 

# Steg 2
FROM nginx:1.27-alpine-slim

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

#Start: docker build -t kraftly .
#Run: docker run -p 8080:8080 kraftly