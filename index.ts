import fs from 'fs'
import  readlineSync from 'readline-sync'

import Account from "./model/Account.js";
import AccountRepository from "./repository/AccountRepository.js";
import TransactionRepository from "./repository/TransactionRepository.js";
import Transaction from "./model/Transaction.js";
import {parse} from "date-fns";

const accountRepository=new AccountRepository();
const transactionRepository=new TransactionRepository();

function setUp(){

    const data=fs.readFileSync('data/Transactions2014.csv','utf8')
    let rows:string[]=data.split("\n");
    rows.shift();

    for(let row of rows){
        const [date,from,to,description,amount]=row.split(',');
        const transactionDate:Date=parse(date??"","dd/MM/yyyy",new Date());
        const fromAccount:Account=accountRepository.findAccount(from??"")
        const toAccount:Account=accountRepository.findAccount(to??"")

        fromAccount.changeBalance(-Number(amount))
        toAccount.changeBalance(Number(amount))
        transactionRepository.addTransaction(new Transaction(transactionDate,fromAccount,toAccount,description?? ""))

    }
}

function main()
{
    setUp()
    while (true){
        console.log("The options are:");
        console.log(" 1. List all accoun3ts");
        console.log(" 2. List all transactions");
        console.log(" 3. Exit");

        const userInput:string = readlineSync.question("Choose an option: ");
        if(userInput==="1"){
            console.log("The accounts are:");
            accountRepository.getAllAccounts().forEach(account=>{console.log(account.toString())})
            console.log("");
        }
        else if(userInput==="2"){
            const accOwner:string = readlineSync.question("Choose the account owner: ");
            const transactions:Array<Transaction>=transactionRepository.getTransactionsForUser(accOwner);
            transactions.forEach(transaction=>{console.log(transaction.toString())})
            console.log("");
        }
        else if(userInput==="3")
            break
        else
        {
            console.log("Please enter a valid option:\n ");
        }

    }
}
main();
