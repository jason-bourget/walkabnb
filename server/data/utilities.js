require('dotenv').config()
const axios = require('axios');

const geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?";
const geocodeKey = process.env.GEOCODE_KEY;

const walkscoreUrl = "http://api.walkscore.com/score?format=json";
const walkscoreKey = process.env.WALKSCORE_KEY;

const getAddress = async (lat, lon) => {
  const url = `${geocodeUrl}latlng=${lat},${lon}&key=${geocodeKey}`
  const response = await axios.get(url);
  let address = response.data.results[0].formatted_address;
  address = address.replace(/,/g, '');
  return encodeURI(address);
}

const getWalkScore = async (listing) => {
  const lat = parseFloat(listing[coordinates][0]);
  const lat = parseFloat(listing[coordinates][1]);
  const address = await getAddress(lat, lon);
  const url = `${walkscoreUrl}&address=${address}&lat=${lat}&lon=${lon}&wsapikey=${walkscoreKey}`;
  const response = await axios.get(url);
  const { walkscore } = response.data;
  return walkscore;
}

exports.getWalkScore = getWalkScore;