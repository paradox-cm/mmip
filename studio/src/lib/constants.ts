export const REGIONS = [
  { title: 'Northern CA', value: 'north' },
  { title: 'Central CA', value: 'central' },
  { title: 'Southern CA', value: 'south' },
  { title: 'Statewide', value: 'statewide' },
] as const

export type RegionValue = (typeof REGIONS)[number]['value']
