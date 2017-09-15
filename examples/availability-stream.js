// Initialize with your Best Buy developer API key - if it is present as a
// system environment variable called BBY_API_KEY then that will be used
// automatically. We use it explicitly here so I don't check my API key into
// version control :)
var bby = require('../')(process.env.BBY_API_KEY);

var stream = bby.availabilityAsStream(5670003, [611, 15, 6, 10, 7, 1055, 1000, 281, 245, 11, 8]);

stream.on('total', function (total) { console.log('Total Products: ' + total); });
stream.on('data', function (data) {
  console.log(`\nProduct "${data.name}" available at:\n${data.stores.map(store => ` - ${store.longName}`).join('\n')}`);
});

/*
 output:

 Total Products: 1

Product "Nintendo - Switch™ 32GB Console - Gray Joy-Con™" available at:
 - Inver Grove Heights
 - Maplewood
 - Roseville
 - Eagan
 - Apple Valley
 - Oakdale
 - Richfield
 - Mall of America
 - Northtown

 */
