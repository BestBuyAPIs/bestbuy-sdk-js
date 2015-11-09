'use strict';
var _ = require('lodash');

function testProperties(BBY) {
    expect(BBY.options).not.toBe(undefined);
    expect(BBY.options.key).toBe(process.env.BBY_API_KEY);
    expect(BBY.availability instanceof Function).toBe(true);
    expect(BBY.openBox instanceof Function).toBe(true);
    expect(BBY.categories instanceof Function).toBe(true);
    expect(BBY.products instanceof Function).toBe(true);
    expect(BBY.recommendations instanceof Function).toBe(true);
    expect(BBY.reviews instanceof Function).toBe(true);
    expect(BBY.stores instanceof Function).toBe(true);
}

describe('The BBY API module is correctly initialized', function() {
    describe('When using type one initilization', function() {
        var BBY = require('../bestbuy')(process.env.BBY_API_KEY);
        it('Has all properties', function(done) {
            testProperties(BBY);
            done();
        });
    });
    describe('When using type two initilization', function() {
        var BBY = require('../bestbuy')({
            'key': process.env.BBY_API_KEY
        });
        it('Has all properties', function(done) {
            testProperties(BBY);
            done();
        });
    });
    describe('When using type three initilization', function() {
        var BBY = require('../bestbuy')();
        it('Has all properties', function(done) {
            testProperties(BBY);
            done();
        });
    });
});