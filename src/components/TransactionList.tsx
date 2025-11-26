import { Transaction } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingCart, 
  Coffee, 
  Car, 
  House, 
  Wallet,
  ArrowUp,
  ArrowDown
} from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'shopping':
        return <ShoppingCart size={20} weight="duotone" />
      case 'dining':
        return <Coffee size={20} weight="duotone" />
      case 'transportation':
        return <Car size={20} weight="duotone" />
      case 'housing':
        return <House size={20} weight="duotone" />
      default:
        return <Wallet size={20} weight="duotone" />
    }
  }

  if (transactions.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Wallet size={48} className="mx-auto text-muted-foreground mb-4" weight="duotone" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No transactions yet</h3>
        <p className="text-sm text-muted-foreground">
          Your transaction history will appear here
        </p>
      </Card>
    )
  }

  return (
    <Card className="divide-y divide-border">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="px-6 py-4 hover:bg-muted/30 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className={`p-2 rounded-full ${
                transaction.type === 'credit' ? 'bg-success/10 text-success' : 'bg-muted'
              }`}>
                {getCategoryIcon(transaction.category)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {transaction.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-muted-foreground">
                    {formatDate(transaction.date)}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {transaction.category}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <div className={`${
                transaction.type === 'credit' ? 'text-success' : 'text-foreground'
              }`}>
                {transaction.type === 'credit' ? (
                  <ArrowDown size={16} weight="bold" />
                ) : (
                  <ArrowUp size={16} weight="bold" />
                )}
              </div>
              <p className={`font-semibold tabular-nums ${
                transaction.type === 'credit' ? 'text-success' : 'text-foreground'
              }`}>
                {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Card>
  )
}
