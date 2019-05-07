const puppeteer = require('puppeteer');
const baseUrl = 'https://www.airbnb.com/rooms/';
const { getListingInfo, plus, normal } = require('./scraperHelpers.js');

exports.scraper = async (city) => {

  /* Instantiate a browser, headless or otherwise.
  Setting headless to false is a great way to debug! */
  const browser = await puppeteer.launch({
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
    /* Navigate to a listing. */
    const url = baseUrl + listings[i];
    await page.goto(url, { waitUntil : ['load', 'domcontentloaded']});

    /* Is it a plus listing or a normal listing? */
    const type = page.url().includes('plus') ? plus : normal;

    /* Scroll and wait for map to load. */
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    await page.waitForSelector(type.map);

    /* Scrape the listing! */
    const listingInfo = await getListingInfo(page, type);

    /* Add the url and Airbnb ID to the listingInfo object. */
    listingInfo.url = url;
    listingInfo.airbnbId = parseInt(listings[i]);

    console.log(listingInfo);
    results.push(listingInfo);
  };
  await browser.close();
  return results;
};