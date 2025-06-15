export const attachmentCategories = ['OPTICS', 'MUZZLE', 'UNDERBARREL', 'MAGAZINE'] as const

type AttachmentCategory = (typeof attachmentCategories)[number]

type AttachmentsByCategory = {
  [K in AttachmentCategory]: {
    [A in keyof typeof attachments]: (typeof attachments)[A]['category'] extends K ? A : never
  }[keyof typeof attachments]
}

export type PrimaryWeaponAttachments = {
  [K in AttachmentCategory]: AttachmentsByCategory[K]
}

export interface IAttachment {
  code?: string
  displayName: string
  category: (typeof attachmentCategories)[number]
  //   TODO: Defaults need to be defined for each weapon separately
  //   default?: boolean
}

// TODO: Maybe get rid of the category key and use it as the parent key instead..? Would be easier/safer(?) when constructing the player data object from the data string
export const attachments = {
  // Sights
  IRON_SIGHT: {
    displayName: 'Iron Sight',
    category: 'OPTICS'
  },
  REFLEX_SIGHT: {
    displayName: 'Reflex Sight',
    category: 'OPTICS'
  },
  REFLEX_SIGHT_MK_2: {
    displayName: 'Reflex Sight Mk2',
    category: 'OPTICS'
  },
  HOLOGRAPHIC_SIGHT: {
    displayName: 'Holographic Sight',
    category: 'OPTICS'
  },
  TUBE_RED_DOT_X2: {
    displayName: '2x Tube Red Dot',
    category: 'OPTICS'
  },
  COMBAT_SCOPE_X4: {
    displayName: '4x Combat Scope',
    category: 'OPTICS'
  },

  // Underbarrel
  LASER_SIGHT_WITH_FLASHLIGHT: {
    displayName: 'Laser Sight W/ Flashlight',
    category: 'UNDERBARREL'
  },
  NO_UNDERBARREL: {
    displayName: 'No Underbarrel',
    category: 'UNDERBARREL'
  },
  VERTICAL_FOREGRIP: {
    displayName: 'Vertical Foregrip',
    category: 'UNDERBARREL'
  },
  ANGLED_FOREGRIP: {
    displayName: 'Angled Foregrip',
    category: 'UNDERBARREL'
  },
  FLASHLIGHT_VERTICAL_FOREGRIP: {
    displayName: 'Flashlight Vertical Foregrip',
    category: 'UNDERBARREL'
  },
  LASER_SIGHT_ANGLED_FOREGRIP: {
    displayName: 'Laser Sight Angled Foregrip',
    category: 'UNDERBARREL'
  },

  // Muzzle
  MUZZLE_BRAKE: {
    displayName: 'Muzzle Brake',
    category: 'MUZZLE'
  },
  FLASH_HIDER: {
    displayName: 'Flash Hider',
    category: 'MUZZLE'
  },
  NO_MUZZLE: {
    displayName: 'No Attachment',
    category: 'MUZZLE'
  },
  COMPENSATOR: {
    displayName: 'Compensator',
    category: 'MUZZLE'
  },

  // Magazine
  DRUM_MAGAZINE: {
    displayName: 'Drum Magazine',
    category: 'MAGAZINE'
  },
  EXTENDED_MAGAZINE: {
    category: 'MAGAZINE',
    displayName: 'Extended Magazine'
  },
  SHORT_MAGAZINE: {
    displayName: 'Short Magazine',
    category: 'MAGAZINE'
  }
} as const satisfies Record<string, IAttachment>

export const attachmentList = Object.keys(attachments) as (keyof typeof attachments)[]
