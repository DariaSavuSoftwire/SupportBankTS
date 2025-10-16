import Transaction from "../model/Transaction.js";

class TransactionRepository {
    private transcationList: Array<Transaction>;
    constructor() {
        this.transcationList = [];
    }
    addTransaction(transaction: Transaction) {
        this.transcationList.push(transaction);
    }
    getAllTransactions(): Array<Transaction> {
        return this.transcationList;
    }
    getTransactionsForUser(owner:string)
    {
        return this.transcationList.filter((transaction:Transaction)=>
            transaction.getTo().getOwner()===owner || transaction.getFrom().getOwner()===owner);
    }
}
export default TransactionRepository;