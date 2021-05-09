<template>
  <base-layout>
    <v-container>
      <v-card>
        <v-card-title>Fakturering</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="vm.workDays"
            label="Arbetsdagar per år"
            type="number"
          />
          <v-text-field v-model="vm.hourRate" label="Timpris" type="number" />
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title>Lön</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="vm.vacationDays"
            label="Semesterdagar"
            type="number"
          />
        </v-card-text>
      </v-card>

      <v-card class="mt-4">
        <v-card-title>Skatt</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="vm.taxTable"
            label="Skattetabell"
            type="number"
          />

          <v-select
            v-model="vm.countyCode"
            :items="vm.counties"
            label="Län"
            item-text="name"
            item-value="code"
          ></v-select>

          <v-select
            v-model="vm.municipalityCode"
            :items="muncipalities"
            label="Kommun"
            item-text="name"
            item-value="code"
          ></v-select>

          <v-select
            v-model="vm.parishCode"
            :items="parishes"
            label="Församling"
            item-text="name"
            item-value="code"
          ></v-select>

          <v-checkbox
            v-model="vm.churchMember"
            label="Medlem i Svenska Kyrkan"
          />
        </v-card-text>
      </v-card>
    </v-container>
  </base-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import BaseLayout from "@/components/BaseLayout.vue";
import { placeService } from "@/services/placeService";
import { Place } from "@/models/Place";
import { TaxModule } from "@/store/modules/tax";
import { InvoicingModule } from "@/store/modules/invoicing";
import { SalaryModule } from "@/store/modules/salary";

@Component({
  components: {
    BaseLayout,
  },
})
export default class Settings extends Vue {
  private vm = {
    workDays: InvoicingModule.workDays,
    hourRate: InvoicingModule.hourRate,
    vacationDays: SalaryModule.vacationDays,
    counties: placeService.getCounties(),
    taxTable: TaxModule.taxTable,
    countyCode: TaxModule.county.code,
    municipalityCode: TaxModule.municipality.code,
    parishCode: TaxModule.parish.code,
    churchMember: TaxModule.churchMember,
  };

  get muncipalities(): Place[] {
    return placeService.getMunicipalities(this.vm.countyCode);
  }

  get parishes(): Place[] {
    return placeService.getParishes(this.vm.municipalityCode);
  }

  @Watch("vm.hourRate")
  onHourRateChanged(value: number) {
    InvoicingModule.setHourRate(value);
  }

  @Watch("vm.countyCode")
  onCountyCodeChanged(value: string) {
    this.vm.municipalityCode = "";
    this.vm.parishCode = "";
    TaxModule.setCounty(placeService.getCounty(value));
  }

  @Watch("vm.municipalityCode")
  onMunicipalityCodeChanged(value: string) {
    this.vm.parishCode = "";
    TaxModule.setMunicipality(placeService.getMunicipality(value));
  }

  @Watch("vm.parishCode")
  onParishCodeChanged(value: string) {
    TaxModule.setParish(placeService.getParish(value));
  }

  @Watch("vm.churchMember")
  onChurchMemberChanged(value: boolean) {
    TaxModule.setChurchMember(value);
  }

  @Watch("vm.workDays")
  onWorkDaysChanged(value: number) {
    InvoicingModule.setYearlyWorkDays(value);
  }

  @Watch("vm.taxTable")
  onTaxTableChanged(value: number) {
    TaxModule.setTaxTable(value);
  }
}
</script>
