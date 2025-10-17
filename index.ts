import fs from 'fs'
import  readlineSync from 'readline-sync'

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
        const [date,fromAccount,toAccount,description,amount]=row.split(',');
        const transactionDate:Date=parse(date ?? "","dd/MM/yyyy",new Date());
        accountRepository.addAccount(fromAccount ?? "")
        accountRepository.addAccount(toAccount ?? "")
        transactionRepository.addTransaction(new Transaction(transactionDate,fromAccount ?? "",toAccount ?? "",description ?? "",Number(amount)))

    }
}

function main()
{
    setUp()
    while (true){
        console.log("The options are:");
        console.log(" 1. List all accounts");
        console.log(" 2. List all transactions");
        console.log(" 3. Exit");

        const userInput:string = readlineSync.question("Choose an option: ");
        if(userInput==="1"){
            console.log("The accounts are:");
            const balanceOfAccounts: Map<string,number>=transactionRepository.getBalanceForAllUser(accountRepository.getAllAccounts())
            for (const [name, balance] of balanceOfAccounts)
            {
                console.log(`Account of ${name} with balance of ${balance.toFixed(2)}`);
            }
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
