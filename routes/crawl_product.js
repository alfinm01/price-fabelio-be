var cheerio = require('cheerio')
var axios = require('axios')

/* Function to crawl product. */
const crawlProduct = async (link) => {
  try {
    if (!link) {
      throw new Error('No Link supplied')
    }

    const result = await axios.get(link)
    const $ = cheerio.load(result.data)

    const name = ''
    const description = ''
    const latestPrice = ''
    const images = new Set()

    return {
      name: name,
      description: description,
      latest_price: latestPrice,
      image1: images[0] ? images[0] : null,
      image2: images[1] ? images[1] : null,
      image3: images[2] ? images[2] : null
    }
  } catch (err) {
    console.error(err)
    return ({ status: 500, message: 'Error: ' + err })
  }
}

export default crawlProduct
