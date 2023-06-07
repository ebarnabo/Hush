<template>
  <div class="container mt-3 active vues animate__animated " id="login">
    <form @submit="connexion">
      <h2 class="text-center">Connexion</h2>  
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <img src="../assets/hush.png" class="mx-auto d-block mb-5 img-fluid" alt="Responsive image" height="auto" width="200px">        
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="form-floating mt-2 mb-5 col-sm-12 col-md-12 col-lg-10 col-xl-6 col-xxl-6">
          <input type="text" class="form-control" id="identifiant" placeholder="Entrez votre nom d'utilisateur" required>
          <label for="identifiant"><i class="fas fa-user"></i>   Identifiant</label>
        </div>
      </div>
      <p class="text-center">OU</p>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary btn-block text-center mb-5 login-with-apple-btn" title="Connexion" onclick="Connexion()">S'inscrire avec Apple</button>
        <button type="submit" class="btn btn-primary btn-block text-center mb-5 mx-3 login-with-google-btn" title="Connexion" onclick="Connexion()">S'inscrire avec Google</button>
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary btn-block text-center mb-5" title="Connexion">Connexion</button>
      </div>
      <p class="text-center mx-3">Pas encore inscrit ? <router-link to="/"> S'inscrire </router-link></p>
    </form>
  </div>
  <ToggleButton />
</template>

<script>
export default {
  methods: {
    connexion(event) {
      event.preventDefault();

      // Récupérer la valeur de l'identifiant dans le formulaire
      var identifiant = document.getElementById('identifiant').value;

      // URL pour obtenir les paramètres avec l'identifiant
      var url = 'https://trankillprojets.fr/wal/wal.php?information&identifiant=' + encodeURIComponent(identifiant);

      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Vérifier la réponse de l'API
          if (data.etat.reponse === 1) {
            // Afficher le message de succès
            const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          this.$router.push('/chat');
          Toast.fire({
            icon: 'success',
            title: 'Connexion réussie !'
          })
          } else {
            // Afficher le message d'erreur
            alert('Erreur: ' + data.etat.message);
            Swal.fire({
            icon: 'error',
            title: 'Identifiant introuvable',
            text: "L'identifiant saisit est introuvable veuillez réessayer.",
            footer: '<a href="index.html">Inscription</a>'
          })
          }
        })
        .catch(error => {
          console.error('Erreur:', error);
          // Afficher le message d'erreur
          alert('Une erreur s\'est produite lors de la connexion.');
        });
    }
  }
}


</script>

<style scoped>
/* Vos styles CSS ici */
</style>
