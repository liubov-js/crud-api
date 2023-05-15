# CRUD API

## Install
Clone this repo and install dependencies:
```shell
npm install
```

## Usage
To use app in developer mode (the application is run using nodemon) run this script:
```shell
npm run start:dev
```
To use app in production mode (script starts the build process and then runs the bundled file) use this script:
```shell
npm run start:prod
```

## Implemented endpoint ```api/users```:
- GET ```api/users``` is used to get all persons
- GET ```api/users/{userId}``` is used to get a person with id === userId
- POST ```api/users``` is used to create record about new user and store it in database
- PUT ```api/users/{userId}``` is used to update existing user
- DELETE ```api/users/{userId}``` is used to delete existing user from database

### Users are stored as objects that have following properties:
- id — unique identifier (string, uuid) generated on server side
- username — user's name (string, required)
- age — user's age (number, required)
- hobbies — user's hobbies (array of strings or empty array, required)
