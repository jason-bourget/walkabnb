const { getCities } = require('../controllers/index.js');

test('retrieves and returns an array of cities', async (done) => {
  expect.assertions(1);
  const cities = await getCities();
  expect(cities).not.toHaveLength(0);
  done();
});

test('elements of the array are strings', async (done) => {
  expect.assertions(1);
  const cities = await getCities();
  expect(typeof cities[0]).toBe('string');
  done();
});