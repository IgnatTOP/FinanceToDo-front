<template>
  <ion-page>
    <ion-header collapse="fade" class="ion-no-border bg-gray-100">
      <ion-toolbar class="w-[90%] mx-auto flex justify-center items-center">
        <ion-buttons slot="start">
          <router-link to="/register">
            <ion-back-button default-href="#" text=""></ion-back-button>
          </router-link>
        </ion-buttons>
        <ion-title class="text-violet-500">Вход</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div v-if="loading" class="loading-overlay">
        <div class="loader">
          <div class="loader-inner">
            <div class="loader-line-wrap">
              <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
              <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
              <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
              <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
              <div class="loader-line"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex justify-center flex-col items-center mt-[2rem]">
          <img src="../img/phoneicon.png" class="img_logo-start" alt="Лого" />
          <br />
          <h2 class="text-2xl text-center">Авторизация</h2>
          <br />
          <p class="text-center text-gray-400 w-[80%]">
            Вам нужно указать данные от вашего профиля
          </p>
        </div>
        <div
          class="flex flex-col items-center justify-center bg-white w-[90%] py-10 mx-auto rounded-2xl mt-10"
        >
          <div class="w-[90%]">
            <div>
              <p
                v-if="phoneNumberError && error === 0"
                class="error-message text-red-500 mt-2 text-sm m-0"
              >
                Ошибка в номере телефона
              </p>
              <ion-label
                v-if="error === 1"
                class="flex justify-center items-center mb-5 text-red-500"
                >Неизвестная ошибка</ion-label
              >
              <ion-label
                v-if="error === 401"
                class="flex justify-center items-center mb-5 text-red-500"
                >Неверный номер или пароль</ion-label
              >
              <ion-label
                v-if="error === 409"
                class="flex justify-center items-center mb-5 text-red-500 text-center"
                >Аккаунт с этим номером уже зарегистрирован</ion-label
              >
              <ion-label
                v-if="error === 422"
                class="flex justify-center items-center mb-5 text-red-500 text-center"
                >Указаны не все обязательные поля</ion-label
              >
              <ion-label
                v-if="error === 0 && !phoneNumberError"
                class="flex justify-center items-center mb-5"
                >Теперь нужно придумать пароль</ion-label
              >
            </div>

            <div class="flex items-center mb-7 relative">
              <div class="absolute left-5 flex items-center z-10">
                <img src="../img/russia.png" alt="Flag" class="mr-2 h-6" />
                <span>(+7)</span>
              </div>
              <ion-input
                type="tel"
                class="bg-white border-2 rounded-2xl w-full h-[50px] text-xl inputnumber"
                :class="{ 'border-red-500': phoneNumberError || error !== 0 }"
                v-model="phoneNumber"
                @input="validatePhoneNumber"
                maxlength="10"
              ></ion-input>
            </div>
            <ion-input
              type="tel"
              class="bg-white border-2 rounded-2xl w-full h-[50px] text-xl inputnumber2"
              v-model="password"
              :class="{ 'border-red-500': error !== 0 }"
              placeholder="Введите пароль"
              minlength="6"
            ></ion-input>
            <br />
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
  IonModal,
  IonInput,
  IonBackButton,
  IonItem,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "login_page",
  components: {
    IonBackButton,
    IonTitle,
    IonContent,
    IonToolbar,
    IonPage,
    IonModal,
    IonHeader,
    IonInput,
    IonItem,
    IonSelect,
    IonSelectOption,
  },

  data() {
    return {
      phoneNumber: "",
      phoneNumberError: false,
      password: "",
      loading: false,
      error: 0,
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
        this.loading = true;
        this.$store.commit("setPhoneNumber", "7" + this.phoneNumber);
        this.$store.commit("setPassword", this.password);
        this.$store
          .dispatch("login")
          .then(() => {
            this.$store
              .dispatch("fetchUser")
              .then(() => {
                this.$store
                  .dispatch("fetchUserBalance")
                  .then(() => {
                    this.error = 0;
                    this.$router.push("/tabs/tab1");
                  })
                  .catch((error) => {
                    this.error = 1;
                  });
              })
              .catch((error) => {
                this.error = 1;
              });
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.error = 422;
            } else if (error.response.status === 401) {
              this.error = 401;
            } else {
              this.error = 1;
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
<style scoped>
.img_logo-start {
  width: 240px;
}
.img_logo-start {
  width: 200px;
}
.inputnumber {
  padding-left: 90px !important;
}
.inputnumber2 {
  padding-left: 20px !important;
}

ion-input {
  --highlight-color-focused: none;
}
.ios ion-toolbar {
  width: 80%;
}
</style>
