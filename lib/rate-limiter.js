module.exports = { rateLimiter };

const RateLimiter = require('limiter').RateLimiter;

function rateLimiter (instance, requestsPerSecond) {
  instance.limiter = new RateLimiter(requestsPerSecond, 'second');

  instance.interceptors.request.use(function (request) {
    return new Promise((resolve, reject) => {
      instance.limiter.removeTokens(1, function (err, remainingRequests) {
        if (err) return reject(err);
        resolve(request);
      });
    });
  });
}
