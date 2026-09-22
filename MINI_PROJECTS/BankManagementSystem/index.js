class BankAccount {
  #balance;

  constructor(accountHolderName, balance) {
    this.accountHolderName = accountHolderName;
    this.#balance = balance;
  }

  getBalance() {
    return this.#balance;
  }

  deposit(amount) {
    if (amount <= 0) {
        console.log("Invalid amount");
        return;
    }

    this.#balance = this.#balance + amount;
}

  withdraw(amount) {
    if (amount > this.#balance) {
      console.log("Insufficient balance");
      return;
    }

    this.#balance = this.#balance - amount;
  }

  getAccountType() {
    console.log("This is a Bank Account");
  }
}

class SavingBankAccount extends BankAccount {
  constructor(accountHolderName, balance, interestRate) {
    super(accountHolderName, balance);
    this.interestRate = interestRate;
  }

  getAccountType() {
    console.log("This is a Saving Bank Account");
  }
}

// Bank Account
let sarvendraSBI = new BankAccount("Sarvendra Vikram Singh", 5000);

console.log(sarvendraSBI.accountHolderName);
console.log(sarvendraSBI.getBalance());

sarvendraSBI.deposit(2000);

console.log(sarvendraSBI.getBalance());

sarvendraSBI.withdraw(1000);

console.log(sarvendraSBI.getBalance());

sarvendraSBI.getAccountType();

// Saving Bank Account
let manishSBI = new SavingBankAccount("Manish", 12000, 8);

console.log(manishSBI.accountHolderName);
console.log(manishSBI.getBalance());
console.log(manishSBI.interestRate);

manishSBI.deposit(1000);

console.log(manishSBI.getBalance());

manishSBI.getAccountType();




// 4 pillars of OOPs.
// Encapsulation → #balance
// Inheritance → SavingBankAccount extends BankAccount
// Polymorphism → overridden getAccountType()
// Abstraction → users interact through deposit(), withdraw(), and getBalance()