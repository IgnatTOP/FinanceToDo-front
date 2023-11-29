<template>
  <ion-page>

    <ion-content :fullscreen="true">
      <div class="flex justify-around flex-col h-[100%] bg-gray-100">
        <div class="flex justify-center flex-col items-center">
        <img src="../img/RetoucherOnlineNov18.png" class="img_logo-start" alt="Лого">
          <br>
          <h2 class="text-2xl">Давайте начнем</h2>
          <br>
          <p class="text-center text-gray-400 w-[80%]">Никогда не было лучшего времени, чем сейчас, чтобы задуматься о том, как легко управлять всеми своими финансами.</p>
        </div>
        <div class="flex flex-col items-center justify-center">
            <a class="bg-blue-500 rounded-3xl w-[80%] h-[50px] flex justify-center items-center text-white shadow-2xl shadow-blue-500/50">Создать аккаунт</a>
          <br>
            <a class="text-blue-500 ">Войти</a>
        </div>
      </div>

    </ion-content>
  </ion-page>
</template>
<script>
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";

export default {
    name: 'RegisterComponent',
  components: {IonTitle, ExploreContainer, IonContent, IonToolbar, IonPage, IonHeader},

  }
</script>
<style scoped>
.img_logo-start{
  width: 300px;
}
</style>