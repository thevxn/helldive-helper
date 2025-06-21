import { reactive } from 'vue'

import type { AttachmentCategory, AttachmentKeysForCategory } from '@/data/attachments'
import type { BoosterKey } from '@/data/boosters'
import type { PerkKey } from '@/data/perks'
import type { StratagemKey } from '@/data/stratagems'
import type { GrenadeKey, PrimaryWeaponKey, SecondaryWeaponKey } from '@/data/weapons'

export interface IData {
  playerList: IPlayer[]
}

interface IPlayer {
  perkCode: PerkKey
  boosterCode: BoosterKey
  name: string
  primaryWeaponCode: PrimaryWeaponKey
  secondaryWeaponCode: SecondaryWeaponKey
  grenadeCode: GrenadeKey
  stratagemCodeList: StratagemKey[]
  color: PlayerColor
  primaryWeaponAttachments: Partial<{
    [C in AttachmentCategory]: AttachmentKeysForCategory<C>[number]
  }>
}

export type PlayerColor = 'orange' | 'green' | 'blue' | 'pink'

const defaultPlayerList: IPlayer[] = [
  {
    name: 'Squad Leader',
    primaryWeaponCode: 'SICKLE',
    secondaryWeaponCode: 'SENATOR',
    grenadeCode: 'HIGH_EXPLOSIVE',
    stratagemCodeList: ['EAGLE_AIRSTRIKE', 'ORBITAL_LASER', 'SHIELD_GENERATOR_PACK', 'MORTAR_SENTRY'],
    perkCode: 'EXTRA_PADDING',
    boosterCode: 'HELLPOD_SPACE_OPTIMIZATION',
    color: 'orange',
    primaryWeaponAttachments: {
      OPTICS: 'TUBE_RED_DOT_X2',
      MUZZLE: undefined,
      UNDERBARREL: undefined,
      MAGAZINE: undefined
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
    primaryWeaponAttachments: {
      OPTICS: 'REFLEX_SIGHT',
      MUZZLE: 'FULL_CHOKE',
      UNDERBARREL: 'VERTICAL_FOREGRIP',
      MAGAZINE: 'DRUM_MAGAZINE'
    }
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
    primaryWeaponAttachments: {
      OPTICS: 'REFLEX_SIGHT',
      MUZZLE: 'FLASH_HIDER',
      UNDERBARREL: 'VERTICAL_FOREGRIP',
      MAGAZINE: 'DRUM_MAGAZINE'
    }
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
    primaryWeaponAttachments: {
      OPTICS: 'REFLEX_SIGHT',
      MUZZLE: 'FULL_CHOKE',
      UNDERBARREL: 'VERTICAL_FOREGRIP',
      MAGAZINE: 'DRUM_MAGAZINE'
    }
  }
]

export const getDefaultData = (existingPlayerListLength: number): IData => {
  return reactive<IData>({
    playerList: defaultPlayerList.slice(existingPlayerListLength) as IPlayer[]
  })
}
