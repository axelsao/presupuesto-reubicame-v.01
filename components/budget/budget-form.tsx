'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { TravelStyleSelector } from './travel-style-selector';
import { DESTINATIONS, getDestinationsByRegion } from '@/lib/constants/destinations';
import { REGIONS } from '@/lib/constants/regions';
import { Card } from '@/components/ui/card';
import { Calendar, Luggage, Users, MapPin } from 'lucide-react';

const budgetFormSchema = z.object({
  duration: z.number().min(1, 'Mínimo 1 día').max(90, 'Máximo 90 días'),
  travelers: z.number().min(1, 'Mínimo 1 viajero').max(10, 'Máximo 10 viajeros'),
  destination: z.string().min(1, 'Selecciona un destino'),
  travelStyle: z.enum(['budget', 'standard', 'luxury']),
});

interface BudgetFormProps {
  onSubmit: (values: z.infer<typeof budgetFormSchema>) => void;
}

export function BudgetForm({ onSubmit }: BudgetFormProps) {
  const form = useForm<z.infer<typeof budgetFormSchema>>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      duration: 7,
      travelers: 2,
      destination: '',
      travelStyle: 'standard',
    },
  });

  const destinationsByRegion = getDestinationsByRegion();

  return (
    <Card className="p-6 neon-border bg-black/50 backdrop-blur-sm w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Duración del viaje: {field.value} días
                </FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={90}
                    step={1}
                    value={[field.value]}
                    onValueChange={([value]) => field.onChange(value)}
                    className="py-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="travelers"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Número de viajeros: {field.value}
                </FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[field.value]}
                    onValueChange={([value]) => field.onChange(value)}
                    className="py-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Destino
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Selecciona un destino" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(destinationsByRegion).map(([regionId, destinations]) => (
                      <SelectGroup key={regionId}>
                        <SelectLabel className="text-lg font-bold text-primary uppercase tracking-wide py-2">
                          {REGIONS[regionId as keyof typeof REGIONS]}
                        </SelectLabel>
                        {destinations.map((destination) => (
                          <SelectItem
                            key={destination.id}
                            value={destination.id}
                          >
                            {destination.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="travelStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg flex items-center gap-2">
                  <Luggage className="h-5 w-5 text-primary" />
                  Estilo de viaje
                </FormLabel>
                <FormControl>
                  <TravelStyleSelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-12 text-lg neon-glow">
            Calcular Presupuesto
          </Button>
        </form>
      </Form>
    </Card>
  );
}