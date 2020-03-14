# Fabelio Price Monitoring Back-end

API is accessible on [api-price-fabelio.herokuapp.com](https://api-price-fabelio.herokuapp.com).<br />

This project was bootstrapped with [Express Generator](https://expressjs.com/en/starter/generator.html).

## Endpoints List

``` bash
[GET] '/' = Check if API is live
[GET] '/get-all-products' = Get all submitted Fabelio products
[GET] '/get-product-by-id/:id' = Get submitted Fabelio product by id
[POST] '/create-submission' = Create new product submission (A valid Fabelio product link is needed)
```

## Available Scripts

In the project directory, you can run:

### `npm install`

Install required dependencies. (Only for first time).

### `npm start`

Runs the app in the development mode.<br />
API will run on [http://localhost:9000](http://localhost:9000).

### `npm run lint`

Checks if there is any warning or wrong in codes lint.

### `npm run lint-fix`

Checks if there is any warning or wrong in codes lint.<br />
And automatically fixes what can be fixed.

## Learn More

You can learn more in the [Express documentation](https://expressjs.com/).