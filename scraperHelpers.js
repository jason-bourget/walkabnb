/* Selector maps */
exports.plus = {
  listing: 'plus',
  price: '._dbebypz ._18ilrswp span',
  title: '[property*="og:title"]',
  size: '._j0jilw ._g86r3e ._tw4pe52',
  rating: 'button span._rs3rozr',
  reviews: 'button span._1m8bb6v',
  map: '[href*="maps?"]'
}

exports.normal = {
  listing: 'normal',
  price: '._doc79r',
  title: '[property*="og:title"]',
  size: '._n5lh69r ._36rlri ._czm8crp',
  rating: 'button span._rs3rozr',
  reviews: '._17erhr0e ._vy3ibx ._l0ao8q div div',
  map: '[href*="maps?"]'
};

/* Scrapes everything we need from a listing page. */
exports.getListingInfo = async function(page, type) {

  return await page.evaluate((type) => {

    const parseCoordinates = (mapsLink) => {
      const start = mapsLink.indexOf('ll=') + 3;
      const end = mapsLink.indexOf('&z');
      let coordinates = mapsLink.substring(start, end);
      return coordinates.split(',').map(coordinate => parseFloat(coordinate));
    };

    const title = document.querySelector(type.title).attributes[1].textContent.split(' - ')[0];
    const price = document.querySelector(type.price).innerText;
    const mapString = document.querySelector(type.map).href;
    const coordinates = parseCoordinates(mapString);
    const size = Array.from(document.querySelectorAll(type.size)).map( metric => metric.innerText );
    const rating = document.querySelector(type.rating).attributes[1].textContent.split(' ')[1];
  
    const reviews = (() => {
      if (type.listing === 'plus') {
        return document.querySelector(type.reviews).innerText.split(' ')[0];
      }
      if (type.listing === 'normal') {
        return document.querySelectorAll(type.reviews)[1].attributes[2].value;
      }
    })();
  
    size.splice(4);
  
    return { title, price, coordinates, size, rating, reviews }
  }, type);
}