<template>
  <div class="container mt-3 inactive vues animate__animated " id="inscription">
    <form @submit="inscription">
      <h2 class="text-center">Inscription</h2>  
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <img src="../assets/hush.png" class="mx-auto d-block mb-5" alt="Responsive image" height="auto" width="200px">
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="form-floating mt-2 mb-5">
          <input type="text" class="form-control" id="pseudo" placeholder="Entrez votre nom d'utilisateur" required>
          <label for="pseudo"><i class="fas fa-user"></i>   Pseudo</label>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="form-floating mb-2">
          <input type="email" class="form-control" id="email" placeholder="Entrez votre adresse mail" required>
          <label for="email"><i class="fas fa-at"></i>  Mail</label>
        </div>
      </div>
      <p class="text-center">OU</p>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary btn-block text-center mb-5 login-with-apple-btn">S'inscrire avec Apple</button>
        <button type="submit" class="btn btn-primary btn-block text-center mb-5 mx-3 login-with-google-btn">S'inscrire avec Google</button>
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary btn-block text-center mb-5">Inscription</button>
      </div>
      <p class="text-center">Déjà inscrit <router-link to="/login"> Connexion </router-link></p>
    </form>
  </div>
  <ToggleButton />
</template>

<script>
export default {
    // ouverture de mon application
    created() {
    window.addEventListener('beforeunload', this.clearUsedIdentifiant);
    window.addEventListener('DOMContentLoaded', this.clearUsedIdentifiant);
  },
  // fermeture de mon application
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.clearUsedIdentifiant);
    window.removeEventListener('DOMContentLoaded', this.clearUsedIdentifiant);
  },
  methods: {
    inscription(event) {
      event.preventDefault();

      // Récupérer les valeurs des champs pseudo et email du formulaire
      var pseudo = document.getElementById('pseudo').value;
      var email = document.getElementById('email').value;

      // Vérifier si l'adresse email a déjà été utilisée
      var usedMailList = JSON.parse(localStorage.getItem('usedMailList')) || [];
      if (usedMailList.includes(email)) {
        // Afficher le message d'erreur
        Swal.fire(
          'Il y a une erreur',
          'Erreur: Cette adresse email est déjà utilisée. Veuillez en utiliser une autre.',
          'error'
        );
        return;
      }

      // Ajout adresse email à la liste des emails utilisés
      usedMailList.push(email);
      localStorage.setItem('usedMailList', JSON.stringify(usedMailList));

      // URL d'inscription avec les paramètres
      var url = 'https://trankillprojets.fr/wal/wal.php?inscription&identite=' + encodeURIComponent(pseudo) + '&mail=' + encodeURIComponent(email);

      // Effectuer la requête HTTP GET
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Vérifier la réponse de l'API
          if (data.etat.reponse === 1) {
            // Afficher le message de succès
            Swal.fire(
              'En attente de validation',
              'Merci de vous être inscrit à notre service de chat ! Pour activer votre compte, veuillez cliquer sur le lien dans vos mails',
              'info'
            )
          } else {
            // Afficher le message d'erreur
            Swal.fire(
              'Il y a une erreur',
              'Erreur: Vous êtes déjà inscrit sur HUSH. Un mail a été envoyé sur votre boite mail.',
              'error'
            )
          }
        })
        .catch(error => {
          console.error('Erreur:', error);
          console.log('Une erreur s\'est produite lors de l\'inscription.');
        });
    }
  }
}

</script>

<style scoped lang="scss">
/* Vos styles CSS ici */
</style>
