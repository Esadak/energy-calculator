export const HOUSING_TYPES = [
  { value: 'villa', label: 'Villa' },
  { value: 'apartment', label: 'Lägenhet' },
  { value: 'townhouse', label: 'Radhus' },
] as const;

export const HEATING_TYPES = [
  { value: 'electricity', label: 'El' },
  { value: 'district_heating', label: 'Fjärrvärme' },
  { value: 'heat_pump', label: 'Värmepump' },
  { value: 'gas', label: 'Gas' },
] as const;

export const APP_NAME = 'Energy Calculator';
export const APP_TAGLINE = 'Sänk dina energikostnader med AI';
export const MAX_SAVINGS_KR = 5000;
export const CALCULATIONS_DONE = 1247;
