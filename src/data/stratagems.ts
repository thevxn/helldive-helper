export const stratagemCategories = ['VEHICLE', 'WEAPON', 'BACKPACK', 'ORBITAL', 'EAGLE', 'STATIONARY'] as const

export interface IStratagem {
  displayName: string
  category: (typeof stratagemCategories)[number]
}

// New stratagems must be placed at the bottom to keep the index of the existing keys in order to ensure backwards compatibility with existing generated codes
export const stratagems = {
  MECH: {
    displayName: 'EXO-45 Patriot Exosuit',
    category: 'VEHICLE'
  },
  AUTOCANNON: {
    displayName: 'AC-8 Autocannon',
    category: 'WEAPON'
  },
  ANTI_MATERIEL_RIFLE: {
    displayName: 'APW-1 Anti-Materiel Rifle',
    category: 'WEAPON'
  },
  ARC_THROWER: {
    displayName: 'ARC-3 Arc Thrower',
    category: 'WEAPON'
  },
  EAT: {
    displayName: 'EAT-17 Expendable Anti-tank',
    category: 'WEAPON'
  },
  SPEAR: {
    displayName: 'FAF-14 SPEAR Launcher',
    category: 'WEAPON'
  },
  FLAMETHROWER: {
    displayName: 'FLAM-40 Flamethrower',
    category: 'WEAPON'
  },
  RECOILLESS_RIFLE: {
    displayName: 'GR-8 Recoilless Rifle',
    category: 'WEAPON'
  },
  MACHINE_GUN: {
    displayName: 'MG-43 Machine Gun',
    category: 'WEAPON'
  },
  STALWART: {
    displayName: 'M-105 Stalwart',
    category: 'WEAPON'
  },
  GRENADE_LAUNCHER: {
    displayName: 'GL-21 Grenade Launcher',
    category: 'WEAPON'
  },
  RAILGUN: {
    displayName: 'RS-422 Railgun',
    category: 'WEAPON'
  },
  HEAVY_MACHINE_GUN: {
    displayName: 'MG-206 Heavy Machine Gun',
    category: 'WEAPON'
  },
  LASER_CANNON: {
    displayName: 'LAS-98 Laser Cannon',
    category: 'WEAPON'
  },
  QUASAR_CANNON: {
    displayName: 'LAS-99 Quasar Cannon',
    category: 'WEAPON'
  },
  AIRBURST_LAUNCHER: {
    displayName: 'RL-77 Airburst Rocket Launcher',
    category: 'WEAPON'
  },
  JUMP_PACK: {
    displayName: 'LIFT-850 Jump Pack',
    category: 'BACKPACK'
  },
  SUPPLY_PACK: {
    displayName: 'B-1 Supply Pack',
    category: 'BACKPACK'
  },
  BALLISTIC_SHIELD_BACKPACK: {
    displayName: 'SH-20 Ballistic Shield Backpack',
    category: 'BACKPACK'
  },
  SHIELD_GENERATOR_PACK: {
    displayName: 'SH-32 Shield Generator Pack',
    category: 'BACKPACK'
  },
  GUARD_DOG: {
    displayName: 'AX/AR-23 "Guard Dog"',
    category: 'BACKPACK'
  },
  GUARD_DOG_ROVER: {
    displayName: 'AX/LAS-5 "Guard Dog" Rover',
    category: 'BACKPACK'
  },
  ORBITAL_BARRAGE_380: {
    displayName: 'Orbital 380MM HE Barrage',
    category: 'ORBITAL'
  },
  ORBITAL_BARRAGE_120: {
    displayName: 'Orbital 120MM HE Barrage',
    category: 'ORBITAL'
  },
  ORBITAL_GATLING_BARRAGE: {
    displayName: 'Orbital Gatling Barrage',
    category: 'ORBITAL'
  },
  ORBITAL_AIRBURST_STRIKE: {
    displayName: 'Orbital Airburst Strike',
    category: 'ORBITAL'
  },
  ORBITAL_WALKING_BARRAGE: {
    displayName: 'Orbital Walking Barrage',
    category: 'ORBITAL'
  },
  ORBITAL_LASER: {
    displayName: 'Orbital Laser',
    category: 'ORBITAL'
  },
  ORBITAL_RAILCANNON_STRIKE: {
    displayName: 'Orbital Railcannon Strike',
    category: 'ORBITAL'
  },
  ORBITAL_PRECISION_STRIKE: {
    displayName: 'Orbital Precision Strike',
    category: 'ORBITAL'
  },
  ORBITAL_GAS_STRIKE: {
    displayName: 'Orbital Gas Strike',
    category: 'ORBITAL'
  },
  ORBITAL_EMS_STRIKE: {
    displayName: 'Orbital EMS Strike',
    category: 'ORBITAL'
  },
  ORBITAL_SMOKE_STRIKE: {
    displayName: 'Orbital Smoke Strike',
    category: 'ORBITAL'
  },
  EAGLE_500: {
    displayName: 'Eagle 500kg Bomb',
    category: 'EAGLE'
  },
  EAGLE_AIRSTRIKE: {
    displayName: 'Eagle Airstrike',
    category: 'EAGLE'
  },
  EAGLE_STRAFING_RUN: {
    displayName: 'Eagle Strafing Run',
    category: 'EAGLE'
  },
  EAGLE_CLUSTER_BOMB: {
    displayName: 'Eagle Cluster Bomb',
    category: 'EAGLE'
  },
  EAGLE_NAPALM_AIRSTRIKE: {
    displayName: 'Eagle Napalm Airstrike',
    category: 'EAGLE'
  },
  EAGLE_SMOKE_STRIKE: {
    displayName: 'Eagle Smoke Strike',
    category: 'EAGLE'
  },
  EAGLE_110_ROCKET_PODS: {
    displayName: 'Eagle 110MM Rocket Pods',
    category: 'EAGLE'
  },
  HMG_EMPLACEMENT: {
    displayName: 'E/MG-101 HMG Emplacement',
    category: 'STATIONARY'
  },
  SHIELD_GENERATOR_RELAY: {
    displayName: 'FX-12 Shield Generator Relay',
    category: 'STATIONARY'
  },
  TESLA_TOWER: {
    displayName: 'A/ARC-3 Tesla Tower',
    category: 'STATIONARY'
  },
  ANTI_PERSONNEL_MINEFIELD: {
    displayName: 'MD-6 Anti-Personnel Minefield',
    category: 'STATIONARY'
  },
  INCENDIARY_MINES: {
    displayName: 'MD-I4 Incendiary Mines',
    category: 'STATIONARY'
  },
  MACHINE_GUN_SENTRY: {
    displayName: 'A/MG-43 Machine Gun Sentry',
    category: 'STATIONARY'
  },
  GATLING_SENTRY: {
    displayName: 'A/G-16 Gatling Sentry',
    category: 'STATIONARY'
  },
  MORTAR_SENTRY: {
    displayName: 'A/M-12 Mortar Sentry',
    category: 'STATIONARY'
  },
  AUTOCANNON_SENTRY: {
    displayName: 'A/AC-8 Autocannon Sentry',
    category: 'STATIONARY'
  },
  ROCKET_SENTRY: {
    displayName: 'A/MLS-4X Rocket Sentry',
    category: 'STATIONARY'
  },
  EMS_MORTAR_SENTRY: {
    displayName: 'A/M-23 EMS Mortar Sentry',
    category: 'STATIONARY'
  },
  COMMANDO: {
    displayName: 'MLS-4X Commando',
    category: 'WEAPON'
  },
  EMANCIPATOR_MECH: {
    displayName: 'EXO-49 Emancipator Exosuit',
    category: 'VEHICLE'
  },
  STERILIZER: {
    displayName: 'TX-41 Sterilizer',
    category: 'WEAPON'
  },
  DOG_BREATH: {
    displayName: 'AX/TX-13 "Guard Dog" Dog Breath',
    category: 'BACKPACK'
  },
  ORBITAL_NAPALM_BARRAGE: {
    displayName: 'Orbital Napalm Barrage',
    category: 'ORBITAL'
  },
  DIRECTIONAL_SHIELD: {
    displayName: 'SH-51 Directional Shield',
    category: 'BACKPACK'
  },
  FLAME_SENTRY: {
    displayName: 'A/FLAM-40 Flame Sentry',
    category: 'STATIONARY'
  },
  ANTI_TANK_EMPLACEMENT: {
    displayName: 'E/AT-12 Anti-Tank Emplacement',
    category: 'STATIONARY'
  },
  WASP_LAUNCHER: {
    displayName: 'W.A.S.P. Launcher',
    category: 'WEAPON'
  },
  FRV: {
    displayName: 'M-102 Fast Reconnaissance Vehicle',
    category: 'VEHICLE'
  },
  PORTABLE_HELLBOMB: {
    displayName: 'B-100 Portable Hellbomb',
    category: 'BACKPACK'
  },
  ANTI_TANK_MINES: {
    displayName: 'MD-17 Anti-Tank Mines',
    category: 'STATIONARY'
  },
  GAS_MINES: {
    displayName: 'MD-8 Gas Mines',
    category: 'STATIONARY'
  }
} as const

export const stratagemCodeList = Object.keys(stratagems) as (keyof typeof stratagems)[]
