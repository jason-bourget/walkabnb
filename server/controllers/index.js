const Listing = require('../models/index.js');
const sequelize = require('../db/index.js');

exports.createOrUpdate = async (listing) => {
  return Listing.upsert(listing);
};

exports.getCities = async () => {
  try {
    let cities = await Listing.aggregate('city', 'DISTINCT', { plain: false });
    return cities.map(city => city.DISTINCT);
  }
  catch(err) {
    return err;
  }
}

exports.getListings = async (city) => {
  try {
    const listings = await Listing.findAll({
      where: { city },
      order: sequelize.literal('walkscore DESC')
    });
    return listings.sort()
  }
  catch(err) {
    return err;
  }
};