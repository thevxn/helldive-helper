import { stratagemCategories, stratagemCodeList, stratagems } from '@/data/stratagems'
import {
  type IGrenade,
  type IPrimaryWeapon,
  type ISecondaryWeapon,
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

  Object.keys(archetypes).map((archetype: string) => {
    sortedList.push(archetypes[archetype as keyof typeof archetypes])
    sortedList[sortedList.indexOf(archetypes[archetype as keyof typeof archetypes])]['code'] = archetype
    sortedList[sortedList.indexOf(archetypes[archetype as keyof typeof archetypes])]['isArchetype'] = true

    let weaponSource: Record<string, IPrimaryWeapon> | Record<string, ISecondaryWeapon> | Record<string, IGrenade>

    if (archetypes === primaryArchetypes) {
      weaponSource = weapons.primary
    } else if (archetypes === secondaryArchetypes) {
      weaponSource = weapons.secondary
    } else {
      weaponSource = grenades
    }

    Object.keys(weaponSource).map(weapon => {
      if (weaponSource[weapon].archetype === archetype) {
        sortedList.push(weaponSource[weapon])
        sortedList[sortedList.indexOf(weaponSource[weapon])]['code'] = weapon
        sortedList[sortedList.indexOf(weaponSource[weapon])]['isArchetype'] = false
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

// Sorts stratagems based on their category so that all stratagems of the same category are next to each other in the select
export const sortStratagems = (stratagemList: typeof stratagemCodeList) => {
  const sortedStratagemList: (keyof typeof stratagems)[] = []

  stratagemCategories.map(category => {
    stratagemList.map(stratagem => {
      if (stratagems[stratagem].category === category) {
        sortedStratagemList.push(stratagem)
      }
    })
  })

  return sortedStratagemList
}

sortStratagems(stratagemCodeList)
