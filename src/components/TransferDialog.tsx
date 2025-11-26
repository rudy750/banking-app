import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Account } from '@/lib/types'
import { toast } from 'sonner'

interface TransferDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  accounts: Account[]
  onTransfer: (fromId: string, toId: string, amount: number) => void
}

export function TransferDialog({
  open,
  onOpenChange,
  accounts,
  onTransfer,
}: TransferDialogProps) {
  const [fromAccount, setFromAccount] = useState<string>('')
  const [toAccount, setToAccount] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  const handleTransfer = () => {
    const transferAmount = parseFloat(amount)

    if (!fromAccount || !toAccount) {
      toast.error('Please select both accounts')
      return
    }

    if (fromAccount === toAccount) {
      toast.error('Cannot transfer to the same account')
      return
    }

    if (isNaN(transferAmount) || transferAmount <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    const sourceAccount = accounts.find((a) => a.id === fromAccount)
    if (sourceAccount && transferAmount > sourceAccount.balance) {
      toast.error('Insufficient funds')
      return
    }

    onTransfer(fromAccount, toAccount, transferAmount)
    toast.success('Transfer completed successfully')
    
    setFromAccount('')
    setToAccount('')
    setAmount('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Transfer Money</DialogTitle>
          <DialogDescription>
            Move funds between your accounts securely
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="from-account">From Account</Label>
            <Select value={fromAccount} onValueChange={setFromAccount}>
              <SelectTrigger id="from-account">
                <SelectValue placeholder="Select source account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name} - {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(account.balance)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-account">To Account</Label>
            <Select value={toAccount} onValueChange={setToAccount}>
              <SelectTrigger id="to-account">
                <SelectValue placeholder="Select destination account" />
              </SelectTrigger>
              <SelectContent>
                {accounts
                  .filter((account) => account.id !== fromAccount)
                  .map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleTransfer}>
            Transfer Funds
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
