<template>
  <v-text-field v-bind="$attrs" v-model="value" dense  />
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class CurrencyTextField extends Vue {
  @Prop()
  private value!: string;

  @Watch("value", { immediate: true })
  onValueChanged(value: string) {
    this.$emit("input", value);
  }
}
</script>