export const weapons = {
  primary: {
    LIBERATOR: {
      displayName: 'AR-23 Liberator',
      default: true
    },
    LIBERATOR_CONCUSSIVE: {
      displayName: 'AR-23C Liberator Concussive'
    },
    LIBERATOR_PENETRATOR: {
      displayName: 'AR-23P Liberator Penetrator'
    },
    DILIGENCE: {
      displayName: 'R-63 Diligence'
    },
    DILIGENCE_COUNTER_SNIPER: {
      displayName: 'R-63CS Diligence Counter Sniper'
    },
    KNIGHT: {
      displayName: 'MP-98 Knight'
    },
    DEFENDER: {
      displayName: 'SMG-37 Defender'
    },
    PUNISHER: {
      displayName: 'SG-8 Punisher'
    },
    BREAKER: {
      displayName: 'SG-225 Breaker'
    },
    SLUGGER: {
      displayName: 'SG-8S Slugger'
    },
    BREAKER_SPRAY_AND_PRAY: {
      displayName: 'SG-225SP Breaker Spray&Pray'
    },
    BREAKER_INCENDIARY: {
      displayName: 'Breaker Incendiary'
    },
    DOMINATOR: {
      displayName: 'JAR-5 Dominator'
    },
    SCYTHE: {
      displayName: 'LAS-5 Scythe'
    },
    SCORCHER: {
      displayName: 'PLAS-1 Scorcher'
    },
    SICKLE: {
      displayName: 'LAS-16 Sickle'
    }
  },
  secondary: {
    PEACEMAKER: {
      displayName: 'P-2 Peacemaker',
      default: true
    },
    REDEEMER: {
      displayName: 'P-19 Redeemer'
    },
    SENATOR: {
      displayName: 'P-4 Senator'
    }
  }
}

export const primaryWeaponCodeList = Object.keys(weapons.primary)
export const secondaryWeaponCodeList = Object.keys(weapons.secondary)
