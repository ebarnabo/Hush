const themeMode = {
  data() {
    return {
      mode: '', // Mode de départ vide 
    };
  },
  mounted() {
    this.detectTheme();
  },
  methods: {
    detectTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.mode = savedTheme; // Thème sauvegardé dans le stockage local
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
        document.documentElement.classList.add('sweetalert-dark-theme');
        document.body.classList.add('dark-mode');
      } else {
        // styles du mode clair
        document.documentElement.classList.remove('sweetalert-dark-theme'); 
        document.body.classList.remove('dark-mode');
      }
    }
  }
};

export { themeMode };
