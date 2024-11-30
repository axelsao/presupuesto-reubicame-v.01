export const CURRENCIES = {
  EUR: { symbol: '€', name: 'Euro', rate: 1 },
  USD: { symbol: '$', name: 'US Dollar', rate: 1.09 },
  GBP: { symbol: '£', name: 'British Pound', rate: 0.86 },
  JPY: { symbol: '¥', name: 'Japanese Yen', rate: 162.45 },
  AUD: { symbol: 'A$', name: 'Australian Dollar', rate: 1.66 },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', rate: 1.47 },
  MXN: { symbol: 'MX$', name: 'Mexican Peso', rate: 18.45 },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

export function convertCurrency(amount: number, from: CurrencyCode, to: CurrencyCode): number {
  const fromRate = CURRENCIES[from].rate;
  const toRate = CURRENCIES[to].rate;
  return (amount / fromRate) * toRate;
}