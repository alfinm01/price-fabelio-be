var pool = require('./db_config')
var crawlProduct = require('./crawl_product')

function sayHello () {
  console.log('Hello')
}
sayHello()

/* Update all products per hour. */
const updatePerHour = async () => {
  try {
    const client = await pool.connect()
    const product = await client.query('SELECT * FROM Product;')
    const products = (product) ? product.rows : null
    products.map(async product => {
      const crawlResult = await crawlProduct(product.link)
      /* if (crawlResult.status === 500) {
        throw new Error(crawlResult.message)
        break
      } */
      await client.query('UPDATE Product SET name = \'' + crawlResult.name + '\', description = \'' + crawlResult.description + '\', latest_price = \'' + crawlResult.latest_price + '\', image1 = \'' + crawlResult.image1 + '\', image2 = \'' + crawlResult.image2 + '\', image3 = \'' + crawlResult.image3 + '\' WHERE Product.id = ' + product.id + ';')
      await client.query('INSERT INTO Price (product_id, price, time) VALUES (' + product.id + ', \'' + crawlResult.latest_price + '\', NOW());')
    })
    console.log('All products updated')
    client.release()
  } catch (err) {
    console.error(err)
    console.log('Error: ' + err)
  }
}
updatePerHour()
