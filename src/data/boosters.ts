export interface IBooster {
  displayName: string
  code?: string
}

export const boosters: Record<string, IBooster> = {
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
  }
}

export const boosterCodeList = Object.keys(boosters) as (keyof typeof boosters)[]

export const boosterList: (typeof boosters)[keyof typeof boosters][] = []

for (const booster in boosters) {
  const modifiedBooster = boosters[booster as keyof typeof boosters]

  modifiedBooster['code'] = booster
  boosterList.push(boosters[booster as keyof typeof boosters])
}
