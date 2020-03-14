var express = require('express');
var router = express.Router();
var pool = require('../db_config');

router.get('/', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM product');
      const results = { 'results': (result) ? result.rows : null};
      res.send(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
})

router.get('/insert-product', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query(`INSERT INTO Product (name, description, image1, image2, image3, submitted_on)
VALUES ('Meja makan', 'Lorem ipsum dolor sit amet', 'https://m2fabelio.imgix.net/catalog/product/cache/thumbnail/88x110/beff4985b56e3afdbeabfc89641a4582/c/e/cessi_dining_table_-_kit_0_3.jpg', NULL, NULL, NOW()) RETURNING *;`);
      const results = { 'results': (result) ? result : null};
      res.send(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
})

router.get('/insert-price', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query(`INSERT INTO Price (product_id, price, time)
VALUES (1, '100004324', NOW()) RETURNING *;`);
      const results = { 'results': (result) ? result : null};
      res.send(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
})

module.exports = router;