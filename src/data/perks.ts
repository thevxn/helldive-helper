interface IPerk {
  displayName: string
  code?: string
}

export const perks = {
  DEMOCRACY_PROTECTS: {
    displayName: 'Democracy Protects'
  },
  ELECTRICAL_CONDUIT: {
    displayName: 'Electrical Conduit'
  },
  ENGINEERING_KIT: {
    displayName: 'Engineering Kit'
  },
  EXTRA_PADDING: {
    displayName: 'Extra Padding'
  },
  FORTIFIED: {
    displayName: 'Fortified'
  },
  MED_KIT: {
    displayName: 'Med-Kit'
  },
  SCOUT: {
    displayName: 'Scout'
  },
  SERVO_ASSISTED: {
    displayName: 'Servo-Assisted'
  },
  INFLAMMABLE: {
    displayName: 'Inflammable'
  },
  ADVANCED_FILTRATION: {
    displayName: 'Advanced Filtration'
  },
  PEAK_PHYSIQUE: {
    displayName: 'Peak Physique'
  },
  UNFLINCHING: {
    displayName: 'Unflinching'
  },
  SIEGE_READY: {
    displayName: 'Siege-Ready'
  },
  ACCLIMATED: {
    displayName: 'Acclimated'
  },
  INTEGRATED_EXPLOSIVES: {
    displayName: 'Integrated Explosives'
  },
  GUNSLINGER: {
    displayName: 'Gunslinger'
  },
  REINFORCED_EPAULETTES: {
    displayName: 'Reinforced Epaulettes'
  },
  BALLISTIC_PADDING: {
    displayName: 'Ballistic Padding'
  }
} as const satisfies Readonly<Record<string, IPerk>>

export const perkCodeList = Object.keys(perks) as (keyof typeof perks)[]

export type PerkWithCode = IPerk & { code: keyof typeof perks }

// Codes are required due to how inputs work with data, therefore we dynamically create a perkList which contains perks + the additional code property for each of them
export const perkList: PerkWithCode[] = []

for (const perk in perks) {
  const modifiedPerk: PerkWithCode = {
    ...perks[perk as keyof typeof perks],
    code: perk as keyof typeof perks
  }

  perkList.push(modifiedPerk)
}
