<template>
  <l-popup :options="popupOptions">
    <slot name="content"></slot>
  </l-popup>
</template>

<script>
import { LPopup } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "MapPopup",
  components: {
    LPopup,
  },
  props: {
    popupOptions: {
      type: Object,
      required: false,
      default: () => {
        return {
          maxWidth: 300,
          minWidth: 300,
        };
      },
    },
  },
  setup() {},
};
</script>
