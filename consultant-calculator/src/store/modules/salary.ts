import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { LocalStorageService } from '@/services/localStorageService';

export interface SalaryState {
    vacationDays: number;
}

@Module({ dynamic: true, store, name: 'salary' })
class Salary extends VuexModule implements SalaryState {
    vacationDays: number = LocalStorageService.getVacationDays();

    @Mutation
    setVacationDaysMutation(days: number) {
        this.vacationDays = days;
        LocalStorageService.setVacationDays(days);
    }

    @Action
    public setVacationDays(days: number) {        
        this.setVacationDaysMutation(days);
    }
}

export const SalaryModule = getModule(Salary)