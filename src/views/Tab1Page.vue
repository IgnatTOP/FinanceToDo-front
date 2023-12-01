<template>
  <ion-page>
    <ion-header collapse="fade" class="ion-no-border color-b">
      <ion-toolbar
        class="w-[90%] mx-auto flex justify-between items-center color-b"
      >
        <ion-buttons slot="start">
          <router-link to="/register">
            <ion-back-button
              default-href="#"
              text=""
              style="--color: white"
            ></ion-back-button>
          </router-link>
        </ion-buttons>
        <ion-title class="text-white">Главная</ion-title>
        <ion-buttons slot="end" class="flex justify-center items-center">
          <ion-button class="mx-3">
            <img src="../img/noty.svg" class="icon" />
          </ion-button>
          <ion-button>
            <img src="../img/setting-icon.svg" class="icon" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
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
            <ion-title>Счет</ion-title>
            <ion-buttons slot="end" class="flex justify-center items-center">
              <ion-button @click="closeModal">Отмена</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div
            class="flex flex-col items-center justify-center bg-white w-[90%] py-10 mx-auto rounded-2xl mt-10"
          >
            <!--            <ion-label class="flex justify-center items-center mb-5">Вве</ion-label>-->
            <ion-item class="w-[90%] rounded mx-auto">
              <ion-input
                class="text-center"
                maxlength="16"
                v-model="RecordName"
                type="text"
                :class="{ 'text-red-600': Error === 1 }"
                placeholder="Введите название счета"
              ></ion-input>
            </ion-item>
            <ion-item class="w-[90%] rounded">
              <ion-input
                class="text-center"
                v-model="initialAmount"
                type="number"
                placeholder="Текущий баланс"
              ></ion-input>
            </ion-item>

            <ion-item class="w-[90%] rounded">
              <ion-label>Выберите валюту</ion-label>
              <ion-select
                v-model="selectedCurrency"
                cancelText="Отмена"
                okText="Выбрать"
              >
                <ion-select-option value="RUB"
                  >RUB - Российский рубль</ion-select-option
                >
                <ion-select-option value="USD">USD - Доллар</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item class="w-[90%] rounded">
              <ion-label>Выберите тип</ion-label>
              <ion-select
                v-model="selectedType"
                cancelText="Отмена"
                okText="Выбрать"
              >
                <ion-select-option value="NAL">Наличные</ion-select-option>
                <ion-select-option value="CARD">Карта</ion-select-option>
                <ion-select-option value="SBER"
                  >Сберегательный</ion-select-option
                >
              </ion-select>
            </ion-item>
            <br />
            <div class="w-[90%]">
              <div class="w-full flex justify-center items-center">
                <a
                  @click="addNewRecord"
                  class="bg-blue-500 rounded-3xl w-full h-[50px] flex justify-center items-center text-white shadow-2xl shadow-blue-500/50 hover:bg-blue-600"
                  >Добавить</a
                >
              </div>
            </div>
          </div>
        </ion-content>
      </ion-modal>
      <div class="h-[250px] pb-[30px] w-full color-b flex items-center slider">
        <div
          class="w-[180px] flex-none scroll-start"
          v-for="(account, index) in userBalance"
          :key="index"
        >
          <div
            class="ml-3 bg-white h-[170px] shadow-2xl rounded-2xl flex flex-col justify-center"
          >
            <div class="mx-5 container_shet">
              <img src="../img/money_size.png" class="w-[50px]" />
              <p class="text-lg text-gray-600">{{ account.title }}</p>
              <p class="text-xl font-bold text-gray-800">{{ account.value }}</p>
              <p class="text-lg text-gray-700">{{ account.currency }}</p>
            </div>
          </div>
        </div>
        <div class="w-[180px] flex-none scroll-start">
          <div
            class="mx-3 bg-white h-[170px] shadow-2xl rounded-2xl flex flex-col justify-center"
          >
            <div class="mx-5 text-center">
              <div
                class="flex flex-col items-center justify-center"
                @click="openModal"
              >
                <div
                  class="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center"
                >
                  <p class="text-white text-xl font-bold">+</p>
                </div>
                <p class="text-md mt-2 text-black">Добавить счет</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-[40px]">
        <br />
        <div class="w-[95%] bg-white shadow rounded mx-auto p-2">
          <div class="px-3 py-2">
            <p class="text-2xl">Последние транзакции</p>
          </div>
          <div class="flex flex-col-reverse">
            <div
              v-for="trans in lastFiveTransactions"
              :key="trans.id"
              class="flex my-2 p-4 bg-white rounded-md shadow-md"
            >
              <div class="flex-grow">
                <p class="text-lg font-semibold">{{ trans.title }}</p>
                <p class="text-gray-600">
                  id категории {{ trans.sub_category_id }}
                </p>
              </div>
              <div class="ml-4">
                <p class="text-lg font-semibold">{{ trans.value }} Р.</p>
                <p class="text-md">id счета {{ trans.balance_id }}</p>
              </div>
            </div>
          </div>
        </div>
        <br />

        <div class="w-[95%] bg-white shadow rounded mx-auto p-2">
          <div class="px-3 py-2">
            <p class="text-2xl">Изменение баланса</p>
          </div>
          <br />
          <div class="w-full">
            <apexchart
              type="area"
              width="100%"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
        </div>
        <br />
        <div class="w-[95%] bg-white shadow rounded mx-auto p-2">
          <div class="px-3 py-2">
            <p class="text-2xl">Общая сумма</p>
          </div>
          <br />
          <div class="w-full">
            <apexchart
              type="bar"
              height="150"
              :options="chartOptionsbar"
              :series="seriesbar"
            ></apexchart>
          </div>
        </div>
        <br />
        <div class="w-[95%] bg-white shadow rounded mx-auto p-2">
          <div class="px-3 py-2">
            <p class="text-2xl">Цель</p>
          </div>
          <br />
          <div class="w-full">
            <apexchart
              type="bar"
              height="150"
              :options="chartOptionsBarstat"
              :series="seriesBarstat"
            ></apexchart>
          </div>
        </div>
        <br />
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
import ApexCharts from "apexcharts";

export default {
  name: "Tab1Page",
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
      isModalOpen: false,
      selectedCurrency: "RUB",
      selectedType: "NAL",
      RecordName: "",
      initialAmount: "",
      Error: 0,
      seriesBarstat: [
        {
          name: "Actual",
          data: [
            {
              x: "Наличные",
              y: 222,
              goals: [
                {
                  name: "Цель",
                  value: 400,
                  strokeWidth: 2,
                  strokeDashArray: 2,
                  strokeColor: "#775DD0",
                },
              ],
            },
            {
              x: "Карта",
              y: 66,
              goals: [
                {
                  name: "Цель",
                  value: 300,
                  strokeWidth: 5,
                  strokeHeight: 10,
                  strokeColor: "#775DD0",
                },
              ],
            },
          ],
        },
      ],
      chartOptionsBarstat: {
        chart: {
          height: 100,
          type: "bar",
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        colors: ["#9EB7FF"],
        dataLabels: {
          formatter: function (val, opt) {
            const goals =
              opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                .goals;

            if (goals && goals.length) {
              return `${val} / ${goals[0].value}`;
            }
            return val;
          },
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ["Текущий", "Цель"],
          markers: {
            fillColors: ["#9EB7FF", "#5e40c0"],
          },
        },
      },

      seriesbar: [
        {
          data: [222, 66, 222 + 66], // Total value for the third point is the sum of cash and card values
        },
      ],
      chartOptionsbar: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: ["Наличные", "Карта", "Сумма"], // Replace country names with payment methods
        },
      },
      series: [
        {
          name: "Наличные",
          data: [31, 40, 28, 51, 42, 109, 100, 222],
        },
        {
          name: "Карта",
          data: [11, 32, 45, 32, 34, 52, 41, 66],
        },
      ],
      chartOptions: {
        chart: {
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "category",
          categories: [
            "09-19",
            "09-20",
            "09-21",
            "09-22",
            "09-23",
            "09-24",
            "09-25",
          ],
          labels: {
            rotate: -45,
          },
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value + " Р.";
            },
          },
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
    };
  },
  mounted() {
    this.fetchUser()
      .then(() => {
        console.log("fetchUser action succeeded");
      })
      .catch((error) => {
        console.error("fetchUser action failed:", error);
      });
    this.fetchUserBalance()
      .then(() => {
        console.log("fetchUserBalance action succeeded");
      })
      .catch((error) => {
        console.error("fetchUserBalance action failed:", error);
      });
    this.fetchTransactions()
      .then(() => {
        console.log("fetchTransactions action succeeded");
        console.log(this.getTransactions);
      })
      .catch((error) => {
        console.error("fetchTransactions action failed:", error);
      });
  },
  methods: {
    ...mapActions(["fetchUser", "fetchUserBalance", "fetchTransactions"]),

    getIconPath(icon) {
      return `${icon}`;
    },
    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },
    addNewRecord() {
      if (!this.RecordName) {
        this.Error = 1;
      } else {
        if (!this.initialAmount) {
          this.initialAmount = 0;
        }
        const newRecord = {
          title: this.RecordName,
          value: this.initialAmount,
          currency: this.selectedCurrency,
          type: this.selectedType,
        };

        this.$store.dispatch("addRecord", newRecord);
        this.closeModal();
      }
    },
  },
  computed: {
    userData() {
      return this.$store.getters.getUserData;
    },
    ...mapGetters({
      userBalance: "getUserBalance",
      getTransactions: "getUserTransactions",
    }),
    lastFiveTransactions() {
      return this.getTransactions.slice(-3);
    },
  },
};
</script>
<style scoped>
.icon {
  width: 22px;
}
.color-b {
  --background: #9eb7ff;
  background-color: #9eb7ff;
}
.icon {
  filter: brightness(0) invert(1);
}
.scroll-start {
  scroll-snap-align: start;
}
.slider {
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
</style>
