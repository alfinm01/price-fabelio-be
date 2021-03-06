var express = require('express')
var router = express.Router()
var pool = require('../db/db_config')
var crawlProduct = require('../functions/crawl_product')

/*
 * LIST API
 * POST create-submission -> use crawlProduct
 * GET get-all-products
 * GET get-product-by-id
 *
 * SCHEDULED JOB
 * updatePerHour -> use crawlProduct with iteration for every product
 *
 * REUSABLE FUNCTION
 * crawlProduct
 */

/* GET all submitted products. */
router.get('/get-all-products', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM Product;')
    const results = { results: (result) ? result.rows : null }
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    res.send('Error: ' + err)
  }
})

/* GET submitted product by id. */
router.get('/get-product-by-id/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    if (!id) {
      throw new Error('No ID supplied')
    }
    const client = await pool.connect()
    const results = { product: null, prices: null }
    const product = await client.query('SELECT * FROM Product WHERE id = ' + id + ';')
    results.product = (product) ? product.rows[0] : null
    if (!results.product) {
      throw new Error('Product not found')
    }
    const prices = await client.query('SELECT * FROM Price WHERE product_id = ' + id + ';')
    results.prices = (prices) ? prices.rows : null
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    res.send('Error: ' + err)
  }
})

/* POST create new product submission. */
router.post('/create-submission', async (req, res) => {
  try {
    const link = req.body.link
    if (!link) {
      throw new Error('No link provided')
    }
    const crawlResult = await crawlProduct(link)
    if (crawlResult.status === 500) {
      throw new Error(crawlResult.message)
    }
    const client = await pool.connect()
    const results = { product: null, prices: null }
    const product = await client.query('INSERT INTO Product (name, description, latest_price, image1, image2, image3, link, submitted_on) VALUES (\'' + crawlResult.name + '\', \'' + crawlResult.description + '\', \'' + crawlResult.latest_price + '\', \'' + crawlResult.image1 + '\', \'' + crawlResult.image2 + '\', \'' + crawlResult.image3 + '\', \'' + link + '\', NOW()) RETURNING *;')
    results.product = (product) ? product.rows[0] : null
    const prices = await client.query('INSERT INTO Price (product_id, price, time) VALUES (' + results.product.id + ', \'' + crawlResult.latest_price + '\', NOW()) RETURNING *;')
    results.prices = (prices) ? prices.rows : null
    res.send(results)
    client.release()
  } catch (err) {
    console.error(err)
    res.send('Error: ' + err)
  }
})

/* GET index page. */
router.get('/', function (req, res, next) {
  res.send('You are connected')
})

module.exports = router
