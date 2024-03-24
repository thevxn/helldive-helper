import { reactive } from 'vue'

import type { grenades } from '@/utils/grenades'
import type { weapons } from '@/utils/weapons'

export const getDefaultData = () => {
  return reactive({
    playerList: [
      {
        name: 'player1',
        primaryWeaponCode: 'LIBERATOR' as keyof typeof weapons.primary,
        secondaryWeaponCode: 'PEACEMAKER' as keyof typeof weapons.secondary,
        grenadeCode: 'FRAG' as keyof typeof grenades,
        stratagemCodeList: ['MECH', 'RAILGUN', 'JUMP_PACK', 'EAGLE_AIRSTRIKE']
      },
      {
        name: 'player2',
        primaryWeaponCode: 'DILIGENCE' as keyof typeof weapons.primary,
        secondaryWeaponCode: 'PEACEMAKER' as keyof typeof weapons.secondary,
        grenadeCode: 'INCENDIARY' as keyof typeof grenades,
        stratagemCodeList: ['AUTOCANNON', 'RAILGUN', 'JUMP_PACK', 'EAGLE_AIRSTRIKE']
      },
      {
        name: 'player3',
        primaryWeaponCode: 'LIBERATOR' as keyof typeof weapons.primary,
        secondaryWeaponCode: 'PEACEMAKER' as keyof typeof weapons.secondary,
        grenadeCode: 'FRAG' as keyof typeof grenades,
        stratagemCodeList: ['MECH', 'RAILGUN', 'JUMP_PACK', 'EAGLE_AIRSTRIKE']
      },
      {
        name: 'player4',
        primaryWeaponCode: 'LIBERATOR' as keyof typeof weapons.primary,
        secondaryWeaponCode: 'PEACEMAKER' as keyof typeof weapons.secondary,
        grenadeCode: 'FRAG' as keyof typeof grenades,
        stratagemCodeList: ['MECH', 'RAILGUN', 'JUMP_PACK', 'EAGLE_500']
      }
    ]
  })
}
