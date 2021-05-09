import axios from "axios";
import { LocalStorageService } from '@/services/localStorageService';
import { TaxTableEntry } from "@/models/TaxTableEntry";

export class TaxTableService {
    async getTaxAmount(table: number, year: number, grossSalary: number): Promise<number> {
        const promise = new Promise<number>((resolve, reject) => {
            if (!this.resolveGetTaxAmount(table, year, grossSalary, resolve)) {
                this.downloadTaxTableOffset(table, year, grossSalary, 0, resolve, reject);
            }
        });

        return await promise;
    }

    downloadTaxTableOffset(table: number, year: number, grossSalary: number, offset: number, resolve: (value: number | PromiseLike<number>) => void, reject: (reason?: any) => void) {
        console.log("download " + offset);
        axios.get('https://skatteverket.entryscape.net/rowstore/dataset/88320397-5c32-4c16-ae79-d36d95b17b95',
            {
                params: {
                    'tabellnr': table,
                    'år': year,
                    _limit: 100,
                    _offset: offset
                }
            })
            .then(e => {
                const resultCount = Number.parseInt(e.data["resultCount"]);

                const taxTable = LocalStorageService.getTaxTable(table, year)
                    || new Array<TaxTableEntry>();

                e.data["results"]
                    .forEach((row: any) => {
                        const entry = new TaxTableEntry();
                        entry.tax = Number.parseInt(row["kolumn 1"]);
                        entry.from = Number.parseInt(row["inkomst fr.o.m."]);
                        entry.to = Number.parseInt(row["inkomst t.o.m."]);
                        entry.days = row["antal dgr"]
                        taxTable.push(entry);
                    });

                LocalStorageService.setTaxTable(table, year, taxTable);


                if (resultCount > (offset + 100)) {
                    this.downloadTaxTableOffset(table, year, grossSalary, offset + 100, resolve, reject);
                }
                else {
                    this.resolveGetTaxAmount(table, year, grossSalary, resolve);
                }
            })
    }

    resolveGetTaxAmount(table: number, year: number, grossSalary: number, resolve: (value: number | PromiseLike<number>) => void) {
        const taxTable = LocalStorageService.getTaxTable(table, year);
        if (taxTable == null)
            return false;

        const matchedItems = taxTable.filter(e => e.from <= grossSalary && e.to >= grossSalary);

        if (matchedItems.length == 0)
            throw "Could not resolve tax amount";

        const taxEntry = matchedItems[0];
        const taxAmount = taxEntry.days.endsWith("%")
            ? grossSalary * taxEntry.tax / 100
            : taxEntry.tax;

        resolve(taxAmount);
        return true;
    }
}

export const taxTableService = new TaxTableService()