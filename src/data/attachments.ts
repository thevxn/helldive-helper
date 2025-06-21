import { type IPrimaryWeapon, type PrimaryWeaponKey, weapons } from '@/data/weapons'

export const attachmentCategories = ['OPTICS', 'MUZZLE', 'UNDERBARREL', 'MAGAZINE'] as const

export type AttachmentCategory = (typeof attachmentCategories)[number]

export enum AttachmentCategoryEnum {
  OPTICS,
  MUZZLE,
  UNDERBARREL,
  MAGAZINE
}

export type WeaponAttachments = {
  [C in keyof typeof attachments]?: keyof (typeof attachments)[C]
}

export interface IAttachment {
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
    },
    TUBE_RED_DOT_X1_5: {
      displayName: '1.5x Tube Red Dot'
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

export type AttachmentKey = {
  [C in keyof typeof attachments]: keyof (typeof attachments)[C]
}[keyof typeof attachments]

export type AttachmentKeysForWeaponForCategory<
  W extends PrimaryWeaponKey,
  C extends AttachmentCategory
> = C extends keyof (typeof weapons.primary)[W]['attachments']
  ? (keyof (typeof weapons.primary)[W]['attachments'][C])[]
  : []

export type AttachmentCategoriesForWeapon<W extends PrimaryWeaponKey> = keyof (typeof weapons.primary)[W]['attachments']

export const getAttachmentsForWeaponForCategory = <W extends PrimaryWeaponKey, C extends AttachmentCategory>(
  weapon: W,
  category: C
) => {
  const attachmentsObj = weapons.primary[weapon].attachments[category as keyof AttachmentCategoriesForWeapon<W>]

  if (attachmentsObj) {
    return Object.keys(attachmentsObj) as AttachmentKeysForWeaponForCategory<W, C>
  }

  return []
}
export type AttachmentKeysForCategory<C extends AttachmentCategory> = (keyof (typeof attachments)[C])[]

export function getDefaultAttachments(weapon: PrimaryWeaponKey) {
  const attachmentsPerCategoryForWeapon = weapons.primary[weapon].attachments as IPrimaryWeapon['attachments']

  const defaults: Partial<{
    [C in AttachmentCategory]: AttachmentKeysForCategory<C>[number]
  }> = {
    OPTICS: undefined,
    MUZZLE: undefined,
    UNDERBARREL: undefined,
    MAGAZINE: undefined
  }

  for (const category of attachmentCategories) {
    const attachments = attachmentsPerCategoryForWeapon[category]

    if (attachments) {
      for (const attachmentKey of Object.keys(attachments)) {
        const attachment = attachments[attachmentKey as keyof typeof attachments]

        if (attachment && 'default' in attachment) {
          defaults[category] = attachmentKey as AttachmentKeysForCategory<typeof category>[number]
          break
        }
      }
    }
  }

  return defaults
}
