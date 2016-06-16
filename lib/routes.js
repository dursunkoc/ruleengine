var handlers = require('./handlers');

var routes = [{
    path: '/deduct',
    method: ['POST','GET'],
    handler: handlers.deductionHandler
}];

module.exports = routes;