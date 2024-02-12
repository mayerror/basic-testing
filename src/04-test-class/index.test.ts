// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';
import _ from 'lodash';

describe('BankAccount', () => {
  const bankAccount = getBankAccount(1000);
  const otherBankAccount = getBankAccount(4000);

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount.withdraw(1100);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      bankAccount.transfer(1100, otherBankAccount);
    }).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount.transfer(1100, bankAccount);
    }).toThrow();
  });

  test('should deposit money', () => {
    bankAccount.deposit(2000);
    expect(bankAccount.getBalance()).toBe(3000);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(1000);
    expect(bankAccount.getBalance()).toBe(2000);
  });

  test('should transfer money', () => {
    bankAccount.transfer(500, otherBankAccount);
    expect(bankAccount.getBalance()).toBe(1500);
    expect(otherBankAccount.getBalance()).toBe(4500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const random = jest.spyOn(_, 'random').mockReturnValue(1);
    const balance = await bankAccount.fetchBalance();
    expect(balance).toBe(1);
    random.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const random = jest.spyOn(_, 'random').mockReturnValue(1);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(1);
    random.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const random = jest.spyOn(_, 'random').mockReturnValue(0);
    await expect(async () => {
      await bankAccount.synchronizeBalance();
    }).rejects.toThrow(SynchronizationFailedError);
    random.mockRestore();
  });
});
