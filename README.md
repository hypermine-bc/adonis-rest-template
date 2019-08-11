# Basestack for Adonis framework.

A basestack where lot of features will be handelled outof the box.
So even if you don't know adonis and quickly want resource endpoints, you can use this template.

# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup
Install `Adonis`

```bash
npm i -g @adonisjs/cli
```

Use the adonis command to install the blueprint

```bash
git clone https://github.com/hypermine-bc/adonis-rest-template.git
```

clone the repo and then run `npm install`.

```bash
adonis serve --dev
```


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
