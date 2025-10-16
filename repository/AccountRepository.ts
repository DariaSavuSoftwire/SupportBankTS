import  Account from "../model/Account.js";

class AccountRepository {
    private accountList: Array<Account>;
    constructor() {
        this.accountList = [];
    }

    findAccount(owner: string):Account {
        const existingAccount:Account|undefined=this.accountList.find(acc=>acc.getOwner()===owner);
        if(existingAccount) {
            return existingAccount;
        }

        const newAccount:Account = new Account(owner,0);
        this.accountList.push(newAccount);
        return newAccount;
    }
    getAllAccounts():Array<Account> {
        return this.accountList;
    }
}

export default AccountRepository;