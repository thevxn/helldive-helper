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
  },
  ADRENO_DEFIBRILATOR: {
    displayName: 'Adreno-Defibrillator'
  },
  FEET_FIRST: {
    displayName: 'Feet First'
  },
  DESERT_STORMER: {
    displayName: 'Desert Stormer'
  },
  ROCK_SOLID: {
    displayName: 'Rock Solid'
  },
  REDUCED_SIGNATURE: {
    displayName: 'Reduced Signature'
  }
} as const satisfies Readonly<Record<string, IPerk>>

export type PerkKey = keyof typeof perks
export const perkCodeList = Object.keys(perks) as PerkKey[]

export type PerkWithCode = IPerk & { code: keyof typeof perks }

// Codes are required due to how inputs work with data, therefore we dynamically create a perkList which contains perks + the additional code property for each of them
export const perkList: PerkWithCode[] = []

for (const perk in perks) {
  const modifiedPerk: PerkWithCode = {
    ...perks[perk as PerkKey],
    code: perk as PerkKey
  }

  perkList.push(modifiedPerk)
}
