<template>
  <div>
    <v-app-bar app color="orange" flat elevation="0">
      <v-tabs color="white">
        <v-tab link to="/">Kalkyl</v-tab>
        <v-tab link to="/settings">Inställningar</v-tab>
        <v-divider />
        <v-tab link href="https://rikard-engstrom.github.io/">Close</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <v-toolbar dense v-if="this.$slots.toolbar">
        <slot name="toolbar" />
      </v-toolbar>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
    <v-footer app></v-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class BaseLayout extends Vue {
  private vm = {
  };
}
</script>
