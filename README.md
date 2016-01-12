# RESTful Express Starter

[![Dependency Status](https://david-dm.org/awaseem/RESTful-express-starter.svg)](https://david-dm.org/awaseem/RESTful-express-starter)  [![devDependency Status](https://david-dm.org/awaseem/RESTful-express-starter/dev-status.svg)](https://david-dm.org/awaseem/RESTful-express-starter#info=devDependencies)

A simple starter for creating RESTful services with Express. Testing uses Mocha and supertest.

## Setup

Install all dependencies:
```
npm install
```
Start development environment:
```
npm run dev
```
Test changes using:
```
npm test
```

## Travis CI + Docker Hub Setup

This starter also allows you to test, create and push Docker images automatically with Travis CI. Simply add the following environment variables to your Travis CI environment:

```
DOCKER_EMAIL = docker_user_email
DOCKER_USERNAME = docker_user_username
DOCKER_PASSWORD = docker_user_password
DOCKER_HUB_URL = hub_username/hub_repo ( For example: awaseem/blog-api )
```

##### Created for CPSC 471
