class Account {
    private owner:string;
    private balance:number;

    constructor(owner:string, balance:number) {
        this.owner = owner;
        this.balance = balance;
    }
    getOwner():string {
        return this.owner;
    }
    getBalance():number{
        return this.balance;
    }
    changeBalance(amount:number):void{
        this.balance+= amount;
    }
    toString():string
    {
        return `The account of ${this.owner} with a balance of ${this.balance.toFixed(2)}`;
    }

}
export default Account;