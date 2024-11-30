export const REGIONS = {
  AMERICA_NORTE: 'América del Norte',
  AMERICA_CENTRAL: 'América Central',
  AMERICA_SUR: 'América del Sur',
  EUROPA: 'Europa',
  ASIA_PACIFICO: 'Asia y Pacífico',
  MEDIO_ORIENTE: 'Medio Oriente',
} as const;

export type RegionId = keyof typeof REGIONS;