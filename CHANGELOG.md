## 1.1.0 (2017-05-01)

Features:
  - Added warrany endpoint support. (thanks @troymccabe!)
  - Removing references to the deprecated "similar" endpoint

## 1.0.1 (2017-02-27)

- Added addtional test coverage.

## 1.0.0 (2015-11-04)

Breaking Changes:

  - Initialization method must be invoked even when setting environment variables<br>
    `var bby = require('bestbuy')();`
  - Callbacks were changed to correctly implement 'error first' pattern.<br>

Features:

  - Travis CI builds
  - Coveralls code coverage
  - Jasmine-Node integration / unit tests
  - Availability
  - OpenBox (the "Buying Options" part of our API)
  - Categories
  - Products
  - Recommendations
  - Reviews
  - Stores
  - Pass custom headers
  - Toggle request/response debugging
  - Invoke helper using promises