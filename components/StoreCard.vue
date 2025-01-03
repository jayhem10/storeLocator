<template>
  <div
    class="p-4 border border-gray-200 rounded-lg hover:border-primary-500 cursor-pointer transition-colors"
    @click="$emit('click')"
  >
    <h3 class="text-lg font-semibold text-gray-900">{{ store.name }}</h3>
    <p class="text-gray-600 mt-1">{{ store.address }}</p>
    <div class="mt-2 flex items-center text-sm text-gray-500">
      <span v-if="distance" class="flex items-center">
        <font-awesome-icon
          :icon="['fas', 'location-dot']"
          class="w-4 h-4 mr-1"
        />
        {{ formatDistance(distance) }}
      </span>
      <span class="flex items-center ml-4">
        <font-awesome-icon
          :icon="['fas', 'clock']"
          class="mr-2 text-xl text-white"
        />
        {{ isOpen ? "Open" : "Closed" }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Store } from "~/types";

interface Props {
  store: Store;
  distance?: number;
}

const props = defineProps<Props>();

const isOpen = computed(() => {
  // TODO: Implement opening hours logic
  return true;
});

const formatDistance = (distance: number) => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};
</script>
