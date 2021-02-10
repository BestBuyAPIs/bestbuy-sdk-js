## 2.4.1 (2021-02-10)
- Update axios dependency to a version that fixes a security vulnerability. 

## 2.4.0 (2020-05-11)
- Add configurable timeout duration.

## 2.3.1 (2020-02-14)
  - Add missing `cause` key to error.

## 2.3.0 (2020-02-14)
  - Change emitted error format—errors now have `headers`, `status`, `body`, and `cause` keys.
  - Always emit errors when `maxRetries` is exhausted during streaming.

## 2.2.0 (2020-01-29)
  - Add `maxRetries` and `retryInterval` configuration options.

## 2.1.4 (2020-01-29)
  - Pass errors to debug function.

## 2.1.3 (2017-11-21)
  - Fix bug in openBox endpoint that prevented searching for all open box items (null search).
  - Updated tests to ensure all work offline
  - Updated travis tests to target node versions 6, 8, and 9.

## 2.1.2 (2017-11-20)
  - Fix retry logic to ensure streams are even more resilient.

## 2.1.1 (2017-11-18)
  - Added retry logic to ensure streams are more resilient.
  - Show more data when debugging streams.

## 2.1.0 (2017-10-05)
  - Added new endpoint: `realTimeAvailability` to check the near real-time availability of a sku for a store or postal code.

## 2.0.1 (2017-09-21)
  - Fix error when search query is blank.

## 2.0.0 (2017-09-20)

**BREAKING CHANGES**
  - The reviews function has been removed as its no longer available in the API.
  - If errors are encountered, functions will now return an `Error` object instead of a string.
    - This may mean updating existing code to check `err.message` instead of `err`.
  - Native `Promise` is now used instead of `bluebird`
  - Node version 4 or higher is now required to use this package.
  - We've switched from `request`/`request-promise` to `axios` which is has built-in `Promise` usage. This means Error objects may look slightly different.
    - For Example. `status` is returned now instead of `statusCode`.

With the exception of the reviews function (and returning `Error`s), the API interface should be nearly identical as the existing test suite was used to ensure the same functionality. The code behind all other funtions has been refactored to make adding some new features a bit easier.

Features:
  - Added `version()` which returns the current API version and package version.
  - Added the ability pass a custom function via `debug` for debug information.
  - Added automatic rate limiting to avoid `429 Too Many Requests` errors.
    - This can be manually adjusted via the `requestsPerSecond` option.

  - Added Node stream support as JSON and XML via these new endpoints:
    - `availabilityAsStream`
    - `openBoxAsStream` (xml streaming not supported)
    - `categoriesAsStream`
    - `productsAsStream`
    - `storesAsStream`
    - These endpoints will return all results and handle pagination/throttling automatically.
    - Check the README/examples for more details.

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