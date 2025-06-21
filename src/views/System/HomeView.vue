<template>
  <main
    class="container mb-16 mt-4 flex min-h-full min-w-full flex-col flex-wrap gap-8 p-4 font-semibold sm:mb-4 sm:flex-row sm:gap-6 sm:p-0">
    <div
      class="bg-diagonal mx-auto flex w-full snap-start flex-col place-items-center content-center rounded-md bg-opacity-80 p-4 font-bold sm:h-auto sm:w-5/12 xl:w-[22%]"
      :class="`border-4 border-solid border-yellow-300`"
      v-for="(player, i) in data.playerList"
      :key="i">
      <!-- Colored label -->
      <div
        :class="`${playerBorders[player.color]} center mb-2 ml-auto  mr-0  inline h-fit w-fit pb-1 pl-4 pr-4 pt-1 text-center sm:mb-4`">
        {{ player.name ? player.name[0].toUpperCase() + (i + 1) : 'P' + (i + 1) }}
      </div>

      <!-- Helldiver helmet image -->
      <img src="/helmet.webp" class="mb-2 block sm:mb-4" alt="helldiver-helmet" />

      <!-- Player name input -->
      <input
        :id="`name-${i}`"
        name="squad-member-name"
        type="text"
        :placeholder="player.name"
        class="` focus:outline-yellow-300` w-[200px] bg-yellow-300 text-center text-black caret-black hover:outline-none hover:outline-2 hover:outline-yellow-300 focus:outline-none focus:outline-2"
        v-model="player.name" />
      <!-- Attachment select modal -->
      <AttachmentSelect
        :primary-weapon-code="data.playerList[i].primaryWeaponCode"
        :attachment-category="category"
        :selected-attachment="attachment"
        :player-index="i"
        :position="AttachmentCategoryEnum[category]"
        :display="attachmentSelectMatrix[i][AttachmentCategoryEnum[category]]"
        :id="`attachment-select-${i}`"
        ref="attachmentModalsRef"
        @attachment-selected="handleAttachmentSelection"
        v-for="(attachment, category) in data.playerList[i].primaryWeaponAttachments"
        :key="category" />
      <!-- Primary weapon select -->
      <label :for="`primary-${i}`" class="mb-1 mt-2 w-full snap-start sm:mt-4">Primary Weapon:</label>
      <div class="flex w-full flex-col gap-4 sm:flex-row">
        <v-select
          name="primary"
          :id="`primary-${i}`"
          class="custom-select h-[130px] w-full snap-start rounded bg-yellow-300 font-main text-black caret-black hover:outline-none hover:outline-2 hover:outline-yellow-300 focus:outline-none focus:outline-2 focus:outline-yellow-300 sm:h-[155px] sm:w-2/3"
          v-model="player.primaryWeaponCode"
          :options="createAndSortWeapons(primaryArchetypes)"
          label="displayName"
          :reduce="(weapon: IPrimaryWeapon) => weapon.code"
          :selectable="(option: IPrimaryWeapon) => !option.isArchetype"
          :components="{ Deselect: null }"
          :filter-by="filterOptions"
          :searchable="config.forms.searchable"
          :clearable="config.forms.clearable">
          <template #option="option">
            <div class="flex flex-col items-center justify-center gap-2 sm:justify-start">
              <img
                class="h-[60px] max-h-[60px] min-h-[60px] w-[115px] min-w-[115px] max-w-[115px]"
                :src="`/weapons/${option.code}.webp`"
                :alt="`${weapons.primary[player.primaryWeaponCode].displayName}`"
                v-if="!option.isArchetype" />
              <span class="">{{ option.displayName }}</span>
            </div>
          </template>
          <template #selected-option="option">
            <div class="flex flex-col justify-center gap-2">
              <img
                class="h-[70px] max-h-[70px] min-h-[70px] w-[130px] min-w-[130px] max-w-[130px]"
                :src="`/weapons/${option.code}.webp`"
                :alt="`${weapons.primary[player.primaryWeaponCode].displayName}`"
                v-if="!option.isArchetype" />
              <span class="whitespace-break-spaces">{{ option.displayName }}</span>
            </div>
          </template>
        </v-select>

        <!-- Primary attachments -->
        <div
          class="flex h-full w-full flex-row flex-wrap items-center justify-center gap-x-[1%] gap-y-[1%] sm:w-1/3 sm:gap-x-[4%] sm:gap-y-[4%]">
          <div
            class="flex h-[80px] w-[24%] flex-row items-center justify-center rounded border-4 border-solid border-gray-900 sm:h-[48%] sm:w-[48%]"
            :class="
              attachment
                ? 'cursor-pointer bg-black bg-opacity-70 hover:border-4 hover:border-solid hover:border-yellow-300'
                : 'cursor-not-allowed bg-yellow-300'
            "
            v-for="(attachment, category) in player.primaryWeaponAttachments"
            :key="attachment"
            @click="
              attachment
                ? (attachmentSelectMatrix[i][AttachmentCategoryEnum[category]] =
                    !attachmentSelectMatrix[i][AttachmentCategoryEnum[category]])
                : null
            ">
            <img
              :src="getAttachmentImageSource(attachment, player.primaryWeaponCode)"
              :title="
                attachment
                  ? (
                      attachments[category][
                        attachment as AttachmentKeysForCategory<typeof category>[number]
                      ] as IAttachment
                    ).displayName
                  : 'Locked Category'
              "
              class="max-h-[64px]" />
          </div>
        </div>
      </div>

      <!-- Secondary weapon select -->
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
        :searchable="config.forms.searchable"
        :clearable="config.forms.clearable">
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

      <!-- Row with Grenade, Perk and Booster selects -->
      <div class="flex w-full flex-row justify-center gap-2">
        <div class="flex w-[33%] flex-col">
          <!-- Grenade select -->
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
            :searchable="false"
            :clearable="config.forms.clearable">
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
          <!-- Perk select -->
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
            :searchable="false"
            :clearable="config.forms.clearable">
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
          <!-- Booster select -->
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
            :searchable="false"
            :clearable="config.forms.clearable">
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
                <!-- 
                    The src refers to displayName, even though the code is the actual value of that property.
                    Unfortunate caveat of https://vue-select.org/guide/values.html#caveats-with-reduce.
                    This is only present when the selected option is not in the options array, which is the case for boosters as players cannot select a booster that is already selected.
                   -->
                <img
                  class="mt-2 h-[75px] max-h-[75px] min-h-[75px] w-[75px] min-w-[75px] max-w-[75px] rounded border-2 border-solid border-black bg-black"
                  :src="`/boosters/${option.displayName}.webp`"
                  :alt="`${boosters[player.boosterCode].displayName}`" />
                <span class="hyphens-auto text-wrap break-words">{{
                  boosters[option.displayName as keyof typeof boosters].displayName
                }}</span>
              </div>
            </template>
          </v-select>
        </div>
      </div>

      <!-- Stratagem icon tray -->
      <span class="mb-1 mt-2 w-full snap-start sm:mt-4">Stratagems:</span>
      <div class="flex snap-start flex-row flex-wrap justify-center gap-2">
        <!-- Stratagem select modal -->
        <StratagemSelect
          :selected-stratagems="data.playerList[i].stratagemCodeList"
          @stratagem-selected="handleStratagemSelection"
          ref="stratagemModalsRef"
          :id="`stratagem-select-${i}`" />

        <img
          :class="`mt-2 h-[50px] w-[50px] rounded-md border-4 border-solid border-gray-900 hover:border-4 hover:border-solid hover:border-yellow-300 ${stratagemSelectMatrix[i][j] ? `border-4 border-solid border-yellow-300` : ''}`"
          v-for="(stratagem, j) in player.stratagemCodeList"
          :key="stratagem"
          :src="`/icons/stratagems/${player.stratagemCodeList[j]}.webp`"
          :title="stratagems[stratagem].displayName"
          :alt="stratagems[stratagem].displayName"
          @click="toggleStratagemSelect(i, j)" />
      </div>
    </div>

    <!-- Copy Link button -->
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

  import AttachmentSelect from '@/components/AttachmentSelect.vue'
  import StratagemSelect from '@/components/StratagemSelect.vue'
  import {
    AttachmentCategory,
    AttachmentCategoryEnum,
    AttachmentKey,
    AttachmentKeysForCategory,
    IAttachment,
    WeaponAttachments,
    attachments,
    getAttachmentImageSource,
    getDefaultAttachments
  } from '@/data/attachments'
  import { boosterList, boosters } from '@/data/boosters'
  import { type IData, getDefaultData } from '@/data/defaults'
  import { perkList, perks } from '@/data/perks'
  import { createBase64DataString, parsePlayerDataInput } from '@/data/playerData'
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
  import { filterOptions, filterSelectedBoosters } from '@/utils/filter'
  import { Logger } from '@/utils/logger'
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

  // Expose the playerCount variable along with functions to modify it in the parent component
  defineExpose({
    addMember,
    removeMember,
    playerCount
  })

  // Data loading logic
  // Data is either loaded from URL, local storage or default data is generated as a backup
  await router.isReady()

  // If provided, try to load data from query string
  if (route.query.data) {
    try {
      data.value = reactive<IData>(parsePlayerDataInput(JSON.parse(atob(route.query.data as string))))
      logger.debug('Data loaded from url')

      // Backwards compatibility for data strings generated before perks and boosters were introduced
      data.value.playerList.forEach((player, i) => {
        if (!player.perkCode) {
          data.value.playerList[i].perkCode = 'EXTRA_PADDING'
        }

        if (!player.boosterCode) {
          // Returns the first booster which is not in use yet to be used as the default one for the given player
          data.value.playerList[i].boosterCode = filterSelectedBoosters(data.value)[0].code
        }
      })

      const router = useRouter()

      // Remove the data string from the url once it is parsed successfully
      router.replace({ query: undefined })
    } catch (e) {
      logger.error(e)
      data.value = getDefaultData(0)
    }
  }
  // If no query string provided, try to load data from local storage
  else if (localStorage.getItem('data')) {
    data.value = reactive<IData>(parsePlayerDataInput(JSON.parse(atob(localStorage.getItem('data') as string))))
    logger.debug('Data loaded from local storage')

    // Backwards compatibility for data strings generated before perks and boosters were introduced
    data.value.playerList.forEach((player, i) => {
      if (!player.perkCode) {
        data.value.playerList[i].perkCode = 'EXTRA_PADDING'
      }

      if (!player.boosterCode) {
        // Returns the first booster which is not in use yet to be used as the default one for the given player
        data.value.playerList[i].boosterCode = filterSelectedBoosters(data.value)[0].code
      }
    })
  }
  // If no query string provided and data are not available in local storage,
  // generate default data
  else {
    logger.debug('Default data generated')
    data.value = getDefaultData(0)
  }

  playerCount.value = data.value.playerList.length

  localStorage.setItem('data', createBase64DataString(data.value))

  // Any time the state changes, save the new state to local storage
  watch(data.value.playerList, () => {
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

  /**
   * Stratagem select modal related refs/functions
   */

  /**
   * Stores information on which stratagem select modals are currently active.
   * There can be at most 1 modal active per player.
   * Each player can be actively choosing only 1 stratagem at a time out of the 4 stratagems total.
   * At most, 4 modals can be open at the same time (with 4 players present).
   * Currently it's only used to highlight the stratagem being chosen with a yellow border.
   */
  const stratagemSelectMatrix = ref([
    // Player 1, Stratagems 1 - 4
    [false, false, false, false],
    // Player 2, Stratagems 1 - 4
    [false, false, false, false],
    // Player 3, Stratagems 1 - 4
    [false, false, false, false],
    // Player 4, Stratagems 1 - 4
    [false, false, false, false]
  ])

  /**
   * Refers to the active stratagem modal window instances
   */
  const stratagemModalsRef = ref() as Ref<Array<InstanceType<typeof StratagemSelect>>>

  /**
   * Toggles the stratagem select modal for a given player and slot.
   *
   * This function is triggered when a user clicks a stratagem icon to either open the select modal
   * or choose a stratagem from it.
   *
   * First, it maps over the `activeStratagemSelect` 2D array, setting false in every position not matching the `position` for the correct `playerIndex` and toggling the value
   * in the matching  position. This controls the yellow highlight of the stratagem position being selected. Then it toggles the modal window for the corresponding
   * `playerIndex` and `position`, either opening or closing the modal based on the current state.
   *
   * @param playerIndex - Index of the player for whom the stratagem select modal should be opened.
   * @param position - Index of the stratagem slot being toggled.
   */
  const toggleStratagemSelect = (playerIndex: number, position: number) => {
    logger.debug(playerIndex, position)

    // Toggle the yellow highlight border, hiding it from stratagems whose select is being closed
    // and displaying it for the stratagem whose select is being opened.
    stratagemSelectMatrix.value = stratagemSelectMatrix.value.map((player, i) => {
      // If the current player array does not belong to the player whose stratagem select was triggered,
      // just copy their current array to the new resulting state.
      if (i !== playerIndex) {
        return player
      } else {
        // Otherwise, iterate through all the stratagem positions (1 - 4, indexes 0 - 3), creating the new state.
        return player.map((_el, j) => {
          // If the position equals to the stratagem which was just selected or opened, toggle its state.
          if (j === position) {
            return !player[j]
          } else {
            // If the position does not equal to the stratagem which was just selected or opened, set its state to closed,
            // making sure the previous modal's highlight border (if present) gets hidden.
            return false
          }
        })
      }
    })

    nextTick(() => {
      document.querySelector(`#stratagem-select-${playerIndex}`)?.scrollIntoView({ behavior: 'smooth' })
    })

    // If the playerIndex and position in the ref equal to the playerIndex and position clicked are null,
    // it means the modal should be opened and the playerIndex and position will be set accordingly.
    //
    // If the `playerIndex` fits but not the `position`, the modal technically does not get closed, only its `playerIndex` and `position` props get updated. The modal does not
    // get re-rendered, but the state reflects that now instead of e.g. stratagem 1 we are choosing stratagem 2 for the same player instead.
    //
    // If the playerIndex and position in the ref have values equal to the received `playerIndex` and `position`, it means the modal should be closed
    // and the playerIndex and position will be set to null.
    if (
      stratagemModalsRef.value[playerIndex].playerIndex === playerIndex &&
      stratagemModalsRef.value[playerIndex].position === position
    ) {
      stratagemModalsRef.value[playerIndex].displayOff()
      stratagemModalsRef.value[playerIndex].playerIndex = null
      stratagemModalsRef.value[playerIndex].position = null
    } else {
      stratagemModalsRef.value[playerIndex].playerIndex = playerIndex
      stratagemModalsRef.value[playerIndex].position = position
      stratagemModalsRef.value[playerIndex].displayOn()
    }
  }

  /**
   * Handles the user selecting a stratagem, closing the modal window and updating the state data with the selected stratagem.
   *
   * @param playerIndex - Index of the player whose stratagem was updated.
   * @param stratagemPosition - Index of the stratagem which was updated.
   * @param stratagemCode - Code of the selected stratagem.
   */
  const handleStratagemSelection = (
    playerIndex: number,
    stratagemPosition: number,
    stratagemCode: keyof typeof stratagems
  ) => {
    logger.debug(stratagemModalsRef.value, playerIndex)
    data.value.playerList[playerIndex].stratagemCodeList[stratagemPosition] = stratagemCode
    stratagemSelectMatrix.value[playerIndex][stratagemPosition] = false
    stratagemModalsRef.value[playerIndex].displayOff()
    document.querySelector(`#primary-${playerIndex}`)?.scrollIntoView({ behavior: 'smooth' })
    stratagemModalsRef.value[playerIndex].playerIndex = null
    stratagemModalsRef.value[playerIndex].position = null
  }

  /**
   * Attachment select modal related refs/functions
   */

  data.value.playerList.map(player => {
    watch(
      () => player.primaryWeaponCode,
      newVal => {
        player.primaryWeaponAttachments = getDefaultAttachments(newVal)
      }
    )
  })

  // TODO: When opening a modal for a category, close all other categories for the player
  const attachmentSelectMatrix = ref([
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]
  ])

  /**
   * Handles attachment selection and attachment select modal closing.
   * @param playerIndex - Index of the player
   * @param position - Position of the attachment in the player data array, see `AttachmentCategoryEnum`
   * @param [selectedAttachment] - Code of the selected attachment, optional
   */
  const handleAttachmentSelection = (
    playerIndex: number,
    position: number,
    selectedAttachment: AttachmentKey | null
  ) => {
    // If a new attachment was selected, reflect it in the state
    // If not, it means the close button was clicked, so no updates are needed
    if (selectedAttachment) {
      data.value.playerList[playerIndex].primaryWeaponAttachments[
        AttachmentCategoryEnum[position] as keyof WeaponAttachments[AttachmentCategory]
      ] = selectedAttachment as keyof WeaponAttachments[AttachmentCategory]
    }

    // Close the modal
    attachmentSelectMatrix.value[playerIndex][position] = false
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
