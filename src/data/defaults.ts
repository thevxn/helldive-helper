import type { IData, IPlayer, PlayerName } from '@/data/data'

const defaultPlayerList: IPlayer[] = [
  {
    name: 'Squad Leader' as PlayerName,
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
    name: 'Light AT/Support' as PlayerName,
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
    name: 'Grenadier' as PlayerName,
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
    name: 'Autocannon Operator' as PlayerName,
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
  return {
    playerList: defaultPlayerList.slice(existingPlayerListLength) as IPlayer[]
  }
}
