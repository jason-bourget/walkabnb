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
}

puppeteer.launch().then(async browser => {

  /* Navigates a headless browser to the airbnb home page */
  const page = await browser.newPage();
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

  const listing = listings[2];
  const url = baseUrl + listing;
  await page.goto(url, { waitUntil : ['load', 'domcontentloaded']});
  const type = page.url().includes('plus') ? plus : normal;

  await page.screenshot({path: 'beforeScroll.png'});
  // await page.evaluate('window.scrollTo({top: 7000, left: 0, behavior: "smooth"})');
  // await page.screenshot({path: 'afterScroll.png'});

  const title = await page.evaluate(async (type) => {
    await window.scrollTo(0, document.body.scrollHeight);
    return document.querySelector(type.map).href;
  }, type);

  console.log(title);

  await browser.close();
});