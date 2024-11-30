import { DESTINATIONS, type DestinationId } from './constants/destinations';
import { TRAVEL_STYLES, type TravelStyleId } from './constants/travel-styles';

interface DailyCosts {
  accommodation: number;
  food: number;
  transportation: number;
  activities: number;
  misc: number;
}

interface BudgetParams {
  duration: number;
  travelers: number;
  destination: DestinationId;
  travelStyle: TravelStyleId;
}

interface BudgetResult {
  total: number;
  perPerson: number;
  breakdown: DailyCosts;
}

const BASE_DAILY_COSTS: Record<DestinationId, DailyCosts> = {
  españa: { accommodation: 30, food: 25, transportation: 10, activities: 15, misc: 10 },
  mexico: { accommodation: 20, food: 15, transportation: 5, activities: 10, misc: 5 },
  argentina: { accommodation: 15, food: 12, transportation: 5, activities: 8, misc: 5 },
  colombia: { accommodation: 15, food: 10, transportation: 4, activities: 8, misc: 4 },
  peru: { accommodation: 18, food: 12, transportation: 5, activities: 10, misc: 5 },
  chile: { accommodation: 25, food: 15, transportation: 6, activities: 12, misc: 7 },
  brasil: { accommodation: 22, food: 14, transportation: 5, activities: 11, misc: 6 },
  eeuu: { accommodation: 40, food: 30, transportation: 15, activities: 20, misc: 15 },
  canada: { accommodation: 35, food: 28, transportation: 12, activities: 18, misc: 12 },
  francia: { accommodation: 35, food: 30, transportation: 12, activities: 20, misc: 13 },
  italia: { accommodation: 32, food: 28, transportation: 10, activities: 18, misc: 12 },
  alemania: { accommodation: 30, food: 25, transportation: 10, activities: 15, misc: 10 },
  portugal: { accommodation: 25, food: 20, transportation: 8, activities: 12, misc: 8 },
  'reino-unido': { accommodation: 35, food: 30, transportation: 15, activities: 20, misc: 15 },
  japon: { accommodation: 40, food: 30, transportation: 15, activities: 25, misc: 15 },
  australia: { accommodation: 35, food: 28, transportation: 12, activities: 20, misc: 15 },
  'nueva-zelanda': { accommodation: 32, food: 25, transportation: 10, activities: 18, misc: 12 },
  emiratos: { accommodation: 45, food: 35, transportation: 15, activities: 30, misc: 20 },
  singapur: { accommodation: 40, food: 30, transportation: 12, activities: 25, misc: 18 },
  'costa-rica': { accommodation: 25, food: 15, transportation: 8, activities: 15, misc: 8 }
} as const;

export function calculateBudget(params: BudgetParams): BudgetResult {
  const baseCosts = BASE_DAILY_COSTS[params.destination];
  const style = TRAVEL_STYLES.find(s => s.id === params.travelStyle);
  const multiplier = style?.multiplier ?? 1;

  const dailyCosts = Object.entries(baseCosts).reduce<DailyCosts>((acc, [key, value]) => ({
    ...acc,
    [key]: value * multiplier
  }), {} as DailyCosts);

  const dailyTotal = Object.values(dailyCosts).reduce((sum, cost) => sum + cost, 0);
  const totalDays = params.duration;

  const breakdown = Object.entries(baseCosts).reduce<DailyCosts>((acc, [key, value]) => ({
    ...acc,
    [key]: value * multiplier * totalDays
  }), {} as DailyCosts);

  const total = dailyTotal * totalDays;

  return {
    total,
    perPerson: total / params.travelers,
    breakdown,
  };
}