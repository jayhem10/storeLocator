<template>
  <ClientOnly>
    <div class="h-[calc(100vh-64px)] w-full">
      <!-- Ajustez 64px selon votre header -->
      <div ref="mapContainer" class="w-full h-full"></div>
    </div>

    <template #fallback>
      <div
        class="h-[calc(100vh-64px)] w-full bg-gray-100 flex items-center justify-center"
      >
        Chargement de la carte...
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import "leaflet/dist/leaflet.css";

const mapContainer = ref<HTMLElement | null>(null);
let map: any = null;
const markers: any[] = [];
const stores = ref([]);

const NEW_YORK_COORDS = { lat: 40.7128, lng: -74.006 }; // Coordonnées de New York
const DEFAULT_ZOOM = 12;

const config = useRuntimeConfig();
const jawgMapsApiKey = config.public.jawgMapsApiKey;

// Initialisation de la carte
const initMap = async () => {
  await nextTick();

  if (!mapContainer.value) {
    console.error("Map container is not available. Retrying...");
    setTimeout(initMap, 100);
    return;
  }

  const L = (await import("leaflet")).default;

  if (map) {
    map.remove();
  }

  map = L.map(mapContainer.value, {
    center: [NEW_YORK_COORDS.lat, NEW_YORK_COORDS.lng],
    zoom: DEFAULT_ZOOM,
    zoomControl: true,
  });

  L.tileLayer(
    `https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?access-token=${jawgMapsApiKey}`,
    {
      attribution:
        '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 1,
      maxZoom: 20,
    }
  ).addTo(map);

  console.log("Map initialized, centered on New York.");
};

// Ajout des marqueurs
const addMarkers = async (storeData: any[]) => {
  if (!map) {
    console.error("Map is not initialized.");
    return;
  }

  const L = (await import("leaflet")).default;

  // Supprimer les marqueurs existants
  markers.forEach((marker) => marker.remove());
  markers.length = 0;

  storeData.forEach((store) => {
    if (!store.latitude || !store.longitude) {
      console.warn("Skipping store with missing coordinates:", store);
      return;
    }

    const marker = L.marker([store.latitude, store.longitude])
      .bindPopup(
        `<div class="p-2">
          <h3 class="font-semibold">${store.name}</h3>
          <p>${store.address}</p>
        </div>`
      )
      .addTo(map);

    markers.push(marker);
  });

  console.log(`${markers.length} markers added to the map.`);
};

// Gestion du redimensionnement de la carte
const handleResize = () => {
  if (map) {
    map.invalidateSize();
    console.log("Map resized.");
  }
};

// Fetch des données de stores
const fetchStores = async () => {
  try {
    const response = await $fetch("/api/store");
    stores.value = response;
    console.log("Stores fetched:", stores.value);
  } catch (error) {
    console.error("Error fetching stores:", error);
  }
};

// Watcher pour mettre à jour les marqueurs sur changement de stores
watch(
  stores,
  async (newStores) => {
    if (map && newStores) {
      await addMarkers(newStores);
    }
  },
  { deep: true }
);

// Gestion des cycles de vie
onMounted(async () => {
  await initMap(); // Initialiser la carte
  await fetchStores(); // Récupérer les données de stores

  // Ajouter un gestionnaire pour le redimensionnement
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
    console.log("Map destroyed.");
  }
  // Retirer le gestionnaire de redimensionnement
  window.removeEventListener("resize", handleResize);
});
</script>

<style>
@import "leaflet/dist/leaflet.css";

/* La carte doit prendre toute la hauteur disponible */
:root {
  --header-height: 64px; /* Ajustez selon votre header */
}

.leaflet-container {
  height: 100% !important;
  width: 100% !important;
}

/* Ajustements pour les contrôles de zoom */
.leaflet-control-container .leaflet-top {
  top: 20px;
}
.leaflet-control-container .leaflet-left {
  left: 20px;
}
</style>
