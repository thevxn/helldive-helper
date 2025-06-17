import {
  magazineAttachmentList,
  muzzleAttachmentList,
  opticsAttachmentList,
  underbarrelAttachmentList
} from '@/data/attachments'
import { boosterCodeList } from '@/data/boosters'
import type { IData, IPlayerColor } from '@/data/defaults'
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
    playerData.playerList.push({
      name: playerArray[0] as string,
      primaryWeaponCode: primaryWeaponCodeList[playerArray[1] as number],
      secondaryWeaponCode: secondaryWeaponCodeList[playerArray[2] as number],
      grenadeCode: grenadeCodeList[playerArray[3] as number],
      stratagemCodeList: createStratagemCodeList(playerArray.slice(4, 8) as number[]),
      color: playerColorsList[playerArray[8] as number] as IPlayerColor,
      perkCode: perkCodeList[playerArray[9] as number],
      boosterCode: boosterCodeList[playerArray[10] as number],
      primaryWeaponAttachments: {
        OPTICS: playerArray[11] !== -1 ? opticsAttachmentList[playerArray[11] as number] : undefined,
        MUZZLE: playerArray[12] !== -1 ? muzzleAttachmentList[playerArray[12] as number] : undefined,
        UNDERBARREL: playerArray[13] !== -1 ? underbarrelAttachmentList[playerArray[13] as number] : undefined,
        MAGAZINE: playerArray[14] !== -1 ? magazineAttachmentList[playerArray[14] as number] : undefined
      }
    })
  })

  logger.debug(`Parsed input: `)
  logger.debug(playerData)
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
    output.push([
      playerObject.name,
      primaryWeaponCodeList.indexOf(playerObject.primaryWeaponCode),
      secondaryWeaponCodeList.indexOf(playerObject.secondaryWeaponCode),
      grenadeCodeList.indexOf(playerObject.grenadeCode),
      ...playerObject.stratagemCodeList.map(stratagem => {
        return stratagemCodeList.indexOf(stratagem)
      }),
      playerColorsList.indexOf(playerObject.color),
      perkCodeList.indexOf(playerObject.perkCode),
      boosterCodeList.indexOf(playerObject.boosterCode),
      playerObject.primaryWeaponAttachments.OPTICS
        ? opticsAttachmentList.indexOf(playerObject.primaryWeaponAttachments.OPTICS)
        : -1,
      playerObject.primaryWeaponAttachments.MUZZLE
        ? muzzleAttachmentList.indexOf(playerObject.primaryWeaponAttachments.MUZZLE)
        : -1,
      playerObject.primaryWeaponAttachments.UNDERBARREL
        ? underbarrelAttachmentList.indexOf(playerObject.primaryWeaponAttachments.UNDERBARREL)
        : -1,
      playerObject.primaryWeaponAttachments.MAGAZINE
        ? magazineAttachmentList.indexOf(playerObject.primaryWeaponAttachments.MAGAZINE)
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
