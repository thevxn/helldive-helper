import { type IWeapon, grenadeArchetypes, primaryArchetypes, secondaryArchetypes, weapons } from '@/data/weapons'

export const createAndSortWeapons = (
  archetypes: typeof primaryArchetypes | typeof secondaryArchetypes | typeof grenadeArchetypes
) => {
  const sortedList: IWeapon[] = []

  Object.keys(archetypes).map((archetype: string) => {
    sortedList.push(archetypes[archetype as keyof typeof archetypes])
    sortedList[sortedList.indexOf(archetypes[archetype as keyof typeof archetypes])]['code'] = archetype
    sortedList[sortedList.indexOf(archetypes[archetype as keyof typeof archetypes])]['isArchetype'] = true
    Object.keys(weapons.primary).map(weapon => {
      if (weapons.primary[weapon].archetype === archetype) {
        sortedList.push(weapons.primary[weapon])
        sortedList[sortedList.indexOf(weapons.primary[weapon])]['code'] = weapon
        sortedList[sortedList.indexOf(weapons.primary[weapon])]['isArchetype'] = false
      }
    })
  })

  sortedList.sort((a, b) => {
    if (!(a.isArchetype || b.isArchetype) && a.archetype === b.archetype) {
      return a.displayName.localeCompare(b.displayName)
    }

    return 0
  })
  return sortedList
}
