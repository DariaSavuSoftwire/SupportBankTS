class AccountRepository {
    private accountList: Set<string>;
    constructor() {
        this.accountList = new Set<string>();
    }
    addAccount(owner: string): void {
        this.accountList.add(owner);
    }
    getAllAccounts():Set<string> {
        return this.accountList;
    }
}

export default AccountRepository;