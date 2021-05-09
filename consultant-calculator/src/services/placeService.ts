import { Place } from "@/models/Place";
import axios from "axios";

export class PlaceService {
    private _counties: Place[] = [];
    private _municipalities: Place[] = [];
    private _parishes: Place[] = [];

    reload() {
        axios.get<string[][]>("places.json")
            .then(e => {
                const places = e.data.map(e => new Place(e))
                    .sort((a, b) => { return a.name > b.name ? 1 : -1 });

                places.forEach(place => {
                    if (place.code.length == 2)
                        this._counties.push(place);

                    if (place.code.length == 4)
                        this._municipalities.push(place);

                    if (place.code.length == 6)
                        this._parishes.push(place);
                });
            })
    }

    getCounties(): Place[] { return this._counties; }

    getMunicipalities(countyCode: string): Place[] {
        return this._municipalities
            .filter(e => e.code.substr(0, 2) == countyCode);
    }

    getParishes(muncipalityCode: string): Place[] {
        return this._parishes
            .filter(e => e.code.substr(0, 4) == muncipalityCode);
    }

    getCounty(code: string): Place {
        return this._counties.filter(e => e.code == code)[0] || Place.empty();
    }

    getMunicipality(code: string): Place {
        return this._municipalities.filter(e => e.code == code)[0] || Place.empty();
    }

    getParish(code: string): Place {
        return this._parishes.filter(e => e.code == code)[0] || Place.empty();
    }
    
}

export const placeService = new PlaceService()