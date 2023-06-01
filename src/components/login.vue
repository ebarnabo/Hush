<script></script>

<template>
      <div class="container mt-2 active vues animate__animated d-flex align-items-center justify-content-center" id="login">
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
      <div class="form-floating mt-2 mb-3 col-sm-12 col-md-12 col-lg-10 col-xl-6 col-xxl-6">
        <input type="text" class="form-control" id="identifiant" placeholder="Entrez votre pseudo" required data-msg-required="Veuillez saisir votre identifiant">
        <label for="identifiant"><i class="fas fa-user"></i>  Identifiant</label>
        <div class="invalid-feedback">Votre identifiant est requis</div>
      </div>
    </div>
    
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-primary btn-block text-center mb-5" title="Connexion" onclick="Connexion()">Connexion</button>
    </div>
    <p class="text-center">OU</p>
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-primary btn-block text-center mb-5 login-with-apple-btn" title="Connexion" onclick="window.location.href='Hush/src/App.vue'">Connexion avec Apple</button>
    </div>
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-primary btn-block text-center mb-5 mx-3 login-with-google-btn" title="Connexion" onclick="Connexion()">Connexion avec Google</button>
    </div>
    <p class="text-center mx-3">Pas encore inscrit ? <a class="links" href="#" onclick="openInscription()" title="Inscription">S'inscrire</a></p>
  </form>
</div>
</template>

<style scoped>

</style>