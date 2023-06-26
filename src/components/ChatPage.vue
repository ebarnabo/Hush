<template>
  <div class="chat-container">
    <!-- Si on clique sur une conversation on affiche cette div -->
    <div v-if="selectedConversation">
      <div class="chat-header">
        <button class="back-button" @click="goBack"><i class="fa-solid fa-angle-left"></i></button>
        <h2 class="user-name"><span class="i-circle" id="userLetter">{{ firstLetterOfUser }}</span>  {{ selectedConversation.user }}</h2>
        <button class="action-button" @click="deleteRelation"><i class="fa-solid fa-trash circle-icon" style="color: white;"></i></button>
      </div>
      <div class="chat-body" ref="chatBody">
        <div v-for="(message, index) in selectedConversation.messages" :key="index">
          <div class="message-bubble" :class="{'sender-message': message.sender === 'Utilisateur 1', 'receiver-message': message.sender !== 'Utilisateur 1', 'from-user': message.sender === 'Utilisateur 1'}">
            {{ message.content }}
          </div>
        </div>
      </div>
      
      <div class="emoji-picker">
        <button class="emoji-button" @click="addEmoji('😃')">😃</button>
        <button class="emoji-button" @click="addEmoji('😍')">😍</button>
        <button class="emoji-button" @click="addEmoji('🔥')">🔥</button>
      </div>

      <div class="chat-footer">
        <input type="text" v-model="message" @keydown.enter="sendMessage" placeholder="Message..." />
        <button class="send-button" @click="sendMessage"><i class="fa-solid fa-arrow-up"></i></button>
      </div>
    </div>

    <!-- Autrement on affiche la liste des conversations lié au compte -->
    <div v-else>
      <div class="conversation-header">
        
      <img src="../assets/icon.png" alt="Image" class="header-image mx-auto d-block" id="header-list-img" >
      </div>
      <ul class="conversation-list scrollable-list">
  <li v-for="(conversation, index) in conversations" :key="index" @click="selectConversation(conversation)">
    <h4><span class="i-circle">{{ conversation.user.charAt(0).toUpperCase() }}</span> {{ conversation.user }}</h4>
    <p class="msg-preview">
      <i v-if="conversation.isNewMessage" id="notif" class="fa-solid fa-circle" style="color: #0061ff;"></i>
      {{ previewMessage(conversation) }}
    </p>
    <span class="timestamp">{{ formatTimestamp(conversation) }}</span> <i class="fa-solid fa-angle-right"></i>
  </li>
</ul>


      <div class="conversation-footer d-flex justify-content-center">
  <button @click="addRelation"><i class="fa-solid fa-user-plus" style="color: #ffffff;"></i></button>
  <button @click="settings()" ><i class="fa-solid fa-gear" style="color: #ffffff;"></i></button>
  <!-- <button @click="checkNewMessages()" ><i class="fa-solid fa-arrows-rotate fa-spin" style="color: #ffffff;"></i></button> -->
  <button @click="logOut()" ><i class="fa-solid fa-right-from-bracket" style="color: #ffffff;"></i></button>
</div>

    </div>
  </div>
</template>

<script lang="js">
export default {
  mounted() {
    this.checkAccess();
    this.updateConversationList();
    
  },
    // ouverture de mon application
    created() {
    window.addEventListener('beforeunload', this.clearUsedIdentifiant);
    window.addEventListener('DOMContentLoaded', this.clearUsedIdentifiant);
    this.checkNewMessages();
  },
  // fermeture de mon application
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.clearUsedIdentifiant);
    window.removeEventListener('DOMContentLoaded', this.clearUsedIdentifiant);
  },
  
  data() {
    return {
      // identifiant utilisé pour la session
      identifiant: localStorage.getItem('identifiantUsed'),

      // Relations de l'utilisateur
      relations: [], 

      qrCodeText: 'Votre texte ici',

      // Conversations de l'utilisateur
      conversations: [], 

      selectedConversation: null,
      message: "",
      showNotif: false,
      selectedConversationIndex: null,



    }; 
  },
  created() {
    this.getRelations();
  },

  computed: {
    firstLetterOfUser() {
      if (this.selectedConversation && this.selectedConversation.user) {
        return this.selectedConversation.user.charAt(0).toUpperCase();
        }
        return '';
      }
    },

  methods: { 
    // retour à la liste des convs
    goBack() {
      this.selectedConversation = null;
    },

    sendMessage() {
  if (this.message.trim() !== "") {
    const identifiant = localStorage.getItem('identifiantUsed');
    const identifiantRelation = this.selectedConversation.relation;
    const message = this.message.trim();

    const url = `https://trankillprojets.fr/wal/wal.php?ecrire&identifiant=${encodeURIComponent(identifiant)}&relation=${encodeURIComponent(identifiantRelation)}&message=${encodeURIComponent(message)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.etat.reponse === 1) {
          // Le message a été envoyé avec succès
          const newMessage = {
            content: message,
            sender: 'Utilisateur 1',
            timestamp: new Date().toISOString()
          };
          this.selectedConversation.messages.push(newMessage);
        } else {
          // Une erreur s'est produite lors de l'envoi du message
          console.error('Erreur lors de l\'envoi du message:', data.etat.message);
        }
      })
      .catch(error => {
        // Une erreur s'est produite lors de la requête
        console.error('Erreur lors de l\'envoi du message:', error);
      });

    this.message = "";

    this.$nextTick(() => {
      this.scrollToBottom();
    });
  }
},


    //Ajouter un emoji
    addEmoji(emoji) {
      this.message += emoji;
    },

    // Fonction pour descendre dans la zone de chat, quand un message écrit
    scrollToBottom() {
      const chatBody = this.$refs.chatBody;
      chatBody.scrollTop = chatBody.scrollHeight;
    },

    settings(){
      
      Swal.fire({
  title: '<strong>Options</u></strong>',
  html:
      '<h5>Choix du thème du système</h5>'+
      '<input type="radio" id="lighttheme" name="contact" value="Clair " />'+
      '<label id="lightthemes" for="lighttheme"> Clair </label>'+
      '<canvas id="qrcode"></canvas>'+
      //'<button @click="generateQRCode">Générer le code QR</button>'+
      
      '<input type="radio" @click="toggleMode id="darktheme" name="contact" value="Thème sombre " />'+
      '<label id="darkthemes"for="darktheme"> Sombre </label>',
  //showCloseButton: true,
  showCancelButton: true,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Confirmer',
  confirmButtonAriaLabel: 'Confirmer',
  cancelButtonText:
    '<i class="fa fa-thumbs-down"></i>Annuler',
  cancelButtonAriaLabel: 'Annuler'
})
    },

    logOut() {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      confirmButtonColor:'#FF2905',
      cancelButtonText: 'Non'

    }).then((result) => {

      if (result.isConfirmed) {

        // Suppression de l'id du localStorage
        localStorage.removeItem('identifiantUsed');

        // Rediriger vers la page de login
        this.$router.push('/login');
      }
    });
  },

  // Affiche une preview du message reçu
  previewMessage(conversation) {
  if (conversation.messages.length > 0) {
    let lastMessage = conversation.messages[conversation.messages.length - 1];
    if (lastMessage.new) {

      //Mise à jour de la notif
      this.showNotif = true; // 
    }
    return lastMessage.content.length > 50 ? 
      lastMessage.content.substring(0, 48) + '...' : 
      lastMessage.content;
  }
  return "";
},



    formatTimestamp(conversation) {
    if (conversation.messages.length > 0) {
      let lastMessage = conversation.messages[conversation.messages.length - 1];
      let timestamp = new Date(lastMessage.timestamp);
      let now = new Date();
      let diff = now - timestamp;

      // Si le message date de moins de 24 heures, affiche l'heure
      if (diff < 24 * 60 * 60 * 1000) {
        let hours = timestamp.getHours();
        let minutes = timestamp.getMinutes();

        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes}`;
      }
      // Sinon, affichez la date
      else {
        return timestamp.toLocaleDateString();
      }
  }
  return "";
    },

    // Force la connexion pour accéder au chat
    checkAccess() {
      var identifiantUsed = localStorage.getItem('identifiantUsed');

      if (!identifiantUsed) {
        Swal.fire(
          'Accès interdit',
          'Vous ne pouvez pas accéder à cette page sans être connecté.',
          'error'
        )
        // Redirige l'utilisateur non connecté vers la page l'accueil
        this.$router.push('/'); 
      }
    },

    
    getRelations() {
      var url = 'https://trankillprojets.fr/wal/wal.php?relation&identifiant=' + encodeURIComponent(this.identifiant);
      
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.etat.reponse === 1) {
            this.relations = data.relation;
            this.getConversations();
          } else {
            // Gestion d'erreur
          }
          this.checkNewMessages();
        });
    },
    
    // Fonction pour ouvrir une conversation dans la liste de conversation
    getConversations() {
  let identifiant = localStorage.getItem('identifiantUsed');
  let url = 'https://trankillprojets.fr/wal/wal.php?messages&identifiant=' + encodeURIComponent(identifiant);
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.etat.reponse === 1) {
        this.conversations = this.relations.map(relation => {
          let relationMessages = data.messages.filter(message => message.pseudo === relation.pseudo);
          return {
            user: relation.pseudo,
            messages: relationMessages.map(message => {
              return {
                sender: message.envoi === identifiant ? 'Utilisateur 1' : 'Utilisateur 2',
                content: message.message
              };
            })
          };
        });
      } else {
        // Gestion d'erreur
      }
    });
},

selectConversation(conversation) {
  this.selectedConversation = conversation;
  conversation.isNewMessage = false; // Réinitialiser la valeur d'isNewMessage pour la conversation sélectionnée
},




    // ajout d'une relation avec l'API
    async addRelation() {
      const { value: formValues } = await Swal.fire({
        title: 'Ajouter une nouvelle relation',
        html:
          '<input type="email" id="swal-input1" class="swal2-input" placeholder="email" required>',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value
          ]
        }
      });
  if (formValues) {
    let identifiant = localStorage.getItem('identifiantUsed');
    let url = `https://trankillprojets.fr/wal/wal.php?lier&identifiant=${encodeURIComponent(identifiant)}&mail=${encodeURIComponent(formValues[0])}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Add relation response:', data);
        if (data.etat.reponse === 1) {
          // Mise à jour de la liste des conversations après l'ajout de la relation
          this.updateConversationList();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Une erreur est survenue lors de l\'ajout de la relation'
          });
        }
      })
      .catch(error => {
        console.error('Erreur:', error);
        Swal.fire({
          icon: 'error',
          title: 'Une erreur est survenue lors de l\'ajout de la relation'
        });
      });
  }
},


getRelationId() {
  if (this.selectedConversation) {
    const conversation = this.conversations.find(
      conv => conv.user === this.selectedConversation.user
    );
    if (conversation) {
      return conversation.relation;
    }
  }
  return null;
},

deleteRelation() {
  const relationId = this.getRelationId();
  if (relationId) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer cette relation ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then(result => {
      if (result.isConfirmed) {
        const identifiant = this.identifiant;
        const url = `https://trankillprojets.fr/wal/wal.php?delier&identifiant=${encodeURIComponent(identifiant)}&relation=${encodeURIComponent(relationId)}`;

        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data.etat.reponse === 1) {
              // Suppression réussie
              Swal.fire({
                title: 'Succès',
                text: 'La relation a été supprimée avec succès.',
                icon: 'success',
              }).then(() => {
                // Mettez à jour la liste des conversations après la suppression de la relation
                this.updateConversationList();
                // Revenir à la liste des discussions
                this.selectedConversation = null;
              });
            } else {
              console.error('Erreur lors de la suppression de la relation:', data.etat.message);
              Swal.fire({
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la suppression de la relation.',
                icon: 'error',
              });
            }
          })
          .catch(error => {
            console.error('Erreur lors de la suppression de la relation:', error);
            Swal.fire({
              title: 'Erreur',
              text: 'Une erreur est survenue lors de la suppression de la relation.',
              icon: 'error',
            });
          });
      }
    });
  } else {
    Swal.fire('Aucune relation sélectionnée');
  }
},


checkNewMessages() {
  setInterval(() => {
    const identifiant = localStorage.getItem('identifiantUsed');
    const url = `https://trankillprojets.fr/wal/wal.php?relations&identifiant=${encodeURIComponent(identifiant)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.etat.reponse === 1) {
          const relations = data.relations;

          relations.forEach(relation => {
            const identifiantRelation = relation.relation;
            const url = `https://trankillprojets.fr/wal/wal.php?lire&identifiant=${encodeURIComponent(identifiant)}&relation=${encodeURIComponent(identifiantRelation)}`;
            fetch(url)
              .then(response => response.json())
              .then(data => {
                if (data.etat.reponse === 1 && data.messages.length > 0) {
                  const messages = data.messages;

                  messages.forEach(message => {
                    const conversationIndex = this.conversations.findIndex(conversation => conversation.relation === identifiantRelation);

                    if (conversationIndex !== -1) {
                      const conversation = this.conversations[conversationIndex];
                      const isNewMessage = !conversation.messages.find(msg => msg.content === message.message);
                      
                      if (isNewMessage) {
                        conversation.messages.push({
                          content: message.message,
                          sender: 'Utilisateur 2',
                          timestamp: new Date().toISOString()
                        });
                        conversation.isNewMessage = true;
                      }
                    }
                  });
                }
              })
              .catch(error => {
                console.error('Erreur lors de la récupération des messages:', error);
              });
          });
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des relations:', error);
      });
  }, 1000);
},






// Mise à jour de la liste des conversation de l'utilisatreur
async updateConversationList() {
  let identifiant = localStorage.getItem('identifiantUsed');
  let url = `https://trankillprojets.fr/wal/wal.php?relations&identifiant=${encodeURIComponent(identifiant)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.etat.reponse === 1) {
        // Effacer les conversations existantes
        this.conversations = [];

        // Ajouter les nouvelles conversations dans la liste de conversations
        for (let i = 0; i < data.relations.length; i++) {
          let newConversation = { user: data.relations[i].identite, messages: [], relation: data.relations[i].relation };
          this.conversations.push(newConversation);
        }

        // Stocker les conversations dans le localStorage
        localStorage.setItem('kontak', JSON.stringify(this.conversations));
      } else {
        console.error('Erreur lors de la mise à jour de la liste des conversations:', data.etat.message);
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des relations:', error);
    });
},


getMessageClass(message) {
    return {
      'sender-message': message.sender !== 'Utilisateur 1',
      'receiver-message': message.sender === 'Utilisateur 1'
    };
  },

  },
  
};
</script>


<style scoped lang="scss">
@import '../assets/style.scss';

// Partie responsive

//Pour les appareils desktop (grandes résolutions) :
@media only screen and (min-width: 1200px) {
.scrollable-list {
  min-height: 80vh; 
}

.chat-container {
  height: 100vh;
}

.chat-body {
  height: 80vh;
}
.conversation-footer {
  height: 10vh;
}
.conversation-header {
  height: 10vh;
}

}

//Pour les tablettes (résolutions moyennes) :
@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .scrollable-list {
  min-height: 80vh; 
}

.chat-container {
  height: 100vh;
}

.chat-body {
  height: 80vh;
}
.conversation-footer {
  height: 10vh;
}
.conversation-header {
  height: 10vh;
}

}

//Pour les appareils mobiles (petites résolutions) :
@media only screen and (max-width: 767px) {
  .scrollable-list {
  min-height: 70vh; 
}

.chat-body {
  min-height: 70vh;
}
.conversation-footer {
  height: 10vh;
}
.conversation-header {
  height: 10vh;
}
.conversation-footer button {
  margin-left: 7%;
  margin-right: 7%;
}

}

// Style du chat  
input{
  border-radius: 7px;
  outline: none; 
  border: none;
}
.timestamp {
  margin-top: -50px;
  padding-right: 20px;
  float: right;
}
.from-user{
  align-self: flex-end;
}

.fa-angle-right{
  float: right;
  margin-top: -45px;
  margin-left: 55px;
}

#header-list-img{
  height: 50px;
  margin-top: 1%;
}


.conversation-list li{
  transition: opacity, 0.5s;
}
.conversation-list li:hover {
  opacity: 0.5;
  cursor: pointer;

}

.i-circle {
    display: inline-block;
    background-color: #9DA3AF;
    color: #fff;
    border-radius: 50%;
    font-size: 22px;
    line-height: 30px; /* set to same size as width, height */
    width: 30px;
    height: 30px;
    text-align: center;
}

.circle-icon {
    background: red;
    padding:12px;
    border-radius: 50%;
}

.scrollable-list {
  overflow-y: auto;
}
.fa-solid {
  color: white;
  border-radius: 7px;
}

.chat-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: $accentColor;
  color: #fff;
}

.back-button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  
}

.user-name {
  margin: 0;
}

.action-button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
}


.msg-preview{
  font-size: 1em;
  color: #333333 !important;
}

.message-bubble {
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  max-width: 70%;
  white-space: pre-wrap;
}

.sender-message {
  background-color: $accentColor;
  color: #fff;
  align-self: flex-end;
  margin-left: auto;
}

.chat-body {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.chat-body .message-bubble {
  align-self: flex-start;
}

.chat-body .sender-message {
  align-self: flex-end;
}


.receiver-message {
  background-color: #3B3B3D;
  border: $bgDark;
  color: #fff;
  align-self: flex-start;
}

.chat-footer {
  display: flex;
  align-items: center;
  padding: 10px;
}

.emoji-picker {
  margin-left: 2%;
  display: flex;
  align-items: center;
}

.emoji-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.chat-footer input {
  flex-grow: 1;
  padding: 5px;
}

.send-button {
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
  background: $accentColor;
  color: white ;
}

.conversation-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.conversation-list li {
  padding: 20px;
  border-bottom: 0.5px solid #ddd;
  cursor: pointer;
}
.conversation-footer {
  display: flex;
  justify-content: center;
  background-color: $accentColor;
}
.conversation-header {
  display: flex;
  justify-content: center;
  background-color: #333333;
}
.conversation-footer button {
  color: white;
  border: none;
  background: none;
  font-size: 1.8em;
  margin-left: 10%;
  margin-right: 10%;
}
button{
  transition: all 0.5s;
}
button:hover{
  background: none !important;
  scale: 1.5;
  color: $accentColor !important;
}
</style>
