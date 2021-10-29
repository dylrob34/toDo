# syntax=docker/dockerfile:1

FROM node:16.1.0

ENV NODE_ENV=production

EXPOSE 80

WORKDIR /app

COPY ["/backend/package.json", "/backend/package-lock.json*", "./"]

RUN npm install --production

COPY ./backend .

CMD ["node", "app.js"]