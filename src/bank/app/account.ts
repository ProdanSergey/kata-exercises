import { timeStamp } from "../utils/timestamp";

interface AccountService {
  deposit(amount: number): void
  withdraw(amount: number): void
  printStatements(): void
}

type Print = (bankStatement: string) => void;

export class Account implements AccountService {  
  private readonly print: Print
  private balance: number;
  private transactions = []; 

  constructor({initialBalance = 0, print}: {initialBalance?: number, print: Print}) {
    if (initialBalance < 0) {
      throw("Initial balance must not be negative!")
    }
    this.balance = initialBalance;
    this.print = print;
  }
  
  deposit(amount: number): void {
    this.balance += amount;

    this.transactions.push(this.createTransaction(amount));
  }

  private createTransaction(amount: number): string {
    return `${this.getTimestamp()} || ${amount} || ${this.balance}`;
  }

  withdraw(amount: number): void {
    if (this.balance < amount) {
      throw("Balance not sufficient!");
    }
    this.balance -= amount;

    this.transactions.push(this.createTransaction(-amount))
  }

  printStatements(): void {
    this.print(this.transactions.join("\n"));
  }

  private getTimestamp(): string {
    return timeStamp(new Date());
  }
};