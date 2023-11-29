<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-modal
        :is-open="isModalOpen"
        :initial-breakpoint="0.9"
        :breakpoints="[0.75, 0.9]"
        :backdrop-dismiss="false"
      >
        <ion-header>
          <ion-toolbar
            class="w-[90%] mx-auto flex justify-between items-center"
          >
            <ion-title>Транзакция</ion-title>
            <ion-buttons slot="end" class="flex justify-center items-center">
              <ion-button @click="closeModal">Отмена</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div
            class="flex flex-col items-center justify-center bg-white w-[90%] py-10 mx-auto rounded-2xl mt-10"
          >            <ion-item class="w-[90%] rounded mx-auto">
              <ion-input
                class="text-center"
                maxlength="16"
                v-model="amount"
                type="text"
                :class="{ 'text-red-600': Error === 1 }"
                placeholder="Введите сумму транзацкции"
              ></ion-input>
            </ion-item>

            <ion-item class="w-[90%] rounded">
              <ion-input
                class="text-center"
                v-model="titletrans"
                type="text"
                placeholder="Название"
              ></ion-input>
            </ion-item>

            <ion-item class="w-[90%] rounded">
              <ion-label>Выберите категорию</ion-label>
              <ion-select
                v-model="selectedCategory"
                cancelText="Отмена"
                okText="Выбрать"
              >
                <ion-select-option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.title }}
                </ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item class="w-[90%] rounded" v-if="selectedCategory">
              <ion-label>Выберите под-категорию</ion-label>
              <ion-select
                v-model="selectedsub"
                cancelText="Отмена"
                okText="Выбрать"
              >
                <ion-select-option
                  v-for="category_sub in categories_sub"
                  :key="category_sub.id"
                  :value="category_sub.id"
                >
                  {{ category_sub.title }}
                </ion-select-option>
                <ion-select-option value="create"> Создать </ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item class="w-[90%] rounded" v-if="selectedCategory">
              <ion-label>Выберите счет</ion-label>
              <ion-select
                v-model="selectedbalance"
                cancelText="Отмена"
                okText="Выбрать"
              >
                <ion-select-option
                  v-for="userBalance in userBalance"
                  :key="userBalance.id"
                  :value="userBalance.id"
                >
                  {{ userBalance.title }}
                </ion-select-option>
              </ion-select>
            </ion-item>
            <br />
            <div class="w-[90%]">
              <div class="w-full flex justify-center items-center">
                <a
                  @click="addNewtrans"
                  class="bg-blue-500 rounded-3xl w-full h-[50px] flex justify-center items-center text-white shadow-2xl shadow-blue-500/50 hover:bg-blue-600"
                  >Добавить</a
                >
              </div>
            </div>
          </div>
        </ion-content>
      </ion-modal>
      <ion-modal
        :is-open="selectedType === 'create'"
        :initial-breakpoint="0.4"
        :breakpoints="[0.4, 0.6]"
        :backdrop-dismiss="false"
      >
        <ion-header>
          <ion-toolbar
            class="w-[90%] mx-auto flex justify-between items-center"
          >
            <ion-title>Создать</ion-title>
            <ion-buttons slot="end" class="flex justify-center items-center">
              <ion-button @click="closeModalcreate">Отмена</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div
            class="flex flex-col items-center justify-center bg-white w-[90%] py-10 mx-auto rounded-2xl mt-10"
          >
            <ion-label class="flex justify-center items-center mb-5"
              >Создать категорию</ion-label
            >
            <ion-item class="w-[90%] rounded mx-auto">
              <ion-input
                class="text-center"
                maxlength="16"
                v-model="subtitle"
                type="text"
                :class="{ 'text-red-600': Error === 1 }"
                placeholder="Введите название категории"
              ></ion-input>
            </ion-item>
            <br />
            <div class="w-[90%]">
              <div class="w-full flex justify-center items-center">
                <a
                  @click="createsub"
                  class="bg-blue-500 rounded-3xl w-full h-[50px] flex justify-center items-center text-white shadow-2xl shadow-blue-500/50 hover:bg-blue-600"
                  >Создать</a
                >
              </div>
            </div>
          </div>
        </ion-content>
      </ion-modal>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon aria-hidden="true" :icon="homeOutline" />
          <ion-label>Главная</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/plan">
          <ion-icon aria-hidden="true" :icon="todayOutline" />
          <ion-label>Планирование</ion-label>
        </ion-tab-button>
        <ion-tab-button
          tab="tab3"
          href="#"
          class="custom-tab-button"
          @click="openModal"
        >
          <ion-icon aria-hidden="true" :icon="addCircle" class="larger-icon" />
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/stat">
          <ion-icon aria-hidden="true" :icon="statsChartOutline" />
          <ion-label>Статистика</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab5" href="/tabs/profile">
          <ion-icon aria-hidden="true" :icon="personCircleOutline" />
          <ion-label>Еще</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "TabsPage",
  components: {},

  data() {
    return {
      isModalOpen: false,
      selectedCategory: null,
      selectedType: null,
      isModalOpencreate: false,
      subtitle: "",
      selectedbalance: "",
      selectedsub: "",
      titletrans: "",
      amount: 0,
    };
  },
  mounted() {
    this.fetchCategory()
      .then(() => {
        console.log("fetchCategory action succeeded");
      })
      .catch((error) => {
        console.error("fetchCategory action failed:", error);
      });
    this.fetchCategorySub()
      .then(() => {
        console.log("fetchCategorySub action succeeded");
      })
      .catch((error) => {
        console.error("fetchCategorySub action failed:", error);
      });
  },
  computed: {
    ...mapGetters({
      categories: "getCategory",
      categories_sub: "getCategorySub",
      userBalance: "getUserBalance",
    }),
  },
  methods: {
    ...mapActions([
      "fetchCategorySub",
      "fetchCategory",
      "fetchCategorySubCreate",
      "fetchCategoryTransactionCreate",
    ]),
    openModal() {
      this.isModalOpen = true;
      console.log(this.categories);
    },
    addNewtrans() {
      const transactions = {
        title: this.titletrans,
        value: this.amount,
        balance_id: this.selectedbalance,
        sub_category_id: this.selectedsub,
      };

      this.$store.dispatch("fetchCategoryTransactionCreate", transactions);
    },
    closeModal() {
      this.isModalOpen = false;
    },
    closeModalcreate() {
      this.selectedType = null;
    },
    createsub() {
      this.fetchCategorySubCreate(this.subtitle);
    },
  },
};
</script>
<style scoped lang="scss">
ion-tab-bar {
  --background: #f1eefc;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  bottom: 20px;
  position: relative;
  border-radius: 16px;
  width: 92%;
  border-top: none;
  margin: 0 auto;
  height: 60px;
  padding: 0;
}

ion-tab-button {
  width: 70px;
  --color: #7e7e7e;
  --color-selected: #7966ff;
  --padding-bottom: 8px;
  --padding-top: 8px;
  &::before {
    background-color: transparent;
    display: block;
    content: "";
    margin: 0 auto;
    width: 20px;
    height: 2px;
  }

  &.tab-selected::before {
    background-color: #7966ff;
  }
}
ion-icon {
  font-size: 24px;
  color: #5379fd;
}
.larger-icon {
  position: absolute;
  font-size: 40px; 
  bottom: 1px;
}
.custom-tab-button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
<script setup>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonBackButton,
  IonModal,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import {
  ellipse,
  square,
  triangle,
  statsChartOutline,
  homeOutline,
  todayOutline,
  personCircleOutline,
  addCircle,
} from "ionicons/icons";
</script>
