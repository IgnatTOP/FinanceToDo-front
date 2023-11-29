<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Профиль</ion-title>
        </ion-toolbar>
      </ion-header>
      <br>
      <div class="w-[80%] mx-auto flex justify-center items-center">
        <a @click="logout"
           class="bg-blue-500 rounded-3xl w-full h-[50px] flex justify-center items-center text-white shadow-2xl shadow-blue-500/50 hover:bg-blue-600"
        >Выйти</a>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonModal, IonInput, IonBackButton, IonItem, IonSelect, IonSelectOption } from "@ionic/vue";
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Tab3Page',
  components: {
    IonBackButton, IonTitle, IonContent, IonToolbar, IonPage, IonModal, IonHeader, IonInput, IonItem, IonSelect, IonSelectOption
  },

  data() {
    return {

    };
  },

  methods: {
    logout(){
      localStorage.clear();
      this.$store.dispatch('resetStore');
      window.location.reload();
    }
  },

}
</script>