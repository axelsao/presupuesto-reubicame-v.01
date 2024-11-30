import { MainNav } from '@/components/main-nav';
import { Card } from '@/components/ui/card';
import { Brain, Globe, Building, FileSpreadsheet, Heart } from 'lucide-react';
import { BudgetCalculator } from '@/components/budget/budget-calculator';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MainNav />
      
      <main className="flex-grow">
        <div className="text-center mb-8 md:mb-16 relative px-4">
          <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-5">
            <div className="w-full max-w-[800px] h-[200px] bg-primary/30 blur-[100px] rounded-full" />
          </div>
          
          <div className="space-y-6 md:space-y-8 py-6 md:py-8">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight gradient-text">
              Planifica tu viaje de manera inteligente
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto neon-glow px-4">
              Herramienta avanzada de presupuesto para viajeros que buscan experiencias únicas sin comprometer sus finanzas.
            </p>
          </div>
        </div>

        <div className="mb-8 md:mb-16 px-4">
          <BudgetCalculator />
        </div>

        <div className="px-4 max-w-5xl mx-auto">
          <Card className="p-6 md:p-8 bg-black/30">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 gradient-text text-center">
              Funciones Premium
            </h3>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6">
              <div className="flex items-start gap-3">
                <Brain className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-base md:text-lg">Itinerario IA</p>
                  <p className="text-sm md:text-base text-muted-foreground">Planificación día a día personalizada con inteligencia artificial</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-base md:text-lg">Multi-país</p>
                  <p className="text-sm md:text-base text-muted-foreground">Presupuestos detallados para rutas completas entre varios destinos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-base md:text-lg">Tips locales</p>
                  <p className="text-sm md:text-base text-muted-foreground">Recomendaciones exclusivas de expertos locales en cada destino</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileSpreadsheet className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-base md:text-lg">Excel detallado</p>
                  <p className="text-sm md:text-base text-muted-foreground">Plantilla personalizable completa para gestionar tu presupuesto</p>
                </div>
              </div>
            </div>
            <Button 
              className="w-full bg-secondary hover:bg-secondary/90 text-background font-semibold text-base md:text-lg py-6"
            >
              Obtener Presupuesto Completo
            </Button>
          </Card>
        </div>
      </main>

      <footer className="py-6 text-center text-muted-foreground mt-8">
        <p className="flex items-center justify-center gap-2">
          Made with <Heart className="h-4 w-4 text-primary fill-primary" /> by travelers for travelers
        </p>
      </footer>
    </div>
  );
}