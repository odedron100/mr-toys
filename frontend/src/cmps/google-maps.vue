<template>
  <GmapMap
    :center="center"
    :zoom="zoom"
    map-type-id="terrain"
    style="width: 500px; height: 300px"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="
        center = m.position;
        zoom = 16;
      "
    />
  </GmapMap>
</template>
<script>
export default {
  data() {
    return {
      markers: [
        { position: { lat: 31.999516, lng: 34.947302 } },
        { position: { lat: 32.108716, lng: 34.83828 } },
        { position: { lat: 32.021292938735506, lng: 34.86173018909193 } },
        { position: { lat: 32.80977980999724, lng: 34.9990865737278 } },
      ],
      center: { lat: 32.068848194759575, lng: 34.9417383930324 },
      zoom: 7,
    };
  },
  methods: {},
};
</script>
