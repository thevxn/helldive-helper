export const attachmentCategories = ['OPTICS', 'MUZZLE', 'UNDERBARREL', 'MAGAZINE'] as const

export interface IAttachment {
  code?: string
  displayName: string
  category: (typeof attachmentCategories)[number]
  //   TODO: Defaults need to be defined for each weapon separately
  //   default?: boolean
}

export const attachments = {
  REFLEX_SIGHT: {
    displayName: 'Reflex Sight',
    category: 'OPTICS'
  },
  NO_UNDERBARREL: {
    displayName: 'No Underbarrel',
    category: 'UNDERBARREL'
  },
  MUZZLE_BRAKE: {
    displayName: 'Muzzle Brake',
    category: 'MUZZLE'
  },
  DRUM_MAGAZINE: {
    displayName: 'Drum Magazine',
    category: 'MAGAZINE'
  }
} as const satisfies Record<string, IAttachment>
