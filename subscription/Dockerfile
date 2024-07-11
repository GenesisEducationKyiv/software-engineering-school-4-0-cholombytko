FROM node:20

WORKDIR /app/subscription

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD [ "node", "dist/src/main" ]