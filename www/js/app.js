// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic-material', 'starter.controllers','ionic-datepicker','ionic-native-transitions','ionMdInput'
,'ionic-modal-select','ui.rCalendar','ngCordova','ion-floating-menu'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.recherche', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller :'RechercheCtrl'
      }
    }
  })

    .state('app.resultas', {
      url: '/resultats',
      views: {
        'menuContent': {
          templateUrl: 'templates/resultas.html',
          controller :'ResultatsCtrl'
        }
      }
    })

    /*
    MAPS
     */
    .state('app.maps', {
      url: '/Maps',
      views: {
        'menuContent': {
          templateUrl: 'templates/Maps.html',
          controller :'ResultatsCtrl'
        }
      }
    })


    //RESULTAT DU RECHERCHE

  .state('app.espacePatientlogin', {
      url: '/loginClient',
      nativeTransitions: {
        "type": "flip",
        "direction": "up"
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/espacePatient.login.html',
          controller :'clientLoginCtrl'
        }
      }
    })

    .state('app.espacePatientinscription', {
      url: '/inscriptionClient',
      views: {
        'menuContent': {
          templateUrl: 'templates/espacePatient.inscription.html',
          controller :'clientInscriptionCtrl'
        }
      }
    })
    .state('app.espacePraticienlogin', {
      url: '/loginPraticien',
      views: {
        'menuContent': {
          templateUrl: 'templates/espacePraticien.login.html',
          controller: 'praticienLoginCtrl'
        }
      }
    })

    .state('app.espacePraticieninscription', {
      url: '/inscriptionPraticien',
      views: {
        'menuContent': {
          templateUrl: 'templates/espacePraticien.inscription.html',
          controller: 'praticienInscriptionCtrl'
        }
      }
    })

    .state('app.dashaBordClient', {
      url: '/dashabordClient',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashabord.client.html',
          controller: 'dashabordClientCtrl'
        }
      }
    })





    /*
    inheritance with $states
     */
    .state('app.dashaBordClient.rendezvous', {
      url: '/dashabordClient',
      views: {
        'menuContent': {
          templateUrl: 'templates/RendezVousClient.html',
          controller: 'dashabordClientCtrl'
        }
      }
    })

    .state('app.praticients', {
      url: '/dashabordClient',
      views: {
        'menuContent': {
          templateUrl: 'templates/PraticientsClient.html',
          controller: 'dashabordClientCtrl'
        }
      }
    })


    .state('app.profile', {
      url: '/dashabordClient',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.client.html',
          controller: 'dashabordClientCtrl'
        }
      }
    })










    .state('app.dashaBordPraticien', {
      url: '/dashabordPraticien',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashabord.praticien.html',
          controller: 'dashabordPraticienCtrl'
        }
      }
    })

    .state('app.contact', {
      url: '/contact',
      views: {
        'menuContent': {
          templateUrl: 'templates/Contact.html',
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
})

  .config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: [6]
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })

//configuration for native transitions

  .config(function($ionicNativeTransitionsProvider){
    $ionicNativeTransitionsProvider.setDefaultOptions({
      duration: 400, // in milliseconds (ms), default 400,
      slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
      iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
      androiddelay: -1, // same as above but for Android, default -1
      winphonedelay: -1, // same as above but for Windows Phone, default -1,
      fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
      fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
      triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
      backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
    });

    $ionicNativeTransitionsProvider.setDefaultTransition({
      type: 'slide',
      direction: 'left'
    });
  });


