angular.module('tbibi.services', [])
/*
définir Nos services
 */

  /*
  -_-_-_-_-_-_-_-_SERVICE POUR LE PATIENT-_-_-_-_-__-_-_-_-_-_-_-_-
   */


.service('PatientService',['$http','$q', function($http,$q){
var urlBase = '';

    //-_-_-_-_-_une méthode pour mettre le patient en localStorage

    this.setPatient = function(){

    }

    //-_-_-_-_-_une méthode pour retourner le client


    this.getPatient = function(){
      return 1;
    }

    //-_-_-_-_-_une méthode pour prendre le rendez Vous d'apres le client


    this.prendreRendezVous= function(data){
      return 1;
    }

    //-_-_-_-_-_une méthode pour prendre le rendez Vous d'apres le client


    this.prendreRendezVous= function(data){
      //envoyez data to url défenie
      return 1;
    }

    //-_-_-_-_-_une méthode pour modifier le profile


    this.modifierProfile= function(data){
      //
      return 1;
    }


    //-_-_-_-_-_une méthode pour se connecter


    this.seConnecter= function(data){
      //
      return 1;
    }

    //-_-_-_-_-_une méthode pour s'inscrire


    this.inscrire= function(data){
      //
      return 1;
    }

  }])




/*
 -_-_-_-_-_-_-_-_SERVICE POUR LE Docteur-_-_-_-_-__-_-_-_-_-_-_-_-
 */


  .service('DocteurService',['$http','$q', function($http,$q){


    var urlBase = '';

    //-_-_-_-_-_une méthode pour mettre le docteur en localStorage

    this.setDocteur= function(){

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
      return 1;
    }

    //-_-_-_-_-_une méthode pour s'inscrire


    this.inscrire= function(data){
      //
      return 1;
    }

  }])


/*
 -_-_-_-_-_-_-_-_SERVICE POUR LE Recherche-_-_-_-_-__-_-_-_-_-_-_-_-
 */

.service('RechercherSevice',['$http','$q', function($http,$q){

    var urlDocteurs = '';



    //une méthode pour récuperer la liste des docteurs
    this.getDocteurs = function(){

      var def = $q.defer();

      $http.get(urlDocteurs)
        .then(function(data){
          def.resolve(data);

        }).catch(function(err){
          def.reject(err);
        })
      return def.promise;
    }


    this.getSpecialitees = function(){
      return ['Dentiste','Ophtalmologiste','Généraliste','Gynécologue','ORL','Dermatologue','Pédiatre','physiotherapeute','Cardiologue'
      ,'Gastro-entérologue','psychiatre','Chirurgien orthopédiste','Cancérologue','Orthophoniste','Orthopédiste','Radiologue','Angiologue'
      ,'Orthodontiste','Chirurgien Urologue','Neurologue','Hématologie','Nutritionniste','Pneumologie-Allergologie','Chirurgie Générale',
      'Rhumatologue','Chirurgie Pédiatrique','Chirurgie maxillo-faciale et stomatologie','Anesthesiste','Pharmacie de Jour',
      'Pharmacie de Nuit','Pharmacie de Garde','Laboratoire Danalises Médicale','Prothesiste Dentaire','Anatomie et Cytologie Pathologiques',
      'Orthoptistes','Chirurgie réparartrice','Pédiatrie-Allergologie','Urologue','Vétérinaire','Electromyographie','Médecin Esthétique',
      'Electroencephalogramme - Troubles du sommeil']
    }



  }])
