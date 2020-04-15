import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface createTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (sum, transaction) => {
        const key = transaction.type;
        sum[key] = sum[key] + transaction.value;
        return sum;
      },
      { income: 0, outcome: 0 },
    );

    const balance: Balance = { income, outcome, total: income - outcome };
    return balance;
  }

  public create({ title, value, type }: createTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
