# syntax=docker/dockerfile:1

FROM node:16.1.0

ENV NODE_ENV=production

EXPOSE 3001

WORKDIR /

ADD ["./frontend", "./frontend"]
ADD ["./backend", "./backend"]

RUN ls

WORKDIR /frontend

RUN ls

RUN npm install --production

RUN npm run build

WORKDIR /backend

RUN rm -rf build
RUN mkdir build

RUN npm install --production

RUN mv ../frontend/build/* ./build

RUN rm -rf ../frontend

CMD ["node", "app.js"]