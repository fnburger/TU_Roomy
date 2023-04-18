const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://tiss.tuwien.ac.at/events/roomTuLearn.xhtml?dswid=2835&dsrid=221';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const rooms = [];

    // Find all the table rows in the page
    $('table tr').each((i, el) => {
      const tds = $(el).find('td');

      // Extract the room name and location from the second and third columns of each row
      const roomName = $(tds[1]).text().trim();
      const roomLocation = $(tds[2]).text().trim();

      // Add the room to the list of rooms
      if (roomName !== '' && roomLocation !== '') {
        rooms.push({
          name: roomName,
          location: roomLocation
        });
      }
    });

    console.log(rooms);
  })
  .catch(error => {
    console.log(error);
  });
