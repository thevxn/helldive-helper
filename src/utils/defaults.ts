import { reactive } from 'vue'

import type { stratagems } from '@/data/stratagems'
import type { grenades, weapons } from '@/data/weapons'

export interface IData {
  playerList: IPlayer[]
}

interface IPlayer {
  name: string
  primaryWeaponCode: keyof typeof weapons.primary
  secondaryWeaponCode: keyof typeof weapons.secondary
  grenadeCode: keyof typeof grenades
  stratagemCodeList: (keyof typeof stratagems)[]
  color: IPlayerColor
}

export type IPlayerColor = 'orange' | 'green' | 'blue' | 'pink'

export const getDefaultData = (): IData => {
  return reactive({
    playerList: [
      {
        name: 'Squad Leader',
        primaryWeaponCode: 'SICKLE',
        secondaryWeaponCode: 'SENATOR',
        grenadeCode: 'HIGH_EXPLOSIVE',
        stratagemCodeList: ['EAGLE_AIRSTRIKE', 'ORBITAL_LASER', 'SHIELD_GENERATOR_PACK', 'MORTAR_SENTRY'],
        color: 'orange'
      },
      {
        name: 'Light AT/Support',
        primaryWeaponCode: 'BREAKER',
        secondaryWeaponCode: 'REDEEMER',
        grenadeCode: 'STUN',
        stratagemCodeList: ['EAGLE_500', 'ORBITAL_RAILCANNON_STRIKE', 'SUPPLY_PACK', 'EAT'],
        color: 'green'
      },
      {
        name: 'Grenadier',
        primaryWeaponCode: 'DEFENDER',
        secondaryWeaponCode: 'REDEEMER',
        grenadeCode: 'IMPACT',
        stratagemCodeList: [
          'EAGLE_CLUSTER_BOMB',
          'ORBITAL_AIRBURST_STRIKE',
          'SHIELD_GENERATOR_PACK',
          'GRENADE_LAUNCHER'
        ],
        color: 'blue'
      },
      {
        name: 'Autocannon Operator',
        primaryWeaponCode: 'BREAKER',
        secondaryWeaponCode: 'REDEEMER',
        grenadeCode: 'HIGH_EXPLOSIVE',
        stratagemCodeList: ['EAGLE_500', 'ORBITAL_RAILCANNON_STRIKE', 'AUTOCANNON_SENTRY', 'AUTOCANNON'],
        color: 'pink'
      }
    ]
  })
}
