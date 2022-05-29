# VK Studija booking app BE

Back-end of booking app for beauty studio, where user can choose necessary service and book online.

## Installation

Install VK Studija booking app back-end with npm

```bash
  npm install
```

## Run Application

```bash
  npm start
```

## Usage

Booking app uses following main routes:

POST /register;

POST /login;

POST /;

POST /:id;

GET /;

GET /:id;

DELETE /:id;

## Dependencies

`bcryptjs: ^2.4.3`
`cors: ^2.8.5`
`dotenv: ^16.0.1`
`eslint: ^8.16.0`
`express: ^4.18.1`
`joi: ^17.6.0`
`jsonwebtoken: ^8.5.1`
`morgan: ^1.10.0`
`mysql2`: ^2.3.3`

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=`

`MYSQL_HOST=`

`MYSQL_USER=`

`MYSQL_PASS=`

`MYSQL_DB=`

`MYSQL_PORT=`

`JWT_SECRET=`

## Future development

- Add /PUT route to update mysql tables

## Author

Andrejus Ponomariovas

- [@AndrejPon](https://github.com/AndrejPon)

## License

[MIT](https://choosealicense.com/licenses/mit/)
