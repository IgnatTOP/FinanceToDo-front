<template>
  <ion-page>
    <ion-header collapse="fade" class="ion-no-border bg-gray-100">
      <ion-toolbar class="w-[90%] mx-auto flex justify-center items-center">
        <ion-buttons slot="start">
          <router-link to="/register">
            <ion-back-button default-href="#" text=""></ion-back-button>
          </router-link>
        </ion-buttons>
        <ion-title class="text-violet-500">1 шаг</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="flex flex-col">
        <div class="flex justify-center flex-col items-center mt-[2rem]">
          <img src="../img/phoneicon.png" class="img_logo-start" alt="Лого" />
          <br />
          <h2 class="text-2xl text-center">Регистрация</h2>
          <br />
          <p class="text-center text-gray-400 w-[80%]">
            Введите ваш номер мобильного телефона, мы отправим вам одноразовый
            код для последующей верификации.
          </p>
        </div>
        <div
          class="flex flex-col items-center justify-center bg-white w-[90%] py-10 mx-auto rounded-2xl mt-10"
        >
          <div class="w-[90%]">
            <transition name="fade">
              <p
                v-if="phoneNumberError"
                class="error-message text-red-500 mt-2 text-sm m-0"
              >
                Ошибка в номере телефона
              </p>
            </transition>
            <div class="flex items-center mb-7 relative">
              <div class="absolute left-5 flex items-center z-10">
                <img src="../img/russia.png" alt="Flag" class="mr-2 h-6" />
                <span>(+7)</span>
              </div>
              <ion-input
                type="tel"
                class="bg-white border-2 rounded-2xl w-full h-[50px] text-xl inputnumber"
                :class="{ 'border-red-500': phoneNumberError }"
                v-model="phoneNumber"
                @input="validatePhoneNumber"
                maxlength="10"
              ></ion-input>
            </div>

            <div class="w-full flex justify-center items-center">
              <a
                @click="continueClicked"
                class="bg-blue-500 rounded-3xl w-full h-[50px] flex justify-center items-center text-white shadow-2xl shadow-blue-500/50 hover:bg-blue-600"
                >Продолжить</a
              >
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
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { ChevronBack } from "@vicons/ionicons5";
import { Icon, IconConfigProvider } from "@vicons/utils";

export default {
  name: "RegisterComponentStep",
  components: {
    IonTitle,
    ExploreContainer,
    IonContent,
    Icon,
    IonToolbar,
    IonPage,
    IonHeader,
    ChevronBack,
    IonInput,
    IonBackButton,
  },
  data() {
    return {
      phoneNumber: "",
      phoneNumberError: false,
    };
  },
  methods: {
    validatePhoneNumber() {
      if (this.phoneNumber.length !== 10) {
        this.phoneNumberError = true;
      } else {
        this.phoneNumberError = false;
      }
    },

    continueClicked() {
      this.validatePhoneNumber();
      if (!this.phoneNumberError) {
        this.$store.commit("setPhoneNumber", "7" + this.phoneNumber);
        this.$router.push("/register/step/2");
      }
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
ion-input {
  --highlight-color-focused: none;
}
.ios ion-toolbar {
  width: 80%;
}
</style>
