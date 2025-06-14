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
  },
  SPECIAL: {
    displayName: 'Special'
  },
  SR: {
    displayName: 'Sniper Rifle'
  }
}

export const primaryWeaponArchetypeCodeList = Object.keys(primaryArchetypes) as (keyof typeof primaryArchetypes)[]

export const secondaryArchetypes = {
  AMMO: {
    displayName: 'Ammo-Based'
  },
  LASER: {
    displayName: 'Laser-Based'
  },
  SPECIAL: {
    displayName: 'Special'
  },
  MELEE: {
    displayName: 'Melee'
  }
}

export const secondaryWeaponArchetypeCodeList = Object.keys(secondaryArchetypes) as (keyof typeof secondaryArchetypes)[]

export interface IWeapon {
  displayName: string
  default?: boolean
  code?: string
  isArchetype?: boolean
  archetype?: unknown
}

export interface IPrimaryWeapon extends IWeapon {
  archetype: (typeof primaryWeaponArchetypeCodeList)[number]
}

export interface ISecondaryWeapon extends IWeapon {
  archetype: (typeof secondaryWeaponArchetypeCodeList)[number]
}

interface IWeaponMap {
  primary: Record<string, IPrimaryWeapon>
  secondary: Record<string, ISecondaryWeapon>
}

export const weapons = {
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
    LIBERATOR_CARBINE: {
      archetype: 'AR',
      displayName: 'AR-23A Liberator Carbine'
    },
    ADJUDICATOR: {
      displayName: 'BR-14 Adjudicator',
      archetype: 'AR'
    },
    TENDERIZER: {
      displayName: 'AR-61 Tenderizer',
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
    PUMMELER: {
      displayName: 'SMG-72 Pummeler',
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
    SCYTHE: {
      displayName: 'LAS-5 Scythe',
      archetype: 'ENERGY'
    },
    SCORCHER: {
      displayName: 'PLAS-1 Scorcher',
      archetype: 'ENERGY'
    },
    BLITZER: {
      displayName: 'Arc-12 Blitzer',
      archetype: 'ENERGY'
    },
    SICKLE: {
      displayName: 'LAS-16 Sickle',
      archetype: 'ENERGY'
    },
    PUNISHER_PLASMA: {
      displayName: 'SG-8P Punisher Plasma',
      archetype: 'ENERGY'
    },
    ERUPTOR: {
      displayName: 'R-36 Eruptor',
      archetype: 'EXPLOSIVE'
    },
    EXPLODING_CROSSBOW: {
      displayName: 'CB-9 Exploding Crossbow',
      archetype: 'EXPLOSIVE'
    },
    DOMINATOR: {
      displayName: 'JAR-5 Dominator',
      archetype: 'SPECIAL'
    },
    PURIFIER: {
      displayName: 'PLAS-101 Purifier',
      archetype: 'ENERGY'
    },
    COOKOUT: {
      displayName: 'SG-451 Cookout',
      archetype: 'SHOTGUN'
    },
    TORCHER: {
      displayName: 'FLAM-66 Torcher',
      archetype: 'SPECIAL'
    },
    CONSTITUTION: {
      archetype: 'MR',
      displayName: 'R-2124 Constitution'
    },
    HALT: {
      archetype: 'SHOTGUN',
      displayName: 'SG-20 Halt'
    },
    REPRIMAND: {
      archetype: 'SMG',
      displayName: 'SMG-32 Reprimand'
    },
    STA_52: {
      archetype: 'AR',
      displayName: 'StA-52 Assault Rifle'
    },
    STA_11: {
      archetype: 'SMG',
      displayName: 'StA-11 SMG'
    },
    ACCELERATOR: {
      archetype: 'SR',
      displayName: 'PLAS-39 Accelerator Rifle'
    },
    DOUBLE_EDGE_SICKLE: {
      archetype: 'ENERGY',
      displayName: 'LAS-17 Double-Edge Sickle'
    },
    DEADEYE: {
      archetype: 'MR',
      displayName: 'R-6 Deadeye'
    },
    AMENDMENT: {
      archetype: 'MR',
      displayName: 'R-2 Amendment'
    },
    PACIFIER: {
      archetype: 'AR',
      displayName: 'AR-32 Pacifier'
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
    },
    VERDICT: {
      displayName: 'P-113 Verdict',
      archetype: 'AMMO'
    },
    BUSHWHACKER: {
      displayName: 'SG-22 Bushwhacker',
      archetype: 'AMMO'
    },
    CRISPER: {
      displayName: 'P-72 Crisper',
      archetype: 'SPECIAL'
    },
    STIM_PISTOL: {
      displayName: 'P-11 Stim Pistol',
      archetype: 'SPECIAL'
    },
    LOYALIST: {
      archetype: 'SPECIAL',
      displayName: 'PLAS-15 Loyalist'
    },
    STUN_LANCE: {
      archetype: 'MELEE',
      displayName: 'CQC-19 Stun Lance'
    },
    STUN_BATON: {
      archetype: 'MELEE',
      displayName: 'CQC-30 Stun Baton'
    },
    ULTIMATUM: {
      archetype: 'SPECIAL',
      displayName: 'GP-31 Ultimatum'
    },
    HATCHET: {
      archetype: 'MELEE',
      displayName: 'CQC-5 Combat Hatchet'
    },
    TALON: {
      archetype: 'SPECIAL',
      displayName: 'LAS-58 Talon'
    },
    SABER: {
      archetype: 'MELEE',
      displayName: 'CQC-2 Saber'
    },
    WARRANT: {
      displayName: 'P-92 Warrant',
      archetype: 'AMMO'
    }
  }
} as const satisfies Readonly<IWeaponMap>

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

export interface IGrenade extends IWeapon {
  archetype: (typeof grenadeArchetypeCodeList)[number]
}

export const grenades = {
  FRAG: {
    archetype: 'STANDARD',
    displayName: 'G-6 Frag',
    default: true
  },
  HIGH_EXPLOSIVE: {
    archetype: 'STANDARD',
    displayName: 'G-12 High Explosive'
  },
  INCENDIARY: {
    archetype: 'STANDARD',
    displayName: 'G-10 Incendiary'
  },
  IMPACT: {
    archetype: 'SPECIAL',
    displayName: 'G-16 Impact'
  },
  INCENDIARY_IMPACT: {
    archetype: 'SPECIAL',
    displayName: 'G-13 Incendiary Impact'
  },
  SMOKE: {
    archetype: 'SPECIAL',
    displayName: 'G-3 Smoke'
  },
  STUN: {
    archetype: 'SPECIAL',
    displayName: 'G-23 Stun'
  },
  THERMITE: {
    archetype: 'SPECIAL',
    displayName: 'G-123 Thermite'
  },
  THROWING_KNIFE: {
    archetype: 'SPECIAL',
    displayName: 'K-2 Throwing Knife'
  },
  GAS: {
    archetype: 'SPECIAL',
    displayName: 'G-4 Gas'
  },
  SEEKER: {
    archetype: 'SPECIAL',
    displayName: 'G-50 Seeker'
  },
  DYNAMITE: {
    archetype: 'SPECIAL',
    displayName: 'TED-63 Dynamite'
  },
  PYROTECH: {
    archetype: 'SPECIAL',
    displayName: 'G-142 Pyrotech'
  },
  URCHIN: {
    archetype: 'SPECIAL',
    displayName: 'G-109 Urchin'
  }
} as const satisfies Readonly<Record<string, IGrenade>>

export const grenadeCodeList = Object.keys(grenades) as (keyof typeof grenades)[]
