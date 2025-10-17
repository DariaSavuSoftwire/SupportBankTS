class Transaction {
    private date: Date;
    private transferredFrom: string;
    private transferredTo: string;
    private description: string;
    private amount: number;

    constructor(date: Date, from: string, to: string, description: string, amount: number) {
        this.date = date;
        this.transferredFrom = from;
        this.transferredTo = to;
        this.description = description;
        this.amount = amount;
    }
    getTransferredFrom(): string {
        return this.transferredFrom;
    }
    getTransferredTo(): string {
        return this.transferredTo;
    }
    getAmount(): number {
        return this.amount;
    }
    toString(): string {
        return `Transaction done on ${this.date.toLocaleDateString('en-UK')} with description ${this.description}`;
    }
}

export default Transaction;