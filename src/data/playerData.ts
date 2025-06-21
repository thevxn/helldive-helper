import { getAttachmentsForWeaponForCategory, getDefaultAttachments } from '@/data/attachments'
import { boosterCodeList } from '@/data/boosters'
import type { IData, PlayerColor } from '@/data/defaults'
import { perkCodeList } from '@/data/perks'
import { stratagemCodeList } from '@/data/stratagems'
import { grenadeCodeList, primaryWeaponCodeList, secondaryWeaponCodeList } from '@/data/weapons'
import { Logger } from '@/utils/logger'

const playerColorsList = ['orange', 'green', 'blue', 'pink']

const logger = Logger()

export const parsePlayerDataInput = (data: Array<Array<string | number>>): IData => {
  logger.debug('Received input:')
  logger.debug(data)

  const playerData = {
    playerList: []
  } as IData

  // const inputDataMock = [
  // Primary, secondary, grenade, strat1, strat2, strat3, strat4, color, perk, booster, primaryOptics, primaryMuzzle, primaryUnderbarrel, primaryMagazine
  //  ['player1', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //  ['player2', 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  //  ['player3', 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  //  ['player4', 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0]
  // ]

  data.map(playerArray => {
    const name = playerArray[0] as string

    const primaryWeaponCode = primaryWeaponCodeList[playerArray[1] as number]

    const secondaryWeaponCode = secondaryWeaponCodeList[playerArray[2] as number]

    const grenadeCode = grenadeCodeList[playerArray[3] as number]

    const stratagemCodeList = createStratagemCodeList(playerArray.slice(4, 8) as number[])

    const color = playerColorsList[playerArray[8] as number] as PlayerColor

    const perkCode = perkCodeList[playerArray[9] as number]

    const boosterCode = boosterCodeList[playerArray[10] as number]

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
        OPTICS:
          typeof playerArray[11] === 'number' && playerArray[11] !== -1
            ? getAttachmentsForWeaponForCategory(primaryWeaponCode, 'OPTICS')[playerArray[11] as number]
            : typeof playerArray[11] === 'number' && playerArray[11] === -1
              ? undefined
              : getDefaultAttachments(primaryWeaponCode).OPTICS,

        MUZZLE:
          typeof playerArray[12] === 'number' && playerArray[12] !== -1
            ? getAttachmentsForWeaponForCategory(primaryWeaponCode, 'MUZZLE')[playerArray[12] as number]
            : typeof playerArray[12] === 'number' && playerArray[12] === -1
              ? undefined
              : getDefaultAttachments(primaryWeaponCode).MUZZLE,

        UNDERBARREL:
          typeof playerArray[13] === 'number' && playerArray[13] !== -1
            ? getAttachmentsForWeaponForCategory(primaryWeaponCode, 'UNDERBARREL')[playerArray[13] as number]
            : typeof playerArray[13] === 'number' && playerArray[13] === -1
              ? undefined
              : getDefaultAttachments(primaryWeaponCode).UNDERBARREL,

        MAGAZINE:
          typeof playerArray[14] === 'number' && playerArray[14] !== -1
            ? getAttachmentsForWeaponForCategory(primaryWeaponCode, 'MAGAZINE')[playerArray[14] as number]
            : typeof playerArray[14] === 'number' && playerArray[14] === -1
              ? undefined
              : getDefaultAttachments(primaryWeaponCode).MAGAZINE
      }
    })
  })

  logger.debug(`Parsed input: `, playerData)

  return playerData
}

const createStratagemCodeList = (indexArray: Array<number>): typeof stratagemCodeList => {
  const createdStratagemCodeList: typeof stratagemCodeList = []

  // [0, 1, 2, 3]
  indexArray.map(stratagem => {
    createdStratagemCodeList.push(stratagemCodeList[stratagem])
  })

  return createdStratagemCodeList
}

export const createPlayerDataOutput = (inputData: IData): Array<Array<string | number>> => {
  // const outputDataMock = [
  // Primary, secondary, grenade, strat1, strat2, strat3, strat4, color, perk, booster, primaryOptics, primaryMuzzle, primaryUnderbarrel, primaryMagazine
  //  ['player1', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //  ['player2', 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  //  ['player3', 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
  //  ['player4', 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0]
  // ]

  const output: Array<Array<string | number>> = []

  inputData.playerList.map(playerObject => {
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

export const createBase64DataString = (playerData: IData): string => {
  const outputData = createPlayerDataOutput(playerData)

  return btoa(JSON.stringify(outputData))
}
