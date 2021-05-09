import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { Place } from '@/models/Place';
import { placeService } from '@/services/placeService';
import { LocalStorageService } from '@/services/localStorageService';

export interface TaxState {
    county: Place;
    municipality: Place;
    parish: Place;
    churchMember: boolean;
    taxTable: number;
}

@Module({ dynamic: true, store, name: 'tax' })
class Tax extends VuexModule implements TaxState {
    county: Place = placeService.getCounty(LocalStorageService.getTaxCountyCode());
    municipality: Place = placeService.getMunicipality(LocalStorageService.getTaxMunicipalityCode());
    parish: Place = placeService.getParish(LocalStorageService.getTaxParishCode());
    churchMember: boolean = LocalStorageService.getChurchMember();
    taxTable: number = LocalStorageService.getTaxTableId();

    @Mutation
    setCountyMutation(place: Place) {
        this.county = place;
        LocalStorageService.setTaxCountyCode(place.code);
    }

    @Action
    public setCounty(place: Place) {
        this.setCountyMutation(place);
        this.setMunicipalityMutation(Place.empty());
        this.setParishMutation(Place.empty());
    }

    @Mutation
    setMunicipalityMutation(place: Place) {
        this.municipality = place;
        LocalStorageService.setTaxMunicipalityCode(place.code);
    }

    @Action
    public setMunicipality(place: Place) {
        this.setMunicipalityMutation(place);
        this.setParishMutation(Place.empty());
    }

    @Mutation
    setParishMutation(place: Place) {
        this.parish = place;
        LocalStorageService.setTaxParishCode(place.code);
    }

    @Action
    public setParish(place: Place) {
        this.setParishMutation(place);
    }

    @Mutation
    setChurchMemberMutation(value: boolean) {
        this.churchMember = value;
        LocalStorageService.setChurchMember(value);
    }

    @Action
    public setChurchMember(value: boolean) {
        this.setChurchMemberMutation(value);
    }

    @Mutation
    setTaxTableMutation(tableId: number) {
        this.taxTable = tableId;
        LocalStorageService.setTaxTableId(tableId);
    }

    @Action
    setTaxTable(tableId: number) {
        this.setTaxTableMutation(tableId);
    }
}

export const TaxModule = getModule(Tax)