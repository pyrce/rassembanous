# personal cms project

## Technologies :

- nodejs / typescript
- mysql
- ejs (view templating)

## Prérequis

- Docker & Docker Compose installés

## Installation

```shell
cp .env.sample .env
docker-compose build
docker-compose up

# installation des dépendances
docker-compose run node npm install
```

## Compilation des fichiers

```shell
docker-compose run node npm run start
```

```shell
docker-compose run node nodemon
```

> L'application est disponible sur l'url : http://localhost:3000