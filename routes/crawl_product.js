var cheerio = require('cheerio')
var axios = require('axios')

/* Function to crawl product. */
const crawlProduct = async (link) => {
  try {
    if (!link) {
      throw new Error('No link supplied')
    }

    const result = await axios.get(link)
    const $ = cheerio.load(result.data)

    const name = $('li.item.product').find('strong').text()
    const description = $('div#description').text()
    const latestPrice = $('span.price').first().text()
    const images = []
    $('div.product').find('img').each((index, element) => {
      images.push($(element).attr('src'))
    })

    return {
      name: name,
      description: description,
      latest_price: latestPrice,
      image1: images[1] ? images[1] : null,
      image2: images[2] ? images[2] : null,
      image3: images[3] ? images[3] : null
    }
  } catch (err) {
    console.error(err)
    return ({ status: 500, message: 'Error: ' + err })
  }
}

module.exports = crawlProduct
