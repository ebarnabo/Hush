<template>
    <div class="container-fluid mt-4">
      <!-- bouton mode sombe-clair -->
      <div class="row align-center">
        <div class="col text-center">
          <button id="btn-mode" class="btn btn-secondary" @click="toggleMode">
            <i id="iconmode" :class="mode === 'dark' ? 'fa fa-solid fa-moon' : 'fa fa-solid fa-sun'"></i>
          </button>
        </div>
      </div>
      <!-- bouton mode sombe-clair -->  
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        mode: '', // Mode de départ, vide pour correspondre au système de l'utilisateur
      };
    },
    mounted() {
      this.detectTheme();
    },
    methods: {
      detectTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          this.mode = savedTheme; // thème sauvegardé dans le stockage local
        } else {
          // Pas de thème sauvegardé, recherche le thème du système
          if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.mode = 'dark'; // Mode sombre préféré par le système
          } else {
            this.mode = 'light'; // Mode clair préféré par le système
          }
        }
        this.updateMode();
      },
      toggleMode() {
        this.mode = this.mode === 'light' ? 'dark' : 'light'; // Switch entre les modes sombre et clair
        this.updateMode();
        localStorage.setItem('theme', this.mode); // Sauvegarde le thème dans le stockage local
      },
      updateMode() {
        if (this.mode === 'dark') {
          // styles du mode sombre
          document.body.classList.add('dark-mode');
        } else {
          // styles du mode clair(dans le fichier scss)
          document.body.classList.remove('dark-mode');
        }
      }
    }
  }
  </script>
  
  <style>
  .dark-mode {
    /* Style mode sombre */
    background-color: #222222 !important;
    color: white;
  }
  .dark-mode h1,.dark-mode h2, .dark-mode h3 {
  color: white !important;
}
  
.dark-mode p {
  color: white !important;
}
  
  .dark-mode .form-control {
    /* Style mode sombre .form-control */
    background-color: #333333;
    color: white;
    border-color: #777777;
  }
  
  </style>
  