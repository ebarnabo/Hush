<template>
  <div class="chat-container">
    <!-- Si on clique sur une conversation on affiche cette div -->
    <div v-if="selectedConversation">
      <div class="chat-header">
        <button class="back-button" @click="goBack"><i class="fa-solid fa-angle-left"></i></button>
        <h2 class="user-name"><span class="i-circle">U</span>  {{ selectedConversation.user }}</h2>
        <button class="action-button" @click="deleteRelation()"><i class="fa-solid fa-trash circle-icon" style="color: white;"></i></button>
      </div>
      <div class="chat-body" ref="chatBody">
        <div v-for="(message, index) in selectedConversation.messages" :key="index">
          <div class="message-bubble" :class="{'sender-message': message.sender !== 'Utilisateur 1', 'receiver-message': message.sender === 'Utilisateur 1'}">
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
        <button class="send-button" @click="sendMessage"><i class="fa-solid fa-arrow-up" ></i></button>
      </div>
    </div>

    <!-- Autrement on affiche ça -->
    <div v-else>
      <div class="conversation-header">
      <img src="../assets/hush.png" alt="Image" class="header-image" id="header-list-img">
      </div>
      <ul class="conversation-list scrollable-list">
        <li v-for="(conversation, index) in conversations" :key="index" @click="selectConversation(conversation)">
          <h4><span class="i-circle">U</span> {{ conversation.user }}</h4>
          <p class="msg-preview">{{ previewMessage(conversation) }}</p>
          <span class="timestamp">{{ formatTimestamp(conversation) }}</span> <i class="fa-solid fa-angle-right"></i>
        </li>
      </ul>
      <div class="conversation-footer">
        <button @click="addRelation"><i class="fa-solid fa-user-plus" style="color: #ffffff;"></i></button>
        <button @click="settings()" ><i class="fa-solid fa-gear" style="color: #ffffff;"></i></button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      conversations: [
        { user: "Utilisateur 1", messages: [],},
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        { user: "Utilisateur 2", messages: [] },
        
        // Ajoutez plus de conversations ici si nécessaire
      ],
      selectedConversation: null,
      message: "",
    };
  },
  methods: { 
    // Fonction pour ouvrir une conversation
    selectConversation(conversation) {
      this.selectedConversation = conversation;
    },
    // retour à la liste des convs
    goBack() {
      this.selectedConversation = null;
    },
    sendMessage() {
  if (this.message.trim() !== "") {
    this.selectedConversation.messages.push({
      content: this.message.trim(),
      sender: 'Utilisateur 1',
      timestamp: new Date().toISOString(), // Ceci est la nouvelle ligne
    });
    this.message = "";

    this.$nextTick(() => {
      this.scrollToBottom();
    });
  }
  this.scrollToBottom();
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
    
    async addRelation(){
      const { value: formValues } = Swal.fire({
  title: 'Ajouter une nouvelle relation',
  html:
    '<input type="text" id="swal-input1" class="swal2-input" placeholder="identifiant">' +
    
    '<input type="mail" id="swal-input2" class="swal2-input" placeholder="email" required>',
  
  focusConfirm: false,
  preConfirm: () => {
    return [
      document.getElementById('swal-input1').value,
      document.getElementById('swal-input2').value
    ]
  }
})

if (formValues) {
  Swal.fire(JSON.stringify(formValues))
}
    },
    deleteRelation(){
      Swal.fire({
      title: 'Valider la suppression de la relation?',
      text: "Vous ne pourrez plus contacté cette personne",
      icon: 'delete',
      showCancelButton: true,
      confirmButtonColor: '#4E3296',
      cancelButtonColor: '#d33',
      textColor: '#4E3296',
      confirmButtonText: 'Oui !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Suppression!',
          'Votre relation avec est supprimée',
          'success'
        )
        // Retour à la liste de conversation
        this.goBack()
      }
    })
    },
    settings(){
      Swal.fire({
  title: '<strong>Options</u></strong>',
  html:
      '<h5>Choix du thème du système</h5>'+
      '<input type="radio" id="lighttheme" name="contact" value="Clair " />'+
      '<label id="lightthemes" for="lighttheme"> Clair </label>'+

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
    previewMessage(conversation) {
    if (conversation.messages.length > 0) {
      let lastMessage = conversation.messages[conversation.messages.length - 1];
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

  },
};
</script>

<!-- Style du chat  -->
<style scoped lang="scss">
@import '../assets/style.scss';

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
  max-height: 80vh; /* Ajoutez ici la hauteur maximale souhaitée */
}
.fa-solid {
  color: white;
  border-radius: 7px;
}

.chat-container {
  width: 100%;
  height: 100vh;
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

.chat-body {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  height: 80vh;
  scroll-behavior: smooth;
}
.msg-preview{
  font-size: 0.8em;
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
  align-self: flex-start;
}

.receiver-message {
  background-color: #3B3B3D;
  border: $bgDark;
  color: #fff;
  align-self: flex-end;
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
  height: 10vh;
  background-color: $accentColor;
}
.conversation-header {
  display: flex;
  justify-content: center;
  height: 10vh;
  background-color: #333333;
}
.conversation-footer button {
  margin: 0 5px;
  color: white;
  border: none;
  background: none;
  font-size: 1.8em;
  margin-right: 15%;
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
