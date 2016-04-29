// DO NOT MODIFY THIS FILE UNLESS YOU KNOW WHAT YOU ARE DOING //
'use strict';

const config = require('./config')
const Hapi = require('hapi');
var NodeCache = require("node-cache");
var httpRequest = require('request');
var cache = new NodeCache();

const server = new Hapi.Server();
server.connection({ host: config.serverName, port: config.port });

var requestHandler = function (request, reply) {

    var url = ('https://' + config.region + '.api.pvp.net' + request.url.path)

    if (url.indexOf('?') > -1) {
        url = url.replace('?', '?api_key=' + config.apikey + '&');
    } else {
        url = url + '?api_key=' + config.apikey;
    }

    if (config.useCache) {
        var body = cache.get(url);
        if (body) {
            return reply(body).header('content-type', 'application/json');
        }
    }

    httpRequest(url, function (error, response, body) {
        if (!error) {
            if (config.useCache) {
                cache.set(url, body, config.cacheTTL, function (err, success) { });
            }

            return reply(body).header('content-type', 'application/json');

        } else {
            return reply(error).header('content-type', 'application/json');
        }
    });
}

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file(config.appPath+'/index.html');
        }
    })

    server.route({
        method: 'GET',
        path: '/{p1}/{p2}',
        handler: requestHandler
    });

    server.route({
        method: 'GET',
        path: '/{p1}/{p2}/{p3}',
        handler: requestHandler
    });

    server.route({
        method: 'GET',
        path: '/{p1}/{p2}/{p3}/{p4}',
        handler: requestHandler
    });

    server.route({
        method: 'GET',
        path: '/{p1}/{p2}/{p3}/{p4}/{p5}',
        handler: requestHandler
    });

    server.route({
        method: 'GET',
        path: '/{p1}/{p2}/{p3}/{p4}/{p5}/{p6}',
        handler: requestHandler
    });

    server.route({
        method: 'GET',
        path: '/{p1}/{p2}/{p3}/{p4}/{p5}/{p6}/{p7}',
        handler: requestHandler
    });

    server.route({
        method: 'GET',
        path: '/{p1}/{p2}/{p3}/{p4}/{p5}/{p6}/{p7}/{p8}',
        handler: requestHandler
    });

    // Special case for shards 
    server.route({
        method: 'GET',
        path: '/shards/{region?}',
        handler: function (request, reply) {

            var url = ('http://status.leagueoflegends.com/shards')
            if (request.params.region) {
                url = url + '/' + request.params.region;
            }

            if (url.indexOf('?') > -1) {
                url = url.replace('?', '?api_key=' + config.apikey + '&');
            } else {
                url = url + '?api_key=' + config.apikey;
            }

            if (config.useCache) {
                var body = cache.get(url);
                if (body) {
                    return reply(body).header('content-type', 'application/json');
                }
            }

            httpRequest(url, function (error, response, body) {
                if (!error) {

                    if (config.useCache) {
                        cache.set(url, body, config.cacheTTL, function (err, success) { });
                    }

                    return reply(body).header('content-type', 'application/json');
                } else {
                    return reply(error).header('content-type', 'application/json');
                }
            });
        }
    });

    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });

});