import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Account, Transaction } from '@/lib/types'
import { AccountCard } from '@/components/AccountCard'
import { TransactionList } from '@/components/TransactionList'
import { TransferDialog } from '@/components/TransferDialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Bank, 
  ArrowsLeftRight, 
  List,
  ChartLine
} from '@phosphor-icons/react'
import { Toaster } from '@/components/ui/sonner'
import { Card } from '@/components/ui/card'
import sampleData from '@/data/sample-data.json'

function App() {
  const [accounts, setAccounts] = useKV<Account[]>('accounts', [])
  const [transactions, setTransactions] = useKV<Transaction[]>('transactions', [])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    if (!dataLoaded && (!accounts || accounts.length === 0) && (!transactions || transactions.length === 0)) {
      setAccounts(sampleData.accounts as Account[])
      setTransactions(sampleData.transactions as Transaction[])
      setDataLoaded(true)
    }
  }, [dataLoaded, accounts, transactions, setAccounts, setTransactions])
  const [transferDialogOpen, setTransferDialogOpen] = useState(false)
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)

  const handleTransfer = (fromId: string, toId: string, amount: number) => {
    setAccounts((currentAccounts) => {
      if (!currentAccounts) return []
      return currentAccounts.map((account) => {
        if (account.id === fromId) {
          return { ...account, balance: account.balance - amount }
        }
        if (account.id === toId) {
          return { ...account, balance: account.balance + amount }
        }
        return account
      })
    })

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      accountId: fromId,
      date: new Date().toISOString(),
      description: `Transfer to ${(accounts || []).find(a => a.id === toId)?.name}`,
      amount: amount,
      category: 'Transfer',
      type: 'debit'
    }

    const receivingTransaction: Transaction = {
      id: (Date.now() + 1).toString(),
      accountId: toId,
      date: new Date().toISOString(),
      description: `Transfer from ${(accounts || []).find(a => a.id === fromId)?.name}`,
      amount: amount,
      category: 'Transfer',
      type: 'credit'
    }

    setTransactions((currentTransactions) => [
      receivingTransaction,
      newTransaction,
      ...(currentTransactions || [])
    ])
  }

  const getTotalBalance = () => {
    if (!accounts) return 0
    return accounts.reduce((sum, account) => {
      if (account.type === 'credit') {
        return sum
      }
      return sum + account.balance
    }, 0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const filteredTransactions = selectedAccountId
    ? (transactions || []).filter((t) => t.accountId === selectedAccountId)
    : (transactions || [])

  const recentTransactions = filteredTransactions.slice(0, 5)

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bank size={32} weight="duotone" />
              <h1 className="text-2xl font-bold tracking-tight">Chase Banking</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <Card className="bg-gradient-to-br from-primary to-accent p-8 text-white border-0">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm font-medium text-white/80 uppercase tracking-wide mb-2">
                  Total Balance
                </p>
                <p className="text-5xl font-semibold tabular-nums tracking-tight">
                  {formatCurrency(getTotalBalance())}
                </p>
              </div>
              <Button
                onClick={() => setTransferDialogOpen(true)}
                size="lg"
                variant="secondary"
                className="gap-2 font-semibold"
              >
                <ArrowsLeftRight size={20} weight="bold" />
                Transfer Money
              </Button>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview" className="gap-2">
              <ChartLine size={18} />
              Overview
            </TabsTrigger>
            <TabsTrigger value="accounts" className="gap-2">
              <Bank size={18} />
              Accounts
            </TabsTrigger>
            <TabsTrigger value="transactions" className="gap-2">
              <List size={18} />
              Transactions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Your Accounts</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {(accounts || []).map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    onClick={() => setSelectedAccountId(account.id)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-foreground">Recent Activity</h2>
                {(transactions || []).length > 5 && (
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                )}
              </div>
              <TransactionList transactions={recentTransactions} />
            </div>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">All Accounts</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {(accounts || []).map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    onClick={() => setSelectedAccountId(account.id)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">All Transactions</h2>
              {selectedAccountId && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedAccountId(null)}
                >
                  Show All Accounts
                </Button>
              )}
            </div>
            <TransactionList transactions={filteredTransactions} />
          </TabsContent>
        </Tabs>
      </main>

      <TransferDialog
        open={transferDialogOpen}
        onOpenChange={setTransferDialogOpen}
        accounts={accounts || []}
        onTransfer={handleTransfer}
      />

      <Toaster position="top-right" />
    </div>
  )
}

export default App