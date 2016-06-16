const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Hoek = require('hoek');
const Vision = require('vision');
const Boom = require('Boom');


var server = new Hapi.Server();

//inorder to use server.file
server.register(Inert, (err) => {
    Hoek.assert(!err, err);
});

//inorder to use server.view
server.register(Vision, (err) => {
    Hoek.assert(!err, err);
    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });
});

server.connection({
    port: 8000
});

server.ext('onPreResponse', function(request, reply) {
    if (request.response.isBoom) {
        console.log(request.response);
        return reply.view('error', request.response);
    }
    reply.continue();
});

server.route(require('./lib/routes.js'))

server.start(function() {
    console.log("Started server at " + JSON.stringify(server.info));
});