<template>
  <main
    class="container mb-4 mt-4 flex min-w-full flex-col flex-wrap gap-8 p-4 font-semibold sm:flex-row sm:gap-6 sm:p-0">
    <div
      class="mx-auto flex h-full w-full flex-col place-items-center content-center rounded-md bg-gray-500 bg-opacity-80 p-4 sm:w-5/12 xl:w-1/5"
      :class="`border-4 border-solid ${playerBorders[player.color as keyof typeof playerBorders]}`"
      v-for="(player, i) in data.playerList"
      :key="i">
      <img src="/helmet.png" class="mb-4 h-[189px] w-[191px]" />
      <!-- <label for="name">Squad Member Name:</label> -->
      <input
        :id="`name-${i}`"
        name="squad-member-name"
        type="text"
        :placeholder="player.name"
        :class="`w-full bg-slate-700 ${playerInputOutlines[player.color as keyof typeof playerBorders]}`"
        v-model="player.name" />
      <label :for="`primary-${i}`" class="mb-1 mt-4 w-full">Primary Weapon:</label>
      <select name="primary" :id="`primary-${i}`" class="w-full bg-slate-700" v-model="player.primaryWeaponCode">
        <option v-for="weapon in primaryWeaponCodeList" :key="weapon" :value="weapon">
          {{ (weapons.primary as typeof weapons.primary)[weapon].displayName }}
        </option>
      </select>
      <img
        :src="`/weapons/${player.primaryWeaponCode}.webp`"
        class="mt-4 h-[108px] w-[250px]"
        :alt="`${(weapons.primary as typeof weapons.primary)[player.primaryWeaponCode].displayName}`" />
      <label :for="`secondary-${i}`" class="mb-1 mt-4 w-full">Secondary Weapon:</label>
      <select name="secondary" :id="`secondary-${i}`" class="w-full bg-slate-700" v-model="player.secondaryWeaponCode">
        <option v-for="weapon in secondaryWeaponCodeList" :key="weapon" :value="weapon">
          {{ (weapons.secondary as typeof weapons.secondary)[weapon].displayName }}
        </option>
      </select>
      <img
        :src="`/weapons/${player.secondaryWeaponCode}.webp`"
        class="mt-4 h-[108px] w-[200px]"
        :alt="`${(weapons.secondary as typeof weapons.secondary)[player.secondaryWeaponCode].displayName}`" />
      <label :for="`grenade-${i}`" class="mb-1 mt-4 w-full">Grenade:</label>
      <select name="grenade" :id="`grenade-${i}`" class="w-full bg-slate-700" v-model="player.grenadeCode">
        <option v-for="grenade in grenadeCodeList" :key="grenade" :value="grenade">
          {{ grenades[grenade as keyof typeof grenades].displayName }}
        </option>
      </select>
      <img
        :src="`/grenades/${player.grenadeCode}.webp`"
        class="mt-4 h-[100px] w-[100px]"
        :alt="`${grenades[player.grenadeCode as keyof typeof grenades].displayName}`" />
      <span class="mb-1 mt-4 w-full">Stratagems:</span>
      <div class="flex flex-row flex-wrap justify-center gap-2">
        <RSelection
          :selected-stratagems="data.playerList[i].stratagemCodeList"
          @stratagem-selected="stratagemSelectionHandler"
          ref="modalRef"></RSelection>
        <img
          class="mt-2 h-[50px] w-[50px] rounded-md border-4 border-solid border-gray-900 hover:border-4 hover:border-solid hover:border-yellow-400"
          :class="activeStratagemSelect[i][j] ? 'border-4 border-solid border-yellow-400' : ''"
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
  import { inject, reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import type { ToastPluginApi } from 'vue-toast-notification'

  import RSelection from '@/components/reusable/RSelection.vue'
  import { config } from '@/utils/config'
  import { getDefaultData } from '@/utils/defaults'
  import { grenadeCodeList, grenades } from '@/utils/grenades'
  import { stratagems } from '@/utils/stratagems'
  import { primaryWeaponCodeList, secondaryWeaponCodeList, weapons } from '@/utils/weapons'

  const playerBorders = {
    orange: 'border-pcorange-900',
    green: 'border-pcgreen-900',
    blue: 'border-pcblue-900',
    purple: 'border-pcpink-900'
  }
  const playerInputOutlines = {
    orange:
      'hover:outline-none hover:outline-pcorange-900 hover:outline-2 focus:outline-none focus:outline-pcorange-900 focus:outline-4',
    green:
      'hover:outline-none hover:outline-pcgreen-900 hover:outline-2 focus:outline-none focus:outline-pcgreen-900 focus:outline-4 ',
    blue: 'hover:outline-none hover:outline-pcblue-900 hover:outline-2 focus:outline-none focus:outline-pcblue-900 focus:outline-4 ',
    purple:
      'hover:outline-none hover:outline-pcpink-900 hover:outline-2 focus:outline-none focus:outline-pcpink-900 focus:outline-4'
  }
  const toast: ToastPluginApi = inject('toast') as ToastPluginApi
  let data: any
  // reactive<{
  //   playerList: [
  //     {
  //       name: string
  //       primaryWeaponCode: keyof typeof weapons.primary
  //       secondaryWeaponCode: keyof typeof weapons.secondary
  //       grenadeCode: keyof typeof grenades
  //       stratagemCodeList: keyof (typeof stratagemCodeList)[]
  //     }
  //   ]
  // }>
  const route = useRoute()

  if (route.query.data) {
    try {
      data = reactive(JSON.parse(atob(route.query.data as string)))

      const router = useRouter()

      router.replace({ query: undefined })
    } catch (e) {
      console.log(e)
      data = getDefaultData()
    }
  } else {
    data = getDefaultData()
  }

  const generateDataString = async () => {
    const link = `${BASE_URL}/?data=${btoa(JSON.stringify(data))}`

    try {
      await navigator.clipboard.writeText(link)
      toast.success('Link copied!', config.toast)
    } catch (err) {
      console.error('Failed to copy: ', err)
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
    // console.log(playerIndex, position)
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
  const stratagemSelectionHandler = (playerIndex: number, position: number, stratagemCode: string) => {
    data.playerList[playerIndex].stratagemCodeList[position] = stratagemCode
    activeStratagemSelect.value[playerIndex][position] = false
    modalRef.value[playerIndex].displayOff()
    modalRef.value[playerIndex].playerIndex = null
    modalRef.value[playerIndex].position = null
  }
</script>

<style scoped></style>
