# Steg 1
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . . 
RUN npm run build 

# Steg 2
# FROM nginx:1.27-alpine-slim

# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/dist /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


FROM nginx:1.27-alpine
# Mall, inte färdig config: PORT, API_URL och API_KEY kommer från miljön vid start.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
# Vilken commit är det här? Pipelinen skickar in sha:n – läses på /version.txt
ARG GIT_SHA=lokal
RUN echo "$GIT_SHA" > /usr/share/nginx/html/version.txt
# Render sätter PORT själv. Lokalt och i compose gäller 80.
ENV PORT=80
EXPOSE 80

#Start: docker build -t kraftly .
#Run: docker run -p 8080:8080 kraftly