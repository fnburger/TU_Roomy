const puppeteer = require('puppeteer');

async function searchRoomLocation(roomName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the TU Wien Campus Maps website
  await page.goto('https://tuw-maps.tuwien.ac.at/');

  // Fill in the search form with the room name and submit it
  await page.type('#searchboxinput', roomName);
  await page.click('#searchbox-searchbutton');

  // Wait for the search results to load and extract the coordinates of the first result
  await page.waitForSelector('.section-result-content');
  const location = await page.evaluate(() => {
    const element = document.querySelector('.section-result-content');
    const lat = element.getAttribute('data-lat');
    const lng = element.getAttribute('data-lng');
    return { lat, lng };
  });

  await browser.close();

  return location;
}
