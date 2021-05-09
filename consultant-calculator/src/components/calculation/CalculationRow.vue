<template>
  <v-row class="dense mt-0">
    <v-col :cols="leftCols" class="d-inline-flex" v-if="leftCols > 0">
      <slot />
    </v-col>
    <v-col class="d-inline-flex">
      <div class="mr-2 form-text-middle">=</div>
      <currency-text-field
        :label="label"
        :value="numberValue"
        dense
        outlined
        readonly
        class="text-right"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import CurrencyTextField from "@/components/CurrencyTextField.vue";

@Component({
  components: {
    CurrencyTextField,
  },
})
export default class CalculationRow extends Vue {
  private numberValue = 0;

  @Prop()
  private value!: number | Promise<number>;

  @Prop()
  private label!: string;

  @Prop({default: 8})
  private leftCols!: 8;

  @Watch("value", { immediate: true })
  onValueChanged(value: number | Promise<number>) {
    console.log("changed");
    if (value instanceof Promise) {
      value.then((e) => {
        this.numberValue = e;
      });
    } else {
      this.numberValue = value | 0;
    }
  }
}
</script>
