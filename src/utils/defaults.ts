import { reactive } from 'vue'

import type { grenades } from '@/utils/grenades'
import type { stratagems } from '@/utils/stratagems'
import type { weapons } from '@/utils/weapons'

interface IData {
  playerList: IPlayer[]
}
interface IPlayer {
  name: string
  primaryWeaponCode: keyof typeof weapons.primary
  secondaryWeaponCode: keyof typeof weapons.secondary
  grenadeCode: keyof typeof grenades
  stratagemCodeList: (keyof typeof stratagems)[]
  color: 'orange' | 'green' | 'blue' | 'pink'
}

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
        name: 'Light AT/AC Support',
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
