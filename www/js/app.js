// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('tbibi', ['ionic','ionic-material','ngAnimate','ionic-datepicker','ionic-native-transitions','ionMdInput'
,'ionic-modal-select','ngCordova','ion-floating-menu','ui.rCalendar','leaflet-directive','ngGeolocation','LocalStorageModule'
  ,'ngPassword','LocalStorageModule','ionic-toast'])

.run(["$ionicPlatform",function($ionicPlatform) {
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
} ] )

.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
      abstract: true,
    templateUrl: 'templates2/menu.html',

  })

  .state('app.recherche', {
    url: '/search',
      abstract: true,

    views: {
      'menuContent': {
        templateUrl: 'templates2/Recherche/TabsRecherche.html',
        controller :'RechercheCtrl'
      }
    },
      resolve :{
        getDocteurs :['RechercherSevice', function(RechercherSevice){


          return RechercherSevice.getDocteurs();
        }],
        getSpecialitees :['RechercherSevice', function(RechercherSevice){


          return RechercherSevice.getSpecialitees();
        }]
      }
  })

    .state('app.recherche.specialite', {
      url: '/specialite',
      views: {
        'pr-specialite': {
          templateUrl: 'templates2/Recherche/RechercheSpecialite.html',
          controller :'RechercheCtrl'
        }
      }
    })

    .state('app.recherche.nom', {
      url: '/Nom',
      views: {
        'pr-nom': {
          templateUrl: 'templates2/Recherche/RechercheParNom.html',
          controller :'RechercheCtrl'
        }
      }
    })







    /*
    Resultats de recherche
     */
    .state('app.resultas', {
      url: '/resultats/:resultats',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates2/resultas.html',
          controller :'ResultatsCtrl'
        }
      }

    })

    /*
    MAPS
     */
    .state('app.maps', {
      url: '/Maps/:Resultats',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates2/Maps.html',
          controller :'MapsCtrl',
          resolve:{
            /*getPosition : ['GeoSevice', function(GeoSevice){

              return GeoSevice.getCurrentPosition();
            }],*/
           /* getDocteurs :['RechercherSevice','$stateParams', function(RechercherSevice,$stateParams){

              return RechercherSevice.getDocteurs();
            }]*/
          }

        }
      }
    })

    /*
    Docteur Détails
     */
    .state('app.docteursDetails', {
      url: '/docteurDetails/:id',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates2/Docteur/Docteur.details.html',
          controller :'ResultatsCtrl',
          resolve:{
            getDocteur : ['RechercherSevice','$stateParams', function(RechercherSevice,$stateParams){
              return RechercherSevice.RechercheDocteur($stateParams.id);
            }]
          }
        }
      }

    })

    /*
    Rendez Vous détails
     */
    .state('app.rdvDetails', {
      url: '/rendezvousDetails/:nomRdvez',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates2/RendezVous.details.html',
          controller :'RdvsCtrl'
        }
      }
    })


    //------------------------------------------------------------------------------//
  .state('app.espacePatientlogin', {
      url: '/loginClient',
      cache: false,
      nativeTransitions: {
        "type": "flip",
        "direction": "up"
      },
      views: {
        'menuContent': {
          templateUrl: 'templates2/Client/espacePatient.login.html',
          controller :'clientLoginCtrl'
        }
      }
    })

    .state('app.espacePatientinscription', {
      url: '/inscriptionClient',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates2/Client/espacePatient.inscription.html',
          controller :'clientInscriptionCtrl'
        }
      }
    })


    //------------------------------------------------------------------------------//

    //------------------------------------------------------------------------------//
    .state('app.espacePraticienlogin', {
      url: '/loginPraticien',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates2/Docteur/espacePraticien.login.html',
          controller: 'praticienLoginCtrl'
        }
      }
    })

    .state('app.espacePraticieninscription', {
      url: '/inscriptionPraticien',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates2/Docteur/espacePraticien.inscription.html',
          controller: 'praticienInscriptionCtrl'
        }
      }
    })

    //------------------------------------------------------------------------------//








    //------------------------------------------------------------------------------//
    .state('app.dashaBordClient', {
      url: '/dashabordClient',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates2/Dashabord/tabs.html',
          controller: 'dashabordClientCtrl'
        }
      }
    })

    .state('app.dashaBordClient.rendezvous', {
      url: '/rendezVousClient',
      views: {
        'home-tab': {
          templateUrl: 'templates2/Dashabord/Client.RendezVous.html',
          controller: 'dashabordClientCtrl'
        }
      }
    })

    .state('app.dashaBordClient.praticients', {
      url: '/paraticientssClient',
      views: {
        'about-tab': {
          templateUrl: 'templates2/Dashabord/Client.praticients.html',
          controller: 'dashabordClientCtrl'
        }
      }
    })


    .state('app.dashaBordClient.profile', {
      url: '/ProfileClient',
      views: {
        'contact-tab': {
          templateUrl: 'templates2/Dashabord/Client.profile.html',
          controller: 'dashabordClientCtrl'
        }
      }
    })

    //------------------------------------------------------------------------------//





/*
-_-_-_-_-_-_-__-_-_DASHABORD---PRATICIENT-----------------------

 */

    //------------------------------------------------------------------------------//
    .state('app.dashaBordPraticien', {
      url: '/dashabordPraticien',
      views: {
        'menuContent': {
          templateUrl: 'templates2/Dashabord2/tabs2.html',
          controller: 'dashabordPraticienCtrl'
        }
      }
    })



    .state('app.dashaBordPraticien.rendezVous', {
      url: '/dashabordPraticien/rendezVous',
      views: {
        'pr-tab': {
          templateUrl: 'templates2/Dashabord2/PraticienRendezVous.html',
          controller: 'dashabordPraticienCtrl'
        }
      }
    })

    //-----------------
    .state('app.dashaBordPraticien.clients', {
      url: '/dashabordPraticien/Clients',
      views: {
        'pc-tab': {
          templateUrl: 'templates2/Dashabord2/PraticienClients.html',
          controller: 'dashabordPraticienCtrl'
        }
      }
    })

    //------------------------------

    .state('app.dashaBordPraticien.profile', {
      url: '/dashabordPraticien/profile',
      views: {
        'pp-tab': {
          templateUrl: 'templates2/Dashabord2/PraticientProfile.html',
          controller: 'dashabordPraticienCtrl'
        }
      }
    })

    //------------------------------------------------------------------------------//










    .state('app.contact', {
      url: '/contact',
      views: {
        'menuContent': {
          templateUrl: 'templates2/Contact.html',
        }
      }
    })

    .state('app.propos', {
      url: '/Apropos',
      views: {
        'menuContent': {
          templateUrl: 'templates2/Apropos.html',

        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/search/specialite');
}])

  .config(['ionicDatePickerProvider',function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Choisir',
      todayLabel: 'Ajourdhui',
      closeLabel: 'Fermer',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      //disableWeekdays: [6]
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  }])

//configuration for native transitions

  .config(['$ionicNativeTransitionsProvider',function($ionicNativeTransitionsProvider){
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
  }])

  .run(["$rootScope","$templateCache","PatientService","DocteurService","RechercherSevice",function($rootScope, $templateCache,PatientService,DocteurService,RechercherSevice) {
    $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
    });



    if(PatientService.getPatient()){
      $rootScope.clientAuthenticated = true ;
    }else{
      $rootScope.clientAuthenticated = false ;
    }

/*
test sur le praticien
 */
    if( DocteurService.getDocteur()){
      $rootScope.praticientAuthenticated = true ;
    }else{
      $rootScope.praticientAuthenticated = false ;
    }
    RechercherSevice.getDocteurs()







  } ])


