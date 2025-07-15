const account = {
  name: "Alex",
  balance: 0,
  credit: function(amount) {
    this.balance += amount;
  }, //this function adds the amount credited/debited to the balance of this account
  describe: function() {
    return "owner: " + this.name + ", balance " + this.balance;
  } //prints out all the info associated with the account
};

console.log(account.describe());

account.credit(250);
account.credit(-80);

console.log(account.describe());
