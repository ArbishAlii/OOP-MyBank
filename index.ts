#! /usr/bin/env node
import inquirer from "inquirer";

//bank account interface
interface BankAccount {
    accountNum: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

//bank account class 
class BankAccount implements BankAccount {
    accountNum: number;
    balance: number;
    constructor(accountNum: number, balance: number) {
        this.accountNum = accountNum
        this.balance = balance
    }

    //debit money
    withdraw(amount: number): void {
        if (this.balance >= this.balance) {
            this.balance -= amount
            console.log(`Withdrawal of $${amount} successful. Remaining balance is ${this.balance}`);

        }
        else {
            console.log("Insufficient Balance.");

        }
    }

    //Credit Money
    deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1; //$1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} sucessful. Remaining balance is $${this.balance}`);

    }

    //check balance
    checkBalance(): void {
        console.log(`Current balance is $${this.balance}`);
    }
}
//customer class
class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNum: number;
    account: BankAccount
    constructor(firstName: string,
        lastName: string,
        gender: string,
        age: number,
        mobileNum: number,
        account: BankAccount) {
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age = age
        this.mobileNum = mobileNum
        this.account = account
    }
}


//create bank account 
const accounts: BankAccount[] = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
]

// 
const customers: Customer[] = [
    new Customer("Hamza", "Khan", "Male", 24, 3125674129, accounts[0]),
    new Customer("Ahmed", "Khan", "Male", 22, 3125674128, accounts[1]),
    new Customer("Arbish", "Ali", "Female", 21, 3125674127, accounts[2])
]

//function to interact with bank account
async function service() {
    do {
        const AccountNumInput = await inquirer.prompt([
            {
                name: "accountNumber",
                type: "number",
                message: "Enter your Account Number:"
            }

        ])
        const customer = customers.find((customer) => customer.account.accountNum == AccountNumInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}! \n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an Operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit:"
                        }
                    ])
                    customer.account.deposit(depositAmount.amount)
                    break;

                case "Withdraw":
                    const withdraw = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw:"
                        }
                    ])
                    customer.account.withdraw(withdraw.amount)
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;

                case "Exit":
                    console.log("Exiiting bank program..");
                    console.log("\n Thanks for using our services \n\t");
                    return;

            }

        } else {
            console.log("Invalid Account Number. Please try Again!");

        }
    } while (true)
}

service();