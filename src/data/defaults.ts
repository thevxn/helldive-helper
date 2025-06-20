import { reactive } from 'vue'

import type { AttachmentCategory, AttachmentKeysForCategory } from '@/data/attachments'
import type { boosterCodeList } from '@/data/boosters'
import type { perks } from '@/data/perks'
import type { stratagems } from '@/data/stratagems'
import type { grenades, weapons } from '@/data/weapons'

export interface IData {
  playerList: IPlayer[]
}

interface IPlayer {
  perkCode: keyof typeof perks
  boosterCode: (typeof boosterCodeList)[number]
  name: string
  primaryWeaponCode: keyof typeof weapons.primary
  secondaryWeaponCode: keyof typeof weapons.secondary
  grenadeCode: keyof typeof grenades
  stratagemCodeList: (keyof typeof stratagems)[]
  color: IPlayerColor
  primaryWeaponAttachments: Partial<{
    [C in AttachmentCategory]: AttachmentKeysForCategory<C>[number]
  }>
}

export type IPlayerColor = 'orange' | 'green' | 'blue' | 'pink'

// TODO: Add default attachments
const defaultPlayerList: IPlayer[] = [
  {
    name: 'Squad Leader',
    primaryWeaponCode: 'LIBERATOR',
    secondaryWeaponCode: 'SENATOR',
    grenadeCode: 'HIGH_EXPLOSIVE',
    stratagemCodeList: ['EAGLE_AIRSTRIKE', 'ORBITAL_LASER', 'SHIELD_GENERATOR_PACK', 'MORTAR_SENTRY'],
    perkCode: 'EXTRA_PADDING',
    boosterCode: 'HELLPOD_SPACE_OPTIMIZATION',
    color: 'orange',
    primaryWeaponAttachments: {
      OPTICS: 'TUBE_RED_DOT_X2',
      MUZZLE: 'NO_MUZZLE',
      UNDERBARREL: 'LASER_SIGHT_WITH_FLASHLIGHT',
      MAGAZINE: 'EXTENDED_MAGAZINE'
    }
  },
  {
    name: 'Light AT/Support',
    primaryWeaponCode: 'BREAKER',
    secondaryWeaponCode: 'REDEEMER',
    grenadeCode: 'STUN',
    stratagemCodeList: ['EAGLE_500', 'ORBITAL_RAILCANNON_STRIKE', 'SUPPLY_PACK', 'EAT'],
    perkCode: 'EXTRA_PADDING',
    boosterCode: 'VITALITY_ENHANCEMENT',
    color: 'green',
    primaryWeaponAttachments: {}
  },
  {
    name: 'Grenadier',
    primaryWeaponCode: 'DEFENDER',
    secondaryWeaponCode: 'REDEEMER',
    grenadeCode: 'IMPACT',
    stratagemCodeList: ['EAGLE_CLUSTER_BOMB', 'ORBITAL_AIRBURST_STRIKE', 'SHIELD_GENERATOR_PACK', 'GRENADE_LAUNCHER'],
    perkCode: 'EXTRA_PADDING',
    boosterCode: 'STAMINA_ENHANCEMENT',
    color: 'blue',
    primaryWeaponAttachments: {}
  },
  {
    name: 'Autocannon Operator',
    primaryWeaponCode: 'BREAKER',
    secondaryWeaponCode: 'REDEEMER',
    grenadeCode: 'HIGH_EXPLOSIVE',
    stratagemCodeList: ['EAGLE_500', 'ORBITAL_RAILCANNON_STRIKE', 'AUTOCANNON_SENTRY', 'AUTOCANNON'],
    perkCode: 'EXTRA_PADDING',
    boosterCode: 'LOCALIZATION_CONFUSION',
    color: 'pink',
    primaryWeaponAttachments: {}
  }
]

export const getDefaultData = (existingPlayerListLength: number): IData => {
  return reactive<IData>({
    playerList: defaultPlayerList.slice(existingPlayerListLength) as IPlayer[]
  })
}
