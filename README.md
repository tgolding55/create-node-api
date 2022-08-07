# Create-node-api

This is a simple node api boilerplate, includes a user model with authorization middleware and routes.

## Getting Started

# To install run:

```
npx @tgolding55/create-node-api my-app
```

Next, fill out the .env, dev.env and test.env files with your environment variables.

# To test run:

```
npm test
```

# To run in dev mode, run:

```
npm run start:dev
```

# To start in prod, run:

```
npm start
```

# Finally to seed your database you can use:

When in dev (seeds/seedDev.js will be used)

```
npm run seed
```

When in prod (seeds/seedProd.js will be used)

```
NODE_ENV='prod' node seedDB.js
```

# Remember to update the package.json!
