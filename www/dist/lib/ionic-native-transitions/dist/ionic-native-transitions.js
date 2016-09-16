/*!
 * ionic-native-transitions
 *  ---
 * Native transitions for Ionic applications
 * @version: v1.0.2
 * @author: shprink <contact@julienrenaux.fr>
 * @link: https://github.com/shprink/ionic-native-transitions
 * @license: MIT
 * 
 */
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! ./provider.js */
/*! ./nativeSref.js */
/*! ./run.js */
/*!*************************!*\
  !*** ./lib/provider.js ***!
  \*************************/
/*!***************************!*\
  !*** ./lib/nativeSref.js ***!
  \***************************/
/*!********************!*\
  !*** ./lib/run.js ***!
  \********************/
!function(n,i){"object"==typeof exports&&"object"==typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):"object"==typeof exports?exports.ionicNativeTransitions=i():n.ionicNativeTransitions=i()}(this,function(){return function(n){function i(e){if(t[e])return t[e].exports;var a=t[e]={exports:{},id:e,loaded:!1};return n[e].call(a.exports,a,a.exports,i),a.loaded=!0,a.exports}var t={};return i.m=n,i.c=t,i.p="",i(0)}([function(n,i,t){"use strict";function e(n){return n&&n.__esModule?n:{default:n}}Object.defineProperty(i,"__esModule",{value:!0});var a=t(1),o=e(a),r=t(2),s=e(r),u=t(3),l=e(u),d=angular.module("ionic-native-transitions",["ionic","ui.router"]);d.directive("nativeUiSref",s.default),d.provider("$ionicNativeTransitions",o.default),d.run(l.default),i.default=d=d.name,n.exports=i.default},function(n,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=function(){"ngInject";function n(){var i=arguments.length<=0||void 0===arguments[0]||arguments[0];return n=i,this}function i(){return!!(window.cordova&&window.plugins&&window.plugins.nativepagetransitions)&&n}function t(){var n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return angular.extend(v,n),this}function e(){var n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return angular.extend(c,n),this}function a(){var n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return angular.extend(g,n),this}function o(t,e,a,o,f,p,b,h){function w(){var n=arguments.length<=0||void 0===arguments[0]?null:arguments[0],i=arguments.length<=1||void 0===arguments[1]?null:arguments[1];if(!n)return void t.debug("[native transition] cannot change url without url...");E();var e=p.url(n);return x(i),e}function T(){var n=arguments.length<=0||void 0===arguments[0]?null:arguments[0],i=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],e=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],a=arguments.length<=3||void 0===arguments[3]?null:arguments[3];return n?f.is(n,i)&&!e.reload?void t.debug("[native transition] same state transition are not possible"):(E(),x(a),o(function(){return f.go(n,i,e)})):void t.debug("[native transition] cannot change state without a state...")}function $(){var i=arguments.length<=0||void 0===arguments[0]||arguments[0],o=arguments.length<=1||void 0===arguments[1]||arguments[1],r=arguments.length<=2||void 0===arguments[2]?"platform":arguments[2];return!i||window.cordova&&window.plugins&&window.plugins.nativepagetransitions?(n=i,i?(t.debug("[native transition] enabling plugin"),window.plugins&&window.plugins.nativepagetransitions&&angular.extend(window.plugins.nativepagetransitions.globalOptions,A()),a.$ionicGoBack=F,C=h.registerBackButtonAction(function(n,i){return F(i)},100),I()):(t.debug("[native transition] disabling plugin"),"undefined"==typeof arguments[1]&&(o=!1),a.$ionicGoBack=W,angular.isFunction(C)&&C.call(),N()),o?(t.debug("[native transition] disabling ionic transitions"),e.views.transition("none")):(t.debug("[native transition] enabling ionic transitions"),e.views.transition(r)),this):void t.debug("[native transition] is disabled or nativepagetransitions plugin is not present")}function x(){if(i()){var n={};if(angular.isObject(arguments[0]))n=angular.extend({},g,arguments[0]);else if(angular.isString(arguments[0]))switch(arguments[0]){case"back":arguments[2]&&B(arguments[2])?(n=B(arguments[2]),console.log("back first",n)):A().backInOppositeDirection&&arguments[1]&&S(arguments[1])?(n=S(arguments[1]),n.direction&&(n.direction=d[n.direction]),console.log("back second",n)):(n=g,console.log("back default",n))}else n=c;n=angular.copy(n),t.debug("[native transition]",n);var e=n.type;delete n.type,a.$broadcast("ionicNativeTransitions.beforeTransition"),window.plugins.nativepagetransitions[e](n,y.bind(this,k(n)),m.bind(this,k(n)))}}function y(n){setTimeout(function(){return a.$broadcast("ionicNativeTransitions.success")},n)}function m(n){setTimeout(function(){return a.$broadcast("ionicNativeTransitions.error")},n)}function k(n){var i=void 0;return i=n.duration?parseInt(n.duration):parseInt(A().duration),ionic.Platform.isAndroid()?i+=n.androiddelay?parseInt(n.androiddelay):parseInt(A().androiddelay):ionic.Platform.isIOS()?i+=n.iosdelay?parseInt(n.iosdelay):parseInt(A().iosdelay):ionic.Platform.isWindowsPhone()&&(i+=n.winphonedelay?parseInt(n.winphonedelay):parseInt(A().winphonedelay)),i}function P(){window.plugins.nativepagetransitions.executePendingTransition(),j()}function O(){window.plugins&&window.plugins.nativepagetransitions&&angular.isFunction(window.plugins.nativepagetransitions.cancelPendingTransition)?(window.plugins.nativepagetransitions.cancelPendingTransition(),j()):P()}function I(){N(),j(),u=a.$on("$stateChangeError",O),l=a.$on(A().triggerTransitionEvent,P)}function j(){r||(r=a.$on("$stateChangeStart",function(n,i,e,a,o){var r=null;if(!n.defaultPrevented){if(null===i.nativeTransitions)return void t.debug("[native transition] transition disabled for this state",i);r=S(i),t.debug("[native transition] $stateChangeStart",i,r),x(r)}}))}function B(n){return angular.isObject(n.nativeTransitionsBackIOS)&&ionic.Platform.isIOS()?angular.extend({},n.nativeTransitionsBackIOS):angular.isObject(n.nativeTransitionsBackAndroid)&&ionic.Platform.isAndroid()?angular.extend({},n.nativeTransitionsBackAndroid):angular.isObject(n.nativeTransitionsBackWindowsPhone)&&ionic.Platform.isWindowsPhone()?angular.extend({},n.nativeTransitionsBackWindowsPhone):angular.isObject(n.nativeTransitionsBack)?angular.extend({},n.nativeTransitionsBack):null}function S(n){return angular.isObject(n.nativeTransitionsIOS)&&ionic.Platform.isIOS()?angular.extend({},n.nativeTransitionsIOS):angular.isObject(n.nativeTransitionsAndroid)&&ionic.Platform.isAndroid()?angular.extend({},n.nativeTransitionsAndroid):angular.isObject(n.nativeTransitionsWindowsPhone)&&ionic.Platform.isWindowsPhone()?angular.extend({},n.nativeTransitionsWindowsPhone):angular.isObject(n.nativeTransitions)?angular.extend({},n.nativeTransitions):null}function E(){r&&angular.isFunction(r)&&(r(),r=null)}function N(){r&&angular.isFunction(r)&&(r(),r=null),s&&angular.isFunction(s)&&(s(),s=null),u&&angular.isFunction(u)&&(u(),u=null),l&&angular.isFunction(l)&&(l(),l=null)}function A(){return v}function _(){return W=a.$ionicGoBack,i()?void $():void t.debug("[native transition] The plugin is either disabled or nativepagetransitions plugin by telerik is not present. If you are getting this message in a browser, this is normal behavior, native transitions only work on device.")}function F(n){if(!b.backView())return void(navigator.app&&navigator.app.exitApp());if(!(n>=0)){var i=b.backView().stateName;if(n&&!isNaN(parseInt(n))){var e=b.viewHistory(),a=e.histories[b.currentView().historyId],r=a.cursor+n;(r<0||r>a.stack.length)&&(r=0),i=a.stack[r].stateName}var s=angular.extend({},f.current),u=angular.extend({},f.get(i));return E(),null===u.nativeTransitionsBack?(t.debug("[native transition] transition disabled for this state",u),o(function(){return b.goBack(n)}).then(function(){return j()})):(t.debug("nativepagetransitions goBack",n,i,s,u),x("back",s,u),o(function(){return b.goBack(n)}))}}var W=void 0,C=void 0;return{init:_,getDefaultOptions:A,enable:$,isEnabled:i,transition:x,registerToRouteEvents:I,unregisterToRouteEvents:N,registerToStateChangeStartEvent:j,unregisterToStateChangeStartEvent:E,disablePendingTransition:O,locationUrl:w,stateGo:T,goBack:F}}var r=null,s=null,u=null,l=null,d={up:"down",down:"up",left:"right",right:"left"},c={type:"slide",direction:"left"},g={type:"slide",direction:"right"},v={duration:400,slowdownfactor:4,iosdelay:-1,androiddelay:-1,winphonedelay:-1,fixedPixelsTop:0,fixedPixelsBottom:0,triggerTransitionEvent:"$ionicView.afterEnter",backInOppositeDirection:!1};return o.$inject=["$log","$ionicConfig","$rootScope","$timeout","$state","$location","$ionicHistory","$ionicPlatform"],{$get:o,enable:n,setDefaultTransition:e,setDefaultBackTransition:a,setDefaultOptions:t}},n.exports=i.default},function(n,i){"use strict";function t(n,i){var t,e=n.match(/^\s*({[^}]*})\s*$/);if(e&&(n=i+"("+e[1]+")"),t=n.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/),!t||4!==t.length)throw new Error("Invalid state ref '"+n+"'");return{state:t[1],paramExpr:t[3]||null}}Object.defineProperty(i,"__esModule",{value:!0}),i.default=["$log","$ionicNativeTransitions","$state",function(n,i,e){"ngInject";function a(n,e,a,o){var r=n.$eval(a.nativeUiSrefOpts)||{},s=null;a.$observe("nativeOptions",function(i){var t=n.$eval(i);s=angular.isObject(t)?t:{}}),e.on("click",function(e){var u=t(a.nativeUiSref,o.current.name),l=angular.copy(n.$eval(u.paramExpr));return i.isEnabled()?void i.stateGo(u.state,l,r,s):void o.go(u.state,l,r)})}return a.$inject=["$scope","$element","$attrs","$state"],{controller:a,restrict:"A",scope:!1}}],n.exports=i.default},function(n,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=["$ionicNativeTransitions","$ionicPlatform","$ionicHistory","$rootScope",function(n,i,t,e){"ngInject";i.ready(function(){n.init()})}],n.exports=i.default}])});