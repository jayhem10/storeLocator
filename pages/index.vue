<template>
  <div class="h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <TheHeader class="flex-shrink-0" />
    <!-- Contenu principal -->
    <main class="flex flex-grow">
      <!-- Liste des magasins -->
      <StoreList
        class="w-1/4 h-full overflow-hidden bg-white"
        @select-store="handleClick"
      />
      <!-- Carte des magasins -->
      <div class="flex-grow h-full">
        <StoreMap ref="storeMapRef" class="w-full h-full" />
      </div>
    </main>
  </div>
</template>

<script setup>
import TheHeader from "~/components/TheHeader.vue";
import StoreList from "~/components/StoreList.vue";
import StoreMap from "~/components/StoreMap.vue";

const handleClick = (store) => {
  console.log("Store selected:", store);
  storeMapRef.value?.centerMapOnStore(store);
};
const storeMapRef = ref(null);
</script>
