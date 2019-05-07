const scraper = require('./scraper.js');
const { createListings } = require('../controllers/index.js');

const seed = async (city) => {
  try {
    const listings = await scraper(city);
    await createListings(listings);
    console.log(`${listings.length} listings seeded for ${city}!`)
  } catch(err) {
    console.log(err);
  }
}

seed('santa fe');