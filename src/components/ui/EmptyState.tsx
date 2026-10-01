import { ReactNode } from 'react';
import { Plus, Users, ArrowUpDown, Target, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils/money';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    href?: string;
  };
  variant?: 'lent' | 'borrowed' | 'savings' | 'default';
}

export function EmptyState({ icon, title, description, action, variant = 'default' }: EmptyStateProps) {
  const defaultIcons = {
    lent: <Users className="h-12 w-12 text-muted-foreground/50" />,
    borrowed: <ArrowUpDown className="h-12 w-12 text-muted-foreground/50" />,
    savings: <Target className="h-12 w-12 text-muted-foreground/50" />,
    default: <Plus className="h-12 w-12 text-muted-foreground/50" />,
  };

  return (
    <Card className="py-12 text-center">
      <CardContent className="pt-6">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
          {icon || defaultIcons[variant]}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mb-6 text-muted-foreground">{description}</p>
        {action && (
          <Button onClick={action.onClick} asChild>
            {action.href ? (
              <a href={action.href}>{action.label}</a>
            ) : (
              <button type="button">{action.label}</button>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}