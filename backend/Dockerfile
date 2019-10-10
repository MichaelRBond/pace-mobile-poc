FROM node:12.11-alpine

EXPOSE 3000

RUN apk add --no-cache python3

RUN mkdir -p /app/
RUN chown -R node /app/

WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn install

ENV NODE_ENV="production"

USER node
ADD . /app/

ENTRYPOINT ["yarn"]
