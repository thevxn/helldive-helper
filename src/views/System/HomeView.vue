<template>
  <main
    class="container mb-16 mt-4 flex min-h-full min-w-full flex-col flex-wrap gap-8 p-4 font-semibold sm:mb-4 sm:flex-row sm:gap-6 sm:p-0">
    <div
      class="bg-diagonal mx-auto flex w-full snap-start flex-col place-items-center content-center rounded-md bg-opacity-80 p-4 font-bold sm:h-auto sm:w-5/12 xl:w-[22%]"
      :class="`border-4 border-solid border-yellow-300`"
      v-for="(player, i) in data.playerList"
      :key="i">
      <div
        :class="`${playerBorders[player.color]} center mb-2 ml-auto  mr-0  inline h-fit w-fit pb-1 pl-4 pr-4 pt-1 text-center sm:mb-4`">
        {{ player.name ? player.name[0].toUpperCase() + (i + 1) : 'P' + (i + 1) }}
      </div>
      <img src="/helmet.webp" class="mb-2 block sm:mb-4" alt="helldiver-helmet" />
      <input
        :id="`name-${i}`"
        name="squad-member-name"
        type="text"
        :placeholder="player.name"
        class="` focus:outline-yellow-300` w-[200px] bg-yellow-300 text-center text-black caret-black hover:outline-none hover:outline-2 hover:outline-yellow-300 focus:outline-none focus:outline-2"
        v-model="player.name" />
      <label :for="`primary-${i}`" class="mb-1 mt-2 w-full snap-start sm:mt-4">Primary Weapon:</label>
      <v-select
        name="primary"
        :id="`primary-${i}`"
        class="custom-select h-[82px] w-full snap-start rounded bg-yellow-300 font-main text-black caret-black hover:outline-none hover:outline-2 hover:outline-yellow-300 focus:outline-none focus:outline-2 focus:outline-yellow-300"
        v-model="player.primaryWeaponCode"
        :options="createAndSortWeapons(primaryArchetypes)"
        label="displayName"
        :reduce="(weapon: IPrimaryWeapon) => weapon.code"
        :selectable="(option: IPrimaryWeapon) => !option.isArchetype"
        :components="{ Deselect: null }"
        :filter-by="filterOptions"
        :searchable="config.forms.searchable">
        <template #option="option">
          <div class="flex flex-row items-center justify-start gap-2">
            <img
              class="h-[60px] max-h-[60px] min-h-[60px] w-[115px] min-w-[115px] max-w-[115px]"
              :src="`/weapons/${option.code}.webp`"
              :alt="`${weapons.primary[player.primaryWeaponCode].displayName}`"
              v-if="!option.isArchetype" />
            <span class="">{{ option.displayName }}</span>
          </div>
        </template>
        <template #selected-option="option">
          <div class="flex flex-row items-center justify-start gap-2">
            <img
              class="h-[70px] max-h-[70px] min-h-[70px] w-[130px] min-w-[130px] max-w-[130px]"
              :src="`/weapons/${option.code}.webp`"
              :alt="`${weapons.primary[player.primaryWeaponCode].displayName}`"
              v-if="!option.isArchetype" />
            <span class="whitespace-break-spaces">{{ option.displayName }}</span>
          </div>
        </template>
      </v-select>
      <label :for="`secondary-${i}`" class="mb-1 mt-2 w-full snap-start sm:mt-4">Secondary Weapon:</label>
      <v-select
        name="secondary"
        :id="`secondary-${i}`"
        class="custom-select h-[82px] w-full snap-start rounded bg-yellow-300 font-main text-black caret-black hover:outline-none hover:outline-2 hover:outline-yellow-300 focus:outline-none focus:outline-2 focus:outline-yellow-300"
        v-model="player.secondaryWeaponCode"
        :options="createAndSortWeapons(secondaryArchetypes)"
        label="displayName"
        :reduce="(weapon: ISecondaryWeapon) => weapon.code"
        :selectable="(option: ISecondaryWeapon) => !option.isArchetype"
        :components="{ Deselect: null }"
        :filter-by="filterOptions"
        :searchable="config.forms.searchable">
        <template #option="option">
          <div class="flex flex-row items-center justify-start gap-2">
            <img
              class="h-[70px] max-h-[70px] min-h-[70px] w-[130px] min-w-[130px] max-w-[130px]"
              :src="`/weapons/${option.code}.webp`"
              :alt="`${weapons.secondary[player.secondaryWeaponCode].displayName}`"
              v-if="!option.isArchetype" />
            <span class="">{{ option.displayName }}</span>
          </div>
        </template>
        <template #selected-option="option">
          <div class="flex flex-row items-center justify-start gap-2">
            <img
              class="h-[70px] max-h-[70px] min-h-[70px] w-[130px] min-w-[130px] max-w-[130px]"
              :src="`/weapons/${option.code}.webp`"
              :alt="`${weapons.secondary[player.secondaryWeaponCode].displayName}`"
              v-if="!option.isArchetype" />
            <span class="whitespace-break-spaces">{{ option.displayName }}</span>
          </div>
        </template>
      </v-select>
      <div class="flex w-full flex-row justify-center gap-2">
        <div class="flex w-[33%] flex-col">
          <label :for="`grenade-${i}`" class="mb-1 mt-2 w-full snap-start sm:mt-4">Grenade:</label>
          <v-select
            name="grenade"
            :id="`grenade-${i}`"
            class="custom-select grenade max-h-[162px] min-h-[162px] w-full snap-start rounded bg-yellow-300 font-main text-black caret-black hover:outline-none hover:outline-2 hover:outline-yellow-300 focus:outline-none focus:outline-2 focus:outline-yellow-300"
            v-model="player.grenadeCode"
            :options="createAndSortWeapons(grenadeArchetypes)"
            label="displayName"
            :reduce="(weapon: IGrenade) => weapon.code"
            :selectable="(option: IWeapon) => !option.isArchetype"
            :components="{ Deselect: null }"
            :filter-by="filterOptions"
            :searchable="false">
            <!-- :searchable="config.forms.searchable"> -->
            <template #option="option">
              <div class="flex flex-row items-center justify-start gap-2">
                <img
                  class="h-[70px] max-h-[70px] min-h-[70px] w-[70px] min-w-[70px] max-w-[70px]"
                  :src="`/grenades/${option.code}.webp`"
                  :alt="`${grenades[player.grenadeCode].displayName}`"
                  v-if="!option.isArchetype" />
                <span class="hyphens-auto text-wrap break-words">{{ option.displayName }}</span>
              </div>
            </template>
            <template #selected-option="option">
              <div class="flex min-h-[162px] flex-col items-center justify-start gap-2 text-center">
                <img
                  class="mt-2 h-[75px] max-h-[75px] min-h-[75px] w-[75px] min-w-[75px] max-w-[75px]"
                  :src="`/grenades/${option.code}.webp`"
                  v-if="!option.isArchetype"
                  :alt="`${grenades[player.grenadeCode].displayName}`" />
                <span class="hyphens-auto text-wrap break-words">{{ option.displayName }}</span>
              </div>
            </template>
          </v-select>
        </div>
        <div class="flex w-[33%] flex-col">
          <label :for="`perk-${i}`" class="mb-1 mt-2 w-full snap-start sm:mt-4">Perk:</label>
          <v-select
            name="perk"
            :id="`perk-${i}`"
            class="custom-select perk grenade max-h-[162px] min-h-[162px] w-full snap-start rounded bg-yellow-300 font-main text-black caret-black hover:outline-none hover:outline-2 hover:outline-yellow-300 focus:outline-none focus:outline-2 focus:outline-yellow-300"
            v-model="player.perkCode"
            :options="perkList"
            label="displayName"
            :reduce="(perk: (typeof perkList)[number]) => perk.code"
            :components="{ Deselect: null }"
            :searchable="false">
            <!-- :searchable="config.forms.searchable"> -->
            <template #option="option">
              <div class="flex flex-row items-center justify-start gap-2">
                <img
                  class="h-[70px] max-h-[70px] min-h-[70px] w-[70px] min-w-[70px] max-w-[70px] rounded border-2 border-solid border-black"
                  :src="`/perks/${option.code}.webp`"
                  :alt="`${perks[player.perkCode].displayName}`" />
                <span class="hyphens-auto text-wrap break-words">{{ option.displayName }}</span>
              </div>
            </template>
            <template #selected-option="option">
              <div class="flex min-h-[162px] flex-col items-center justify-start gap-2 text-center">
                <img
                  class="mt-2 h-[75px] max-h-[75px] min-h-[75px] w-[75px] min-w-[75px] max-w-[75px] rounded border-2 border-solid border-black"
                  :src="`/perks/${option.code}.webp`"
                  :alt="`${perks[player.perkCode].displayName}`" />
                <span class="hyphens-auto text-wrap break-words">{{ option.displayName }}</span>
              </div>
            </template>
          </v-select>
        </div>
        <div class="flex w-[33%] flex-col">
          <label :for="`booster-${i}`" class="mb-1 mt-2 w-full snap-start sm:mt-4">Booster:</label>
          <v-select
            name="booster"
            :id="`booster-${i}`"
            class="custom-select grenade booster max-h-[162px] min-h-[162px] w-full snap-start rounded bg-yellow-300 font-main text-black caret-black hover:outline-none hover:outline-2 hover:outline-yellow-300 focus:outline-none focus:outline-2 focus:outline-yellow-300"
            v-model="player.boosterCode"
            :options="filterSelectedBoosters(data)"
            label="displayName"
            :reduce="(booster: (typeof boosterList)[number]) => booster.code"
            :components="{ Deselect: null }"
            :searchable="false">
            <!-- :searchable="config.forms.searchable"> -->
            <template #option="option">
              <div class="flex flex-row items-center justify-start gap-2">
                <img
                  class="h-[70px] max-h-[70px] min-h-[70px] w-[70px] min-w-[70px] max-w-[70px] rounded border-2 border-solid border-black bg-black"
                  :src="`/boosters/${option.code}.webp`"
                  :alt="`${boosters[player.boosterCode].displayName}`" />
                <span class="hyphens-auto text-wrap break-words">{{ option.displayName }}</span>
              </div>
            </template>
            <template #selected-option="option">
              <div class="flex min-h-[162px] flex-col items-center justify-start gap-2 text-center">
                <img
                  class="mt-2 h-[75px] max-h-[75px] min-h-[75px] w-[75px] min-w-[75px] max-w-[75px] rounded border-2 border-solid border-black bg-black"
                  :src="`/boosters/${option.displayName}.webp`"
                  :alt="`${boosters[player.boosterCode as keyof typeof boosters].displayName}`" />
                <!-- 
                    The src refers to displayName, even though the code is the actual value of that property.
                    Unfortunate caveat of https://vue-select.org/guide/values.html#caveats-with-reduce.
                    This is only present when the selected option is not in the options array, which is the case for boosters as players cannot select a booster that is already selected.
                   -->
                <span class="hyphens-auto text-wrap break-words">{{
                  boosters[option.displayName as keyof typeof boosters].displayName
                }}</span>
              </div>
            </template>
          </v-select>
        </div>
      </div>
      <span class="mb-1 mt-2 w-full snap-start sm:mt-4">Stratagems:</span>
      <div class="flex snap-start flex-row flex-wrap justify-center gap-2">
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
          :title="stratagems[stratagem].displayName"
          :alt="stratagems[stratagem].displayName"
          @click="toggleStratagemSelect(i, j)" />
      </div>
    </div>
    <div class="flex w-full flex-row content-center justify-center" tabindex="0">
      <button
        class="bg-diagonal-hover h-12 w-48 snap-center place-self-center rounded border-2 border-solid border-yellow-300 bg-yellow-300 font-bold text-black hover:text-yellow-300 active:bg-yellow-300 active:bg-none active:text-black"
        @click="generateDataString">
        Copy Link
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { type Ref, inject, nextTick, reactive, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import type { ToastPluginApi } from 'vue-toast-notification'

  import StratagemSelect from '@/components/StratagemSelect.vue'
  import { boosterList, boosters } from '@/data/boosters'
  import { perkList, perks } from '@/data/perks'
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
  import router from '@/router'
  import { config } from '@/utils/config'
  import { type IData, getDefaultData } from '@/utils/defaults'
  import { filterOptions, filterSelectedBoosters } from '@/utils/filter'
  import { Logger } from '@/utils/logger'
  import { createBase64DataString, parsePlayerDataInput } from '@/utils/playerData'
  import { createAndSortWeapons } from '@/utils/sort'
  import { playerBorders } from '@/utils/styles'

  const logger = Logger()
  const toast: ToastPluginApi = inject('toast') as ToastPluginApi
  const data = ref() as Ref<IData>
  const route = useRoute()
  // Add/remove squad members
  // Min 1, max 4
  const playerCount = ref()
  const addMember = () => {
    if (data.value.playerList.length < 4) {
      data.value.playerList.push(getDefaultData(data.value.playerList.length).playerList[0])
    }
  }
  const removeMember = () => {
    if (data.value.playerList.length > 1) {
      data.value.playerList.pop()
    }
  }

  defineExpose({
    addMember,
    removeMember,
    playerCount
  })

  // Data loading logic
  // Data is either loaded from URL, local storage or default data is generated as a backup
  await router.isReady()

  if (route.query.data) {
    try {
      data.value = reactive(parsePlayerDataInput(JSON.parse(atob(route.query.data as string))))
      logger.debug('Data loaded from url')

      // Backwards compatibility for data strings generated before perks and boosters were introduced
      data.value.playerList.forEach((player, i) => {
        if (!player.perkCode) {
          data.value.playerList[i].perkCode = 'EXTRA_PADDING'
        }

        if (!player.boosterCode) {
          data.value.playerList[i].boosterCode = filterSelectedBoosters(data.value)[0].code
        }
      })

      const router = useRouter()

      router.replace({ query: undefined })
    } catch (e) {
      logger.error(e)
      data.value = getDefaultData(0)
    }
  } else if (localStorage.getItem('data')) {
    data.value = reactive(parsePlayerDataInput(JSON.parse(atob(localStorage.getItem('data') as string))))
    logger.debug('Data loaded from local storage')

    // Backwards compatibility for data strings generated before perks and boosters were introduced
    data.value.playerList.forEach((player, i) => {
      if (!player.perkCode) {
        data.value.playerList[i].perkCode = 'EXTRA_PADDING'
      }

      if (!player.boosterCode) {
        data.value.playerList[i].boosterCode = 'HELLPOD_SPACE_OPTIMIZATION'
      }
    })
  } else {
    logger.debug('Default data generated')
    data.value = getDefaultData(0)
  }

  playerCount.value = data.value.playerList.length

  localStorage.setItem('data', createBase64DataString(data.value))
  watch(data.value, () => {
    localStorage.setItem('data', createBase64DataString(data.value))
  })

  const generateDataString = async () => {
    const link = `${BASE_URL}/?data=${createBase64DataString(data.value)}`

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
  const toggleStratagemSelect = (playerIndex: number, position: number) => {
    logger.debug(playerIndex, position)
    activeStratagemSelect.value = activeStratagemSelect.value.map((player, i) => {
      if (i !== playerIndex) {
        return player
      } else {
        return player.map((_el, j) => {
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
    data.value.playerList[playerIndex].stratagemCodeList[stratagemPosition] = stratagemCode
    activeStratagemSelect.value[playerIndex][stratagemPosition] = false
    modalRef.value[playerIndex].displayOff()
    document.querySelector(`#primary-${playerIndex}`)?.scrollIntoView({ behavior: 'smooth' })
    modalRef.value[playerIndex].playerIndex = null
    modalRef.value[playerIndex].position = null
  }
</script>

<style scoped>
  * :deep() {
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
