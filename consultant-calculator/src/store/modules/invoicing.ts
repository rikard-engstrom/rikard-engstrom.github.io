import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { LocalStorageService } from '@/services/localStorageService';

export interface InvoicingState {
    workDays: number;
    hourRate: number;
    ownCompany: boolean;
}

@Module({ dynamic: true, store, name: 'invoicing' })
class Invoicing extends VuexModule implements InvoicingState {
    workDays: number = LocalStorageService.getYearlyWorkDays();
    hourRate: number = LocalStorageService.getHourRate();
    ownCompany: boolean = LocalStorageService.getOwnCompany();

    @Mutation
    setYearlyWorkDaysMutation(days: number) {
        LocalStorageService.setYearlyWorkDays(days);
    }

    @Action
    public setYearlyWorkDays(days: number) {
        this.setYearlyWorkDaysMutation(days);
    }

    @Mutation
    setHourRateMutation(hourRate: number) {
        this.hourRate = hourRate;
        LocalStorageService.setHourRate(hourRate);
    }

    @Action setHourRate(hourRate: number) {
        this.setHourRateMutation(hourRate);
    }

    @Mutation setOwnCompanyMutation(value: boolean) {
        this.ownCompany = value;
        LocalStorageService.setOwnCompany(value);
    }

    @Action setOwnCompany(value: boolean) {
        this.setOwnCompanyMutation(value);
    }
}

export const InvoicingModule = getModule(Invoicing)