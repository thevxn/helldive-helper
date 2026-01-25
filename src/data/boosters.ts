export interface IBooster {
  displayName: string
  code?: string
}

export const boosters = {
  FLEXIBLE_REINFORCEMENT_BUDGET: {
    displayName: 'Flexible Reinforcement Budget'
  },
  HELLPOD_SPACE_OPTIMIZATION: {
    displayName: 'Hellpod Space Optimization'
  },
  INCREASED_REINFORCEMENT_BUDGET: {
    displayName: 'Increased Reinforcement Budget'
  },
  MUSCLE_ENHANCEMENT: {
    displayName: 'Muscle Enhancement'
  },
  STAMINA_ENHANCEMENT: {
    displayName: 'Stamina Enhancement'
  },
  UAV_RECON_BOOSTER: {
    displayName: 'UAV Recon Booster'
  },
  VITALITY_ENHANCEMENT: {
    displayName: 'Vitality Enhancement'
  },
  LOCALIZATION_CONFUSION: {
    displayName: 'Localization Confusion'
  },
  EXPERT_EXTRACTION_PILOT: {
    displayName: 'Expert Extraction Pilot'
  },
  MOTIVATIONAL_SHOCKS: {
    displayName: 'Motivational Shocks'
  },
  EXPERIMENTAL_INFUSION: {
    displayName: 'Experimental Infusion'
  },
  FIREBOMB_HELLPODS: {
    displayName: 'Firebomb Hellpods'
  },
  DEAD_SPRINT: {
    displayName: 'Dead Sprint'
  },
  SAMPLE_EXTRICATOR: {
    displayName: 'Sample Extricator'
  },
  SAMPLE_SCANNER: {
    displayName: 'Sample Scanner'
  },
  STUN_PODS: {
    displayName: 'Stun Pods'
  },
  CONCEALED_INSERTION: {
    displayName: 'Concealed Insertion'
  }
} as const satisfies Readonly<Record<string, IBooster>>

export type BoosterKey = keyof typeof boosters
export const boosterCodeList = Object.keys(boosters) as BoosterKey[]

export type BoosterWithCode = IBooster & { code: keyof typeof boosters }

// Codes are required due to how inputs work with data, therefore we dynamically create a boosterList which contains boosters + the additional code property for each of them
export const boosterList: BoosterWithCode[] = []

for (const booster in boosters) {
  const modifiedBooster = {
    ...boosters[booster as BoosterKey],
    code: booster as BoosterKey
  }

  boosterList.push(modifiedBooster)
}
