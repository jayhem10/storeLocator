<template>
  <div class="h-full bg-white rounded-lg shadow-md p-4 flex flex-col">
    <div class="mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search stores..."
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
    </div>
    <div class="flex-grow overflow-y-auto">
      <!-- Spinner de chargement -->
      <div v-if="loading" class="flex justify-center items-center h-full">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"
        ></div>
      </div>

      <!-- Message si aucune donnée -->
      <div
        v-else-if="stores.length === 0"
        class="text-center text-gray-500 py-8"
      >
        No stores found
      </div>

      <!-- Liste des magasins -->
      <div v-else class="space-y-4">
        <StoreCard
          v-for="store in filteredStores"
          :key="store.id"
          :store="store"
          @click="selectStore(store)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Store } from "~/types";

const searchQuery = ref("");
const loading = ref(true);
const stores = ref<Store[]>([]);

const filteredStores = computed(() => {
  return (stores.value || []).filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const emit = defineEmits<{
  (e: "select-store", store: Store): void;
}>();

const selectStore = (store: Store) => {
  emit("select-store", store);
};

// Fetch stores from Supabase

const fetchStores = async () => {
  try {
    const data = await $fetch<Store[]>("/api/store"); // Fetch data from the API

    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid data format received");
    }

    stores.value = data; // Assign data to `stores`
  } catch (error) {
    console.error("Error fetching stores:", error);
  } finally {
    loading.value = false; // Set loading to false
  }
};

onMounted(() => {
  fetchStores();
});
</script>
