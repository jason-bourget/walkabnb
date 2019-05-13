const scraper = require('./scraper.js');
const { createOrUpdate } = require('../controllers/index.js');

const seed = async (city) => {
  try {
    const listings = await scraper(city);
    /* Wraps all Sequelize upserts in a promise, and
    when that promise resolves, logs the number of
    listings created. */
    Promise.all(listings.map(async listing => {
      return createOrUpdate(listing);
    }))
    .then((listings) => {
      console.log(`Success! ${listings.length} listings seeded for ${city}!`)
    });
  } catch(err) {
    console.log(err);
  }
}

seed('boulder');