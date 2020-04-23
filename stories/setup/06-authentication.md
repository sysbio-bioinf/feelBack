# Authentication & Authorization

This starter package uses `KeyCloak` [https://www.keycloak.org/](https://www.keycloak.org/) in order to authenticate users.

## Installation

`KeyCloak` is provided via a pre-configured docker container. Just boot it up with `docker-compose start keycloak`. Note that `KeyCloak` requires a dedicated database to store account information, associated roles and so on. `KeyCloak` ships with a "built-in" H2 database (SQLite), however, you may want to use a `PostgreSQL` database as well. Configure the docker container respectively. This may also include, that you create the required database on your own.

The current docker setup reads pre-defined `.env` variables (i.e., for accessing the admin dashboard). Set the variables accordingly (copy the `.env.example` file to `.env`).

## Setup & Configuration

In order to setup `KeyCloak` please follow the instructions below. This guide is partly taken from [https://www.kodnito.com/posts/microprofile-jwt-with-keycloak/](https://www.kodnito.com/posts/microprofile-jwt-with-keycloak/) so you can easily read more in this blog article.

1. Open the `KeyCloak` Admin dashboard (by default this is [http://localhost:8080/auth](http://localhost:8080/auth)) and login with your credentials defined in the `.env` file.

2. Create a new `Realm` that holds all of your configuration settings, users, clients and so on.

   1. Enable the `OpenID Connect` endpoint (should be `enabled` by default)
   2. You can enable the `User-Management Access`. This will allow users to change their own profile

3. Select the `Role` link from the menu and create some `Realm Roles` that may be suitable for your application (i.e., `USER`, `EDITOR`, `ADMIN`).

   1. You can further define some `Default Roles`. These roles are automatically added to **every new user** that is created (i.e., add the `USER` role automatically).

4. You can create new user(s) and assign their roles manually. This step can be skipped if you create the users via your own application / api.

   1. Change the `credentials` of the user (i.e., to set / reset their password)
   2. Add proper `roles` to the users

5. Now we need to create a `Client`. A client, in turn, is an application that may request to issue a token from `KeyCloak`. So if you have a frontend **and** backend application, you should create 2 dedicated clients to manage the access.

   1. Set the `client protocol` to `OpenID connect`
   2. Set the `access type` to `public`
   3. If you properly configured the `Realm` in the first place (i.e., defined an endpoint), the `base url` and so on should be properly set already.

6. Now a `Client Scope` has to be defined. The scope itself provides some kind of "mappings" of protocol information for the clients (see previous step). More defails on the mapper (and how to properly install it) can be found in this SO thread [https://stackoverflow.com/questions/53550321/keycloak-gatekeeper-aud-claim-and-client-id-do-not-match](https://stackoverflow.com/questions/53550321/keycloak-gatekeeper-aud-claim-and-client-id-do-not-match)

   1. Create a new `Client Scope` and select `OpenID Connect` as protocol.
   2. Enable `Include in Token Scope` checkbox
   3. Select the `Mappers` tab and add a new Mapper
      1. Name = `myapp-audience`
      2. Mapper Type = `Audience`
      3. Included Client Audience = the client you have just created
      4. Add to Access Token = on

7. Now go back to the previously created `Client` and select the `Client Scope` tab. Add the new `client scope` just created to the `default client scopes`.

8. Note that you **can** also use `Groups` to manage your users (not only `Roles`), but this is up to you.

There is already a pre-configured `Realm` available. When creating a new `Realm` you can simply import the realm stored in `./deployment/keycloak` to get you started. This realm already ships with some pre-defined users and roles so you can just try it out.

| username          | email             | password | Role  |
| ----------------- | ----------------- | -------- | ----- |
| user.0@local.host | user.0@local.host | user.0   | USER  |
| user.1@local.host | user.1@local.host | user.1   | USER  |
| admin@local.host  | admin@local.host  | admin    | ADMIN |

## Usage

In order to issue a token, one need to send an `HTTP POST` request to the following URL:

```
POST KEYCLOAK_URL/auth/realms/KEYCLOAK_REALM/protocol/openid-connect/token
```

Within this `POST` request, send the following data as

```
Content-Type: application/x-www-form-urlencoded

username=USERNAME
password=PASSWORD
client_id=CLIENTNAME
grant_type=password
scope=openid
```

This endpoint, in turn, returns an `AcessToken` that can be used to query your own application.

If you implemnt GraphQL or RESTful endpoints with JSON you may want to "wrap" the `KeyCloak` server into a user-friendly endpoint. Otherwise, your clients may need to send different requests - but that may be up to you.
