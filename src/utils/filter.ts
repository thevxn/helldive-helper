import type { IWeapon } from '@/data/weapons'

// Custom filter function prop for Vue Select so that weapon archetypes are not returned as "selectable" options when filtering
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterOptions(option: IWeapon, label: any, search: string) {
  return (label || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1 && !option.isArchetype
}
