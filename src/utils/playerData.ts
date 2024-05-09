import { stratagemCodeList } from '@/data/stratagems'
import { grenadeCodeList, primaryWeaponCodeList, secondaryWeaponCodeList } from '@/data/weapons'
import type { IData, IPlayerColor } from '@/utils/defaults'
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
  //   // Primary, secondary, grenade, strat1, strat2, strat3, strat4, color
  //  ['player1', 0, 0, 0, 0, 0, 0, 0, 0],
  //  ['player2', 0, 0, 0, 0, 0, 0, 1, 1],
  //  ['player3', 0, 0, 0, 0, 0, 0, 0, 2],
  //  ['player4', , 0, 0, 0, 0, 0, 0, 3]
  // ]

  data.map(playerArray => {
    playerData.playerList.push({
      name: playerArray[0] as string,
      primaryWeaponCode: primaryWeaponCodeList[playerArray[1] as number],
      secondaryWeaponCode: secondaryWeaponCodeList[playerArray[2] as number],
      grenadeCode: grenadeCodeList[playerArray[3] as number],
      stratagemCodeList: createStratagemCodeList(playerArray.slice(4, 8) as number[]),
      color: playerColorsList[playerArray[8] as number] as IPlayerColor
    })
    logger.debug(playerArray[8])
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
  //   // Primary, secondary, grenade, strat1, strat2, strat3, strat4, color
  //  ['player1', 0, 0, 0, 0, 0, 0, 0, 0],
  //  ['player2', 0, 0, 0, 0, 0, 0, 1, 1],
  //  ['player3', 0, 0, 0, 0, 0, 0, 0, 2],
  //  ['player4', , 0, 0, 0, 0, 0, 0, 3]
  // ]

  const output: Array<Array<string | number>> = []

  inputData.playerList.map(playerObject => {
    output.push([
      playerObject.name,
      primaryWeaponCodeList.indexOf(playerObject.primaryWeaponCode),
      secondaryWeaponCodeList.indexOf(playerObject.secondaryWeaponCode),
      grenadeCodeList.indexOf(playerObject.grenadeCode as string),
      ...playerObject.stratagemCodeList.map(stratagem => {
        return stratagemCodeList.indexOf(stratagem)
      }),
      playerColorsList.indexOf(playerObject.color)
    ])
  })

  logger.debug(`Created player data: `)
  logger.debug(output)

  return output
}
