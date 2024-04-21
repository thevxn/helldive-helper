/*
 * Primary & Secondary Weapons
 */
export const primaryArchetypes = {
  AR: {
    displayName: 'Assault Rifle'
  },
  SHOTGUN: {
    displayName: 'Shotgun'
  },
  MR: {
    displayName: 'Marksman Rifle'
  },
  SMG: {
    displayName: 'Submachine Gun'
  },
  EXPLOSIVE: {
    displayName: 'Explosive'
  },
  ENERGY: {
    displayName: 'Energy Based'
  }
}

export const primaryWeaponArchetypeCodeList = Object.keys(primaryArchetypes) as (keyof typeof primaryArchetypes)[]

export const secondaryArchetypes = {
  AMMO: {
    displayName: 'Ammo-Based'
  },
  LASER: {
    displayName: 'Laser-Based'
  }
}

export const secondaryWeaponArchetypeCodeList = Object.keys(secondaryArchetypes) as (keyof typeof secondaryArchetypes)[]

export interface IWeapon {
  displayName: string
  default?: boolean
  code?: string
  isArchetype?: boolean
}

interface IPrimaryWeapon extends IWeapon {
  archetype: (typeof primaryWeaponArchetypeCodeList)[number]
}

interface ISecondaryWeapon extends IWeapon {
  archetype: (typeof secondaryWeaponArchetypeCodeList)[number]
}

interface IWeaponMap {
  primary: Record<string | symbol, IPrimaryWeapon>
  secondary: Record<string | symbol, ISecondaryWeapon>
}

export const weapons: IWeaponMap = {
  primary: {
    LIBERATOR: {
      displayName: 'AR-23 Liberator',
      default: true,
      archetype: 'AR'
    },
    LIBERATOR_CONCUSSIVE: {
      displayName: 'AR-23C Liberator Concussive',
      archetype: 'AR'
    },
    LIBERATOR_PENETRATOR: {
      displayName: 'AR-23P Liberator Penetrator',
      archetype: 'AR'
    },
    DILIGENCE: {
      displayName: 'R-63 Diligence',
      archetype: 'MR'
    },
    DILIGENCE_COUNTER_SNIPER: {
      displayName: 'R-63CS Diligence Counter Sniper',
      archetype: 'MR'
    },
    KNIGHT: {
      displayName: 'MP-98 Knight',
      archetype: 'SMG'
    },
    DEFENDER: {
      displayName: 'SMG-37 Defender',
      archetype: 'SMG'
    },
    PUNISHER: {
      displayName: 'SG-8 Punisher',
      archetype: 'SHOTGUN'
    },
    BREAKER: {
      displayName: 'SG-225 Breaker',
      archetype: 'SHOTGUN'
    },
    SLUGGER: {
      displayName: 'SG-8S Slugger',
      archetype: 'SHOTGUN'
    },
    BREAKER_SPRAY_AND_PRAY: {
      displayName: 'SG-225SP Breaker Spray&Pray',
      archetype: 'SHOTGUN'
    },
    BREAKER_INCENDIARY: {
      displayName: 'SG-225IE Breaker Incendiary',
      archetype: 'SHOTGUN'
    },
    DOMINATOR: {
      displayName: 'JAR-5 Dominator',
      archetype: 'EXPLOSIVE'
    },
    SCYTHE: {
      displayName: 'LAS-5 Scythe',
      archetype: 'ENERGY'
    },
    SCORCHER: {
      displayName: 'PLAS-1 Scorcher',
      archetype: 'ENERGY'
    },
    SICKLE: {
      displayName: 'LAS-16 Sickle',
      archetype: 'ENERGY'
    },
    BLITZER: {
      displayName: 'Arc-12 Blitzer',
      archetype: 'SHOTGUN'
    },
    PUNISHER_PLASMA: {
      displayName: 'SG-8P Punisher Plasma',
      archetype: 'SHOTGUN'
    },
    ADJUDICATOR: {
      displayName: 'BR-14 Adjudicator',
      archetype: 'MR'
    },
    ERUPTOR: {
      displayName: 'R-36 Eruptor',
      archetype: 'EXPLOSIVE'
    },
    EXPLODING_CROSSBOW: {
      displayName: 'CB-9 Exploding Crossbow',
      archetype: 'EXPLOSIVE'
    }
  },
  secondary: {
    PEACEMAKER: {
      displayName: 'P-2 Peacemaker',
      default: true,
      archetype: 'AMMO'
    },
    REDEEMER: {
      displayName: 'P-19 Redeemer',
      archetype: 'AMMO'
    },
    SENATOR: {
      displayName: 'P-4 Senator',
      archetype: 'AMMO'
    },
    DAGGER: {
      displayName: 'LAS-7 Dagger',
      archetype: 'LASER'
    },
    GRENADE_PISTOL: {
      displayName: 'GP-31 Grenade Pistol',
      archetype: 'AMMO'
    }
  }
}

export const primaryWeaponCodeList = Object.keys(weapons.primary) as (keyof typeof weapons.primary)[]
export const secondaryWeaponCodeList = Object.keys(weapons.secondary) as (keyof typeof weapons.secondary)[]

/*
 * Grenades
 */
export const grenadeArchetypes = {
  STANDARD: {
    displayName: 'Standard'
  },
  SPECIAL: {
    displayName: 'Special'
  }
}

export const grenadeArchetypeCodeList = Object.keys(grenadeArchetypes) as (keyof typeof grenadeArchetypes)[]

interface IGrenade {
  displayName: string
  default?: boolean
  archetype: (typeof grenadeArchetypeCodeList)[number]
}

export const grenades: Record<string | symbol, IGrenade> = {
  FRAG: {
    displayName: 'G-6 Frag',
    default: true,
    archetype: 'STANDARD'
  },
  HIGH_EXPLOSIVE: {
    displayName: 'G-12 High Explosive',
    archetype: 'STANDARD'
  },
  INCENDIARY: {
    displayName: 'G-10 Incendiary',
    archetype: 'STANDARD'
  },
  IMPACT: {
    displayName: 'G-16 Impact',
    archetype: 'SPECIAL'
  },
  SMOKE: {
    displayName: 'G-3 Smoke',
    archetype: 'SPECIAL'
  },
  STUN: {
    displayName: 'G-23 Stun',
    archetype: 'SPECIAL'
  },
  THERMITE: {
    displayName: 'G-123 Thermite',
    archetype: 'SPECIAL'
  }
}

export const grenadeCodeList = Object.keys(grenades) as (keyof typeof grenades)[]

/*
 * Shared Utils
 */

/**
 * Returns an array of keys which belong to the provided archetype.
 */
export const filterArchetype = (
  weaponMap: typeof weapons.primary | typeof weapons.secondary | typeof grenades,
  archetype: keyof typeof primaryArchetypes | keyof typeof secondaryArchetypes | keyof typeof grenadeArchetypes
) => {
  return (
    Object.keys(weaponMap)
      .filter(weapon => {
        return weaponMap[weapon].archetype === archetype
      })
      // Sort alphabetically (desc)
      .sort((weaponA, weaponB) => {
        return weaponMap[weaponA].displayName.localeCompare(weaponMap[weaponB].displayName)
      })
  )
}
