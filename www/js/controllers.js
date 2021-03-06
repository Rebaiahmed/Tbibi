angular.module('tbibi')

  /*
  Défenir Nos Controlleurs
   */


  /*
  Controleur pour l'App --------------
   */
.controller('AppCtrl',['$scope','$ionicModal','$ionicPopover','$timeout','$state', function($scope,$ionicModal,
                                                                                            $ionicPopover, $timeout,$state) {




    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////








    $scope.navigateTo = function(stateName){

      $state.go(stateName);

    }





  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates2/login.html', {
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


}])






  /*
  Controleur pour la recherche
   */





  .controller('RechercheCtrl',['$scope','$timeout','$ionicPopover','$ionicLoading','$ionicModal','$state','RechercherSevice','$filter',
    'getDocteurs','getSpecialitees',function($scope, $timeout
    ,$ionicPopover,$ionicLoading,$ionicModal,$state,RechercherSevice,$filter,getDocteurs
    ,getSpecialitees) {



      /*$scope.$on("$ionicView.beforeEnter", function() {
        console.log("Running stuff...");
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

      });*/



      /*$ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true
      });*/

      /*$ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,

      });

      $timeout(function(){
        $ionicLoading.hide();
      },2000)*/


    /*
    IONIC MODAL
    _-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-__-_-
     */

    $ionicModal.fromTemplateUrl('templates2/modal.html', {
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

    $ionicPopover.fromTemplateUrl('templates2/popover.html', {
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







      //une fonction pour faire la recherche du docteur
      $scope.data ={};

      $scope.data.specialite = '';
      $scope.data.gouvernorat = '';
      $scope.data.delegation = '';


      $scope.doctor= {};
      $scope.specialites =[];
      $scope.searchDoc = {};

$scope.errorDoctor = false ;
      $scope.errorSpecilaite = false ;

      angular.forEach(getSpecialitees, function(value, key){


value = angular.fromJson(value);

            $scope.specialites[key] = value.specialite;



      });





    //la liste de sgouvernorats
    $scope.gouvernorats = [
      'Ariana','Ben Arous','Mannouba','Tunis'
    ];

      // la liste des Délégations
      $scope.delegations =['Ariana Ville','Ariana Nouvelle','Ariana Sup','El Menzah 9']


    //la liste des docteurs





      $scope.docteurs =[];

      var option ={};
      angular.forEach(getDocteurs, function(value, key) {

        value = angular.fromJson(value);
        option.id = value.id_praticien;
        option.prenom_praticien = value.prenom_praticien;
        option.nom_praticien = value.nom_praticien ;

        $scope.docteurs[key] = option;


        option={};
      })




      /*

       */


    $scope.rechercheParCritere = function(){




      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,

      });


       if($scope.data.specialite){

        RechercherSevice.RechercheParCritere($scope.data)
         .then(function(result){
         $ionicLoading.hide();


          if(result.data.Number==0){
         $scope.openModal();
         }else {
            //get the result pass on params
            //Resultats
            /*var liste = [];

            for (var i = 0; i < result.data.Number; i++) {

              liste[i] = result.data.Resultats[i];

            }*/


            $state.go('app.resultas', {'resultats': JSON.stringify(result.data)})
          }

        }).catch(function(err){
         $ionicLoading.hide();
         console.log('eer' + JSON.stringify(err));
         })



      }else{

        //aucun choix choisit
         $scope.errorSpecilaite = true ;
        $ionicLoading.hide();
      }










    }




      /*
      RECHERCHER PAR Nom
       */

      $scope.rechercheParNom= function(){


        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,

        });



if($scope.data.doctor){

  RechercherSevice.RechercheDocteur($scope.data.doctor.id)
    .then(function(result){
      $ionicLoading.hide();

      if(result){
        //app.docteursDetails
        $state.go('app.docteursDetails', {'id': result.id_praticien})
      }else{
        $scope.openModal();
      }


    }).catch(function(err){
      $ionicLoading.hide();
      console.log('err' + err);
    })


}else{
  $scope.errorDoctor = true;
  $ionicLoading.hide();
}













      }









    }])


  .controller('ResultatsCtrl',['$scope','$ionicLoading','$timeout','$stateParams','$state','localStorageService', function($scope,$ionicLoading,$timeout,$stateParams
    ,$state,localStorageService) {


    $scope.$on("$ionicView.beforeEnter", function() {
      console.log("Running stuff...");
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

    });








    $stateParams.resultats = angular.fromJson($stateParams.resultats);


    $scope.Resultats = [];


    if($stateParams.resultats) {


      for (var i = 0; i < $stateParams.resultats.Number; i++) {

        $scope.Resultats[i] = angular.fromJson($stateParams.resultats.Resultats[i]);


      }//end for


    }//end if
    //fonction pour la trasntition vers docteurDetails

    $scope.gotoDocteurDetails = function(id){

      $state.go('app.docteursDetails',{id:id})
    }
/*
_-_-_-_-_-_-_-__-__-_-_-_-__-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-__-_-_-
 */







$scope.goMpas = function(){
console.log('go to maps !')
  $state.go('app.maps',{'Resultats':JSON.stringify($scope.Resultats)});
}

  }])


  .controller('MapsCtrl',['$stateParams','$http','$scope', function($stateParams, $http,$scope) {


      var doc ={};
      var lat,long ;





    $stateParams.Resultats =  angular.fromJson($stateParams.Resultats);

    console.log('params are' +  $stateParams.Resultats.length);

    $scope.Resultats = [];


    if($stateParams.Resultats) {


      for (var i = 0; i < $stateParams.Resultats.length; i++) {

        $scope.Resultats[i] = $stateParams.Resultats[i];


      }//end for


    }//end if

    angular.extend($scope, {
      center: {
        lat: 36.7908,
        lng: 10.1112,
        zoom: 10
      },
      layers: {
        baselayers: {
          osm: {
            name: 'OpenStreetMap',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            type: 'xyz'
          },
        },
        overlays:{
          earthquake: {
            name: 'earthquake',
            type: 'markercluster',
            visible: true
          }
        }
      }
    });

    //console.log('ddd' +    $scope.Resultats.length);

    $scope.markers =[]

      for(var i=0;i<$scope.Resultats.length;i++){


        lat = parseFloat($scope.Resultats[i].latitude);
        long = parseFloat($scope.Resultats[i].longitude);
        console.log('i' + lat + ' long' + long);
        $scope.markers[i] = {
          lat: lat,
          lng: long,
          message: " " + $scope.Resultats[i].nom_praticien + ' ' + $scope.Resultats[i].prenom_praticien + '</br>' +
          'Tel:' +$scope.Resultats[i].phone__fixe_praticien + '</br>' +
          'Specialite :'  +$scope.Resultats[i].specialite ,
          focus: true,
          draggable: false

        }

      }

      angular.extend($scope, {
        markers:  $scope.markers
      });







  }])

  //controleur pour gérer l'étape du login du client pour son espace

  .controller('clientLoginCtrl',['$scope','$ionicLoading','$timeout','PatientService','$state','$rootScope',function($scope,$ionicLoading,
                                                                                                        $timeout,PatientService
    ,$state,$rootScope) {


    /*
    avant d'entrer dans dans la vue
     */
    $scope.$on("$ionicView.beforeEnter", function() {
      console.log("clien tlogin client...");
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

    });

    /*-----------------------------*/


    //variable pour vérifier si el formulaire est envoyée

    $scope.submitted = false;

    //varibale pour controler si l'email n'existe pas

    $scope.emailInexistant = false;

    //variable pour controler si le mot de pass est invalide
    $scope.passwordInvalide = false;

    //initializer le client

    $scope.client ={};

    //une fonction ppur login Client

    $scope.loginClient = function(isValid) {


      $scope.submitted = true;


      if (isValid) {

        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,

        });

       PatientService.seConnecter($scope.client)
          .then(function (client) {

            console.log('client' + JSON.stringify(client.data));

            $ionicLoading.hide();
           if (client.data.error.code==404) {
              console.log('error in submit')
              $scope.emailInexistant = true;
            } else {
              console.log('client logged');
              $rootScope.clientAuthenticated = true ;

             //setPatient
             PatientService.setPatient(client.data)
              $state.go('app.dashaBordClient')
            }

        }).catch(function (err) {
            //console.log('err' + JSON.stringify(err));
            $ionicLoading.hide();
          })


      }

    }
  }])

  .controller('clientInscriptionCtrl',['$scope','ionicDatePicker','$ionicLoading','$timeout','PatientService','$rootScope'
    ,'$state','$ionicModal',function($scope,ionicDatePicker,$ionicLoading, $timeout
  ,PatientService,$rootScope,$state,$ionicModal) {



    /*
     avant d'entrer dans dans la vue
     */
    $scope.$on("$ionicView.beforeEnter", function() {
      console.log("client inscription client...");
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

    });

    /*-----------------------------------------*/




    $ionicModal.fromTemplateUrl('templates2/EmailInvalide.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });











    ///-__________________________________________
    //initializer le client

    $scope.newClient={};



    /*
    the datepicker configuration
     */
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.newClient.dateNaissance = new Date(val);
        console.log('the date is' + typeof $scope.newClient.dateNaissance )
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
/*--------------------------------------------------------*/





    $scope.accept1 = true;
    $scope.accept2 = true;

    $scope.phNumber = "^[1-9][0-9]{7}$";

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





        //$rootScope.praticientAUthenticated  =false;

      PatientService.inscrire($scope.newClient)

        .then(function(data){
          //si data est valide // sauvegarder dans localStorage
          //rediriger vers dashabord
          $ionicLoading.hide();
          console.log('data' + (data.data.error.code==401));

         if(data.data.error.code==401){
           $scope.openModal();
          }else{
            console.log('success dinscription')
           $rootScope.clientAuthenticated = true ;
           PatientService.setPatient(data.data)
           $state.go('app.dashaBordClient')
          }

        }).catch(function(err){
          //si erreru afficher les message d'erreurs
          $ionicLoading.hide();
          console.log('erreur' + JSON.stringify(err))
        })

    }



    }//end if is valid

  }])

  .controller('praticienLoginCtrl',['$scope','$timeout',
  '$ionicLoading','DocteurService','$rootScope','$state',function($scope, $timeout,$ionicLoading,DocteurService,$rootScope
    ,$state) {








      /*
       avant d'entrer dans dans la vue
       */
      /*$scope.$on("$ionicView.beforeEnter", function() {
        console.log("praticien login...");
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

      });*/

      /*-----------------------------------------*/




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



        DocteurService.seConnecter($scope.praticient)
          .then(function(praticien){
            $ionicLoading.hide();
            console.log('patrticn' + JSON.stringify(praticien.data));

            if(praticien.data.error.code==404){
              $scope.emailInexistant = true;
            }else{

              console.log('praticne logged');
             DocteurService.setPraticient(praticien.data)

              $rootScope.praticientAuthenticated = true ;
              $state.go('app.dashaBordPraticien')

           }

          }).catch(function(err){
            console.log('err' + err);
          })
        //si success rediriger vers dashabord
        // si non afficher message d'erreur

      }



    }

  }])

  .controller('praticienInscriptionCtrl',['$scope','$ionicModal','$timeout','DocteurService','$ionicLoading','$rootScope',
    '$state',function($scope, $ionicModal
    ,$timeout,DocteurService,$ionicLoading,$rootScope,$state) {




    /*
     avant d'entrer dans dans la vue
     */
    $scope.$on("$ionicView.beforeEnter", function() {
      console.log("praticien login...");
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

    });

    /*-----------------------------------------*/












    //variable pour valider le formulaire vérifier si elle envoyée
    $scope.submitted = false ;

    //une variable pour vérifier si le code entré est invalide

    $scope.codeInvalide = false;
    //initializer les données
    $scope.newDocteur ={};

    $scope.inscrireDocteur = function(isVlaid){


      $scope.submitted = true;

      if(isVlaid){


        $ionicLoading.show({
          template: '<ion-spinner icon="dots"></ion-spinner>',
          hideOnStageChange: true,
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,

        });


        DocteurService.inscrire($scope.newDocteur)
          .then(function(result){
            $ionicLoading.hide();
            console.log('result' + JSON.stringify(result.data));
            if(result.data.error.code==401){
              console.log('invalide code');
              $scope.codeInvalide = true ;
            }else{
              console.log('praticne logged');
              DocteurService.setPraticient(result.data)
              $rootScope.praticientAuthenticated = true ;
              $state.go('app.dashaBordPraticien')
            }

          }).catch(function(err){
            $ionicLoading.hide();
            console.log('err' + err)
          })

      }

    }


  }])

  .controller('dashabordClientCtrl',['$scope','$ionicModal','$timeout','ionicMaterialMotion','ionicMaterialInk','$ionicLoading',
    '$ionicHistory','PatientService','ionicToast','$state','$rootScope','ionicDatePicker',
    function($scope, $ionicModal, $timeout,ionicMaterialMotion,ionicMaterialInk,
                                              $ionicLoading, $ionicHistory,PatientService,ionicToast, $state,$rootScope,ionicDatePicker) {

      /*
       avant d'entrer dans dans la vue
       */
      $scope.$on("$ionicView.beforeEnter", function() {
        console.log("praticien login...");
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

      });

      /*-----------------------------------------*/


      $scope.phNumber = "^[1-9][0-9]{7}$";

      /*
       the datepicker configuration
       */
      var ipObj1 = {
        callback: function (val) {  //Mandatory
          console.log('Return value from the datepicker popup is : ' + val, new Date(val));
          $scope.Client.userData.date_naissance = new Date(val);

        },

        from: new Date(1940, 1, 1), //Optional
        to: new Date(2016, 10, 30), //Optional
        //inputDate: new Date(),      //Optional
        mondayFirst: true,          //Optional
        //Optional
        closeOnSelect: true,       //Optional
        templateType: 'popup'       //Optional
      };

      $scope.openDatePicker = function(){
        ionicDatePicker.openDatePicker(ipObj1);
      };
      /*--------------------------------------------------------*/



//modifier la date de naissance

      if(PatientService.getPatient()){
        $scope.Client = JSON.parse(PatientService.getPatient());
console.log('date de naisiance est ',$scope.Client.userData.date_naissance);
        $scope.Client.userData.date_naissance = new Date($scope.Client.userData.date_naissance )
      }










    //une méthode pour modifier le profile

      /*--_-_-_-_-__-_-_-_-_mdofier profile--_-_-_-_-_-__-_-_--_-__-_-_-_-_-_-*/

    $scope.modifierProfile = function(isvlaid){


      $scope.submitted = true ;
      $ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,

      });


      //on doit valider les informations changées
      if(isvlaid) {

console.log('date de anissane',JSON.stringify($scope.Client.userData));
        PatientService.modifierProfile($scope.Client.userData)
          .then(function (result) {

            $ionicLoading.hide();
            console.log('result is' + JSON.stringify(result.data));
            //we will save it

            PatientService.setPatient(result.data);
            /*PatientService.setPatient(data.data);*/
            $scope.Client = JSON.parse(PatientService.getPatient());
            $scope.Client.userData.date_naissance = new Date($scope.Client.userData.date_naissance )
            ionicToast.show('Votre profile a été modifié avec succées ', 'top', true, 2500);
          }).catch(function (err) {
            $ionicLoading.hide();
            ionicToast.show('Erreur veuillez réssayez plus tard ! ', 'top', true, 2500);
            console.log('err' + JSON.stringify(err));
          })

      }//end isvalid


    }


      /*--_-_-_-_-__-_-_-_-_logout function--_-_-_-_-_-__-_-_--_-__-_-_-_-_-_-*/

$scope.logout = function(){
  PatientService.logout();
  ionicToast.show('Deconnecter', 'top', true, 2500);
  $rootScope.clientAuthenticated = false ;
  $state.go('app.recherche.specialite');
}


      /*
       _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
       */



      $scope.Refresh = function(){


        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,

        })

        PatientService.refresh( $scope.Client.userData.id_patient)
          .then(function(data){

            $ionicLoading.hide();

            PatientService.setPatient(data.data);
            $scope.Client = JSON.parse(PatientService.getPatient());
            $scope.Client.userData.date_naissance = new Date($scope.Client.userData.date_naissance )
          }).catch(function(err){
            console.log('err' +err)
          })
      }



  }])

  .controller('dashabordPraticienCtrl',['$scope','$ionicModal','$timeout','$ionicLoading','$ionicHistory','DocteurService','$rootScope','$state','ionicToast', function($scope,$ionicModal,
                                                                                                                                     $timeout,$ionicLoading,$ionicHistory,DocteurService,
                                                                                                                                                           $rootScope,$state,ionicToast) {


    /*
     avant d'entrer dans dans la vue
     */
    $scope.$on("$ionicView.beforeEnter", function() {
      console.log("praticien login...");
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

    });

    /*-----------------------------------------*/



    //récuperer le docteur
    if(DocteurService.getDocteur()){

      $scope.Docteur = JSON.parse(DocteurService.getDocteur());
    }



$scope.checked = false ;
    $scope.refused = false;
    //on va afficher toutes les informations du docteur , profile , rendez vous la liste des clients


    /*
    les méthodes
     */

    $scope.confirmerRendezVous = function(idRdv){

      //si valeur button rejeter alors envoyer rejter
      //si valeur button confirmer envoyer confirmer
      data.idRdv = idRdv;
      data.idDoctor = $scope.Docteur.userData.id_praticien ;
      $ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,

      })
      DocteurService.confirmerRendezVous(data)
        .then(function(result){

console.log('result' + JSON.stringify(result));

          $ionicLoading.hide();
          DocteurService.setPraticient(result.data);

          $scope.Docteur = JSON.parse(DocteurService.getDocteur());
          $scope.refused = true;
          ionicToast.show('le Rendez Vous est confirmee.', 'top', true, 2500);
      }).catch(function(err){
        console.log('err' +err)
      })


    }


var data ={};

    console.log('ddhhdhdhdhdhhd' +  JSON.stringify($scope.Docteur));
    /*_-_-__-_-_-_-_-_methode rejeter RDV*/

    $scope.rejeterRendezVous = function(idRdv){
   data.idRdv = idRdv;
      data.idDoctor = $scope.Docteur.userData.id_praticien ;


      //si valeur button rejeter alors envoyer rejter
      //si valeur button confirmer envoyer confirmer




      $ionicLoading.show({
        template: '<ion-spinner icon="dots"></ion-spinner>',
        hideOnStageChange: true,
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,

      });









      DocteurService.RejeterRendezVous(data)
        .then(function(result){

          $ionicLoading.hide();
          DocteurService.setPraticient(result.data);

          $scope.Docteur = JSON.parse(DocteurService.getDocteur());
          $scope.refused = true;
          ionicToast.show('le Rendez Vous est Rejetée.', 'top', true, 2500);
        }).catch(function(err){
          console.log('err' +err)
        })


    }


$scope.submitted = false ;

    $scope.modifierProfile = function(valid) {
      //modifier son profile et ses cordonn

      console.log('ok ok ok')
      $scope.submitted = true ;

    }

/*è-_-_-_-_-_-_-_-_-_-_-_-_*/
    $scope.logout = function(){
      DocteurService.logout();
      ionicToast.show('Deconnecter', 'top', true, 2500);
      $rootScope.praticientAuthenticated = false ;
      $state.go('app.recherche.specialite');
    }




    /*
    _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
     */

    $scope.refresh = function(){



      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,

      })

      DocteurService.refresh( $scope.Docteur.userData.id_praticien)
        .then(function(data){
          console.log('data are' + JSON.stringify(data));
          $ionicLoading.hide();
          DocteurService.setPraticient(data.data);

          $scope.Docteur = JSON.parse(DocteurService.getDocteur());
        }).catch(function(err){
          console.log('err' +err)
        })
    }

  }])
















  .controller('DocteurDetailsCtrl',['$scope','$ionicModal','$timeout','$cordovaCalendar','getDocteur',
    'PatientService','$ionicSlideBoxDelegate','ionicDatePicker','$ionicPopup',function($scope, $ionicModal,
           $timeout, $cordovaCalendar,getDocteur,PatientService,$ionicSlideBoxDelegate,ionicDatePicker,$ionicPopup) {



  }])

  .controller('RdvsCtrl',['$scope','$ionicModal','$timeout', function($scope, $ionicModal, $timeout) {

    $scope.RendezVous = '' ;
  }])


