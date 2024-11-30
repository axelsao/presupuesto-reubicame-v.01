'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CURRENCIES, type CurrencyCode } from '@/lib/constants/currencies';

interface CurrencySelectorProps {
  value: CurrencyCode;
  onChange: (value: CurrencyCode) => void;
}

export function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  return (
    <Select value={value} onValueChange={(value) => onChange(value as CurrencyCode)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(CURRENCIES).map(([code, { name, symbol }]) => (
          <SelectItem key={code} value={code}>
            {symbol} {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}