"use strict";module.exports=function(e){e.set({basePath:"",frameworks:["jasmine"],logLevel:e.LOG_INFO,browsers:["PhantomJS"],autoWatch:!0,reporters:["dots","coverage"],files:["bower_components/angular/angular.js","bower_components/moment/moment.js","bower_components/moment/{locale,lang}/fr.js","bower_components/moment-timezone/moment-timezone.js","angular-moment.js","bower_components/angular-mocks/angular-mocks.js","tests.js"],preprocessors:{"angular-moment.js":"coverage"},coverageReporter:{type:"lcov",dir:"coverage/"}})};