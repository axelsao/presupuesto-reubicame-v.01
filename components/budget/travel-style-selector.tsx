'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Plane, Hotel, Crown } from 'lucide-react';
import { TRAVEL_STYLES } from '@/lib/constants/travel-styles';

const STYLE_ICONS = {
  budget: Plane,
  standard: Hotel,
  luxury: Crown,
} as const;

interface TravelStyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TravelStyleSelector({ value, onChange }: TravelStyleSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {TRAVEL_STYLES.map((style) => {
        const Icon = STYLE_ICONS[style.id as keyof typeof STYLE_ICONS];
        return (
          <Card
            key={style.id}
            className={cn(
              'relative p-6 cursor-pointer transition-all duration-300',
              value === style.id
                ? 'neon-border bg-primary/10'
                : 'hover:bg-primary/5'
            )}
            onClick={() => onChange(style.id)}
          >
            <Icon className={cn(
              'h-8 w-8 mb-3 transition-colors duration-300',
              value === style.id ? 'text-primary' : 'text-muted-foreground'
            )} />
            <h3 className={cn(
              'text-lg font-semibold mb-2',
              value === style.id && 'text-primary'
            )}>
              {style.title}
            </h3>
            <p className="text-sm text-muted-foreground">{style.description}</p>
          </Card>
        );
      })}
    </div>
  );
}