import {
  type IWeapon,
  grenadeArchetypes,
  grenades,
  primaryArchetypes,
  secondaryArchetypes,
  weapons
} from '@/data/weapons'

export const createAndSortWeapons = (
  archetypes: typeof primaryArchetypes | typeof secondaryArchetypes | typeof grenadeArchetypes
) => {
  const sortedList: IWeapon[] = []

  if (archetypes === primaryArchetypes) {
    Object.keys(archetypes).map((archetype: string) => {
      sortedList.push((archetypes as typeof primaryArchetypes)[archetype as keyof typeof primaryArchetypes])
      sortedList[
        sortedList.indexOf((archetypes as typeof primaryArchetypes)[archetype as keyof typeof primaryArchetypes])
      ]['code'] = archetype
      sortedList[
        sortedList.indexOf((archetypes as typeof primaryArchetypes)[archetype as keyof typeof primaryArchetypes])
      ]['isArchetype'] = true
      Object.keys(weapons.primary).map(weapon => {
        if (weapons.primary[weapon].archetype === archetype) {
          sortedList.push(weapons.primary[weapon])
          sortedList[sortedList.indexOf(weapons.primary[weapon])]['code'] = weapon
          sortedList[sortedList.indexOf(weapons.primary[weapon])]['isArchetype'] = false
        }
      })
    })
  } else if (archetypes === secondaryArchetypes) {
    Object.keys(archetypes).map((archetype: string) => {
      sortedList.push((archetypes as typeof secondaryArchetypes)[archetype as keyof typeof secondaryArchetypes])
      sortedList[
        sortedList.indexOf((archetypes as typeof secondaryArchetypes)[archetype as keyof typeof secondaryArchetypes])
      ]['code'] = archetype
      sortedList[
        sortedList.indexOf((archetypes as typeof secondaryArchetypes)[archetype as keyof typeof secondaryArchetypes])
      ]['isArchetype'] = true
      Object.keys(weapons.secondary).map(weapon => {
        if (weapons.secondary[weapon].archetype === archetype) {
          sortedList.push(weapons.secondary[weapon])
          sortedList[sortedList.indexOf(weapons.secondary[weapon])]['code'] = weapon
          sortedList[sortedList.indexOf(weapons.secondary[weapon])]['isArchetype'] = false
        }
      })
    })
  } else if (archetypes === grenadeArchetypes) {
    Object.keys(archetypes).map((archetype: string) => {
      sortedList.push((archetypes as typeof grenadeArchetypes)[archetype as keyof typeof grenadeArchetypes])
      sortedList[
        sortedList.indexOf((archetypes as typeof grenadeArchetypes)[archetype as keyof typeof grenadeArchetypes])
      ]['code'] = archetype
      sortedList[
        sortedList.indexOf((archetypes as typeof grenadeArchetypes)[archetype as keyof typeof grenadeArchetypes])
      ]['isArchetype'] = true
      Object.keys(grenades).map(grenade => {
        if (grenades[grenade].archetype === archetype) {
          sortedList.push(grenades[grenade])
          sortedList[sortedList.indexOf(grenades[grenade])]['code'] = grenade
          sortedList[sortedList.indexOf(grenades[grenade])]['isArchetype'] = false
        }
      })
    })
  }

  sortedList.sort((a: IWeapon, b: IWeapon) => {
    if (!(a.isArchetype || b.isArchetype)) {
      return a.displayName.localeCompare(b.displayName)
    }

    return 0
  })
  return sortedList
}
