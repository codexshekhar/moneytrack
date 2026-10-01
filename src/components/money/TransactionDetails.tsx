'use client';

import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import { Badge } from '@/components/ui/Badge';
import { formatINR, formatDate, getStatusLabel, getStatusColor, getCategoryColor } from '@/lib/utils/money';
import { Users, ArrowUpDown, Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils/money';

interface TransactionDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: {
    id: string;
    personName: string;
    amount: number;
    paidAmount?: number;
    repaidAmount?: number;
    remainingAmount: number;
    date: Date;
    dueDate?: Date;
    category: string;
    description?: string;
    status: string;
  } | null;
  type: 'lent' | 'borrowed';
  onRecordRepayment: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TransactionDetails({
  open,
  onOpenChange,
  transaction,
  type,
  onRecordRepayment,
  onEdit,
  onDelete,
}: TransactionDetailsProps) {
  if (!transaction) return null;

  const paidAmount = 'paidAmount' in transaction ? transaction.paidAmount : transaction.repaidAmount;
  const isPaid = transaction.status === 'paid';
  const isOverdue = transaction.status === 'overdue';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-lg">{transaction.personName}</DialogTitle>
              <DialogDescription>
                {type === 'lent' ? 'Money Lent' : 'Money Borrowed'}
              </DialogDescription>
            </div>
            <Badge
              variant={isPaid ? 'success' : isOverdue ? 'destructive' : 'warning'}
              className={cn(getStatusColor(transaction.status), 'text-xs')}
            >
              {getStatusLabel(transaction.status)}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="font-semibold text-lg">{formatINR(transaction.amount)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {type === 'lent' ? 'Received' : 'Paid'}
              </p>
              <p className="font-semibold text-lg">{formatINR(paidAmount ?? 0)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="font-semibold text-lg text-destructive">{formatINR(transaction.remainingAmount)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Category</p>
              <Badge variant="outline" className={getCategoryColor(transaction.category)}>
                {transaction.category}
              </Badge>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Date: {formatDate(transaction.date, 'long')}</span>
            </div>
            {transaction.dueDate && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className={cn('h-4 w-4', isOverdue ? 'text-destructive' : 'text-muted-foreground')} />
                <span className={isOverdue ? 'text-destructive font-medium' : ''}>
                  Due: {formatDate(transaction.dueDate, 'long')}
                  {isOverdue && ' (OVERDUE)'}
                </span>
              </div>
            )}
            {transaction.description && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-sm">{transaction.description}</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2">
          {!isPaid && (
            <Button className="w-full" onClick={onRecordRepayment} variant="default">
              {type === 'lent' ? 'Record Repayment' : 'Record Payment'}
            </Button>
          )}
          <Button className="w-full" variant="outline" onClick={onEdit}>
            Edit
          </Button>
          <Button className="w-full" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}