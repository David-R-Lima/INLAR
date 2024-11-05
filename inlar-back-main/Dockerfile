FROM node:20

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["npm","run", "docker-start"]