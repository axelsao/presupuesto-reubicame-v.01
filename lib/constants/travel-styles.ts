export const TRAVEL_STYLES = [
  {
    id: 'budget',
    title: 'Económico',
    description: 'Hostales, transporte público, comida local',
    multiplier: 1,
  },
  {
    id: 'standard',
    title: 'Estándar',
    description: 'Hoteles 3★, mix de transportes, restaurantes variados',
    multiplier: 2.5,
  },
  {
    id: 'luxury',
    title: 'Premium',
    description: 'Hoteles 4-5★, transporte privado, experiencias exclusivas',
    multiplier: 5,
  },
] as const;

export type TravelStyleId = typeof TRAVEL_STYLES[number]['id'];