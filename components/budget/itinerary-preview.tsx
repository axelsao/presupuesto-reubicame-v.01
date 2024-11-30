'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Sparkles } from 'lucide-react';
import { DESTINATIONS } from '@/lib/constants/destinations';
import { TRAVEL_STYLES } from '@/lib/constants/travel-styles';
import type { TravelStyleId } from '@/lib/constants/travel-styles';

interface ItineraryPreviewProps {
  destination: string;
  duration: number;
  travelStyle: TravelStyleId;
  onUpgrade: () => void;
}

interface DayActivity {
  mañana: string;
  tarde: string;
  noche: string;
}

const STYLE_ACTIVITIES: Record<TravelStyleId, Record<string, DayActivity>> = {
  budget: {
    españa: {
      mañana: 'Descubre los secretos de Madrid con locales',
      tarde: 'Relájate en el histórico Parque del Retiro',
      noche: 'Ruta de tapas por el animado barrio de La Latina'
    },
    default: {
      mañana: 'Explora el centro histórico con guías locales',
      tarde: 'Descubre los parques y plazas más emblemáticos',
      noche: 'Disfruta de la gastronomía local en mercados tradicionales'
    }
  },
  standard: {
    españa: {
      mañana: 'Maravíllate con las obras del Museo del Prado',
      tarde: 'Recorre la ciudad en bicicleta como un local',
      noche: 'Cena tradicional con espectáculo de flamenco'
    },
    default: {
      mañana: 'Visita guiada por los lugares más emblemáticos',
      tarde: 'Experiencia cultural en museos principales',
      noche: 'Cena en restaurante local recomendado'
    }
  },
  luxury: {
    españa: {
      mañana: 'Tour privado por Madrid histórico en Mercedes',
      tarde: 'Clase privada de cocina con chef estrella Michelin',
      noche: 'Experiencia gastronómica exclusiva con maridaje'
    },
    default: {
      mañana: 'Experiencia VIP con guía personal',
      tarde: 'Actividad exclusiva adaptada al destino',
      noche: 'Cena premium en el mejor restaurante local'
    }
  }
};

export function ItineraryPreview({ destination, duration, travelStyle, onUpgrade }: ItineraryPreviewProps) {
  const destinationLabel = DESTINATIONS.find(d => d.id === destination)?.label || destination;
  const styleLabel = TRAVEL_STYLES.find(s => s.id === travelStyle)?.title || '';
  
  const activities = STYLE_ACTIVITIES[travelStyle][destination] || STYLE_ACTIVITIES[travelStyle].default;

  return (
    <Card className="p-6 bg-black/30">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold gradient-text">Un vistazo a tu aventura en {destinationLabel}</h3>
          <p className="text-sm text-muted-foreground">Experiencia {styleLabel}</p>
        </div>
        <Sparkles className="h-5 w-5 text-primary" />
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{duration} días de experiencias únicas</span>
        </div>
        
        <div className="border-l-2 border-primary/30 pl-4 space-y-4">
          {Object.entries(activities).map(([time, activity]) => (
            <div key={time} className="relative">
              <div className="absolute -left-[21px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium capitalize">{time}</span>
                </div>
                <p className="text-muted-foreground">{activity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Button 
          className="w-full bg-secondary hover:bg-secondary/90 text-background font-semibold"
          onClick={onUpgrade}
        >
          Obtener itinerario completo
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Descubre el itinerario detallado con todas las actividades recomendadas
        </p>
      </div>
    </Card>
  );
}