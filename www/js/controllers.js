angular.module('starter.controllers', [])

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

  .controller('RechercheCtrl', function($scope, $timeout,$ionicPopover,$ionicLoading,$ionicModal,$state) {

    $scope.showListemdecins = false ;

    $scope.disableGeo = true;





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











    $ionicPopover.fromTemplateUrl('templates/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });


    //fonction pour activer la géloaclisation

    $scope.ActiverGeo = function(){

      //activer la géolocalisation
      $scope.disableGeo= false;
      console.log('ok ok ok')
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

    $scope.specialites = [
      'Pharmacie de jour','Vétérinaire','Dentiste','Pharmacie de Nuit','Anesthethie'
    ];

    //la liste de sgouvernorats
    $scope.gouvernorats = [
      'Ariana','Ben Arous','Mannouba','Tunis'
    ];





    $scope.someSetModel = 'Mauro';
    $scope.someModel2 = 'Hello';

    $scope.getOpt = function(option){
      return option.name + ":" + option.role;
    };

    $scope.shoutLoud = function(newValuea, oldValue){
      alert("changed from " + JSON.stringify(oldValue) + " to " + JSON.stringify(newValuea));
    };

    $scope.shoutReset = function(){
      alert("value was reset!");
    };



    //une fonction pour faire la recherche du docteur


    $scope.recherche = function(){
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
        //$scope.openModal();
      },2000)


      $state.go('app.resultas')






    }














  })


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


    //initializer le client

    $scope.client ={};

    //une fonction ppur login Client

    $scope.loginClient = function(){
      console.log('ok ok ok')
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

  .controller('clientInscriptionCtrl', function($scope,ionicDatePicker,$ionicLoading, $timeout) {
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

    //une fonction ppur login Client

    $scope.inscrireClient = function(){
      console.log('ok ok ok')
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

  .controller('praticienLoginCtrl', function($scope, $ionicModal, $timeout,$ionicLoading) {

    //initializer le client

    $scope.praticient ={};

    //une fonction ppur login Client

    $scope.loginPraticient = function(){
      console.log('ok ok ok')
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

  .controller('praticienInscriptionCtrl', function($scope, $ionicModal, $timeout) {


  })

  .controller('dashabordClientCtrl', function($scope, $ionicModal, $timeout,ionicMaterialMotion,ionicMaterialInk) {

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
  })

  .controller('dashabordPraticienCtrl', function($scope, $ionicModal, $timeout) {


  })


