FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev --ignore-scripts

COPY mock-api ./mock-api

EXPOSE 4000

# Det här kör servern som icke-root
USER node

CMD ["node", "mock-api/server.js"]