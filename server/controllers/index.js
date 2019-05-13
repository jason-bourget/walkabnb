const Listing = require('../models/index.js');
const sequelize = require('../db/index.js');

exports.createOrUpdate = async (listing) => {
  return Listing.upsert(listing);
};

exports.getCities = async () => {
  let cities = await Listing.aggregate('city', 'DISTINCT', { plain: false });
  return cities.map(city => city.DISTINCT);
}

exports.getListings = async (city) => {
  const listings = await Listing.findAll({
    where: { city },
    order: sequelize.literal('walkscore DESC')
  });
  return listings.sort()
};

exports.getCities();