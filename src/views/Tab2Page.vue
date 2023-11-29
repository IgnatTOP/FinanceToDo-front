<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 2</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        <div class="scrollable">
          <div class="block">1</div>
          <div class="block">2</div>
          <div class="block">2</div>
          <div class="block">2</div>
          <div class="block">2</div>
          <div class="block">2</div>
        </div>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>
<style>
.container {
  width: 100%;
  overflow-x: auto;
}

.scrollable {
  display: flex;
  white-space: nowrap; 
}

.block {
  width: 200px; 
  height: 100px; 
  margin-right: 10px; 
  background-color: lightblue; 
  flex: none;
}

</style>
