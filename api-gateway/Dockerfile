FROM node:20

WORKDIR /app/api-gateway

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]