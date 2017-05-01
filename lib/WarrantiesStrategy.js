'use strict';

var WarrantiesStrategy = function () {
  return function (sku) {
    return {
      path: '/products/' + sku + '/warranties.json',
      qs: (typeof arguments[1] !== 'undefined') ? arguments[1] : {}
    };
  };
};

module.exports = WarrantiesStrategy;
