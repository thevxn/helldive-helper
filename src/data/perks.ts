interface IPerk {
  displayName: string
  code?: string
}

export const perks: Record<string, IPerk> = {
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
  }
}

export const perkCodeList = Object.keys(perks) as (keyof typeof perks)[]

export const perkList: (typeof perks)[keyof typeof perks][] = []

for (const perk in perks) {
  const modifiedPerk = perks[perk as keyof typeof perks]

  modifiedPerk['code'] = perk
  perkList.push(perks[perk as keyof typeof perks])
}
