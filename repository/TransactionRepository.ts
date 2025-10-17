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
    getTransactionsForUser(owner: string)
    {
        return this.transcationList.filter((transaction:Transaction)=>
            transaction.getTransferredTo()===owner || transaction.getTransferredFrom()===owner);
    }
    getBalanceForAllUser(users:Set<string>)
    {
        let accountBalanceForUsers:Map<string, number>=new Map<string, number>();
        users.forEach(user => {accountBalanceForUsers.set(user,0)})
        this.transcationList.forEach(transaction => {
            if(accountBalanceForUsers.has(transaction.getTransferredTo()))
            {
                const currentBalance = accountBalanceForUsers.get(transaction.getTransferredTo())!;
                accountBalanceForUsers.set(transaction.getTransferredTo(),currentBalance+transaction.getAmount());
            }
            if(accountBalanceForUsers.has(transaction.getTransferredFrom()))
            {
                const currentBalance = accountBalanceForUsers.get(transaction.getTransferredFrom())!;
                accountBalanceForUsers.set(transaction.getTransferredFrom(),currentBalance-transaction.getAmount());
            }
        })
        return accountBalanceForUsers;
    }
}
export default TransactionRepository;