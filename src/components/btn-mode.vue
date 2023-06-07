<template>
  <div class="container-fluid mt-4">
    <!-- bouton mode sombre-clair -->
    <div class="row align-center">
      <div class="col text-center">
        <button id="btn-mode" class="btn btn-secondary" @click="toggleMode">
          <i id="iconmode" :class="mode === 'dark' ? 'fa fa-solid fa-moon' : 'fa fa-solid fa-sun'"></i>
        </button>
      </div>
    </div>
    <!-- bouton mode sombre-clair -->  
  </div>
</template>

<script>

</script>

<style>

</style>
