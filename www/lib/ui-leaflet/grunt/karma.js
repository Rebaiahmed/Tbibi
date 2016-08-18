'use strict';


module.exports = function (grunt, options) {
    return {
        unit: {
            configFile: 'Dashabord/karma-unit.conf.js',
            autoWatch: false,
            singleRun: true,
            reporters: ['dots', 'coverage'],
            preprocessors: {
                'test/**/**/*.coffee': ['coffee'],
                'dist/<%= pkg.name %>.js': ['coverage']
            },
            coverageReporter: {
                reporters:[
                  { type : 'html', dir : 'dist/coverage/', subdir: "lib" },
                  {type: 'text-summary', dir:'dist/coverage/', subdir:'lib'}
                ]
            }
        },
        'unit-mocha': {
            configFile: 'Dashabord/karma-unit.conf.js',
            autoWatch: false,
            singleRun: true,
            reporters: ['mocha']
        },
        'unit-dots': {
            configFile: 'Dashabord/karma-unit.conf.js',
            autoWatch: false,
            singleRun: true,
            reporters: ['dots']
        },
        'unit-chrome': {
            configFile: 'Dashabord/karma-unit.conf.js',
            browsers: ['Chrome'],
            autoWatch: true,
            singleRun: false
        },
        'unit-chrome-mocha': {
            configFile: 'Dashabord/karma-unit.conf.js',
            browsers: ['Chrome'],
            autoWatch: true,
            singleRun: false,
            reporters: ['mocha']
        },
        'unit-chrome-once': {
            configFile: 'Dashabord/karma-unit.conf.js',
            browsers: ['Chrome'],
            autoWatch: true,
            singleRun: true
        }
    };
};
