var express = require('express')
var router = express.Router()
var pool = require('../db_config')

/*
 * LIST API
 * POST create-submission -> use crawlProduct
 * GET get-all-products
 * GET get-product-by-id
 * GET update-per-hour || batch-job || schedule -> use crawlProduct with iteration for every product
 *
 * REUSABLE FUNCTION
 * crawlProduct
 */

/* GET all submitted products. */
router.get('/get-all-products', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM Product')
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
    const product = await client.query(`SELECT * FROM Product WHERE id = ${id};`)
    results.product = (product) ? product.rows : null
    const prices = await client.query(`SELECT * FROM Price WHERE product_id = ${id};`)
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
  res.send('you are connected')
})

module.exports = router
