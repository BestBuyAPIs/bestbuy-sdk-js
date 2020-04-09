// Initialize with your Best Buy developer API key - if it is present as a
// system environment variable called BBY_API_KEY then that will be used
// automatically. We use it explicitly here so I don't check my API key into
// version control :)
var bby = require('../')(process.env.BBY_API_KEY);

var SKU = 5670003;

bby.realTimeAvailability(SKU, { postalCode: 90210 }, function (err, data) {
  if (err) console.error(err);
  console.log(JSON.stringify(data, null, 2));

  var storeList = data.stores.map(s => `- ${s.name} - ${s.address} ${s.city}, ${s.state} ${s.postalCode}`).join('\n');
  console.log(`SKU ${SKU} available at: \n${storeList}`);
});

/* Output:

SKU 5670003 available at:
- West Hollywood - 1015 N La Brea Ave West Hollywood, CA 90038
- Sherman Oaks - 4500 Van Nuys Blvd Sherman Oaks, CA 91403
- West LA - 11301 W Pico Blvd Los Angeles, CA 90064
- Culver City - 10799 Washington Blvd Culver City, CA 90232
- Culver City Westfield Mall - 6000 Sepulveda Blvd Culver City, CA 90230
- Burbank - 1501 N Victory Pl Burbank, CA 91502
- Hawthorne - 5000 W 147th St Hawthorne, CA 90250
- Montebello - 2415 Via Campo Montebello, CA 90640
- Compton - 230 Towne Center Dr Compton, CA 90220
- Pasadena - 3415 E Foothill Blvd Pasadena, CA 91107
- Torrance - 3675 Pacific Coast Hwy Torrance, CA 90505
- Lakewood - 5101 Clark Ave Lakewood, CA 90712
- Simi Valley - 1173 Simi Town Center W Simi Valley, CA 93065

*/
