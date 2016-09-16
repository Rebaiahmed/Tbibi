angular.module('tbibi')
/*
définir Nos services
 */

  /*
  -_-_-_-_-_-_-_-_SERVICE POUR LE PATIENT-_-_-_-_-__-_-_-_-_-_-_-_-
   */


.service('PatientService',['$http','$q','localStorageService', function($http,$q,localStorageService){
var urlBase = 'http://192.168.1.4/webservices';

    //-_-_-_-_-_une méthode pour mettre le patient en localStorage
    console.log('work work work !')

    this.setPatient = function(data){

//localStorage

      localStorageService.set('client', JSON.stringify(data));

    }

    //-_-_-_-_-_une méthode pour retourner le client


    this.getPatient = function(){

      // return localStorage
      return localStorageService.get('client');
    }

    //-_-_-_-_-_une méthode pour prendre le rendez Vous d'apres le client


    this.prendreRendezVous= function(data){

      return $http({
        method: "post",
        url: urlBase +'/prendreRendezVousClient.php',
        data :{'id_patient' : data.id_patient,'id_praticien': data.id_praticien,'date': data.date
          ,'time': data.time},
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      })
    }


    this.logout = function(){
      return localStorageService.remove('client');
    }


    //-_-_-_-_-_une méthode pour modifier le profile


    this.modifierProfile= function(data){

/*
 {"id_patient":"192","\tnom_patient":"","prenom_patient":"taoufik","email_patient":"taoufik.ettaieb@gmail.com","phone_bureau_patient":"344444","\tphone_domicile_patient":"","mobile_patient":"20140428",
 "date_naissance":"2016-08-17T00:00:00.000Z",
 "genre":"homme","nom_patient":"taoufik","phone_domicile_patient":"33333"}
 */

      return $http({
        method: "post",
        url:urlBase +'/modifierProfileClient.php',
        data :{'id' : data.id_patient,'nom': data.nom_patient,'prenom': data.prenom_patient
          ,'genre': data.genre,'mobile': data.mobile_patient,'dateNaissance':data.date_naissance},
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      })


    }


    //-_-_-_-_-_une méthode pour se connecter


    this.seConnecter= function(data){

 return $http({
        method: "post",
        url: urlBase +'/loginClient.php',
        data :{'email' : data.email,'password': data.password},
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      })

    }

    //-_-_-_-_-_une méthode pour s'inscrire


    this.inscrire= function(data){
      //

       return $http({
        method: "post",
        url: urlBase +'/inscrireClient.php',
        data :{'email' : data.email,'password': data.password,'nom': data.nom,'prenom': data.prenom
    ,'genre': data.genre,'mobile': data.mobile,'domicile': data.domicile,'bureau':data.bureau},
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      })

    }

  }])




/*
 -_-_-_-_-_-_-_-_SERVICE POUR LE Docteur-_-_-_-_-__-_-_-_-_-_-_-_-
 */


  .service('DocteurService',['$http','$q','localStorageService', function($http,$q,localStorageService){

    var urlBase = 'http://192.168.1.4/webservices';


    //-_-_-_-_-_une méthode pour mettre le docteur en localStorage

    this.setPraticient = function(data){

      localStorageService.set('praticient', JSON.stringify(data));

    }

    //-_-_-_-_-_une méthode pour retourner le docteur


    this.getDocteur = function(){
      // return localStorage
      return localStorageService.get('praticient');
    }

    //-_-_-_-_-_une méthode pour confirmer ou refuser un rendez vous par le docteur


    this.confirmerRendezVous= function(data){
      return $http({
        method: "post",
        url: urlBase + '/confirmezRdv.php',
        data :{'idRdv' :data.idRdv,'idDoctor':data.idDoctor},
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      })
    }







    //-_-_-_-_-_une méthode pour  refuser un rendez vous par le docteur


    this.RejeterRendezVous= function(data){
      return $http({
        method: "post",
        url: urlBase + '/RejeterRdv.php',
          data :{'idRdv' :data.idRdv,'idDoctor':data.idDoctor},
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      })
    }





    //-_-_-_-_-_une méthode pour prendre le rendez Vous d'apres le client

    this.logout = function(){
      return localStorageService.remove('praticient');
    }

    //-_-_-_-_-_une méthode pour modifier le profile


    this.modifierProfile= function(data){
      //
      return 1;
    }


    //-_-_-_-_-_une méthode pour se connecter


    this.seConnecter= function(data){
      //
      return     $http({
        method: "post",
        url: urlBase +'/loginPraticient.php',
        data :{'email' : data.email,'password': data.password},
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      })
    }

    //-_-_-_-_-_une méthode pour s'inscrire


    this.inscrire= function(data){
      //
      return     $http({
        method: "post",
        url: urlBase +'/inscrirePraticinet.php',
        data :{'nom' : data.nom,'prenom': data.prenom,'code':data.code},
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      })
    }


    //_-_-_-_-_-_-_-méthode pour refershir les donnes d'apres le server _-_-_-_-_-_


    this.refresh= function(id){
      //
      return     $http({
        method: "post",
        url: urlBase +'/refreshServer.php',
        data :{'id' :id },
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      })
    }

  }])


/*
 -_-_-_-_-_-_-_-_SERVICE POUR LE Recherche-_-_-_-_-__-_-_-_-_-_-_-_-
 */

.service('RechercherSevice',['$http','$q', function($http,$q){




    var urlBase = 'http://192.168.1.4/webservices';

    //une méthode pour récuperer la liste des docteurs
    this.getDocteurs = function(){

      var def = $q.defer();
//http://localhost/webservices/
      //urlBase +'/listeDocteurs.php
      $http.get(urlBase +'/listeDocteurs.php')
        .then(function(data){

         def.resolve(data.data);

        }).catch(function(err){
          def.reject(err);
        })
      return def.promise;
    }


    this.getSpecialitees = function(){

      var liste =new Array();
      var def = $q.defer();
      console.log('hello ')
      $http.get(urlBase +'/specialitees.php')
        .then(function(data){

          //liste = angular.fromJson(data.data)

          def.resolve(data.data);

        }).catch(function(err){
          def.reject(err);
        })

      return def.promise;
      /*return ['Dentiste','Ophtalmologiste','Généraliste','Gynécologue','ORL','Dermatologue','Pédiatre','physiotherapeute','Cardiologue'
      ,'Gastro-entérologue','psychiatre','Chirurgien orthopédiste','Cancérologue','Orthophoniste','Orthopédiste','Radiologue','Angiologue'
      ,'Orthodontiste','Chirurgien Urologue','Neurologue','Hématologie','Nutritionniste','Pneumologie-Allergologie','Chirurgie Générale',
      'Rhumatologue','Chirurgie Pédiatrique','Chirurgie maxillo-faciale et stomatologie','Anesthesiste','Pharmacie de Jour',
      'Pharmacie de Nuit','Pharmacie de Garde','Laboratoire Danalises Médicale','Prothesiste Dentaire','Anatomie et Cytologie Pathologiques',
      'Orthoptistes','Chirurgie réparartrice','Pédiatrie-Allergologie','Urologue','Vétérinaire','Electromyographie','Médecin Esthétique',
      'Electroencephalogramme - Troubles du sommeil']*/


    }



    this.RechercheDocteur = function(id){
      //envoyer les données de recherche au serveur


      var def = $q.defer();
      $http({
        method: "post",
        url:  urlBase +'/getDocteurParNom.php',
        data :{'id' : id},
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      }).success(function(data){



        def.resolve(data);

      }).error(function(err){
        console.log('err' + err)
        def.reject(err);
      })
      return def.promise;
    }



    /*
    -__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-
     */

    this.getGouvernorats= function(){

      var liste =new Array();
      var def = $q.defer();
      $http.get(urlBase + '/gouvernorats.php')
        .then(function(data){

             def.resolve(data);
        }).catch(function(err){
          def.reject(err);
        })

      return def.promise;



    }


    /*
     -__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-
     */

    this.RechercheParCritere= function(data) {



     return $http({
        method: "post",
        url:  urlBase + '/RechercheDocteurs.php',
        data: {'specialite': data.specialite, 'gouvernorat': data.gouvernorat, 'delegation': data.delegation},
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
      })

    }

  }])



/*
-_--_-_-_-------------------SERVICE POUR LA GEOLOCALIATION----------------------------------
 */

  .service('GeoSevice',['$http','$q','$cordovaGeolocation','localStorageService', function($http,$q,$cordovaGeolocation,localStorageService){

    //une méthode pour récuperer la liste des docteurs
    /*this.getCurrentPosition = function(){

      var def = $q.defer();

      var lat,long;
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      /*$cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          lat  = position.coords.latitude
          long = position.coords.longitude


          localStorageService.set('position',{
            'lat':position.coords.latitude,
            'long':position.coords.longitude
          });

          console.log('psotion in service' + JSON.stringify(localStorageService.get('position')) )
          def.resolve(position.coords);


        }, function(err) {
          // error
          console.log('err' + JSON.stringify(err));
          def.reject(err);
        });
      return def.promise;
    }*/






  }])

