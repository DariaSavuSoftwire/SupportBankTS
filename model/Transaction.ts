import Account from './Account.js';
class Transaction {
    private date: Date;
    private from:Account;
    private to:Account;
    private description:string;

    constructor(date:Date, from:Account,to:Account,description:string) {
        this.date = date;
        this.from = from;
        this.to = to;
        this.description = description;
    }
    getFrom():Account
    {
        return this.from;
    }
    getTo():Account
    {
        return this.to;
    }
    toString():string
    {
        return `Transaction done on ${this.date.toLocaleDateString('en-UK')} with description ${this.description}`;
    }
}

export default Transaction;