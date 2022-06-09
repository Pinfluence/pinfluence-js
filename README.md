Pinfluence displays historical information on a map and helps students and curious people to visualise, at the same time, multiple events and people that have influenced the world.

This is the backend application responsible to expose an API to clients.

## Dev Quickstart

### Requirements

* NodeJS >= 14.x
* Postgresql >= 13.x

### Install application requirements

```bash
npm install
```

### Run de application

```bash
npm run dev
```

Web server is available at [http://localhost:3000](http://localhost:3000).

### Run the test suite

```bash
npm run test
```

## How to

### Generate database migration

```bash
npm run migration:generate <path>
```

All the paths must be prefixed with "db/".

For example:

```bash
npm run migration:generate db/create_person
```

### Run the generated migrations

```bash
npm run migration:run
```

