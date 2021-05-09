import Vue from "vue";
import Vuex from "vuex";
import { TaxState } from "./modules/tax";

Vue.use(Vuex);
export interface RootState {
  tax: TaxState;
}

export default new Vuex.Store<RootState>({});