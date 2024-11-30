import { REGIONS, type RegionId } from './regions';

interface Destination {
  id: string;
  label: string;
  currency: string;
  region: RegionId;
}

export const DESTINATIONS: Destination[] = [
  // América del Norte
  { id: 'canada', label: 'Canadá', currency: 'CAD', region: 'AMERICA_NORTE' },
  { id: 'eeuu', label: 'Estados Unidos', currency: 'USD', region: 'AMERICA_NORTE' },
  { id: 'mexico', label: 'México', currency: 'MXN', region: 'AMERICA_NORTE' },

  // América Central
  { id: 'costa-rica', label: 'Costa Rica', currency: 'CRC', region: 'AMERICA_CENTRAL' },

  // América del Sur
  { id: 'argentina', label: 'Argentina', currency: 'ARS', region: 'AMERICA_SUR' },
  { id: 'brasil', label: 'Brasil', currency: 'BRL', region: 'AMERICA_SUR' },
  { id: 'chile', label: 'Chile', currency: 'CLP', region: 'AMERICA_SUR' },
  { id: 'colombia', label: 'Colombia', currency: 'COP', region: 'AMERICA_SUR' },
  { id: 'peru', label: 'Perú', currency: 'PEN', region: 'AMERICA_SUR' },

  // Europa
  { id: 'alemania', label: 'Alemania', currency: 'EUR', region: 'EUROPA' },
  { id: 'españa', label: 'España', currency: 'EUR', region: 'EUROPA' },
  { id: 'francia', label: 'Francia', currency: 'EUR', region: 'EUROPA' },
  { id: 'italia', label: 'Italia', currency: 'EUR', region: 'EUROPA' },
  { id: 'portugal', label: 'Portugal', currency: 'EUR', region: 'EUROPA' },
  { id: 'reino-unido', label: 'Reino Unido', currency: 'GBP', region: 'EUROPA' },

  // Asia y Pacífico
  { id: 'australia', label: 'Australia', currency: 'AUD', region: 'ASIA_PACIFICO' },
  { id: 'japon', label: 'Japón', currency: 'JPY', region: 'ASIA_PACIFICO' },
  { id: 'nueva-zelanda', label: 'Nueva Zelanda', currency: 'NZD', region: 'ASIA_PACIFICO' },
  { id: 'singapur', label: 'Singapur', currency: 'SGD', region: 'ASIA_PACIFICO' },

  // Medio Oriente
  { id: 'emiratos', label: 'Emiratos Árabes', currency: 'AED', region: 'MEDIO_ORIENTE' },
];

export type DestinationId = typeof DESTINATIONS[number]['id'];

export const getDestinationsByRegion = () => {
  return DESTINATIONS.reduce((acc, destination) => {
    const region = destination.region;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(destination);
    return acc;
  }, {} as Record<RegionId, typeof DESTINATIONS>);
};