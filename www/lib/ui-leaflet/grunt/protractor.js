'use strict';

module.exports = function (grunt, options) {
    return {
        options: {
            keepAlive: false,
            configFile: 'Dashabord/protractor.conf.js',
            args: {
                specs: [ 'Dashabord/e2e/*.js' ]
            }
        },
        run: {},
        saucelabs: {
            options: {
                args: {
                    baseUrl: "http://<%= pkg.org %>.github.io/<%= pkg.name %>/examples/",
                    sauceUser: process.env.SAUCE_USERNAME,
                    sauceKey: process.env.SAUCE_ACCESS_KEY
                }
            }
        }
    };
};
