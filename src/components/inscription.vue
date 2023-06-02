
<template>
<div class="container mt-3 inactive vues animate__animated " id="inscription">
    <form>
      <h2 class="text-center">Inscription</h2>  
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <img src="../assets/hush.png" class="mx-auto d-block mb-5" alt="Responsive image" height="auto" width="200px">
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="form-floating mt-2 mb-5 col-sm-12 col-md-12 col-lg-10 col-xl-6 col-xxl-6">
          <input type="text" class="form-control" id="pseudo" placeholder="Entrez votre nom d'utilisateur" required>
          <label for="pseudo"><i class="fas fa-user"></i>   Pseudo</label>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="form-floating mb-2 col-sm-12 col-md-12 col-lg-10 col-xl-6 col-xxl-6">
          <input type="email" class="form-control" id="email" placeholder="Entrez votre adresse mail" required>
          <label for="email"><i class="fas fa-at"></i>  Mail</label>
        </div>
      </div>
      <p class="text-center">OU</p>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary btn-block text-center mb-5 login-with-apple-btn" title="Connexion" onclick="Connexion()">S'inscrire avec Apple</button>
        <button type="submit" class="btn btn-primary btn-block text-center mb-5 mx-3 login-with-google-btn" title="Connexion" onclick="Connexion()">S'inscrire avec Google</button>
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary btn-block text-center mb-5" title="Inscription" >Inscription</button>
      </div>
      <p class="text-center">Déjà inscrit <router-link to="/login"> Connexion </router-link></p>
    </form>
  </div>
  <ToggleButton />
</template>

<script>

</script>

<style scoped lang="scss">
</style>


