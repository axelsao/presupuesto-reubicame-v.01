'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bed, UtensilsCrossed, Bus, Ticket, Package, Share2 } from 'lucide-react';
import { CurrencySelector } from './currency-selector';
import { CURRENCIES, type CurrencyCode, convertCurrency } from '@/lib/constants/currencies';

interface BudgetSummaryProps {
  budget: {
    total: number;
    perPerson: number;
    breakdown: {
      accommodation: number;
      food: number;
      transportation: number;
      activities: number;
      misc: number;
    };
  };
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onShare?: () => void;
}

const CATEGORY_LABELS = {
  accommodation: {
    title: 'Hospedaje',
    description: 'Incluye hoteles, hostales o apartamentos según el estilo seleccionado',
    icon: Bed
  },
  food: {
    title: 'Comida',
    description: 'Contempla todas las comidas diarias y opciones de restaurantes',
    icon: UtensilsCrossed
  },
  transportation: {
    title: 'Transporte',
    description: 'Traslados locales, taxis y transporte público',
    icon: Bus
  },
  activities: {
    title: 'Actividades',
    description: 'Tours, atracciones y experiencias culturales',
    icon: Ticket
  },
  misc: {
    title: 'Otros Gastos',
    description: 'Imprevistos, compras pequeñas y gastos varios',
    icon: Package
  }
};

export function BudgetSummary({ budget, currency, onCurrencyChange, onShare }: BudgetSummaryProps) {
  const formatCurrency = (amount: number) => {
    const convertedAmount = convertCurrency(amount, 'EUR', currency);
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
    }).format(convertedAmount);
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold gradient-text">
          Resumen del Presupuesto
        </h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={onShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <CurrencySelector value={currency} onChange={onCurrencyChange} />
        </div>
      </div>

      <Card className="bg-black/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl gradient-text">Total Estimado</CardTitle>
          <CardDescription>
            Desglose estimado de gastos para tu viaje
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold neon-glow">{formatCurrency(budget.total)}</p>
          <p className="text-lg text-primary mt-2">
            {formatCurrency(budget.perPerson)} por persona
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {Object.entries(budget.breakdown).map(([category, amount]) => {
          const CategoryIcon = CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS].icon;
          return (
            <Card key={category} className="bg-black/30">
              <CardHeader className="py-2">
                <div className="flex items-center gap-2">
                  <CategoryIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">
                    {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS].title}
                  </CardTitle>
                </div>
                <CardDescription>
                  {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-primary">
                  {formatCurrency(amount)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {Math.round((amount / budget.total) * 100)}% del total
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}