var test = require('./lib/tape-nock-setup');
var BBY = require('../');
var AVAILABLE_SKU = 4971902; // Insignia Batteries
var UNAVAILABLE_SKU = 5919830; // SNES Classic
var MINNEAPOLIS_POSTAL_CODE = 55454; // Minneapolis ZIP
var RICHFIELD_STORE_ID = '281'; // Richfield Big Box

var bby = BBY({
  key: process.env.BBY_API_KEY || 'XXX',
  debug: false,
  headers: {
    'User-Agent': 'Availability tests'
  }
});

test('Real time Availability check by store id using promises', test.opts, function (t) {
  bby.realTimeAvailability(AVAILABLE_SKU, { storeId: RICHFIELD_STORE_ID })
    .then(function (data) {
      t.ok(data.ispuEligible === true, 'Eligible for in store pickup');
      t.ok(data.stores.length === 1, 'One store is returned');
      t.ok(data.stores[0].storeID === RICHFIELD_STORE_ID, 'The RICHFIELD store has the correct storeID');
      t.ok(data.stores[0].name === 'Richfield', 'The RICHFIELD store has the correct name');
      t.ok(data.stores[0].address === '1000 West 78th St', 'The RICHFIELD store has the correct address');
      t.ok(data.stores[0].city === 'Richfield', 'The RICHFIELD store has the correct city');
      t.ok(data.stores[0].state === 'MN', 'The RICHFIELD store has the correct state');
      t.ok(data.stores[0].postalCode === '55423', 'The RICHFIELD store has the correct postalCode');
      t.ok(data.stores[0].storeType === 'Big_Box_Store', 'The RICHFIELD store has the correct storeType');
      t.ok(data.stores[0].lowStock === false, 'The RICHFIELD store has the correct lowStock');

      t.end();
    })
    .catch(function (err) {
      t.error(err, 'no error');
      t.end();
    });
});

test('Real time availability check by store id using callback', test.opts, function (t) {
  bby.realTimeAvailability(AVAILABLE_SKU, { storeId: RICHFIELD_STORE_ID }, function (err, data) {
    t.error(err, 'no error');
    t.ok(data);
    t.ok(data.ispuEligible === true, 'Eligible for in store pickup');
    t.ok(data.stores.length === 1, 'One store is returned');
    t.ok(data.stores[0].storeID === RICHFIELD_STORE_ID, 'The RICHFIELD store has the correct storeID');
    t.ok(data.stores[0].name === 'Richfield', 'The RICHFIELD store has the correct name');
    t.ok(data.stores[0].address === '1000 West 78th St', 'The RICHFIELD store has the correct address');
    t.ok(data.stores[0].city === 'Richfield', 'The RICHFIELD store has the correct city');
    t.ok(data.stores[0].state === 'MN', 'The RICHFIELD store has the correct state');
    t.ok(data.stores[0].postalCode === '55423', 'The RICHFIELD store has the correct postalCode');
    t.ok(data.stores[0].storeType === 'Big_Box_Store', 'The RICHFIELD store has the correct storeType');
    t.ok(data.stores[0].lowStock === false, 'The RICHFIELD store has the correct lowStock');
    t.end();
  });
});

test('Real time Availability check by postal code using promises', test.opts, function (t) {
  bby.realTimeAvailability(AVAILABLE_SKU, { postalCode: MINNEAPOLIS_POSTAL_CODE })
    .then(function (data) {
      t.ok(data.ispuEligible === true, 'Eligible for in store pickup');
      t.ok(data.stores.length > 1, 'More then one store is returned');
      var richfieldStore = data.stores.find(store => store.storeID === RICHFIELD_STORE_ID);
      t.ok(richfieldStore, 'The RICHFIELD store is contained in the results');
    })
    .catch(function (err) {
      t.error(err);
    })
    .then(t.end);
});

test('Real time availability check by postal code using callback', test.opts, function (t) {
  bby.realTimeAvailability(AVAILABLE_SKU, { postalCode: MINNEAPOLIS_POSTAL_CODE }, function (err, data) {
    t.error(err, 'no error');
    t.ok(data.ispuEligible === true, 'Eligible for in store pickup');
    t.ok(data.stores.length > 1, 'More then one store is returned');
    var richfieldStore = data.stores.find(store => store.storeID === RICHFIELD_STORE_ID);
    t.ok(richfieldStore, 'The RICHFIELD store is contained in the results');
    t.end();
  });
});

test('Real time availability search invalid sku error using callback', test.opts, function (t) {
  bby.realTimeAvailability({}, { storeId: RICHFIELD_STORE_ID }, function (err, data) {
    t.equals(err.message, 'First parameter of "realTimeAvailability" must be the SKU, and it must be either a number or a string');
    t.end();
  });
});

test('Real time availability search invalid sku error using promises', test.opts, function (t) {
  bby.realTimeAvailability({}, { storeId: RICHFIELD_STORE_ID })
    .catch(function (err) {
      t.ok(err, 'has error');
      t.equals(err.message, 'First parameter of "realTimeAvailability" must be the SKU, and it must be either a number or a string');
    })
    .then(t.end);
});

test('Real time availability search unavailable sku using callback', test.opts, function (t) {
  bby.realTimeAvailability(UNAVAILABLE_SKU, { storeId: RICHFIELD_STORE_ID }, function (err, data) {
    t.error(err, 'no error');
    t.ok(data);
    t.ok(data.ispuEligible === false, 'Eligible for in store pickup');
    t.ok(data.stores.length === 0, 'No stores are returned');
    t.end();
  });
});

test('Real time availability search unavailable sku using promises', test.opts, function (t) {
  bby.realTimeAvailability(UNAVAILABLE_SKU, { storeId: RICHFIELD_STORE_ID })
    .then(function (data) {
      t.ok(data.ispuEligible === false, 'Eligible for in store pickup');
      t.ok(data.stores.length === 0, 'No stores are returned');
    })
    .catch(function (err) {
      t.error(err);
    })
    .then(t.end);
});

test('Real time availability search invalid argument error using callback', test.opts, function (t) {
  bby.realTimeAvailability(AVAILABLE_SKU, {}, function (err, data) {
    t.equals(err.message, 'Must provide either storeId or postalCode');
    t.end();
  });
});

test('Real time availability search invalid argument error using promises', test.opts, function (t) {
  bby.realTimeAvailability(UNAVAILABLE_SKU, {})
    .catch(function (err) {
      t.ok(err, 'An error is returned');
      t.equals(err.message, 'Must provide either storeId or postalCode');
    })
    .then(t.end);
});
