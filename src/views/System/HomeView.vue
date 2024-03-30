<template>
  <main
    class="container mb-16 mt-4 flex min-w-full flex-col flex-wrap gap-8 p-4 font-semibold sm:mb-4 sm:flex-row sm:gap-6 sm:p-0">
    <div
      class="mx-auto flex h-full w-full flex-col place-items-center content-center rounded-md bg-gray-500 bg-opacity-80 p-4 sm:w-5/12 xl:w-1/5"
      :class="`border-2 border-solid ${playerBorders[player.color as keyof typeof playerBorders]}`"
      v-for="(player, i) in data.playerList"
      :key="i">
      <img src="/helmet.png" class="mb-4 h-[189px] w-[191px]" alt="helldiver-helmet" />
      <!-- <label for="name">Squad Member Name:</label> -->
      <input
        :id="`name-${i}`"
        name="squad-member-name"
        type="text"
        :placeholder="player.name"
        :class="`w-[200px] bg-slate-700 text-center ${playerInputOutlines[player.color as keyof typeof playerBorders]}`"
        v-model="player.name" />
      <label :for="`primary-${i}`" class="mb-1 mt-4 w-full">Primary Weapon:</label>
      <select
        name="primary"
        :id="`primary-${i}`"
        class="w-full bg-slate-700"
        v-model="player.primaryWeaponCode"
        :class="`${playerInputOutlines[player.color as keyof typeof playerBorders]}`">
        <option v-for="weapon in primaryWeaponCodeList" :key="weapon" :value="weapon">
          {{ weapons.primary[weapon].displayName }}
        </option>
      </select>
      <img
        :src="`/weapons/${player.primaryWeaponCode}.webp`"
        class="mt-4 h-[108px] w-[250px]"
        :alt="`${(weapons.primary as typeof weapons.primary)[player.primaryWeaponCode].displayName}`" />
      <label :for="`secondary-${i}`" class="mb-1 mt-4 w-full">Secondary Weapon:</label>
      <select
        name="secondary"
        :id="`secondary-${i}`"
        class="w-full bg-slate-700"
        v-model="player.secondaryWeaponCode"
        :class="`${playerInputOutlines[player.color as keyof typeof playerBorders]}`">
        <option v-for="weapon in secondaryWeaponCodeList" :key="weapon" :value="weapon">
          {{ weapons.secondary[weapon].displayName }}
        </option>
      </select>
      <img
        :src="`/weapons/${player.secondaryWeaponCode}.webp`"
        class="mt-4 h-[108px] w-[200px]"
        :alt="`${(weapons.secondary as typeof weapons.secondary)[player.secondaryWeaponCode].displayName}`" />
      <label :for="`grenade-${i}`" class="mb-1 mt-4 w-full">Grenade:</label>
      <select
        name="grenade"
        :id="`grenade-${i}`"
        class="w-full bg-slate-700"
        v-model="player.grenadeCode"
        :class="`${playerInputOutlines[player.color as keyof typeof playerBorders]}`">
        <option v-for="grenade in grenadeCodeList" :key="grenade" :value="grenade">
          {{ grenades[grenade].displayName }}
        </option>
      </select>
      <img
        :src="`/grenades/${player.grenadeCode}.webp`"
        class="mt-4 h-[100px] w-[100px]"
        :alt="`${grenades[player.grenadeCode as keyof typeof grenades].displayName}`" />
      <span class="mb-1 mt-4 w-full">Stratagems:</span>
      <div class="flex flex-row flex-wrap justify-center gap-2">
        <StratagemSelect
          :selected-stratagems="data.playerList[i].stratagemCodeList"
          :color="player.color"
          @stratagem-selected="handleStratagemSelection"
          ref="modalRef"
          :id="`stratagem-select-${i}`" />
        <img
          :class="`mt-2 h-[50px] w-[50px] rounded-md border-4 border-solid border-gray-900 hover:border-4 hover:border-solid ${playerBordersHover[player.color]} ${activeStratagemSelect[i][j] ? `border-4 border-solid ${playerBorders[player.color]}` : ''}`"
          v-for="(stratagem, j) in player.stratagemCodeList"
          :key="stratagem"
          :src="`/icons/stratagems/${player.stratagemCodeList[j]}.webp`"
          :title="stratagems[stratagem as keyof typeof stratagems].displayName"
          @click="toggleStratagemSelect(i, j)" />
      </div>
    </div>
    <div class="flex w-full flex-row content-center justify-center" tabindex="0">
      <button
        class="h-12 w-48 place-self-center self-center rounded bg-chocolate-600 font-semibold text-white hover:bg-yellow-600 active:bg-chocolate-600"
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
  import { config } from '@/utils/config'
  import { type IData, getDefaultData } from '@/utils/defaults'
  import { grenadeCodeList, grenades } from '@/utils/grenades'
  import { Logger } from '@/utils/logger'
  import { createPlayerDataOutput, parseInput } from '@/utils/playerData'
  import { stratagems } from '@/utils/stratagems'
  import { playerBorders, playerBordersHover, playerInputOutlines } from '@/utils/styles'
  import { primaryWeaponCodeList, secondaryWeaponCodeList, weapons } from '@/utils/weapons'

  const logger = Logger()
  const toast: ToastPluginApi = inject('toast') as ToastPluginApi
  let data: IData
  const route = useRoute()

  if (route.query.data) {
    try {
      data = reactive(parseInput(JSON.parse(atob(route.query.data as string))))

      const router = useRouter()

      router.replace({ query: undefined })
    } catch (e) {
      logger.log(e)
      data = getDefaultData()
    }
  } else if (localStorage.getItem('data')) {
    data = reactive(parseInput(JSON.parse(atob(localStorage.getItem('data') as string))))
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

    // setTimeout(() => {
    //   document.querySelector(`#stratagem-select-${playerIndex}`)?.scrollIntoView({ behavior: 'smooth' }), 0
    // })

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
  const handleStratagemSelection = (playerIndex: number, position: number, stratagemCode: keyof typeof stratagems) => {
    data.playerList[playerIndex].stratagemCodeList[position] = stratagemCode
    activeStratagemSelect.value[playerIndex][position] = false
    modalRef.value[playerIndex].displayOff()
    document.querySelector(`#secondary-${playerIndex}`)?.scrollIntoView({ behavior: 'smooth' })
    modalRef.value[playerIndex].playerIndex = null
    modalRef.value[playerIndex].position = null
  }
</script>

<style scoped></style>
