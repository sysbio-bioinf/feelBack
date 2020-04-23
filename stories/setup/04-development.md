# Development

## Installing this Starter Template

If you like you can simply clone this repository.

1. Use `Find / Replace` to replace every `nx-starter` with your organisation name (e.g., `foobar`).
2. Run `npm install` to install everything
3. Grab a cup of coffee, because this will take years!

## Docker Containers

This package ships with a pre-defined `./docker-compose.yml` file in the root folder of this mono repository. This docker-compose file automatically installs and configures the following services:

- PostgreSQL (11.5 Alpine): Database
- PostgreSQL Admin (latest): Web UI for the Database

Respective services are properly assigned to so-called `networks` and are visible to other services within their own network. For example, the `pgadmin` service can access the `db` service, as they are within the same network. This, in turn, allows you to connect the `pgadmin` service to the host `db`. The IP-address of `db` is then automatically resolved during run-time (i.e., the service `db` may have a different IP-address every time!).

In order to start / stop the pre-defined docker containers, call

```bash
# start containers, creates volumes, networks and links them together
docker-compose up
# or start containers and detach the current console
docker-compose up -d

# pause containers (or by name)
docker-compose pause
docker-compose pause db

# unpause containers (or by name)
docker-compose unpause
docker-compose unpause db

# stop containers (or by name)
docker-compose stop
docker-compose stop db

# start containers manually (or by name)
docker-compose start
docker-compose start db

# stop containers (and delete all volumes, networks, ...)
docker-compose down
```

## Run a specific application

In order to run a specific application (e.g., start the API) call

```bash
# ng serve NAME OF APPLICATION
ng serve api
ng serve # start everything
ng serve api -c=prod # start the API in production mode
```

## Tests

### Unit Tests (JEST)

You can run tests for a specific package like this:

```bash
# ng test NAME OF APPLICATION
ng test api

ng test # test everything
```

### E2E Tests (Cypress)

Run the e2e Tests with Cypress like this:

```bash
# ng e2e NAME OF APPLICATION
ng e2e web
# headless tests (CI)
ng e2e web --headless
# Production target
ng e2e web --prod
# Watching for changes
ng e2e web --watch
```

## Docs

```bash
# generate docs
npx compodoc -p tsconfig.json -d docs
# serve docs
npx compodoc -s -d docs
```
