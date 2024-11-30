'use client';

import { MainNav } from '@/components/main-nav';
import { BudgetCalculator } from '@/components/budget/budget-calculator';

export default function PresupuestoPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Calcula tu Presupuesto de Viaje</h1>
          <p className="text-muted-foreground">
            Personaliza tu presupuesto según tus necesidades y estilo de viaje
          </p>
        </div>
        <div>
          <BudgetCalculator />
        </div>
      </main>
    </div>
  );
}