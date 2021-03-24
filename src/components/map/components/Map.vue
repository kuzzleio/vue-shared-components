<template>
  <div class="Map" data-cy="map">
    <l-map ref="map">
      <l-tile-layer :url="url" :attribution="attribution" />
      <slot name="marker"></slot>
      <slot name="content"></slot>
    </l-map>
  </div>
</template>

<script>
import L from "leaflet";
import {
  LMap,
  LTileLayer
} from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
  },
  setup() {
    return {
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
};
</script>

<style>
.Map {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
