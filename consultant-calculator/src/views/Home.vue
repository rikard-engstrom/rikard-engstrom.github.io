<template>
  <base-layout>
    <v-row v-for="(year, index) in vm.years" :key="index">
      <v-col cols="5">
        <v-card>
          <v-card-title>Företagskonto</v-card-title>
          <v-card-text>
            <calculation-row label="Fakturerat" :value="year.invoiced()">
              <calculation-text-field label="Dagar" v-model="year.workDays" />
              <div class="ml-2 mr-2 form-text-middle">-</div>
              <calculation-text-field
                v-model="year.vacationDays"
                label="Semester"
              />
              <div class="ml-2 mr-2 form-text-middle">X</div>
              <calculation-text-field v-model="year.hourRate" label="Timpris" />
            </calculation-row>
            <calculation-row label="Mäklarkostnad" :value="year.brokerCost()">
              <calculation-text-field
                v-model="year.brokerFee"
                label="Mäklarkostnad"
                suffix="%"
              />
            </calculation-row>
            <calculation-row label="Bruttolön" :value="-year.grossSalary()">
              <calculation-text-field
                v-model="year.grossSalaryMonthly"
                label="Bruttolön"
              />
              <div class="ml-2 mr-2 form-text-middle">x 12</div>
            </calculation-row>
            <calculation-row label="Semesterers." :value="-year.vacationSalary">
              <calculation-text-field
                v-model="year.vacationSalary"
                label="Semesterersättning"
              />
            </calculation-row>
            <calculation-row label="ITPK" :value="-year.pensionItpk()" />
            <calculation-row
              label="Pensionspar"
              :value="year.pensionSalary()"
            />
            <calculation-row
              label="Arbetsgivaravgift"
              :value="year.socialFee()"
            />
            <calculation-row label="Skatt" :value="year.companyTax()">
              <calculation-text-field
                :value="year.companyResult().toFixed()"
                label="Resultat"
                readonly
              />
              <div class="ml-2 mr-2 form-text-middle">X</div>
              <calculation-text-field
                :value="year.companyTaxRate()"
                suffix="%"
                label="Skattesats"
                readonly
              />
            </calculation-row>
            <calculation-row label="Balans" :value="year.companyBalance()" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Pensionssparande</v-card-title>
          <v-card-text>
            <calculation-row
              label="ITPK"
              :value="year.pensionItpk()"
              left-cols="0"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title>Privatkonto</v-card-title>
          <v-card-text>
            <calculation-row
              label="Bruttolön"
              :value="year.grossSalary"
              left-cols="0"
            />
            <calculation-row
              label="Semesterers."
              :value="year.vacationSalary"
              left-cols="0"
            />
            <calculation-row
              label="A-Skatt"
              :value="year.privateTaxAmount()"
              left-cols="0"
            />
            <calculation-row
              label="Nettolön"
              :value="year.privateNetSalary()"
              left-cols="0"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </base-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseLayout from "@/components/BaseLayout.vue";
import { CalculationYear } from "@/models/CalculationYear";
import { TaxModule } from "@/store/modules/tax";
import { InvoicingModule } from "@/store/modules/invoicing";
import { SalaryModule } from "@/store/modules/salary";
import CurrencyTextField from "@/components/CurrencyTextField.vue";
import CalculationTextField from "@/components/calculation/CalculationTextField.vue";
import CalculationRow from "@/components/calculation/CalculationRow.vue";

@Component({
  components: {
    BaseLayout,
    CurrencyTextField,
    CalculationTextField,
    CalculationRow,
  },
})
export default class Home extends Vue {
  private vm = {
    years: new Array<CalculationYear>(),
  };

  mounted() {
    this.addYear();
  }

  addYear() {
    const year = new CalculationYear();
    year.workDays = InvoicingModule.workDays;
    year.hourRate = InvoicingModule.hourRate;
    year.vacationDays = SalaryModule.vacationDays;

    this.vm.years.push(year);
  }
}
</script>
