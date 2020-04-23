# Database

This starter package ships with the awesome `Prisma2` package (which is currently in Preview Mode). `Prisma2` consists of 2 core packages, namely `PhotonJS` and `Lift`.

## Prisma Lift

Lift is some kind of "Abstraction Layer" above your database. With `Lift` you can describe your own database with a custom SDL. This description of your database is stored within `./prisma/schema.prisma` in the root folder of this mono repository.

Note that this file contains the connection to your database and the description of respective tables. For security reasons, the `schema.prisma` file does not contain the credentials for your database. These credentials must be added to the `.env` file manually!

### Working with Lift

`Lift` does not only provide the SDL for describing the database, but also handles `Database Migrations` out of the box for you. Storing the Database Schema in a "code file" allows you to simply add your database to a version control system (like GIT). This, in turn, allows you to closely follow changes to your database.

In order to create a new migration (i.e., a change to your database) follow these steps:

1. Open the `./prisma/schema.prisma` file

2. Make some changes to a `model` (i.e., add a new field)

3. Call `npm run db:commit` and give this migration a name.

   1. This step automatically creates a new folder in `./prisma/migrations` with the current timestamp and the name.
   2. The files within this folder describe the changes you have made. Note that this also contains an auto-generated readme file for this migration

4. Make as many additional changes and "commit" them by calling `npm run db:commit`.

5. To finally migrate the changes to the database, call `npm run db:push`. This will then replay all changes on the database.

## Prisma Photon

`Photon` is a client, that allows you to safely interact with your previously defined database. In this context, `Prisma` automatically generates a client for you to query relations, access fields and offer higher-level operations, like typical CRUD (Create, Read Update, Delete) operations.

In order to generate the `photon` client, simply call

```
npm run prisma2:generate
```

Note that if you make changes to your database structure (e.g., via `Lift`), you **must** update your `photon` client as well, as there may be new relations, additional fields or whatever.

In order to migrate everything in one procedure, you can call

```
npm run prisma2:migrate
```

This will replay all pending migrations and re-generate the `photon` client respectively to keep both in sync.
