'use strict';
var getAvailPort = require('./utils/getAvailPort');
var port = getAvailPort(7777);

var _files = ['src/**/*.js', 'Dashabord/unit/**.js', 'Dashabord/unit/**.coffee', 'Dashabord/e2e/**.js',
'Dashabord/unit/**/**.js', 'Dashabord/unit/**/**.coffee', 'Dashabord/e2e/**/**.js'];

module.exports = function(grunt, options) {
    return {
        options: {
            livereload: port
        },
        fast: {
            files: _files,
            tasks: [
                'fast-build',
                'uglify',
                'concat:license'
            ]
        },
        source: {
            files: _files,
            tasks: [
                'fast-build',
                'uglify',
                'Dashabord-unit',
                'concat:license'
            ]
        },
        unit: {
            files: _files,
            tasks: [
                'fast-build',
                'karma:unit'
            ]
        },
        'unit-mocha': {
            files: _files,
            tasks: [
                'fast-build',
                'karma:unit-mocha'
            ]
        },
        chrome: {
            files: _files,
            tasks: [
                'fast-build',
                'karma:unit-chrome'
            ]
        },
        examples: {
            files: ['examples/*.html'],
            tasks: [
                'examples'
            ]
        },
        website: {
          files: ['website/src/js/app.js', 'website/src/js/**/*.js'],
          tasks: ['jshint', 'concat:website', 'uglify'] //'ngmin'
        }
    };
};
