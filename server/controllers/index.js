const Listing = require('../models/index.js');
const sequelize = require('../db/index.js');

exports.createListings = async (listings) => {
  await Listing.bulkCreate(listings);
  await sequelize.close();
};

exports.getListings = async (city) => {
  const listings = await Listing.findAll({
    where: { city },
    order: sequelize.literal('walkscore DESC')
  });
  return listings.sort()
};