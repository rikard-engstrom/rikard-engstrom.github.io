import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { LocalStorageService } from '@/services/localStorageService';

export interface InvoicingState {
    workDays: number;
    hourRate: number;
}

@Module({ dynamic: true, store, name: 'invoicing' })
class Invoicing extends VuexModule implements InvoicingState {
    workDays: number = LocalStorageService.getYearlyWorkDays();
    hourRate: number = LocalStorageService.getHourRate();

    @Mutation
    setYearlyHoursMutation(days: number) {
        LocalStorageService.setYearlyWorkDays(days);
    }

    @Action
    public setYearlyWorkDays(days: number) {
        this.setYearlyHoursMutation(days);
    }

    @Mutation
    setHourRateMutation(hourRate: number) {
        this.hourRate = hourRate;
        LocalStorageService.setHourRate(hourRate);
    }

    @Action setHourRate(hourRate: number) {
        this.setHourRateMutation(hourRate);
    }
}

export const InvoicingModule = getModule(Invoicing)