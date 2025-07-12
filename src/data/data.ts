import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  type AttachmentCategory,
  type AttachmentKeysForCategory,
  getAttachmentsForWeaponForCategory,
  resolveAttachment
} from '@/data/attachments'
import { type BoosterKey, boosterCodeList } from '@/data/boosters'
import { getDefaultData } from '@/data/defaults'
import { type PerkKey, perkCodeList } from '@/data/perks'
import { type StratagemKey, stratagemCodeList } from '@/data/stratagems'
import {
  type GrenadeKey,
  type PrimaryWeaponKey,
  type SecondaryWeaponKey,
  grenadeCodeList,
  primaryWeaponCodeList,
  secondaryWeaponCodeList
} from '@/data/weapons'
import { config } from '@/utils/config'
import { filterSelectedBoosters } from '@/utils/filter'
import { Logger } from '@/utils/logger'

const logger = Logger()

export interface IData {
  playerList: IPlayer[]
}

export interface IPlayer {
  name: PlayerName
  primaryWeaponCode: PrimaryWeaponKey
  secondaryWeaponCode: SecondaryWeaponKey
  grenadeCode: GrenadeKey
  stratagemCodeList: StratagemKey[]
  color: PlayerColor
  perkCode: PerkKey
  boosterCode: BoosterKey
  primaryWeaponAttachments: Partial<{
    [C in AttachmentCategory]: AttachmentKeysForCategory<C>[number]
  }>
}

const playerColorsList = ['orange', 'green', 'blue', 'pink'] as const

export type PlayerColor = (typeof playerColorsList)[number]

enum PlayerDataField {
  PLAYER_NAME,
  PRIMARY_WEAPON,
  SECONDARY_WEAPON,
  GRENADE,
  STRAT1,
  STRAT2,
  STRAT3,
  STRAT4,
  PLAYER_COLOR,
  PERK,
  BOOSTER,
  PRIMARY_OPTICS,
  PRIMARY_MUZZLE,
  PRIMARY_UNDERBARREL,
  PRIMARY_MAGAZINE
}

export type PlayerName = Branded<string, 'PlayerName'>

type PrimaryWeaponIndex = Branded<number, 'PrimaryWeaponIndex'>
type SecondaryWeaponIndex = Branded<number, 'SecondaryWeaponIndex'>
type GrenadeIndex = Branded<number, 'GrenadeIndex'>
type StratagemIndex = Branded<number, 'StratagemIndex'>
type PlayerColorIndex = Branded<number, 'ColorIndex'>
type PerkIndex = Branded<number, 'PerkIndex'>
type BoosterIndex = Branded<number, 'BoosterIndex'>
type OpticsAttachmentIndex = Branded<number, 'OpticsAttachmentIndex'>
type MuzzleAttachmentIndex = Branded<number, 'MuzzleAttachmentIndex'>
type UnderbarrelAttachmentIndex = Branded<number, 'UnderbarrelAttachmentIndex'>
type MagazineAttachmentIndex = Branded<number, 'MagazineAttachmentIndex'>

type PlayerDataRow = [
  PlayerName,
  PrimaryWeaponIndex,
  SecondaryWeaponIndex,
  GrenadeIndex,
  StratagemIndex,
  StratagemIndex,
  StratagemIndex,
  StratagemIndex,
  PlayerColorIndex,
  PerkIndex,
  BoosterIndex,
  OpticsAttachmentIndex,
  MuzzleAttachmentIndex,
  UnderbarrelAttachmentIndex,
  MagazineAttachmentIndex
]

export type PlayerDataArray = PlayerDataRow[]

export type base64String = Branded<string, 'base64String'>

/**
 * Takes a base64 string containing the shortened data array and generates the complete IData object representing state from it.
 *
 * @param {base64String} dataString
 * @returns {IData}
 */
export const parseInputData = (dataString: base64String): IData => {
  logger.debug('Received input:')
  logger.debug(dataString)

  const playerData = {
    playerList: []
  } as IData

  const binaryString = atob(dataString)

  const bytes = Uint8Array.from(binaryString, c => c.charCodeAt(0))

  try {
    const json = new TextDecoder().decode(bytes)

    const data = JSON.parse(json) as PlayerDataArray

    data.map(playerArray => {
      const name = playerArray[PlayerDataField.PLAYER_NAME]

      const primaryWeaponCode = primaryWeaponCodeList[playerArray[PlayerDataField.PRIMARY_WEAPON]]

      const secondaryWeaponCode = secondaryWeaponCodeList[playerArray[PlayerDataField.SECONDARY_WEAPON]]

      const grenadeCode = grenadeCodeList[playerArray[PlayerDataField.GRENADE]]

      const stratagemCodeList = createStratagemCodeList([
        playerArray[PlayerDataField.STRAT1],
        playerArray[PlayerDataField.STRAT2],
        playerArray[PlayerDataField.STRAT3],
        playerArray[PlayerDataField.STRAT4]
      ])

      const color = playerColorsList[playerArray[PlayerDataField.PLAYER_COLOR]]

      const perkCode = perkCodeList[playerArray[PlayerDataField.PERK]]

      const boosterCode = boosterCodeList[playerArray[PlayerDataField.BOOSTER]]

      playerData.playerList.push({
        name,
        primaryWeaponCode,
        secondaryWeaponCode,
        grenadeCode,
        stratagemCodeList,
        color,
        perkCode,
        boosterCode,
        primaryWeaponAttachments: {
          OPTICS: resolveAttachment(primaryWeaponCode, 'OPTICS', playerArray[PlayerDataField.PRIMARY_OPTICS]),

          MUZZLE: resolveAttachment(primaryWeaponCode, 'MUZZLE', playerArray[PlayerDataField.PRIMARY_MUZZLE]),

          UNDERBARREL: resolveAttachment(
            primaryWeaponCode,
            'UNDERBARREL',
            playerArray[PlayerDataField.PRIMARY_UNDERBARREL]
          ),

          MAGAZINE: resolveAttachment(primaryWeaponCode, 'MAGAZINE', playerArray[PlayerDataField.PRIMARY_MAGAZINE])
        }
      })
    })
  } catch (e) {
    logger.error('Invalid base64 input: ', e)
    throw new Error('Invalid player data')
  }

  logger.debug(`Parsed input: `, playerData)

  return playerData
}

/**
 * Takes in an array of stratagem indexes and returns an array containing the codes of the concerned stratagems.
 *
 * @param {StratagemIndex[]} indexArray
 * @returns {StratagemKey[]}
 */
const createStratagemCodeList = (indexArray: StratagemIndex[]): StratagemKey[] =>
  indexArray.map(stratagem => stratagemCodeList[stratagem])

/**
 * Takes in the playerData object and converts it to the shortened array format for encoding.
 *
 * @param {IData} inputData
 * @returns {playerDataArray}
 */
export const createOutputData = (inputData: IData): PlayerDataArray => {
  const output: PlayerDataArray = []

  inputData.playerList.map(playerObject => {
    const name = playerObject.name

    const primaryWeaponIndex = primaryWeaponCodeList.indexOf(playerObject.primaryWeaponCode) as PrimaryWeaponIndex

    const secondaryWeaponIndex = secondaryWeaponCodeList.indexOf(
      playerObject.secondaryWeaponCode
    ) as SecondaryWeaponIndex

    const grenadeIndex = grenadeCodeList.indexOf(playerObject.grenadeCode) as GrenadeIndex

    const stratagemIndexList = playerObject.stratagemCodeList.map(stratagem =>
      stratagemCodeList.indexOf(stratagem)
    ) as [StratagemIndex, StratagemIndex, StratagemIndex, StratagemIndex]

    const playerColorIndex = playerColorsList.indexOf(playerObject.color) as PlayerColorIndex

    const perkIndex = perkCodeList.indexOf(playerObject.perkCode) as PerkIndex

    const boosterIndex = boosterCodeList.indexOf(playerObject.boosterCode) as BoosterIndex

    output.push([
      name,
      primaryWeaponIndex,
      secondaryWeaponIndex,
      grenadeIndex,
      ...stratagemIndexList,
      playerColorIndex,
      perkIndex,
      boosterIndex,
      (playerObject.primaryWeaponAttachments.OPTICS
        ? getAttachmentsForWeaponForCategory(playerObject.primaryWeaponCode, 'OPTICS').indexOf(
            playerObject.primaryWeaponAttachments.OPTICS as never
          )
        : -1) as OpticsAttachmentIndex,
      (playerObject.primaryWeaponAttachments.MUZZLE
        ? getAttachmentsForWeaponForCategory(playerObject.primaryWeaponCode, 'MUZZLE').indexOf(
            playerObject.primaryWeaponAttachments.MUZZLE as never
          )
        : -1) as MuzzleAttachmentIndex,
      (playerObject.primaryWeaponAttachments.UNDERBARREL
        ? getAttachmentsForWeaponForCategory(playerObject.primaryWeaponCode, 'UNDERBARREL').indexOf(
            playerObject.primaryWeaponAttachments.UNDERBARREL as never
          )
        : -1) as UnderbarrelAttachmentIndex,
      (playerObject.primaryWeaponAttachments.MAGAZINE
        ? getAttachmentsForWeaponForCategory(playerObject.primaryWeaponCode, 'MAGAZINE').indexOf(
            playerObject.primaryWeaponAttachments.MAGAZINE as never
          )
        : -1) as MagazineAttachmentIndex
    ])
  })

  logger.debug(`Created player data: `)
  logger.debug(output)

  return output
}

/**
 * Takes in the playerData object and converts it to a base64 string containing the shortened data array.
 *
 * @param {IData} playerData
 * @returns {string}
 */
export const createBase64DataString = (playerData: IData): string => {
  const outputData = createOutputData(playerData)

  const json = JSON.stringify(outputData)

  // btoa() cannot convert unicode characters larger than 1 byte to base64, therefore the string must first be converted to raw bytes.
  // This is needed to enable support for player names containing unicode chars.
  // https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
  const bytes = new TextEncoder().encode(json)

  return btoa(String.fromCharCode(...bytes))
}

/**
 * Loads existing data if there are any, otherwise generates default data.
 * Data is either loaded from URL, local storage or default data is generated as a backup with descending priority:
 * - If provided, tries to load data from query string.
 * - If no query string provided, tries to load data from local storage.
 * - If no query string provided and data are not available in local storage, generates default data.
 *
 * @export
 * @returns {IData}
 */
export function loadData(): IData {
  const route = useRoute()

  let data

  if (route.query.data) {
    data = route.query.data.toString()
    logger.debug('Data loaded from url')
  } else if (localStorage.getItem('data')) {
    data = localStorage.getItem('data')
    logger.debug('Data loaded from local storage')
  } else {
    data = null
    logger.debug('No data found, default data will be used')
  }

  try {
    if (data) {
      const parsedData = parseInputData(data as base64String)

      // Backwards compatibility for data strings generated before perks and boosters were introduced
      parsedData.playerList.forEach((player, i) => {
        if (!player.perkCode) {
          parsedData.playerList[i].perkCode = config.compatibility.defaultPerk
        }

        if (!player.boosterCode) {
          // Returns the first booster which is not in use yet to be used as the default one for the given player
          parsedData.playerList[i].boosterCode = filterSelectedBoosters(parsedData)[0].code
        }
      })

      const router = useRouter()

      // Remove the data string from the url once it's successfully parsed. Yes, this runs even if the data was loaded from the local storage.
      router.replace({ query: undefined })

      return reactive(parsedData)
    }

    return reactive(getDefaultData(0))
  } catch (e) {
    logger.error(e)

    return reactive(getDefaultData(0))
  }
}
