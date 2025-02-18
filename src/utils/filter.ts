import type { IData } from './defaults'

import { boosterList, type boosters } from '@/data/boosters'
import type { IWeapon } from '@/data/weapons'

// Custom filter function prop for Vue Select so that weapon archetypes are not returned as "selectable" options when filtering
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterOptions = (option: IWeapon, label: any, search: string) => {
  return (label || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1 && !option.isArchetype
}

export const filterSelectedBoosters = (data: IData) => {
  const selectedBoosterCodeList: (keyof typeof boosters)[] = []

  data.playerList.map(player => {
    selectedBoosterCodeList.push(player.boosterCode)
  })

  const filteredBoosterList = boosterList.filter(booster => {
    return !selectedBoosterCodeList.includes(booster.code)
  })

  return filteredBoosterList
}
