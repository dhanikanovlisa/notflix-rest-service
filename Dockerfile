FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 8000

CMD [ "npm" , "run", "dev"]