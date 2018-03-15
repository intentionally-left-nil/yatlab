# Yatlab

This repository holds the website component of yatlab. It handles the OAuth flow to authorize yatlab for a Slack workspace. It also manages the acronyms for each team.

## Installation
Prerequisites: Node, Yarn, Postgres

1. `git clone git@github.com:AnilRedshift/yatlab.git`
1. `yarn install`
1. Add the following secrets to your environment:
    * CLIENT_ID (See https://api.slack.com/apps)
    * CLIENT_SECRET (also from Slack)
    * JWT_SECRET (A secret string to protect the authorization cookie)
    * URL_BASE (http://localhost:3000 for local development, otherwise the URL of the server)
    * DATABASE_URL (postgres://postgres:@db:5432/postgres or similar)
1. `yarn db:migrate`
1. `yarn build:dev`
1. `yarn server:dev`
1. Navigate to http://localhost:3000

There is also a docker-compose file, if you would prefer to run everything in docker. `docker-compose up` will do the trick.

## Development
One important thing to note is that this server has two purposes. It statically builds the client-side javascript files (the same way that [create-react-app](https://github.com/facebook/create-react-app) does, and statically serves them to the frontend as requested. It __also__ handles server-side react & api calls.

So, if you're just messing with the react codebase and don't need to make any server side calls, you can use the normal create-react-app workflow and run `yarn start` to launch your hot-reloading server and develop.

However, the second you want to make API calls, you need to run the backend server. That's where `yarn server:dev` comes in.

TL;DR: Run `yarn build:dev` to generate your client side code and `yarn server:dev` for the backend.

### Tests
There really ought to be more api tests, but I'm not a huge fan of UI tests. It's all side-effects anyways.

## Deploying
There's a Dockerfile that gets built and the same environment variables are passed into it. The production environment uses `yarn build` and `yarn server`


## Yatlab architecture overview
Yatlab is made out of 3 github repositories and 4 services

1. [yatlab-nginx](https://github.com/AnilRedshift/yatlab-nginx) handles traffic to https://yatlab.terminal.space and reverse-proxy's it to the web service
2. [yatlab](https://github.com/AnilRedshift/yatlab) Handles the website, and stores the data it receives in a database. The website is independent of the Slack bot itself.
3. There is a postgres database which contains the data about the teams and acronyms
4. [yatlab-worker](https://github.com/AnilRedshift/yatlab-worker) polls the database for changes and connects to each Slack team using the Slack api
