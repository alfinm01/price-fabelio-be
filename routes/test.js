var express = require('express')
var router = express.Router()
var pool = require('../db_config')
var crawlProduct = require('../crawl_product')

router.get('/', async (req, res) => {
  try {
    const client = await pool.connect()
    const id = 1
    const result = await client.query(`SELECT * FROM product WHERE id = ${id};`)
    const results = { results: (result) ? result.rows : null }
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})

router.get('/insert-product', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query(`INSERT INTO Product (name, description, latest_price, image1, image2, image3, link, submitted_on)
VALUES ('Meja makan', 'Lorem ipsum dolor sit amet', '999.000', 'https://m2fabelio.imgix.net/catalog/product/cache/thumbnail/88x110/beff4985b56e3afdbeabfc89641a4582/c/e/cessi_dining_table_-_kit_0_3.jpg', NULL, NULL, 'https://fabelio.com/ip/meja-makan-cessi-new.html', NOW()) RETURNING *;`)
    const results = { results: (result) ? result.rows : null }
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})

router.get('/insert-price', async (req, res) => {
  try {
    const client = await pool.connect()
    await client.query('UPDATE Product SET latest_price = \'799.200\' WHERE Product.id = 1;')
    const result = await client.query('INSERT INTO Price (product_id, price, time) VALUES (1, \'799.200\', NOW()) RETURNING *;')
    const results = { results: (result) ? result.rows : null }
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})

router.get('/crawl', (req, res) => {
  try {
    return crawlProduct('https://fabelio.com/ip/kubos-2020-frame.html')
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})

// ROUTE TO DELETE ALL ROWS IN BOTH TABLES (WHEN PRODUCTION READY)
// -> DROP TABLE Product, Price;

module.exports = router
