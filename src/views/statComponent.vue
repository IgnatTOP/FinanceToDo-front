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
          <ion-title size="large">Статистика</ion-title>
        </ion-toolbar>
      </ion-header>
      <br />
      <div class="w-full mx-auto flex justify-center items-center flex-col">
        <div class="w-[95%] bg-white shadow rounded mx-auto p-2">
          <div class="px-3 py-2">
            <p class="text-2xl">Статистика по категориям</p>
          </div>
          <br />
          <div class="w-full">
            <apexchart
              type="bar"
              height="450"
              :options="chartOptionsBarstatCate"
              :series="seriesBarstatCate"
            ></apexchart>
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
import ApexCharts from "apexcharts";

export default {
  name: "statComponent",
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
      online: false,
      seriesBarstatCate: [
        {
          name: "Продукты",
          data: [44, 55],
        },
        {
          name: "Табак",
          data: [53, 32],
        },
        {
          name: "Техника",
          data: [12, 17],
        },
        {
          name: "Хоз товары",
          data: [9, 7],
        },
        {
          name: "Аренда",
          data: [25, 12],
        },
      ],
      chartOptionsBarstatCate: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          stackType: "100%",
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: "top",
            },
          },
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        xaxis: {
          categories: ["Наличные", "Карта"],
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "K";
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40,
        },
      },
    };
  },
  mounted() {},
  methods: {},
  computed: {},
};
</script>
