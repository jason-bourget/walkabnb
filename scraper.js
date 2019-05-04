const puppeteer = require('puppeteer');

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
    return Array.from(document.querySelectorAll("[id*=listing]")).map(node => node.id.split('-')[1]);
  });

  console.log(listings, listings.length);

  await page.screenshot({path: 'result.png'});
  await browser.close();
});