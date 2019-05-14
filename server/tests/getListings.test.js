const { getListings } = require('../controllers/index.js');

const listing = {
  airbnbId: 13815789,
  city: "denver",
  coordinates: ["39.73175", "-104.94928"],
  createdAt: "2019-05-11T03:34:58.241Z",
  id: 54,
  image: "https://a0.muscache.com/im/pictures/7ca1d55d-9f8a-47f1-9819-b4970df3825e.jpg",
  price: 59,
  rating: "5",
  reviews: 272,
  size: ["6 guests", "3 bedrooms", "5 beds", "1 bath"],
  title: "Cozy Craftsman Bungalow near City Center",
  updatedAt: "2019-05-11T03:34:58.241Z",
  url: "https://www.airbnb.com/rooms/13815789",
  walkscore: 70
};

test('gets listings for a given city', async (done) => {
  expect.assertions(1);
  const listings = await getListings('denver');
  expect(listings).not.toHaveLength(0);
  done();
});

test('gets listings with proper shape', async (done) => {
  expect.assertions(1);
  const correctShape = JSON.stringify(Object.keys(listing).sort());
  const listings = await getListings('denver');
  const retrievedShape = JSON.stringify(Object.keys(listings[0].dataValues).sort());
  expect(correctShape).toEqual(retrievedShape);
  done();
});

