<template>
  <main class="container flex flex-col flex-wrap sm:flex-row min-w-full p-8 gap-8 sm:gap-6 mt-8">
    <div
      class="w-full sm:w-5/12 xl:w-1/5 mx-auto bg-gray-500 rounded-md p-8 h-full flex flex-col content-center place-items-center"
      v-for="(player, i) in data.playerList"
      :key="i">
      <!-- <label for="name">Squad Member Name:</label> -->
      <input
        id="name"
        name="squad-member-name"
        type="text"
        :placeholder="player.name"
        class="bg-slate-700 w-full"
        v-model="player.name" />
      <label for="primary" class="w-full mt-4">Primary Weapon:</label>
      <select name="primary" id="primary" class="bg-slate-700 w-full" v-model="player.primaryWeaponCode">
        <option v-for="weapon in primaryWeaponCodeList" :key="weapon" :value="weapon">
          {{ (weapons.primary as typeof weapons.primary)[weapon].displayName }}
        </option>
      </select>
      <img :src="`/weapons/${player.primaryWeaponCode}.webp`" class="mt-4 w-[250px] h-[108px]" />
      <label for="secondary" class="w-full mt-4">Secondary Weapon:</label>
      <select name="secondary" id="secondary" class="bg-slate-700 w-full" v-model="player.secondaryWeaponCode">
        <option v-for="weapon in secondaryWeaponCodeList" :key="weapon" :value="weapon">
          {{ (weapons.secondary as typeof weapons.secondary)[weapon].displayName }}
        </option>
      </select>
      <img :src="`/weapons/${player.secondaryWeaponCode}.webp`" class="mt-4 w-[200px] h-[108px]" />
      <label for="grenade" class="w-full mt-4">Grenade:</label>
      <select name="grenade" id="grenade" class="bg-slate-700 w-full" v-model="player.grenadeCode">
        <option v-for="grenade in grenadeCodeList" :key="grenade" :value="grenade">
          {{ grenades[grenade as keyof typeof grenades].displayName }}
        </option>
      </select>
      <img :src="`/grenades/${player.grenadeCode}.webp`" class="mt-4 w-[100px] h-[100px]" />
      <span class="w-full mt-4">Stratagems:</span>
      <div class="flex flex-row flex-wrap justify-center gap-2">
        <img
          class="w-[50px] h-[50px] border-solid border-4 border-gray-900 hover:border-solid hover:border-4 hover:border-yellow-400 mt-2"
          :class="activeStratagemSelect[i][j] ? 'border-solid border-4 border-yellow-400' : ''"
          v-for="(stratagem, j) in player.stratagemCodeList"
          :key="stratagem"
          :src="`/icons/stratagems/${player.stratagemCodeList[j]}.webp`"
          @click="toggleStratagemSelect(i, j)" />
      </div>
      <RSelection
        :selected-stratagems="data.playerList[i].stratagemCodeList"
        @stratagem-selected="stratagemSelectionHandler"
        ref="modalRef"></RSelection>
    </div>
    <div class="w-full flex flex-row content-center justify-center" tabindex="0">
      <button
        class="text-white bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-500 rounded w-48 h-12 self-center place-self-center font-semibold"
        popovertarget="success-popover"
        @click="generateDataString">
        Copy Link
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { inject, reactive, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import type { ToastPluginApi } from 'vue-toast-notification'

  import RSelection from '@/components/reusable/RSelection.vue'
  import { config } from '@/utils/config'
  import { getDefaultData } from '@/utils/defaults'
  import { grenadeCodeList, grenades } from '@/utils/grenades'
  import { primaryWeaponCodeList, secondaryWeaponCodeList, weapons } from '@/utils/weapons'

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
