import { TaxTableEntry } from "@/models/TaxTableEntry";

export class LocalStorageService {
    static getTaxTableId(): number {
        return Number.parseInt(localStorage.getItem("tax:table:id") || "0") || 0;
    }

    static setTaxTableId(tableId: number) {
        localStorage.setItem("tax:table:id", tableId.toString());
    }

    static getTaxTable(table: number, year: number): TaxTableEntry[] | null {
        const key = `tax:table:${table}:${year}`;
        const json = localStorage.getItem(key);
        if (json == null)
            return null;

        return JSON.parse(json) as TaxTableEntry[];
    }

    static setTaxTable(table: number, year: number, taxTable: TaxTableEntry[]) {
        const key = `tax:table:${table}:${year}`;
        localStorage.setItem(key, JSON.stringify(taxTable));
    }

    static getVacationDays(): number {
        return Number.parseInt(localStorage.getItem("invoicing:vacation:days") || "30") || 30;
    }

    static setVacationDays(days: number) {
        throw new Error('Method not implemented.');
    }

    static getHourRate(): number {
        return Number.parseInt(localStorage.getItem("invoicing:hour:rate") || "800") || 800;
    }

    static setHourRate(hourRate: number) {
        localStorage.setItem("invoicing:hour:rate", hourRate.toString());
    }

    static getYearlyWorkDays(): number {
        // 160 x 12 = 1920
        // 250 x 8 = 2000;
        return Number.parseInt(localStorage.getItem("invoicing:yearly:workDays") || "2000") || 2000;
    }

    static setYearlyWorkDays(days: number) {
        localStorage.setItem("invoicing:yearly:workDays", days.toString());
    }

    static getChurchMember(): boolean {
        return localStorage.getItem("tax:church:member") == "true";
    }

    static setChurchMember(value: boolean) {
        localStorage.setItem("tax:church:member", value.toString());
    }

    static getTaxCountyCode(): string {
        return localStorage.getItem("tax:county:code") || "";
    }

    static setTaxCountyCode(code: string) {
        localStorage.setItem("tax:county:code", code);
    }

    static getTaxMunicipalityCode(): string {
        return localStorage.getItem("tax:municipality:code") || "";
    }

    static setTaxMunicipalityCode(code: string) {
        localStorage.setItem("tax:municipality:code", code);
    }

    static getTaxParishCode(): string {
        return localStorage.getItem("tax:parish:code") || "";
    }

    static setTaxParishCode(code: string) {
        localStorage.setItem("tax:parish:code", code);
    }
}