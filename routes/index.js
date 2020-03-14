var express = require('express');
var router = express.Router();
var pool = require('../db_config');

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
router.post('/get-all-products', async (req, res) => {
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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index');
});

module.exports = router;




