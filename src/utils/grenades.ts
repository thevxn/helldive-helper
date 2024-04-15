export const grenades = {
  FRAG: {
    displayName: 'G-6 Frag',
    default: true
  },
  HIGH_EXPLOSIVE: {
    displayName: 'G-12 High Explosive'
  },
  INCENDIARY: {
    displayName: 'G-10 Incendiary'
  },
  IMPACT: {
    displayName: 'G-16 Impact'
  },
  SMOKE: {
    displayName: 'G-3 Smoke'
  },
  STUN: {
    displayName: 'G-23 Stun'
  },
  THERMITE: {
    displayName: 'G-123 Thermite'
  }
}

export const grenadeCodeList = Object.keys(grenades) as (keyof typeof grenades)[]
