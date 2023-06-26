<template>
  <div class="container-fluid mt-3 active vues animate__animated " id="login">
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
          <div class="user d-flex align-items-center flex-wrap">
  <div v-for="(user, index) in savedUsers" :key="index" class="d-flex align-items-center">
    <button @click="login(user.identifiant)" class="btn btn-primary text-center mt-3 mx-1">
      <i class="fa-solid fa-bolt-lightning fa-beat-fade" style="color: #f7ca26;"></i> {{user.pseudo}}
    </button>
    <button @click="deleteUser(index)" class="btn-danger btn btn-default btn-xs mt-3 mx-1">
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>
</div>


        </div>
      </div>
      <p class="text-center">OU</p>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary btn-block text-center mb-5 login-with-apple-btn" title="Connexion" onclick="Connexion()">Connexion avec Apple</button>
        <button type="submit" class="btn btn-primary btn-block text-center mb-5 mx-3 login-with-google-btn" title="Connexion" onclick="Connexion()">Connexion avec Google</button>
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary btn-block text-center mb-5" title="Connexion">Connexion</button>
      </div>
      <p class="text-center mx-3">Pas encore inscrit ? <router-link to="/"> S'inscrire </router-link></p>
    </form>
    <ToggleButton />
  </div>
  
</template>

<script>

export default {
  data() {
    return {
      savedUsers: [],
    }
  },
  mounted() {
    this.getSavedUsers();
  },

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
    deleteUser(index) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4E3296',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Supprime l'utilisateur de la liste
        this.savedUsers.splice(index, 1);

        // Met à jour le localStorage
        localStorage.setItem('savedUsers', JSON.stringify(this.savedUsers));

        Swal.fire(
          'Supprimé!',
          'Votre compte a été supprimé.',
          'success'
        )
      }
    })
  },
    clearUsedIdentifiant() {
      localStorage.removeItem('identifiantUsed');
    },
    getSavedUsers() {
      const savedUsers = localStorage.getItem('savedUsers');
      if (savedUsers) {
        this.savedUsers = JSON.parse(savedUsers);
      }
    },
    connexion(event) {
      event.preventDefault();
      var identifiant = document.getElementById('identifiant').value;
      this.login(identifiant);
    },
  // ouverture de mon application
  login(identifiant) {
    var url = 'https://trankillprojets.fr/wal/wal.php?information&identifiant=' + encodeURIComponent(identifiant);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.etat.reponse === 1) {
          var pseudo = data.identite;
          if (!this.savedUsers.some(user => user.identifiant === identifiant)) {
            this.savedUsers.push({identifiant: identifiant, pseudo: pseudo});
            localStorage.setItem('savedUsers', JSON.stringify(this.savedUsers));
          }

          Swal.fire({
            title: 'HUSH ⚡️ Fast Connect',
            text: "Voulez-vous vous connecter en tant que " + pseudo + " ?",
            imageAlt: 'HUSH ⚡️ Connect',
            showCancelButton: true,
            confirmButtonColor: '#4E3296',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, connectez-moi!',
            cancelButtonText : 'Non'
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.setItem('identifiantUsed', identifiant);
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

              setTimeout(() => {
                Swal.fire(
                  'Bienvenue',
                  'Bienvenue ' + pseudo + ' !',
                  'success'
                )
              }, 1600);
            }
          })

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Identifiant introuvable',
            text: "L'identifiant saisi est introuvable veuillez réessayer.",
            footer: '<a href="index.html">Inscription</a>'
          })
        }
      })
      .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur s\'est produite lors de la connexion.');
      });
  },
  }
}




</script>

<style scoped>
/* Vos styles CSS ici */

</style>
