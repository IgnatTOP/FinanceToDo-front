<template>
  <ion-page>
    <ion-header collapse="fade" class="ion-no-border bg-gray-100">
      <ion-toolbar class="w-[90%] mx-auto flex justify-center items-center">
        <ion-buttons slot="start">
          <router-link to="/register">
            <ion-back-button default-href="#" text=""></ion-back-button>
          </router-link>
        </ion-buttons>
        <ion-title class="text-violet-500">4 шаг</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="flex flex-col">
        <div class="flex justify-center flex-col items-center mt-[2rem]">
          <img src="../img/money_size.png" class="img_logo-start" alt="Лого" />
          <br />
          <h2 class="text-2xl text-center">Настройте Ваш баланс наличных</h2>
          <br />
          <p class="text-center text-gray-400 w-[80%]">
            Сколько денег у вас сейчас в кошельке?
          </p>

          <div
            class="flex flex-col items-center justify-center bg-white w-[90%] py-10 mx-auto rounded-2xl mt-10"
          >
            <ion-label>Введите изначальную сумму</ion-label>
            <ion-item class="w-[90%] rounded">
              <ion-input
                class="text-center"
                v-model="initialAmount"
                type="number"
                placeholder="Введите сумму"
              ></ion-input>
            </ion-item>

            <br />
            <div class="w-[90%]">
              <div class="w-full flex justify-center items-center">
                <a
                  @click="addNewRecord"
                  class="bg-blue-500 rounded-3xl w-full h-[50px] flex justify-center items-center text-white shadow-2xl shadow-blue-500/50 hover:bg-blue-600"
                  >Продолжить</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonBackButton,
  IonItem,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { ChevronBack } from "@vicons/ionicons5";
import { mapGetters } from "vuex";

export default {
  name: "RegisterComponentStep4",
  components: {
    IonBackButton,
    IonTitle,
    IonContent,
    IonToolbar,
    IonPage,
    IonHeader,
    ChevronBack,
    IonInput,
    IonItem,
    IonSelect,
    IonSelectOption,
  },
  data() {
    return {
      initialAmount: null,
    };
  },
  computed: {
    ...mapGetters({
      SelectedCurrency: "getSelectedCurrency",
    }),
  },
  methods: {
    addNewRecord() {
      if (!this.initialAmount) {
        this.initialAmount = 0;
      }
      const newRecord = {
        title: "Наличные",
        value: this.initialAmount,
        currency: this.SelectedCurrency,
        type: "NAL",
      };
      this.$store.dispatch("addRecord", newRecord);
      this.$router.push("/tabs/tab1");
    },
  },
};
</script>

<style scoped>
.img_logo-start {
  width: 200px;
}
.inputnumber {
  padding-left: 90px !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.ios ion-toolbar {
  width: 80%;
}
</style>
