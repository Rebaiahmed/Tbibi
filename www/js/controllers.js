angular.module('tbibi.controllers', ['tbibi.services'])

  /*
  Défenir Nos Controlleurs
   */


  /*
  Controleur pour l'App --------------
   */
.controller('AppCtrl', function($scope,$ionicModal, $ionicPopover, $timeout) {


    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
      navIcons.addEventListener('click', function() {
        this.classList.toggle('active');
      });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
      document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
      document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
      var content = document.getElementsByTagName('ion-content');
      for (var i = 0; i < content.length; i++) {
        if (content[i].classList.contains('has-header')) {
          content[i].classList.toggle('has-header');
        }
      }
    };

    $scope.setExpanded = function(bool) {
      $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
      var hasHeaderFabLeft = false;
      var hasHeaderFabRight = false;

      switch (location) {
        case 'left':
          hasHeaderFabLeft = true;
          break;
        case 'right':
          hasHeaderFabRight = true;
          break;
      }

      $scope.hasHeaderFabLeft = hasHeaderFabLeft;
      $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
      var content = document.getElementsByTagName('ion-content');
      for (var i = 0; i < content.length; i++) {
        if (!content[i].classList.contains('has-header')) {
          content[i].classList.toggle('has-header');
        }
      }

    };

    $scope.hideHeader = function() {
      $scope.hideNavBar();
      $scope.noHeader();
    };

    $scope.showHeader = function() {
      $scope.showNavBar();
      $scope.hasHeader();
    };

    $scope.clearFabs = function() {
      var fabs = document.getElementsByClassName('button-fab');
      if (fabs.length && fabs.length > 1) {
        fabs[0].remove();
      }
    };











  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})






  /*
  Controleur pour la recherche
   */





  .controller('RechercheCtrl',['$scope','$timeout','$ionicPopover','$ionicLoading','$ionicModal','$state','RechercherSevice','$filter',
    'getDocteurs','$cordovaGeolocation',function($scope, $timeout
    ,$ionicPopover,$ionicLoading,$ionicModal,$state,RechercherSevice,$filter,getDocteurs,$cordovaGeolocation) {

    $scope.showListemdecins = false ;

    $scope.disableGeo = true;

      $scope.$on("$ionicView.beforeEnter", function() {
        console.log("Running stuff...");

      });



      /*$ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true
      });*/

      $ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,

      });

      $timeout(function(){
        $ionicLoading.hide();
      },2000)


    /*
    IONIC MODAL
    _-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-__-_-
     */

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      $scope.modal = modal;
      //$scope.modal.show();
    });


    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };


    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.$on('modal.hidden', function() {
      // Execute action
    });

    $scope.$on('modal.removed', function() {
      // Execute action
    });


    /*
    -_-_-__-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-
     */



    /*
     IONIC Popever
     _-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-__-_-
     */

    $ionicPopover.fromTemplateUrl('templates/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });


    /*
     -_-_-__-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_-_-_-_-
     */


  /*
  les fonctions
   */



    $scope.specialites = RechercherSevice.getSpecialitees();
      console.log('get Docteurs' + JSON.stringify((getDocteurs)))


    //la liste de sgouvernorats
    $scope.gouvernorats = [
      'Ariana','Ben Arous','Mannouba','Tunis'
    ];

      // la liste des Délégations
      $scope.delegations =['Ariana Ville','Ariana Nouvelle','Ariana Sup','El Menzah 9']


    //la liste des docteurs
    $scope.docteurs =getDocteurs;





    //une fonction pour faire la recherche du docteur


    $scope.rechercheParCritere = function(){
      console.log('on va rechercher le docteur')

      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,

      });

      $timeout(function(){
        $ionicLoading.hide();
        $scope.openModal();
      },2000)


      //$state.go('app.resultas')

    }




//une méthode pour localiser l'utilisateur


    $scope.RechercherParMap = function(){

      //localiser l'utilisateur et rechercher les docteurs autour dde lui ;

      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,

      });

      /*$timeout(function(){
        $ionicLoading.hide();
        //$scope.openModal();
      },2000)*/



      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          $ionicLoading.hide();
          var lat  = position.coords.latitude
          var long = position.coords.longitude
          console.log('data' + lat + 'long 0' + long)
        }, function(err) {
          // error
          console.log('err' + err)
        });


      var watchOptions = {
        timeout : 3000,
        enableHighAccuracy: false // may cause errors if true
      };

      /*var watch = $cordovaGeolocation.watchPosition(watchOptions);
      watch.then(
        null,
        function(err) {
          // error
        },
        function(position) {
          var lat  = position.coords.latitude
          var long = position.coords.longitude
          console.log('data2' + lat + '---' + long)
        });*/


      /*watch.clearWatch();
      // OR
      $cordovaGeolocation.clearWatch(watch)
        .then(function(result) {
          // success
        }, function (error) {
          // error
        });*/



    }









  }])


  .controller('ResultatsCtrl', function($scope,$state,$stateParams,$cordovaGeolocation,$timeout) {

    var options = {timeout: 10000, enableHighAccuracy: true};



    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    }, function(error){
      console.log("Could not get location");
    });






    //--------------------------------------------------


  })

  //controleur pour gérer l'étape du login du client pour son espace

  .controller('clientLoginCtrl', function($scope,$ionicLoading, $timeout) {


    //variable pour vérifier si el formulaire est envoyée

    $scope.submitted = false;

    //varibale pour controler si l'email n'existe pas

    $scope.emailInexistant = false;

    //variable pour controler si le mot de pass est invalide
    $scope.passwordInvalide = false;

    //initializer le client

    $scope.client ={};

    //une fonction ppur login Client

    $scope.loginClient = function(isValid){

      console.log('validty' +isValid)

      $scope.submitted = true;

      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,

      });

      $timeout(function(){
        $ionicLoading.hide();
      },2000)

    }


  })

  .controller('clientInscriptionCtrl',['$scope','ionicDatePicker','$ionicLoading','$timeout','PatientService',function($scope,ionicDatePicker,$ionicLoading, $timeout
  ,PatientService) {
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      },

      from: new Date(1940, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
     //Optional
      closeOnSelect: true,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };





    ///-__________________________________________
    //initializer le client

    $scope.newClient={};
    $scope.accept1 = true;
    $scope.accept2 = true;

    $scope.phNumber = '/^[1-9]{1}[0-9]{7}$/';

    $scope.submitted = false;

    //une fonction ppur login Client

    $scope.inscrireClient = function(isValid){
      $scope.submitted = true;

      if(isValid){


      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,

      });

      $timeout(function(){
        $ionicLoading.hide();
      },2000)
      }//end if is valid


      PatientService.inscrire($scope.newClient)
      //si succes redirger vers dashabord
      //si non afficher message d'erreurs
    }

  }])

  .controller('praticienLoginCtrl',['$scope','$timeout',
  '$ionicLoading','DocteurService',function($scope, $timeout,$ionicLoading,DocteurService) {


    //variable pour vérifier si el formulaire est envoyée

    $scope.submitted = false;

    //varibale pour controler si l'email n'existe pas

    $scope.emailInexistant = false;

    //variable pour controler si le mot de pass est invalide
    $scope.passwordInvalide = false;

    //initializer le client

    $scope.praticient ={};

    //une fonction ppur login Client

    $scope.loginPraticient = function(isValid){


      console.log('form pratcine tlogin' + isValid);
      $scope.submitted = true;

      //DocteurService

      if(isValid){

        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,

        });

        $timeout(function(){
          $ionicLoading.hide();
        },2000)

        DocteurService.seConnecter($scope.praticient)
        //si success rediriger vers dashabord
        // si non afficher message d'erreur

      }



    }

  }])

  .controller('praticienInscriptionCtrl',['$scope','$ionicModal','$timeout','DocteurService', ,function($scope, $ionicModal
    ,$timeout,DocteurService) {



    //variable pour valider le formulaire vérifier si elle envoyée
    $scope.submitted = false ;

    //une variable pour vérifier si le code entré est invalide

    $scope.codeInvalide = false;
    //initializer les données
    $scope.newDocteur ={};

    $scope.inscrireDocteur = function(isVlaid){

      console.log('IsValid' + isVlaid)
      $scope.submitted = true;

      if(isVlaid){
        DocteurService.inscrire($scope.newDocteur)
        // si success rediriger vers dashabord
        //si non afficher message d'erreur
      }

    }


  }])

  .controller('dashabordClientCtrl',['$scope','$ionicModal','$timeout','ionicMaterialMotion','ionicMaterialInk','$ionicLoading',
    '$ionicHistory','PatientService',
    function($scope, $ionicModal, $timeout,ionicMaterialMotion,ionicMaterialInk,
                                              $ionicLoading, $ionicHistory,PatientService) {


    $scope.Client = PatientService.getPatient();

    $scope.$on("$ionicView.enter", function() {
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      console.log("dahsbord client .......")
    });
    $ionicLoading.show({
      template: '<ion-spinner icon="dots"></ion-spinner>',
      hideOnStageChange: true,
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0,

    });

    $timeout(function(){
      $ionicLoading.hide();
    },2000)

    $scope.$on("$ionicView.beforeEnter", function() {
      console.log("dahsbord client .......")
    });
    $ionicLoading.show({
      template: '<ion-spinner icon="dots"></ion-spinner>',
      hideOnStageChange: true,
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0,

    });

    $timeout(function(){
      $ionicLoading.hide();
    },2000)



    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);

    $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();









    console.log('on va afficher lzs informations du client , ses rendez vous, et ses praticients')


    //une méthode pour modifier le profile


    $scope.modifierProfile = function(){

      $ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,

      });

      $timeout(function(){
        $ionicLoading.hide();
      },2000)

      //on doit valider les informations changées
      PatientService.modifierProfile(data)
      //si success afficher Modal


    }








  }])

  .controller('dashabordPraticienCtrl',['$scope','$ionicModal','$timeout','$ionicLoading','$ionicHistory','DocteurService', function($scope,$ionicModal,
                                                                                                                                     $timeout,$ionicLoading,$ionicHistory,DocteurService) {




    //récuperer le docteur

    $scope.Docteur = DocteurService.getDocteur;


    //on va afficher toutes les informations du docteur , profile , rendez vous la liste des clients


    /*
    les méthodes
     */

    $scope.confirmerRendezVous = function(){

      //si valeur button rejeter alors envoyer rejter
      //si valeur button confirmer envoyer confirmer
      DocteurService.confirmerRendezVous();


    }



    $scope.modifierProfile = function(){
      //modifier son profile et ses cordonnées

    }














    $scope.$on("$ionicView.enter", function() {
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      console.log("dahsbord praticien .......")
    });
    $ionicLoading.show({
      template: '<ion-spinner icon="dots"></ion-spinner>',
      hideOnStageChange: true,
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0,

    });

    $timeout(function(){
      $ionicLoading.hide();
    },2000)

console.log('we are hear')
  }])
















  .controller('DocteurCtrl', function($scope, $ionicModal, $timeout) {

   $scope.Docteur  ='';
  })

  .controller('RdvsCtrl', function($scope, $ionicModal, $timeout) {

    $scope.RendezVous = '' ;
  })


