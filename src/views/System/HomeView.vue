<template>
  <main
    class="container mb-16 mt-4 flex min-w-full flex-col flex-wrap gap-8 p-4 font-semibold sm:mb-4 sm:flex-row sm:gap-6 sm:p-0">
    <div
      class="bg-diagonal mx-auto flex h-full w-full snap-start flex-col place-items-center content-center rounded-md bg-opacity-80 p-4 font-bold sm:w-5/12 xl:w-1/5"
      :class="`border-4 border-solid border-yellow-300`"
      v-for="(player, i) in data.playerList"
      :key="i">
      <div
        :class="`${playerBorders[player.color]} center mb-4  ml-auto  mr-0 inline h-fit w-fit pb-1 pl-4 pr-4 pt-1 text-center`">
        {{ player.name[0] + (i + 1) }}
      </div>
      <img src="/helmet.png" class="mb-4 block h-[189px] w-[191px]" alt="helldiver-helmet" />

      <input
        :id="`name-${i}`"
        name="squad-member-name"
        type="text"
        :placeholder="player.name"
        class="`w-[200px] focus:outline-yellow-300` bg-yellow-300 text-center text-black caret-black hover:outline-none hover:outline-2 hover:outline-yellow-300 focus:outline-none focus:outline-2"
        v-model="player.name" />
      <label :for="`primary-${i}`" class="mb-1 mt-4 w-full">Primary Weapon:</label>
      <v-select
        name="primary"
        :id="`primary-${i}`"
        class="custom-select w-full rounded bg-yellow-300 font-main text-black caret-black hover:outline-none hover:outline-2 hover:outline-yellow-300 focus:outline-none focus:outline-2 focus:outline-yellow-300"
        v-model="player.primaryWeaponCode"
        :options="createAndSortWeapons(primaryArchetypes)"
        label="displayName"
        :reduce="(weapon: IPrimaryWeapon) => weapon.code"
        :selectable="(option: IPrimaryWeapon) => !option.isArchetype"
        :components="{ Deselect: null }"
        :filter-by="filterOptions">
      </v-select>
      <img
        :src="`/weapons/${String(player.primaryWeaponCode)}.webp`"
        class="mt-4 h-[108px] w-[250px]"
        :alt="`${(weapons.primary as typeof weapons.primary)[player.primaryWeaponCode].displayName}`" />
      <div class="flex h-full w-full flex-row gap-2">
        <div class="flex w-1/2 flex-col">
          <label :for="`secondary-${i}`" class="mb-1 mt-4 whitespace-nowrap">Secondary Weapon:</label>
          <v-select
            name="secondary"
            :id="`secondary-${i}`"
            class="custom-select w-full rounded bg-yellow-300 font-main text-black caret-black hover:outline-none hover:outline-2 hover:outline-yellow-300 focus:outline-none focus:outline-2 focus:outline-yellow-300"
            v-model="player.secondaryWeaponCode"
            :options="createAndSortWeapons(secondaryArchetypes)"
            label="displayName"
            :reduce="(weapon: ISecondaryWeapon) => weapon.code"
            :selectable="(option: ISecondaryWeapon) => !option.isArchetype"
            :components="{ Deselect: null }"
            :filter-by="filterOptions">
          </v-select>
          <img
            :src="`/weapons/${String(player.secondaryWeaponCode)}.webp`"
            class="mt-4 h-[108px] w-[200px] self-center"
            :alt="`${(weapons.secondary as typeof weapons.secondary)[player.secondaryWeaponCode].displayName}`" />
        </div>
        <div class="flex w-1/2 flex-col">
          <label :for="`grenade-${i}`" class="mb-1 mt-4">Grenade:</label>
          <v-select
            name="grenade"
            :id="`grenade-${i}`"
            class="custom-select w-full rounded bg-yellow-300 font-main text-black caret-black hover:outline-none hover:outline-2 hover:outline-yellow-300 focus:outline-none focus:outline-2 focus:outline-yellow-300"
            v-model="player.grenadeCode"
            :options="createAndSortWeapons(grenadeArchetypes)"
            label="displayName"
            :reduce="(weapon: IGrenade) => weapon.code"
            :selectable="(option: IWeapon) => !option.isArchetype"
            :components="{ Deselect: null }"
            :filter-by="filterOptions">
          </v-select>
          <img
            :src="`/grenades/${String(player.grenadeCode)}.webp`"
            class="mt-[20px] h-[100px] w-[100px] self-center"
            :alt="`${grenades[player.grenadeCode as keyof typeof grenades].displayName}`" />
        </div>
      </div>
      <span class="mb-1 mt-4 w-full">Stratagems:</span>
      <div class="flex flex-row flex-wrap justify-center gap-2">
        <StratagemSelect
          :selected-stratagems="data.playerList[i].stratagemCodeList"
          @stratagem-selected="handleStratagemSelection"
          ref="modalRef"
          :id="`stratagem-select-${i}`" />
        <img
          :class="`mt-2 h-[50px] w-[50px] rounded-md border-4 border-solid border-gray-900 hover:border-4 hover:border-solid hover:border-yellow-300 ${activeStratagemSelect[i][j] ? `border-4 border-solid border-yellow-300` : ''}`"
          v-for="(stratagem, j) in player.stratagemCodeList"
          :key="stratagem"
          :src="`/icons/stratagems/${player.stratagemCodeList[j]}.webp`"
          :title="stratagems[stratagem as keyof typeof stratagems].displayName"
          @click="toggleStratagemSelect(i, j)" />
      </div>
    </div>
    <div class="flex w-full flex-row content-center justify-center" tabindex="0">
      <button
        class="bg-diagonal-hover h-12 w-48 place-self-center self-center rounded bg-yellow-300 font-bold text-black hover:border-2 hover:border-solid hover:border-yellow-300 hover:text-yellow-300 active:bg-yellow-300 active:bg-none active:text-black"
        @click="generateDataString">
        Copy Link
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { inject, nextTick, reactive, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import type { ToastPluginApi } from 'vue-toast-notification'

  import StratagemSelect from '@/components/StratagemSelect.vue'
  import { stratagems } from '@/data/stratagems'
  import {
    type IGrenade,
    type IPrimaryWeapon,
    type ISecondaryWeapon,
    type IWeapon,
    grenadeArchetypes,
    grenades,
    weapons
  } from '@/data/weapons'
  import { primaryArchetypes, secondaryArchetypes } from '@/data/weapons'
  import { config } from '@/utils/config'
  import { type IData, getDefaultData } from '@/utils/defaults'
  import { filterOptions } from '@/utils/filter'
  import { Logger } from '@/utils/logger'
  import { createPlayerDataOutput, parsePlayerDataInput } from '@/utils/playerData'
  import { createAndSortWeapons } from '@/utils/sort'
  import { playerBorders } from '@/utils/styles'

  const logger = Logger()
  const toast: ToastPluginApi = inject('toast') as ToastPluginApi
  let data: IData
  const route = useRoute()

  if (route.query.data) {
    try {
      data = reactive(parsePlayerDataInput(JSON.parse(atob(route.query.data as string))))

      const router = useRouter()

      router.replace({ query: undefined })
    } catch (e) {
      logger.log(e)
      data = getDefaultData()
    }
  } else if (localStorage.getItem('data')) {
    data = reactive(parsePlayerDataInput(JSON.parse(atob(localStorage.getItem('data') as string))))
  } else {
    data = getDefaultData()
  }

  localStorage.setItem('data', btoa(JSON.stringify(createPlayerDataOutput(data))))

  const generateDataString = async () => {
    const link = `${BASE_URL}/?data=${btoa(JSON.stringify(createPlayerDataOutput(data)))}`

    try {
      await navigator.clipboard.writeText(link)
      toast.success('Link copied!', config.toast)
    } catch (err) {
      logger.error('Failed to copy: ', err)
      toast.error('Error while copying link.')
    }

    return
  }
  const activeStratagemSelect = ref([
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]
  ])
  const modalRef = ref()

  watch(data, () => {
    localStorage.setItem('data', btoa(JSON.stringify(createPlayerDataOutput(data))))
  })

  const toggleStratagemSelect = (playerIndex: number, position: number) => {
    logger.debug(playerIndex, position)
    activeStratagemSelect.value = activeStratagemSelect.value.map((player, i) => {
      if (i !== playerIndex) {
        return player
      } else {
        return player.map((el, j) => {
          if (j === position) {
            return !player[j]
          } else {
            return false
          }
        })
      }
    })

    nextTick(() => {
      document.querySelector(`#stratagem-select-${playerIndex}`)?.scrollIntoView({ behavior: 'smooth' })
    })

    if (modalRef.value[playerIndex].playerIndex === playerIndex && modalRef.value[playerIndex].position === position) {
      modalRef.value[playerIndex].displayOff()
      modalRef.value[playerIndex].playerIndex = null
      modalRef.value[playerIndex].position = null
    } else {
      modalRef.value[playerIndex].playerIndex = playerIndex
      modalRef.value[playerIndex].position = position
      modalRef.value[playerIndex].displayOn()
    }
  }
  const handleStratagemSelection = (
    playerIndex: number,
    stratagemPosition: number,
    stratagemCode: keyof typeof stratagems
  ) => {
    data.playerList[playerIndex].stratagemCodeList[stratagemPosition] = stratagemCode
    activeStratagemSelect.value[playerIndex][stratagemPosition] = false
    modalRef.value[playerIndex].displayOff()
    document.querySelector(`#primary-${playerIndex}`)?.scrollIntoView({ behavior: 'smooth' })
    modalRef.value[playerIndex].playerIndex = null
    modalRef.value[playerIndex].position = null
  }
</script>

<style scoped>
  * >>> {
    --vs-dropdown-bg: #fde047;
    --vs-selected-color: #000000;
    --vs-controls-color: #000000;
    /* --vs-font-size: inherit;
    --vs-line-height: inherit; */
    --vs-dropdown-option--active-bg: #000000;
    --vs-dropdown-option--active-color: #fde047;
    --vs-state-disabled-controls-color: var(--vs-colors--light);
    --vs-state-disabled-cursor: allowed;
  }
</style>
