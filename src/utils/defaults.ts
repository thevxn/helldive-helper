import { reactive } from 'vue'

export const getDefaultData = () => {
  return reactive({
    playerList: [
      {
        name: 'player1',
        primaryWeaponCode: 'LIBERATOR',
        secondaryWeaponCode: 'PEACEMAKER',
        grenadeCode: 'FRAG',
        stratagemCodeList: ['MECH', 'RAILGUN', 'JUMP_PACK', 'EAGLE_AIRSTRIKE'],
        color: 'orange'
      },
      {
        name: 'player2',
        primaryWeaponCode: 'DILIGENCE',
        secondaryWeaponCode: 'PEACEMAKER',
        grenadeCode: 'INCENDIARY',
        stratagemCodeList: ['AUTOCANNON', 'RAILGUN', 'JUMP_PACK', 'EAGLE_AIRSTRIKE'],
        color: 'green'
      },
      {
        name: 'player3',
        primaryWeaponCode: 'LIBERATOR',
        secondaryWeaponCode: 'PEACEMAKER',
        grenadeCode: 'FRAG',
        stratagemCodeList: ['MECH', 'RAILGUN', 'JUMP_PACK', 'EAGLE_AIRSTRIKE'],
        color: 'blue'
      },
      {
        name: 'player4',
        primaryWeaponCode: 'LIBERATOR',
        secondaryWeaponCode: 'PEACEMAKER',
        grenadeCode: 'FRAG',
        stratagemCodeList: ['MECH', 'RAILGUN', 'JUMP_PACK', 'EAGLE_500'],
        color: 'pink'
      }
    ]
  })
}
