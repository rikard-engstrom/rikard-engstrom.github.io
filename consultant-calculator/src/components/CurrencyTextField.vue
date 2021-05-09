<template>
  <v-text-field v-bind="$attrs" v-model="formattedValue" />
</template>
<script lang="ts">
import { Component, Watch, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class CurrencyTextField extends Vue {
  private formattedValue = "0";

  @Prop()
  private value!: string;

  @Watch("value", { immediate: true })
  onValueChanged(value: string) {
    const numberValue = Number.parseFloat(value);
    this.formattedValue = numberValue.toLocaleString("sv-SE", {
      maximumFractionDigits: 0,
    });
  }
}
</script>
