<template>
  <ion-page>
    <ion-header collapse="fade" class="ion-no-border bg-gray-100">
      <ion-toolbar class="w-[90%] mx-auto flex justify-center items-center">
        <ion-buttons slot="start">
          <router-link to="/register">
            <ion-back-button default-href="#" text=""></ion-back-button>
          </router-link>
        </ion-buttons>
        <ion-title class="text-violet-500">3 шаг</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="flex flex-col">
        <div class="flex justify-center flex-col items-center mt-[2rem]">
          <img src="../img/moneyicon2.png" class="img_logo-start" alt="Лого">
          <br>
          <h2 class="text-2xl text-center">Выберите основную валюту</h2>
          <br>
          <p class="text-center text-gray-400 w-[80%]">Начнем с выбора основной валюты. Все транзакции в других валютах будут рассчитаны с учетом основной.</p>

          <div class="flex flex-col items-center justify-center bg-white w-[90%] py-10 mx-auto rounded-2xl mt-10">
            <ion-item class="w-[90%] rounded">
              <ion-label>Выберите валюту</ion-label>
              <ion-select v-model="selectedCurrency" cancelText="Отмена" okText="Выбрать">
                <ion-select-option value="RUB">RUB - Российский рубль</ion-select-option>
                <ion-select-option value="USD">USD - Доллар</ion-select-option>
              </ion-select>
            </ion-item>
            <br>
            <div class="w-[90%]">
              <div class="w-full flex justify-center items-center">
                <a @click="addNewSelectedCurrency" class="bg-blue-500 rounded-3xl w-full h-[50px] flex justify-center items-center text-white shadow-2xl shadow-blue-500/50 hover:bg-blue-600"
                >Продолжить</a>
              </div>
            </div>
          </div>


        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonBackButton, IonItem, IonSelect, IonSelectOption } from "@ionic/vue";
import { ChevronBack } from "@vicons/ionicons5";

export default {
  name: 'RegisterComponentStep3',
  components: {
    IonBackButton, IonTitle, IonContent, IonToolbar, IonPage, IonHeader, ChevronBack, IonInput, IonItem, IonSelect, IonSelectOption
  },
  data() {
    return {
      selectedCurrency: 'RUB'
    };
  },
  methods: {
    addNewSelectedCurrency() {
      this.$store.dispatch('addSelectedCurrency', this.selectedCurrency);
      this.$router.push('/register/step/4');
      console.log('selectedCurrency added to Vuex store');
    },
  },
}
</script>

<style scoped>
.img_logo-start {
  width: 200px;
}
.inputnumber {
  padding-left: 90px!important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.ios ion-toolbar{
  width: 80%;
}
</style>
