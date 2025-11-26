export type AccountType = 'checking' | 'savings' | 'credit'

export interface Account {
  id: string
  name: string
  type: AccountType
  balance: number
  accountNumber: string
}

export interface Transaction {
  id: string
  accountId: string
  date: string
  description: string
  amount: number
  category: string
  type: 'debit' | 'credit'
}

export interface Transfer {
  id: string
  fromAccountId: string
  toAccountId: string
  amount: number
  date: string
  status: 'completed' | 'pending'
}
