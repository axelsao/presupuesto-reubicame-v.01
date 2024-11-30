'use client';

import { useState } from 'react';
import { BudgetForm } from './budget-form';
import { BudgetSummary } from './budget-summary';
import { PremiumBudgetDialog } from './premium-budget-dialog';
import { SocialShare } from './social-share';
import { ItineraryPreview } from './itinerary-preview';
import { calculateBudget } from '@/lib/budget-calculator';
import { cn } from '@/lib/utils';
import type { DestinationId } from '@/lib/constants/destinations';
import type { TravelStyleId } from '@/lib/constants/travel-styles';
import type { CurrencyCode } from '@/lib/constants/currencies';

interface BudgetFormValues {
  duration: number;
  travelers: number;
  destination: DestinationId;
  travelStyle: TravelStyleId;
}

interface BudgetResult {
  total: number;
  perPerson: number;
  breakdown: {
    accommodation: number;
    food: number;
    transportation: number;
    activities: number;
    misc: number;
  };
}

export function BudgetCalculator() {
  const [budgetResult, setBudgetResult] = useState<BudgetResult | null>(null);
  const [showPromo, setShowPromo] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>('EUR');
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [formValues, setFormValues] = useState<BudgetFormValues | null>(null);

  const handleSubmit = (values: BudgetFormValues) => {
    const budget = calculateBudget(values);
    setBudgetResult(budget);
    setSelectedDestination(values.destination);
    setFormValues(values);
    setTimeout(() => setShowPromo(true), 1500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className={cn(
        "grid gap-6 transition-all duration-300",
        budgetResult ? "lg:grid-cols-2" : "max-w-2xl mx-auto"
      )}>
        <div className="flex flex-col gap-6">
          <BudgetForm onSubmit={handleSubmit} />
          {budgetResult && formValues && (
            <ItineraryPreview
              destination={selectedDestination}
              duration={formValues.duration}
              travelStyle={formValues.travelStyle}
              onUpgrade={() => setShowPromo(true)}
            />
          )}
        </div>
        {budgetResult && (
          <div className="flex flex-col gap-6">
            <BudgetSummary 
              budget={budgetResult}
              onCurrencyChange={setCurrency}
              currency={currency}
              onShare={() => setShowPromo(true)}
            />
          </div>
        )}
      </div>
      
      {budgetResult && formValues && (
        <div className="mt-6 max-w-2xl mx-auto">
          <SocialShare 
            budget={budgetResult}
            currency={currency}
            destination={selectedDestination}
            formValues={formValues}
          />
        </div>
      )}

      {budgetResult && (
        <PremiumBudgetDialog
          isOpen={showPromo}
          onOpenChange={setShowPromo}
          baseAmount={budgetResult.total}
          currency={currency}
          destination={selectedDestination}
        />
      )}
    </div>
  );
}