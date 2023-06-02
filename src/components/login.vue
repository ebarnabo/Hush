<script></script>

<template>
      <div class="container mt-3 active vues animate__animated " id="login">
  <form>
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
          <input type="text" class="form-control" id="pseudo" placeholder="Entrez votre nom d'utilisateur" required>
          <label for="pseudo"><i class="fas fa-user"></i>   Pseudo</label>
        </div>
      </div>
    <p class="text-center">OU</p>
    <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary btn-block text-center mb-5 login-with-apple-btn" title="Connexion" onclick="Connexion()">S'inscrire avec Apple</button>
        <button type="submit" class="btn btn-primary btn-block text-center mb-5 mx-3 login-with-google-btn" title="Connexion" onclick="Connexion()">S'inscrire avec Google</button>
      </div>
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-primary btn-block text-center mb-5" title="Connexion" >Connexion</button>
    </div>
    <p class="text-center mx-3">Pas encore inscrit ? <router-link to="/"> S'inscrire </router-link></p>
  </form>
</div>
<ToggleButton />
</template>

<style scoped>

</style>