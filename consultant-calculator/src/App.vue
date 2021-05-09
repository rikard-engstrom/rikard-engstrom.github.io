<template>
  <v-app>
    <svg-sprite />
    <router-view />
  </v-app>
</template>

<style lang="scss">
@import "@/styles/index.scss";
</style>

<script lang="ts">
import Vue from "vue";
import SvgSprite from "@/components/svg-sprite.vue";
import SvgIcon from "@/components/svg-icon.vue";
import { placeService } from "@/services/placeService";

placeService.reload();

Vue.component("svg-icon", SvgIcon);

export default Vue.extend({
  name: "App",
  components: { SvgSprite },
});
</script>
