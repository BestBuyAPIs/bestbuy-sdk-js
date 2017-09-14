// Initialize with your Best Buy developer API key - if it is present as a
// system environment variable called BBY_API_KEY then that will be used
// automatically. We use it explicitly here so I don't check my API key into
// version control :)
var fs = require('fs');
var bby = require('../')(process.env.BBY_API_KEY);

// we'll use JSONStream for convenience https://npmjs.com/packages/JSONStream
// Don't forget to `npm install --save JSONStream` if you haven't yet! :)
var JSONStream = require('JSONStream');

// lets write all categories to a file called categories.json
var categories = bby.categoriesAsStream('');

// a "total" event is emitted so we know how many total products will be sent
categories.on('total', total => console.log(`Total Categories: ${total}`));

categories
  .pipe(JSONStream.stringify())
  .pipe(fs.createWriteStream('categories.json'));

// log when its done
categories.on('end', () => {
  console.log('Done!');
});
