const puppeteer = require('puppeteer');
const baseUrl = 'https://www.airbnb.com/rooms/';

const plus = {
  price: '_dbebypz ._18ilrswp span',
  title: 'span._h9r8c93',
  size: '._j0jilw ._g86r3e ._tw4pe52',
  rating: 'button span._rs3rozr',
  reviews: 'button span._1m8bb6v',
  map: '[href*="maps?"]'
}

const normal = {
  price: '._doc79r',
  title: 'h1 ._18hrqvin',
  size: '._n5lh69r ._36rlri ._czm8crp',
  rating: '._17erhr0e ._vy3ibx ._l0ao8q div div',
  reviews: '._17erhr0e ._vy3ibx ._l0ao8q div div',
  map: '[href*="maps?"]'
};

(async () => {
  // Set up browser and page.
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 926 });

  await page.goto('https://www.airbnb.com/', { waitUntil : ['load', 'domcontentloaded']});

  /* Enters the search input, clicks the search button, and waits... */
  const searchInput = 'div ._up0kwni';
  await page.type(searchInput, "denver homes");
  await page.screenshot({path: 'query.png'});
  await page.keyboard.press('Enter');
  const searchButton = 'button ._ftj2sg4'
  await page.click(searchButton);
  await page.waitForNavigation({ waitUntil : ['load', 'domcontentloaded']});

  /* Gets all listing IDs on the page */
  const listings = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("._fhph4u [id*=listing]")).map(node => node.id.split('-')[1]);
  });

  /* Navigate to a listing */
  const listing = listings[3];
  const url = baseUrl + listing;
  await page.goto(url, { waitUntil : ['load', 'domcontentloaded']});

  /* Is it a plus listing or a normal listing? */
  const type = page.url().includes('plus') ? plus : normal;
  await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
  await page.waitForSelector(type.map);

  const title = await page.evaluate((type) => {
    console.log('checking for map');
    return document.querySelector(type.map).href;
  }, type);

  console.log(title);

  await browser.close();
})();