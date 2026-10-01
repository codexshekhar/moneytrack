'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import { repaymentSchema, type RepaymentForm } from '@/lib/validations/schemas';
import { formatINR } from '@/lib/utils/money';

interface RepaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: RepaymentForm) => Promise<void>;
  personName: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  type: 'lent' | 'borrowed';
  loading?: boolean;
}

function toDateInputValue(date: Date | null | undefined): string {
  return date ? format(date, 'yyyy-MM-dd') : '';
}

export function RepaymentDialog({
  open,
  onOpenChange,
  onSubmit,
  personName,
  totalAmount,
  paidAmount,
  remainingAmount,
  type,
  loading = false,
}: RepaymentDialogProps) {
  const form = useForm<RepaymentForm>({
    resolver: zodResolver(repaymentSchema),
    defaultValues: {
      amount: 0,
      date: new Date(),
      note: '',
    },
  });

  const newRemaining = Math.max(0, remainingAmount - form.watch('amount'));
  const actionLabel = type === 'lent' ? 'Record Repayment' : 'Record Payment';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{actionLabel} from {personName}</DialogTitle>
          <DialogDescription>
            {type === 'lent' ? 'Record money received back' : 'Record money paid back'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Total Amount</Label>
              <Input value={formatINR(totalAmount)} readOnly />
            </div>
            <div className="space-y-1">
              <Label>Already {type === 'lent' ? 'Received' : 'Paid'}</Label>
              <Input value={formatINR(paidAmount)} readOnly />
            </div>
          </div>

          <div className="space-y-1">
            <Label>Remaining</Label>
            <Input value={formatINR(remainingAmount)} readOnly className="font-semibold text-destructive" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹) *</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              min="1"
              max={remainingAmount}
              step="1"
              {...form.register('amount', { valueAsNumber: true })}
            />
            {form.formState.errors.amount && (
              <p className="text-sm text-destructive">{form.formState.errors.amount.message}</p>
            )}
            <p className="text-sm text-muted-foreground">Max: {formatINR(remainingAmount)}</p>
          </div>

          {form.watch('amount') > 0 && (
            <div className="space-y-1 p-3 rounded-lg bg-muted">
              <Label>New Remaining</Label>
              <Input value={formatINR(newRemaining)} readOnly className="font-semibold" />
              {newRemaining === 0 && (
                <p className="text-sm text-green-600 dark:text-green-400">✓ Will be marked as Paid</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={toDateInputValue(form.watch('date'))}
              onChange={(e) => form.setValue('date', e.target.value ? new Date(e.target.value) : new Date())}
              onBlur={() => form.trigger('date')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input
              id="note"
              placeholder="Add a note..."
              {...form.register('note')}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" loading={loading} disabled={form.watch('amount') <= 0}>
              {actionLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}