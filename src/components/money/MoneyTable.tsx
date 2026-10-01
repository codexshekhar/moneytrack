'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { formatINR, formatDate, getStatusLabel, getStatusColor, getCategoryColor, isOverdue } from '@/lib/utils/money';
import { Search, Filter, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils/money';
import type { LentTransaction, BorrowedTransaction, FilterState, FilterStatus, SortOption } from '@/types';

interface MoneyTableProps<T extends LentTransaction | BorrowedTransaction> {
  data: T[];
  type: 'lent' | 'borrowed';
  loading?: boolean;
  onView: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  onRecordRepayment: (item: T) => void;
  filter: FilterState;
  onFilterChange: (filter: Partial<FilterState>) => void;
}

const statusOptions: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'partially_paid', label: 'Partially Paid' },
  { value: 'paid', label: 'Paid' },
  { value: 'overdue', label: 'Overdue' },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'highest_amount', label: 'Highest Amount' },
  { value: 'lowest_amount', label: 'Lowest Amount' },
  { value: 'due_date', label: 'Due Date' },
];

function formatStatus(status: string) {
  return getStatusLabel(status);
}

function StatusBadge({ status, remainingAmount, dueDate }: { status: string; remainingAmount: number; dueDate?: Date }) {
  const actualStatus = isOverdue(dueDate, remainingAmount) ? 'overdue' : status;
  return (
    <Badge variant="outline" className={getStatusColor(actualStatus)}>
      {formatStatus(actualStatus)}
    </Badge>
  );
}

export function MoneyTable<T extends LentTransaction | BorrowedTransaction>({
  data,
  type,
  loading,
  onView,
  onEdit,
  onDelete,
  onRecordRepayment,
  filter,
  onFilterChange,
}: MoneyTableProps<T>) {
  const filteredData = data
    .filter((item) => {
      if (filter.search) {
        const search = filter.search.toLowerCase();
        return (
          item.personName.toLowerCase().includes(search) ||
          (item.description && item.description.toLowerCase().includes(search))
        );
      }
      return true;
    })
    .filter((item) => {
      if (filter.status === 'all') return true;
      const actualStatus = isOverdue(item.dueDate, item.remainingAmount) ? 'overdue' : item.status;
      return actualStatus === filter.status;
    })
    .sort((a, b) => {
      switch (filter.sort) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest_amount':
          return b.amount - a.amount;
        case 'lowest_amount':
          return a.amount - b.amount;
        case 'due_date':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or description..."
            value={filter.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={filter.status}
            onValueChange={(value) => onFilterChange({ status: value as FilterStatus })}
          >
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filter.sort}
            onValueChange={(value) => onFilterChange({ sort: value as SortOption })}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Person</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">
                  {type === 'lent' ? 'Received' : 'Paid'}
                </TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><div className="h-4 w-3/4 bg-muted rounded animate-pulse" /></TableCell>
                  <TableCell className="text-right"><div className="h-4 w-1/2 bg-muted rounded animate-pulse" /></TableCell>
                  <TableCell className="text-right"><div className="h-4 w-1/2 bg-muted rounded animate-pulse" /></TableCell>
                  <TableCell className="text-right"><div className="h-4 w-1/2 bg-muted rounded animate-pulse" /></TableCell>
                  <TableCell><div className="h-4 w-1/2 bg-muted rounded animate-pulse" /></TableCell>
                  <TableCell><div className="h-4 w-1/4 bg-muted rounded animate-pulse" /></TableCell>
                  <TableCell className="text-right"><div className="h-8 w-8 bg-muted rounded animate-pulse" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="rounded-lg border bg-card p-12 text-center">
          <p className="text-muted-foreground">No transactions found</p>
        </div>
      ) : (
        <div className="rounded-lg border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Person</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">
                  {type === 'lent' ? 'Received' : 'Paid'}
                </TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{item.personName}</TableCell>
                  <TableCell className="text-right font-medium">{formatINR(item.amount)}</TableCell>
                  <TableCell className="text-right">
                    {formatINR('paidAmount' in item ? item.paidAmount : 'repaidAmount' in item ? item.repaidAmount : 0)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-destructive">
                    {formatINR(item.remainingAmount)}
                  </TableCell>
                  <TableCell>
                    {item.dueDate ? (
                      <span className={cn(
                        isOverdue(item.dueDate, item.remainingAmount) ? 'text-destructive font-medium' : ''
                      )}>
                        {formatDate(item.dueDate)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={item.status}
                      remainingAmount={item.remainingAmount}
                      dueDate={item.dueDate}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onView(item)}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}