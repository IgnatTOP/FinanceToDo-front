<template>
  <ion-page>
    <ion-header collapse="fade" class="ion-no-border bg-gray-100">
      <ion-toolbar class="w-[90%] mx-auto flex justify-center items-center">
        <ion-buttons slot="start">
          <router-link to="/register">
            <ion-back-button default-href="#" text=""></ion-back-button>
          </router-link>
        </ion-buttons>
        <ion-title class="text-violet-500">2 шаг</ion-title>
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
          <img src="../img/accounticon.png" class="img_logo-start" alt="Лого">
          <br>
          <h2 class="text-2xl text-center">Один шаг до вашего аккаунта</h2>
          <br>
          <p class="text-center text-gray-400 w-[80%]">Укажите логин и пароль</p>
        </div>
        <div class="flex flex-col items-center justify-center bg-white w-[90%] py-10 mx-auto rounded-2xl mt-10">
          <div class="w-[90%]">
            <ion-label v-if="error === 1" class="flex justify-center items-center mb-5 text-red-500">Неизвестная ошибка</ion-label>
            <ion-label v-if="error === 409" class="flex justify-center items-center mb-5 text-red-500 text-center">Аккаунт с этим номером уже зарегистрирован</ion-label>
            <ion-label v-if="error === 422" class="flex justify-center items-center mb-5 text-red-500 text-center">Указаны не все обязательные поля</ion-label>
            <ion-label class="flex justify-center items-center mb-5">Теперь нужно придумать пароль</ion-label>

            <ion-item class="w-[90%] rounded mx-auto">
              <ion-input class="text-center" v-model="password" type="password" :class="{ 'text-red-600':  error === 422 }" placeholder="Введите пароль"></ion-input>
            </ion-item>
            <br>
            <div class="w-full flex justify-center items-center">
              <a @click="register_click"
                  class="bg-blue-500 rounded-3xl w-full h-[50px] flex justify-center items-center text-white shadow-2xl shadow-blue-500/50 hover:bg-blue-600"
              >Продолжить</a>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script>
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonBackButton, IonItem} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { ChevronBack } from "@vicons/ionicons5";
import { Icon, IconConfigProvider } from "@vicons/utils";

export default {
    name: 'RegisterComponentStep2',
  components: {
    IonItem,
    IonBackButton,
    IonTitle, ExploreContainer, IonContent,Icon, IonToolbar, IonPage, IonHeader, ChevronBack, IonInput },
  data() {
    return {
      password: '',
      loading: false,
      error: 0,
    };
  },
  methods: {
    register_click() {
      this.loading = true;
      this.$store.commit('setPassword', this.password);

      this.$store
          .dispatch('register')
          .then(() => {
            this.$store
                .dispatch('login')
                .then(() => {
                  this.$store.dispatch('fetchUser')
                      .then(() => {
                        this.$store.dispatch('fetchUserBalance')
                            .then(() => {
                              this.error = 0;
                              this.$router.push('/register/step/3');
                            })
                            .catch((error) => {
                              this.error = 1;
                            })
                            .finally(() => {
                              this.loading = false;
                            });
                      })
                      .catch((error) => {
                        this.error = 1;
                        this.loading = false;
                      })
                })
                .catch((error) => {
                  if (error.response.status === 422) {
                    this.error = 422;
                  } else {
                    this.error = 1;
                  }
                  this.loading = false;
                })
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 409) {
                this.error = 409;
              } else if (error.response.status === 422) {
                this.error = 422;
              } else {
                this.error = 1;
              }
            } else {
              this.error = 1;
            }
            this.loading = false;
          })
    },

  },
  }
</script>
<style scoped>

.img_logo-start{
  width: 200px;
}
.inputnumber{
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