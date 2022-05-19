import { Account } from "./account";

describe("AccountService", () => {
  const mockedPrint = jest.fn();

  beforeEach(() => {
    mockedPrint.mockClear();
  });

  describe("Deposit Method", () => {
    test("should save 100 to bank account and print statements", () => {
      const account = new Account({print: mockedPrint}); 
  
      account.deposit(100)
      account.printStatements();
  
      expect(mockedPrint).toBeCalledWith("19/05/2022 || 100 || 100");
    });
  
    test("should save 200 to bank account and print statements", () => {
      const account = new Account({print: mockedPrint}); 
  
      account.deposit(200)
      account.printStatements();
  
      expect(mockedPrint).toBeCalledWith("19/05/2022 || 200 || 200");
    });
  
    test("should save 100 and 200 to bank account with different transactions and print statements", () => {
      const account = new Account({print: mockedPrint}); 
  
      account.deposit(100)
      account.deposit(200)
      account.printStatements();
  
      expect(mockedPrint).toBeCalledWith("19/05/2022 || 100 || 100\n19/05/2022 || 200 || 300");
    });
  })

   describe("Withdraw methods", () => {
     test("should deduct 50 from bank account with initial balance of 50 and print statements", () => {
       const account = new Account({initialBalance: 50, print: mockedPrint});

       account.withdraw(50);
       account.printStatements();

       expect(mockedPrint).toBeCalledWith("19/05/2022 || -50 || 0");
     })

     test("should throw an error when deducting 50 at a balance of 0", () => {
      const account = new Account({print: mockedPrint});

      expect(() => {
        account.withdraw(50);
      }).toThrow("Balance not sufficient!");
      
      account.printStatements();

      expect(mockedPrint).toBeCalledWith("");
     })

     test("should throw an error when trying to initialise the balance with a negative value", () => {
      expect(() => {
        new Account({initialBalance: -20, print: mockedPrint});
      }).toThrow("Initial balance must not be negative!");
    })
   })
});