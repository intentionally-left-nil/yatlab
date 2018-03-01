FROM node:9.6.1

ENV NODE_ENV production

WORKDIR /usr/src/yatlab

# Install just the dependencies first to cache layers better
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Copy over the remaining files
COPY . .

EXPOSE 8080
CMD [ "yarn", "server" ]
