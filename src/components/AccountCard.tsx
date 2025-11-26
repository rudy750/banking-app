import { Card } from '@/components/ui/card'
import { Account } from '@/lib/types'
import { Bank, CreditCard, PiggyBank } from '@phosphor-icons/react'

interface AccountCardProps {
  account: Account
  onClick?: () => void
}

export function AccountCard({ account, onClick }: AccountCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getIcon = () => {
    switch (account.type) {
      case 'checking':
        return <Bank className="text-accent" size={32} weight="duotone" />
      case 'savings':
        return <PiggyBank className="text-accent" size={32} weight="duotone" />
      case 'credit':
        return <CreditCard className="text-accent" size={32} weight="duotone" />
    }
  }

  return (
    <Card 
      className="p-6 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 border-border"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {getIcon()}
            <div>
              <h3 className="font-semibold text-lg text-foreground">{account.name}</h3>
              <p className="text-sm text-muted-foreground">
                •••• {account.accountNumber.slice(-4)}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              {account.type === 'credit' ? 'Available Credit' : 'Current Balance'}
            </p>
            <p className="text-3xl font-semibold tabular-nums tracking-tight text-foreground">
              {formatCurrency(account.balance)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
