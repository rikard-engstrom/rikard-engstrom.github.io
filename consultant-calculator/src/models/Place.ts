export class Place {
    code!: string;
    name!: string;

    constructor(place: string[]) {
        this.code = place[0];
        this.name = place[1];
    }

    static empty(): Place {
        return new Place(["", ""])
    }
}