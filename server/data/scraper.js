const puppeteer = require('puppeteer');
const baseUrl = 'https://www.airbnb.com/rooms/';
const { getListingInfo, plus, normal } = require('./scraperHelpers.js');
const { getWalkScore } = require('./utilities.js');

module.exports = async (city) => {

  /* Instantiate a browser, headless or otherwise.
  Setting headless to false is a great way to debug! */
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US'],
  });

  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 926 });

  await page.goto('https://www.airbnb.com/', { waitUntil : ['load', 'domcontentloaded']});

  /* Enters the search input, clicks the search button, and waits... */
  const searchInput = 'div ._up0kwni';
  await page.type(searchInput, `${city} homes`);
  await page.screenshot({path: 'query.png'});
  await page.keyboard.press('Enter');
  const searchButton = 'button ._ftj2sg4'
  await page.click(searchButton);
  await page.waitForNavigation({ waitUntil : ['load', 'domcontentloaded']});

  /* Gets all listing IDs on the page. */
  const listings = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("._fhph4u [id*=listing]")).map(node => node.id.split('-')[1]);
  });

  const results = [];

  /* Loop through listings and store their details to a results array. */
  for (let i = 0; i < listings.length; i ++) {
    // let mapErr = false;

    /* Navigate to a listing. */
    const url = baseUrl + listings[i];
    await page.goto(url);

    /* Is it a plus listing or a normal listing? */
    const type = page.url().includes('plus') ? plus : normal;

    /* Scroll and wait for map to load. */
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');

    /* If the map never loads, this listing is USELESS to me.
    Useless I say. So skip it. */
    try {
      await page.waitForSelector(type.map);
    }
    catch(err) {
      continue;
    }

    /* Scrape the listing! */
    const listing = await getListingInfo(page, type);

    /* If the image wasn't accessible in the HTML,
    skip this listing. */
    if(listing.image === '') {
      continue;
    }

    /* Get the listing's walkscore, based on lat & long */
    const walkscore = await getWalkScore(listing);

    /* Add the url, Airbnb ID, and city to the scraped object. */
    listing.walkscore = walkscore;
    listing.url = url;
    listing.airbnbId = parseInt(listings[i]);
    listing.city = city;

    console.log(listing);
    results.push(listing);
  };
  await browser.close();
  return results;
};