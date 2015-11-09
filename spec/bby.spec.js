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
        var BBY = require('../bestbuy');
        it('Has all properties', function(done) {
            testProperties(BBY);
            done();
        });
    });
    describe('When using type three initilization refactored', function() {
        var BBY = require('../bestbuy')();
        it('Has all properties', function(done) {
            testProperties(BBY);
            done();
        });
    });
});

describe('Why writing tests around refactoring code is important', function() {
    it('Is null', function(done) {
        this.options = {
            key: process.env.BBY_API_KEY,
            url: 'https://api.bestbuy.com/v1',
            debug: false,
            headers: {
                'User-Agent': 'bestbuy-sdk-js'
            }
        };
        var options = null;
        expect(typeof options === 'object').toBe(true);
        if (typeof options === 'object') {
            this.options = _.extend(this.options, options);
        }
        expect(this.options).not.toBe(undefined);
        done();
    });
});