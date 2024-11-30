'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Share2, MessagesSquare } from 'lucide-react';
import { DESTINATIONS } from '@/lib/constants/destinations';
import { TRAVEL_STYLES } from '@/lib/constants/travel-styles';
import { BsWhatsapp, BsTwitterX } from 'react-icons/bs';
import type { CurrencyCode } from '@/lib/constants/currencies';

interface SocialShareProps {
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
  destination: string;
  formValues: {
    duration: number;
    travelers: number;
    travelStyle: string;
  } | null;
}

export function SocialShare({ budget, currency, destination, formValues }: SocialShareProps) {
  const destinationLabel = DESTINATIONS.find(d => d.id === destination)?.label || destination;
  const travelStyle = TRAVEL_STYLES.find(s => s.id === formValues?.travelStyle)?.title || '';
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const createShareMessage = () => {
    const dailyAccommodation = budget.breakdown.accommodation / (formValues?.duration || 1);
    const dailyFood = budget.breakdown.food / (formValues?.duration || 1);
    const dailyTransport = budget.breakdown.transportation / (formValues?.duration || 1);
    const dailyActivities = budget.breakdown.activities / (formValues?.duration || 1);
    const dailyMisc = budget.breakdown.misc / (formValues?.duration || 1);

    return `Mi presupuesto de viaje a ${destinationLabel}:

🕒 ${formValues?.duration} días
👥 ${formValues?.travelers} viajeros
✨ Estilo: ${travelStyle}

💰 Total: ${formatCurrency(budget.total)}
👤 Por persona: ${formatCurrency(budget.perPerson)}

Desglose diario:
🏨 Hospedaje: ${formatCurrency(dailyAccommodation)}
🍽 Comida: ${formatCurrency(dailyFood)}
🚌 Transporte: ${formatCurrency(dailyTransport)}
🎯 Actividades: ${formatCurrency(dailyActivities)}
📌 Otros: ${formatCurrency(dailyMisc)}

Calcula tu presupuesto en:`;
  };
  
  const url = 'https://presupuesto.reubica.me';
  const shareMessage = createShareMessage();

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareMessage + '\n' + url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(url)}`,
    messenger: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareMessage)}`
  };

  return (
    <Card className="p-6 bg-black/30">
      <h3 className="text-lg font-semibold mb-4 gradient-text">
        Comparte este presupuesto con un amigo
      </h3>
      <div className="flex justify-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full hover:text-green-500 hover:border-green-500"
          onClick={() => window.open(shareLinks.whatsapp, '_blank')}
        >
          <BsWhatsapp className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full hover:text-blue-500 hover:border-blue-500"
          onClick={() => window.open(shareLinks.messenger, '_blank')}
        >
          <MessagesSquare className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full hover:text-neutral-800 hover:border-neutral-800"
          onClick={() => window.open(shareLinks.twitter, '_blank')}
        >
          <BsTwitterX className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Mi presupuesto de viaje',
                text: shareMessage,
                url: url
              });
            }
          }}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}