const Sequelize = require('sequelize');
const sequelize = require('../db/index.js');

const Listing = sequelize.define('listing', {
  airbnbId: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  coordinates: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  url: {
    type: Sequelize.STRING
  },
  walkscore: {
    type: Sequelize.INTEGER
  },
  size: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  reviews: {
    type: Sequelize.INTEGER
  },
  rating: {
    type: Sequelize.DECIMAL
  },
  image: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  }
}, {
  underscored: true
});

module.exports = Listing;