FROM node:16-alpine
RUN apk add --no-cache python3 py3-pip make g++
RUN apk --no-cache add git
RUN apk add --no-cache \
  build-base \
  g++ \
  cairo-dev \
  jpeg-dev \
  pango-dev \
  giflib-dev

EXPOSE 8000
ENV PORT 8000

RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app/
COPY tsconfig.json /usr/src/app/

WORKDIR /usr/src/app
RUN npm install
COPY src src

RUN npm run build
CMD npm run start
