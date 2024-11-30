'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Brain, Globe2, MapPin, Star, FileSpreadsheet } from 'lucide-react';
import { DESTINATIONS } from '@/lib/constants/destinations';
import { CurrencyCode, convertCurrency } from '@/lib/constants/currencies';
import { SubscriptionDialog } from './subscription-dialog';

interface PremiumBudgetDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  baseAmount: number;
  currency: CurrencyCode;
  destination: string;
}

export function PremiumBudgetDialog({ 
  isOpen, 
  onOpenChange, 
  currency,
  destination 
}: PremiumBudgetDialogProps) {
  const [showSubscription, setShowSubscription] = useState(false);
  const price = convertCurrency(9.99, 'USD', currency);
  const destinationLabel = DESTINATIONS.find(d => d.id === destination)?.label || destination;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const features = [
    {
      icon: Brain,
      title: 'Itinerario IA día a día',
      description: 'Plan detallado generado por IA adaptado a tus preferencias'
    },
    {
      icon: Globe2,
      title: 'Presupuesto multi-país',
      description: 'Planifica rutas completas entre varios destinos'
    },
    {
      icon: MapPin,
      title: 'Detalles por ciudad',
      description: 'Costos específicos para cada ciudad del itinerario'
    },
    {
      icon: Star,
      title: 'Recomendaciones locales',
      description: 'Tips de expertos locales y secretos de la ciudad'
    },
    {
      icon: FileSpreadsheet,
      title: 'Plantilla personalizada',
      description: 'Herramienta completa para gestionar tu presupuesto'
    }
  ];

  const handleUpgrade = () => {
    setShowSubscription(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text">
              Desbloquea tu presupuesto de viaje a {destinationLabel}
            </DialogTitle>
            <DialogDescription className="text-base">
              Obtén un plan completo y personalizado para tu viaje
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid gap-4">
              {features.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-start gap-3">
                  <Icon className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full bg-secondary hover:bg-secondary/90 text-background font-semibold"
                onClick={handleUpgrade}
              >
                Obtener por {formatCurrency(price)}
              </Button>
              
              <button
                onClick={() => onOpenChange(false)}
                className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Continuar con presupuesto gratuito
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <SubscriptionDialog 
        isOpen={showSubscription} 
        onOpenChange={setShowSubscription} 
      />
    </>
  );
}