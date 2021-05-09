import { taxTableService } from "@/services/taxTableService";

export class CalculationYear {
    private baseAmount = 47600;
    //private const raisedBaseAmount = 48600;
    public workDays!: number;
    public vacationDays!: number;
    public hourRate!: number;
    public brokerFee = 10;
    public grossSalaryMonthly = 680400 / 12;
    public vacationSalary = 11340;
    public pensionSavings = 0;

    public invoiced(): number {
        return (this.workDays - this.vacationDays) * 8 * this.hourRate;
    }

    public grossSalary(): number {
        return this.grossSalaryMonthly * 12;
    }

    public brokerCost(): number {
        return -this.invoiced() * this.brokerFee / 100;
    }

    public socialFee(): number {
        return (-this.grossSalary() * 0.3142)
            + (-this.vacationSalary * 0.3142)
            + (-this.pensionSavings * 0.2426);
    }

    public pensionSalary(): number {
        return -this.pensionSavings;
    }

    public companyResult(): number {
        return this.invoiced()
            + this.brokerCost()
            + this.socialFee()
            + this.pensionSalary()
            - this.pensionItpk()
            - this.grossSalary()
            - this.vacationSalary;
    }

    public companyTaxRate(): number {
        return 21;
    }

    public companyTax(): number {
        return -this.companyResult() * this.companyTaxRate() / 100;
    }

    public companyBalance(): number {
        return this.companyResult() + this.companyTax();
    }

    public pensionItpk(): number {
        return this.grossSalary() * 0.02;
    }

    public async privateTaxAmount(): Promise<number> {
        const monthlyGrossSalary = (this.grossSalary() + this.vacationSalary) / 12;
        const taxAmount = await taxTableService.getTaxAmount(33, 2021, monthlyGrossSalary);
        return -taxAmount * 12;
    }

    public async privateNetSalary(): Promise<number> {
        return this.grossSalary() + this.vacationSalary + await this.privateTaxAmount();
    }
}