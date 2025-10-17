import Transaction from "../model/Transaction.js";
import transaction from "../model/Transaction.js";

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
    getTransactionsForUser(owner: string)
    {
        return this.transcationList.filter((transaction:Transaction)=>
            transaction.getTransferredTo()===owner || transaction.getTransferredFrom()===owner);
    }
    getBalanceForAllUser()
    {
        let accountBalanceForUsers: Record<string,number>;
        this.transcationList.forEach(transaction => {
            accountBalanceForUsers[transaction.getTransferredTo()]-=transaction.getAmount();
            accountBalanceForUsers[transaction.getTransferredTo()]+=transaction.getAmount();
        })
        return accountBalanceForUsers;
    }
}
export default TransactionRepository;