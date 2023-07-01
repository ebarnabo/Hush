# Hush
The "Hush" messaging app project was developed for a Human-Computer Interaction (HCI) course as part of the MIAGE Master's program. This project used a combination of technologies, including the https://trankillprojets.fr/wal/ API, Vue.js for user interface development, Scss for enhanced CSS styling, ViteJs as a lightweight and speedy development tool, Bootstrap as the user interface framework, and Figma for prototype design.

Fonctionnement : 
Le projet utilise une page unique index.html Vue 

L'identifiant saisie avec le formulaire de connexion est sauvegardé (en local storage) et utilisé partout dans l'application. 
Cette identifiant est supprimé à la fermeture de l'application.

J'ai utilisé Vite.js pour voir les changements faits sur mon code sans avoir à raffraichir de pages

Je pourrais utiliser Electron Js pour sortir une application pour Mac ou Windows ou Android (j'ai vérifie cela fonctionne bien) mais ma connexion internet m'empêche de push des projets trop lourds sur GIT

Je voulais ajouter une fonction d'ajout rapide de relation via QR code qui stockerais l'addresse mail lié à l'identifiant et en retour on scannerais le QR pour un ajout rapide. Par manque de temps je ne l'ai pas encore implémenté.