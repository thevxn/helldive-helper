import type { IData } from '../data/defaults'

import {
  type AttachmentCategory,
  type PrimaryWeaponAttachments,
  attachments,
  type magazineAttachmentList,
  type muzzleAttachmentList,
  type opticsAttachmentList,
  type underbarrelAttachmentList
} from '@/data/attachments'
import { boosterList, type boosters } from '@/data/boosters'
import type { IWeapon } from '@/data/weapons'
import { Logger } from '@/utils/logger'

const logger = Logger()

// Custom filter function prop for Vue Select so that weapon archetypes are not returned as "selectable" options when filtering
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterOptions = (option: IWeapon, label: any, search: string) => {
  return (label || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1 && !option.isArchetype
}

export const filterSelectedBoosters = (data: IData) => {
  const selectedBoosterCodeList: (keyof typeof boosters)[] = []

  data.playerList.map(player => {
    selectedBoosterCodeList.push(player.boosterCode)
  })

  const filteredBoosterList = boosterList.filter(booster => {
    return !selectedBoosterCodeList.includes(booster.code)
  })

  return filteredBoosterList
}

export type SelectedAttachment =
  | (typeof opticsAttachmentList)[number]
  | (typeof muzzleAttachmentList)[number]
  | (typeof underbarrelAttachmentList)[number]
  | (typeof magazineAttachmentList)[number]

export const filterAttachments = (selectedAttachment: SelectedAttachment, category: AttachmentCategory) => {
  logger.debug(`Received selected attachment: ${String(selectedAttachment)}`)
  console.log(Object.keys(attachments[category]))
  // TODO: Filter out the selected attachment
  return Object.keys(attachments[category]) as PrimaryWeaponAttachments[AttachmentCategory][]
}
