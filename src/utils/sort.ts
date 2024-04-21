import { type IWeapon, primaryArchetypes, weapons } from '@/data/weapons'

export const sortPrimaryWeapons = () => {
  const sortedList: IWeapon[] = []

  Object.keys(primaryArchetypes).map((archetype: keyof typeof primaryArchetypes | string) => {
    sortedList.push(primaryArchetypes[archetype as keyof typeof primaryArchetypes])
    sortedList[sortedList.indexOf(primaryArchetypes[archetype as keyof typeof primaryArchetypes])]['code'] = archetype
    sortedList[sortedList.indexOf(primaryArchetypes[archetype as keyof typeof primaryArchetypes])]['isArchetype'] = true
    Object.keys(weapons.primary).map(weapon => {
      if (weapons.primary[weapon].archetype === archetype) {
        sortedList.push(weapons.primary[weapon])
        sortedList[sortedList.indexOf(weapons.primary[weapon])]['code'] = weapon
        sortedList[sortedList.indexOf(weapons.primary[weapon])]['isArchetype'] = false
      }
    })
  })
  return sortedList
}
