import type { AttachmentCategory, AttachmentKeysForCategory } from '@/data/attachments'

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

interface IWeaponAttachment {
  default?: boolean
}

export interface IPrimaryWeapon extends IWeapon {
  archetype: (typeof primaryWeaponArchetypeCodeList)[number]
  attachments: {
    [C in AttachmentCategory]?: {
      [A in AttachmentKeysForCategory<C>[number]]?: IWeaponAttachment
    }
  }
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
      archetype: 'AR',
      attachments: {
        OPTICS: {
          TUBE_RED_DOT_X2: { default: true },
          REFLEX_SIGHT: {},
          HOLOGRAPHIC_SIGHT: {},
          REFLEX_SIGHT_MK_2: {},
          IRON_SIGHT: {},
          COMBAT_SCOPE_X4: {}
        },
        MUZZLE: {
          NO_MUZZLE: { default: true },
          FLASH_HIDER: {},
          MUZZLE_BRAKE: {},
          COMPENSATOR: {}
        },
        UNDERBARREL: {
          NO_UNDERBARREL: {},
          LASER_SIGHT_WITH_FLASHLIGHT: {
            default: true
          },
          VERTICAL_FOREGRIP: {},
          ANGLED_FOREGRIP: {},
          FLASHLIGHT_VERTICAL_FOREGRIP: {},
          LASER_SIGHT_ANGLED_FOREGRIP: {}
        },
        MAGAZINE: {
          EXTENDED_MAGAZINE: { default: true },
          SHORT_MAGAZINE: {},
          DRUM_MAGAZINE: {}
        }
      }
    },
    LIBERATOR_CONCUSSIVE: {
      displayName: 'AR-23C Liberator Concussive',
      archetype: 'AR',
      attachments: {}
    },
    LIBERATOR_PENETRATOR: {
      displayName: 'AR-23P Liberator Penetrator',
      archetype: 'AR',
      attachments: {}
    },
    LIBERATOR_CARBINE: {
      archetype: 'AR',
      displayName: 'AR-23A Liberator Carbine',
      attachments: {}
    },
    ADJUDICATOR: {
      displayName: 'BR-14 Adjudicator',
      archetype: 'AR',
      attachments: {}
    },
    TENDERIZER: {
      displayName: 'AR-61 Tenderizer',
      archetype: 'AR',
      attachments: {}
    },
    DILIGENCE: {
      displayName: 'R-63 Diligence',
      archetype: 'MR',
      attachments: {}
    },
    DILIGENCE_COUNTER_SNIPER: {
      displayName: 'R-63CS Diligence Counter Sniper',
      archetype: 'MR',
      attachments: {}
    },
    KNIGHT: {
      displayName: 'MP-98 Knight',
      archetype: 'SMG',
      attachments: {}
    },
    DEFENDER: {
      displayName: 'SMG-37 Defender',
      archetype: 'SMG',
      attachments: {}
    },
    PUMMELER: {
      displayName: 'SMG-72 Pummeler',
      archetype: 'SMG',
      attachments: {}
    },
    PUNISHER: {
      displayName: 'SG-8 Punisher',
      archetype: 'SHOTGUN',
      attachments: {}
    },
    BREAKER: {
      displayName: 'SG-225 Breaker',
      archetype: 'SHOTGUN',
      attachments: {}
    },
    SLUGGER: {
      displayName: 'SG-8S Slugger',
      archetype: 'SHOTGUN',
      attachments: {}
    },
    BREAKER_SPRAY_AND_PRAY: {
      displayName: 'SG-225SP Breaker Spray&Pray',
      archetype: 'SHOTGUN',
      attachments: {}
    },
    BREAKER_INCENDIARY: {
      displayName: 'SG-225IE Breaker Incendiary',
      archetype: 'SHOTGUN',
      attachments: {}
    },
    SCYTHE: {
      displayName: 'LAS-5 Scythe',
      archetype: 'ENERGY',
      attachments: {}
    },
    SCORCHER: {
      displayName: 'PLAS-1 Scorcher',
      archetype: 'ENERGY',
      attachments: {}
    },
    BLITZER: {
      displayName: 'Arc-12 Blitzer',
      archetype: 'ENERGY',
      attachments: {}
    },
    SICKLE: {
      displayName: 'LAS-16 Sickle',
      archetype: 'ENERGY',
      attachments: {}
    },
    PUNISHER_PLASMA: {
      displayName: 'SG-8P Punisher Plasma',
      archetype: 'ENERGY',
      attachments: {}
    },
    ERUPTOR: {
      displayName: 'R-36 Eruptor',
      archetype: 'EXPLOSIVE',
      attachments: {}
    },
    EXPLODING_CROSSBOW: {
      displayName: 'CB-9 Exploding Crossbow',
      archetype: 'EXPLOSIVE',
      attachments: {}
    },
    DOMINATOR: {
      displayName: 'JAR-5 Dominator',
      archetype: 'SPECIAL',
      attachments: {}
    },
    PURIFIER: {
      displayName: 'PLAS-101 Purifier',
      archetype: 'ENERGY',
      attachments: {}
    },
    COOKOUT: {
      displayName: 'SG-451 Cookout',
      archetype: 'SHOTGUN',
      attachments: {}
    },
    TORCHER: {
      displayName: 'FLAM-66 Torcher',
      archetype: 'SPECIAL',
      attachments: {}
    },
    CONSTITUTION: {
      archetype: 'MR',
      displayName: 'R-2124 Constitution',
      attachments: {}
    },
    HALT: {
      archetype: 'SHOTGUN',
      displayName: 'SG-20 Halt',
      attachments: {}
    },
    REPRIMAND: {
      archetype: 'SMG',
      displayName: 'SMG-32 Reprimand',
      attachments: {}
    },
    STA_52: {
      archetype: 'AR',
      displayName: 'StA-52 Assault Rifle',
      attachments: {}
    },
    STA_11: {
      archetype: 'SMG',
      displayName: 'StA-11 SMG',
      attachments: {}
    },
    ACCELERATOR: {
      archetype: 'SR',
      displayName: 'PLAS-39 Accelerator Rifle',
      attachments: {}
    },
    DOUBLE_EDGE_SICKLE: {
      archetype: 'ENERGY',
      displayName: 'LAS-17 Double-Edge Sickle',
      attachments: {}
    },
    DEADEYE: {
      archetype: 'MR',
      displayName: 'R-6 Deadeye',
      attachments: {}
    },
    AMENDMENT: {
      archetype: 'MR',
      displayName: 'R-2 Amendment',
      attachments: {}
    },
    PACIFIER: {
      archetype: 'AR',
      displayName: 'AR-32 Pacifier',
      attachments: {}
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

export type PrimaryWeaponKey = keyof typeof weapons.primary
export type SecondaryWeaponKey = keyof typeof weapons.secondary

export const primaryWeaponCodeList = Object.keys(weapons.primary) as PrimaryWeaponKey[]
// TODO: create type alias
export const secondaryWeaponCodeList = Object.keys(weapons.secondary) as SecondaryWeaponKey[]

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
