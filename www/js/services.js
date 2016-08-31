angular.module('tbibi')
/*
définir Nos services
 */

  /*
  -_-_-_-_-_-_-_-_SERVICE POUR LE PATIENT-_-_-_-_-__-_-_-_-_-_-_-_-
   */


.service('PatientService',['$http','$q','localStorageService', function($http,$q,localStorageService){
var urlBase = '';

    //-_-_-_-_-_une méthode pour mettre le patient en localStorage

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
      //envoyer rendez Vous
      return 1;
    }


    this.logout = function(){
      return localStorageService.remove('client');
    }


    //-_-_-_-_-_une méthode pour modifier le profile


    this.modifierProfile= function(data){


      return $http({
        method: "post",
        url: 'http://localhost/webservices/modifierProfileClient.php',
        data :{'email' : data.email,'password': data.password,'nom': data.nom,'prenom': data.prenom
          ,'genre': data.genre,'mobile': data.mobile,'domicile': data.domicile,'bureau':data.bureau},
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      })


    }


    //-_-_-_-_-_une méthode pour se connecter


    this.seConnecter= function(data){

 return $http({
        method: "post",
        url: 'http://localhost/webservices/loginClient.php',
        data :{'email' : data.email,'password': data.password},
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      })

    }

    //-_-_-_-_-_une méthode pour s'inscrire


    this.inscrire= function(data){
      //

       return $http({
        method: "post",
        url: 'http://localhost/webservices/inscrireClient.php',
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


    var urlBase = '';

    //-_-_-_-_-_une méthode pour mettre le docteur en localStorage

    this.setDocteur= function(data){

    }

    //-_-_-_-_-_une méthode pour retourner le docteur


    this.getDocteur = function(){
      return 1;
    }

    //-_-_-_-_-_une méthode pour confirmer ou refuser un rendez vous par le docteur


    this.confirmerRendezVous= function(data){
      return 1;
    }

    //-_-_-_-_-_une méthode pour prendre le rendez Vous d'apres le client



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
        url: 'http://localhost/webservices/loginPraticient.php',
        data :{'email' : data.email,'password': data.password},
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      })
    }

    //-_-_-_-_-_une méthode pour s'inscrire


    this.inscrire= function(data){
      //
      return     $http({
        method: "post",
        url: 'http://localhost/webservices/inscrirePraticinet.php',
        data :{'nom' : data.nom,'prenom': data.prenom,'code':data.code},
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      })
    }

  }])


/*
 -_-_-_-_-_-_-_-_SERVICE POUR LE Recherche-_-_-_-_-__-_-_-_-_-_-_-_-
 */

.service('RechercherSevice',['$http','$q', function($http,$q){





    //une méthode pour récuperer la liste des docteurs
    this.getDocteurs = function(){

      var def = $q.defer();

      $http.get('http://localhost/webservices/listeDocteurs.php')
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
      $http.get('http://localhost/webservices/specialitees.php')
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



    this.RechercheDocteur = function(data){
      //envoyer les données de recherche au serveur

      var def = $q.defer();
      $http({
        method: "post",
        url: 'http://localhost/webservices/getDocteurParNom.php',
        data :{'id' : data},
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      }).success(function(data){



        def.resolve(data);

      }).error(function(err){
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
      $http.get('http://localhost/webservices/gouvernorats.php')
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
        url: 'http://localhost/webservices/RechercheDocteurs.php',
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
    this.getCurrentPosition = function(){

      var def = $q.defer();

      var lat,long;
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
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
    }






  }])

