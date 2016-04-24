# Renti Backend REST API

The project will be an implementation of user driven rental service for cars. Currently there are multiple car sharing companies on the market such as Car2Go and Uber, but there no easy to use service to rent your car out while you are not using it. Our solution would create an easy to use and convenient way to do short term rentals on personal vehicles. The concept would be similar to Airbnb but for vehicles. We hope that we can make it easier for some people to make some money by loaning out their car and make it possible for people to save money on rentals.

## Setup

Please ensure that you have Node.js and NPM installed. Node version should be at least 4.2.2 and NPM version should be at least 2.0.0. You also need to ensure that sqlite is installed on your system! After all the requirements are met, follow the steps below to get setup:

Install all dependencies:
```
npm install
```
When all dependencies are installed properly, you either start development environment:
```
npm run dev
```
Or start production environment:
```
npm start
```

NOTE: Once the npm install is complete, the filler sql script is run automatically and generates a database with data. The filler sql script is located within `seeds/filler.js`

Once the backend is running, head over to the Renti Front End to start the web application.

##### Created for CPSC 471
