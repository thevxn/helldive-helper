import { type IPrimaryWeapon, type PrimaryWeaponKey, weapons } from '@/data/weapons'

export const attachmentCategories = ['OPTICS', 'MUZZLE', 'UNDERBARREL', 'MAGAZINE'] as const

export type AttachmentCategory = (typeof attachmentCategories)[number]

export enum AttachmentCategoryEnum {
  OPTICS,
  MUZZLE,
  UNDERBARREL,
  MAGAZINE
}

export type PrimaryWeaponAttachments = {
  [C in keyof typeof attachments]?: keyof (typeof attachments)[C]
}

export interface IAttachment {
  code?: string
  displayName: string
}

export const attachments = {
  OPTICS: {
    IRON_SIGHT: {
      displayName: 'Iron Sight'
    },
    REFLEX_SIGHT: {
      displayName: 'Reflex Sight'
    },
    REFLEX_SIGHT_MK_2: {
      displayName: 'Reflex Sight Mk2'
    },
    HOLOGRAPHIC_SIGHT: {
      displayName: 'Holographic Sight'
    },
    TUBE_RED_DOT_X2: {
      displayName: '2x Tube Red Dot'
    },
    COMBAT_SCOPE_X4: {
      displayName: '4x Combat Scope'
    }
  },
  MUZZLE: {
    MUZZLE_BRAKE: {
      displayName: 'Muzzle Brake'
    },
    FLASH_HIDER: {
      displayName: 'Flash Hider'
    },
    NO_MUZZLE: {
      displayName: 'No Attachment'
    },
    COMPENSATOR: {
      displayName: 'Compensator'
    }
  },
  UNDERBARREL: {
    LASER_SIGHT_WITH_FLASHLIGHT: {
      displayName: 'Laser Sight W/ Flashlight'
    },
    NO_UNDERBARREL: {
      displayName: 'No Underbarrel'
    },
    VERTICAL_FOREGRIP: {
      displayName: 'Vertical Foregrip'
    },
    ANGLED_FOREGRIP: {
      displayName: 'Angled Foregrip'
    },
    FLASHLIGHT_VERTICAL_FOREGRIP: {
      displayName: 'Flashlight Vertical Foregrip'
    },
    LASER_SIGHT_ANGLED_FOREGRIP: {
      displayName: 'Laser Sight Angled Foregrip'
    }
  },
  MAGAZINE: {
    DRUM_MAGAZINE: {
      displayName: 'Drum Magazine'
    },
    EXTENDED_MAGAZINE: {
      displayName: 'Extended Magazine'
    },
    SHORT_MAGAZINE: {
      displayName: 'Short Magazine'
    }
  }
} as const satisfies Record<AttachmentCategory, Record<string, IAttachment>>

// TODO: Reorganize?

export const opticsAttachmentList = Object.keys(attachments.OPTICS) as (keyof typeof attachments.OPTICS)[]
export const muzzleAttachmentList = Object.keys(attachments.MUZZLE) as (keyof typeof attachments.MUZZLE)[]
export const underbarrelAttachmentList = Object.keys(
  attachments.UNDERBARREL
) as (keyof typeof attachments.UNDERBARREL)[]
export const magazineAttachmentList = Object.keys(attachments.MAGAZINE) as (keyof typeof attachments.MAGAZINE)[]

type AttachmentKeysForCategory<C extends AttachmentCategory> = (keyof (typeof attachments)[C])[]

export const getAttachmentsForCategory = <C extends AttachmentCategory>(category: C) => {
  return Object.keys(attachments[category]) as AttachmentKeysForCategory<C>
}

// TODO: Map out all data and types to find out if there's anything that should be pruned or refactored
// E.g. the attachments map, attachments added to weapons, all associated types, ...?

// TODO: Don't forget to add an image for a non-existent attachment (shown when the weapon cannot have an attachment in the given category). Name it INVALID_ATTACHMENT.webp or something
// Will be returned by the function to generate default attachments for a given weapon

export type AttachmentKey = {
  [C in keyof typeof attachments]: keyof (typeof attachments)[C]
}[keyof typeof attachments]

export function getDefaultAttachmentsForPrimaryWeapon(weapon: PrimaryWeaponKey) {
  const attachmentsPerCategoryForWeapon = weapons.primary[weapon].attachments as IPrimaryWeapon['attachments']

  const defaults: Partial<Record<AttachmentCategory, AttachmentKey>> = {}

  for (const category of attachmentCategories) {
    const attachments = attachmentsPerCategoryForWeapon[category]

    if (attachments) {
      for (const attachmentKey of Object.keys(attachments) as AttachmentKey[]) {
        const attachment = attachments[attachmentKey]

        if (attachment?.default) {
          defaults[category] = attachmentKey
        }
      }
    }
  }

  return defaults
}
