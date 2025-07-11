import { getAttachmentsForWeaponForCategory, resolveAttachment } from '@/data/attachments'
import type { AttachmentCategory, AttachmentKeysForCategory } from '@/data/attachments'
import { boosterCodeList } from '@/data/boosters'
import type { BoosterKey } from '@/data/boosters'
import { perkCodeList } from '@/data/perks'
import type { PerkKey } from '@/data/perks'
import { stratagemCodeList } from '@/data/stratagems'
import type { StratagemKey } from '@/data/stratagems'
import { grenadeCodeList, primaryWeaponCodeList, secondaryWeaponCodeList } from '@/data/weapons'
import type { GrenadeKey, PrimaryWeaponKey, SecondaryWeaponKey } from '@/data/weapons'
import { Logger } from '@/utils/logger'

const logger = Logger()

export interface IPlayerData {
  playerList: IPlayer[]
}

export interface IPlayer {
  perkCode: PerkKey
  boosterCode: BoosterKey
  name: string
  primaryWeaponCode: PrimaryWeaponKey
  secondaryWeaponCode: SecondaryWeaponKey
  grenadeCode: GrenadeKey
  stratagemCodeList: StratagemKey[]
  color: PlayerColor
  primaryWeaponAttachments: Partial<{
    [C in AttachmentCategory]: AttachmentKeysForCategory<C>[number]
  }>
}

const playerColorsList = ['orange', 'green', 'blue', 'pink'] as const

export type PlayerColor = (typeof playerColorsList)[number]

type playerDataArray = Array<[string, ...number[]]>

export type base64String = string & { [__brand]: 'base64String' }

export enum PlayerDataField {
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

/**
 * Takes a base64 string containing the shortened data array and generates the complete IData object representing state from it.
 *
 * @param {base64String} dataString
 * @returns {IPlayerData}
 */
export const parsePlayerDataInput = (dataString: base64String): IPlayerData => {
  logger.debug('Received input:')
  logger.debug(dataString)

  const playerData = {
    playerList: []
  } as IPlayerData

  const binaryString = atob(dataString)

  const bytes = Uint8Array.from(binaryString, c => c.charCodeAt(0))

  const json = new TextDecoder().decode(bytes)

  const data = JSON.parse(json) as playerDataArray

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

  logger.debug(`Parsed input: `, playerData)

  return playerData
}

const createStratagemCodeList = (indexArray: Array<number>): typeof stratagemCodeList => {
  return indexArray.map(stratagem => stratagemCodeList[stratagem])
}

/**
 * Takes in the playerData object and converts it to the shortened array format.
 *
 * @param {IPlayerData} inputData
 * @returns {playerDataArray}
 */
export const createPlayerDataOutput = (inputData: IPlayerData): playerDataArray => {
  // const outputDataMock = [
  // Primary, secondary, grenade, strat1, strat2, strat3, strat4, color, perk, booster, primaryOptics, primaryMuzzle, primaryUnderbarrel, primaryMagazine
  //  ['player1', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //  ['player2', 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  //  ['player3', 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  //  ['player4', 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0]
  // ]

  const output: playerDataArray = []

  inputData.playerList.map(playerObject => {
    logger.debug('Received playerObject to convert to output: ', playerObject)

    const name = playerObject.name

    const primaryWeaponIndex = primaryWeaponCodeList.indexOf(playerObject.primaryWeaponCode)

    const secondaryWeaponIndex = secondaryWeaponCodeList.indexOf(playerObject.secondaryWeaponCode)

    const grenadeIndex = grenadeCodeList.indexOf(playerObject.grenadeCode)

    const stratagemIndexList = [
      ...playerObject.stratagemCodeList.map(stratagem => {
        return stratagemCodeList.indexOf(stratagem)
      })
    ]

    const playerColorIndex = playerColorsList.indexOf(playerObject.color)

    const perkIndex = perkCodeList.indexOf(playerObject.perkCode)

    const boosterIndex = boosterCodeList.indexOf(playerObject.boosterCode)

    output.push([
      name,
      primaryWeaponIndex,
      secondaryWeaponIndex,
      grenadeIndex,
      ...stratagemIndexList,
      playerColorIndex,
      perkIndex,
      boosterIndex,
      playerObject.primaryWeaponAttachments.OPTICS
        ? getAttachmentsForWeaponForCategory(playerObject.primaryWeaponCode, 'OPTICS').indexOf(
            playerObject.primaryWeaponAttachments.OPTICS as never
          )
        : -1,
      playerObject.primaryWeaponAttachments.MUZZLE
        ? getAttachmentsForWeaponForCategory(playerObject.primaryWeaponCode, 'MUZZLE').indexOf(
            playerObject.primaryWeaponAttachments.MUZZLE as never
          )
        : -1,
      playerObject.primaryWeaponAttachments.UNDERBARREL
        ? getAttachmentsForWeaponForCategory(playerObject.primaryWeaponCode, 'UNDERBARREL').indexOf(
            playerObject.primaryWeaponAttachments.UNDERBARREL as never
          )
        : -1,
      playerObject.primaryWeaponAttachments.MAGAZINE
        ? getAttachmentsForWeaponForCategory(playerObject.primaryWeaponCode, 'MAGAZINE').indexOf(
            playerObject.primaryWeaponAttachments.MAGAZINE as never
          )
        : -1
    ])
  })

  logger.debug(`Created player data: `)
  logger.debug(output)

  return output
}

/**
 * Takes in the playerData object and converts it to a base64 string containing the shortened data array.
 *
 * @param {IPlayerData} playerData
 * @returns {string}
 */
export const createBase64DataString = (playerData: IPlayerData): string => {
  const outputData = createPlayerDataOutput(playerData)

  const json = JSON.stringify(outputData)

  // btoa() cannot convert unicode characters larger than 1 byte to base64, therefore the string must first be converted to raw bytes.
  // This is needed to enable support for player names containing unicode chars.
  // https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
  const bytes = new TextEncoder().encode(json)

  return btoa(String.fromCharCode(...bytes))
}
