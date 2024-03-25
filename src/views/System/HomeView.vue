<template>
  <main class="container flex flex-col flex-wrap sm:flex-row min-w-full p-8 gap-8 sm:gap-6 mt-8">
    <div
      :class="`w-full sm:w-5/12 xl:w-1/5 mx-auto bg-gray-500 rounded-md p-8 h-full`"
      v-for="(player, i) in data.playerList"
      :key="i">
      <!-- <label for="name">Squad Member Name:</label> -->
      <input
        id="name"
        name="squad-member-name"
        type="text"
        :placeholder="player.name"
        class="bg-slate-700 w-full mb-4"
        v-model="player.name" />
      <label for="primary">Primary Weapon:</label>
      <select name="primary" id="primary" class="bg-slate-700 w-full" v-model="player.primaryWeaponCode">
        <option v-for="weapon in primaryWeaponCodeList" :key="weapon" :value="weapon">
          {{ (weapons.primary as typeof weapons.primary)[weapon].displayName }}
        </option>
      </select>
      <label for="secondary" class="w-full">Secondary Weapon:</label>
      <select name="secondary" id="secondary" class="bg-slate-700 w-full" v-model="player.secondaryWeaponCode">
        <option v-for="weapon in secondaryWeaponCodeList" :key="weapon" :value="weapon">
          {{ (weapons.secondary as typeof weapons.secondary)[weapon].displayName }}
        </option>
      </select>
      <label for="grenade" class="w-full">Grenade:</label>
      <select name="grenade" id="grenade" class="bg-slate-700 w-full" v-model="player.grenadeCode">
        <option v-for="grenade in grenadeCodeList" :key="grenade" :value="grenade">
          {{ grenades[grenade as keyof typeof grenades].displayName }}
        </option>
      </select>
      <div class="mt-4 flex flex-row flex-wrap justify-center gap-2">
        <img
          class="w-[40px] h-[40px] hover:border-solid hover:border-4 hover:border-yellow-400"
          v-for="(stratagem, j) in player.stratagemCodeList"
          :key="stratagem"
          :src="`/icons/stratagems/${player.stratagemCodeList[j]}.webp`"
          @click="toggleStratagemSelect(i, j)" />
      </div>
      <RModal
        :selected-stratagems="data.playerList[i].stratagemCodeList"
        @stratagem-selected="stratagemSelectionHandler"
        ref="modalRef"></RModal>
    </div>
    <div class="w-full flex flex-row content-center justify-center">
      <button
        class="text-white bg-yellow-500 rounded w-48 h-12 self-center place-self-center"
        popovertarget="popover"
        @click="generateDataString">
        Copy Link
      </button>
      <div popover id="popover">Success!</div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { useRoute } from 'vue-router'

  import RModal from '@/components/reusable/RModal.vue'
  import { getDefaultData } from '@/utils/defaults'
  import { grenadeCodeList, grenades } from '@/utils/grenades'
  import { primaryWeaponCodeList, secondaryWeaponCodeList, weapons } from '@/utils/weapons'

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
    } catch (err) {
      console.error('Failed to copy: ', err)
    }

    return
  }
  const showStratagemSelectModal = ref([false, false, false, false])
  const modalRef = ref()
  const toggleStratagemSelect = (playerIndex: number, position: number) => {
    // console.log(playerIndex, position)
    showStratagemSelectModal.value[playerIndex] = !showStratagemSelectModal.value[playerIndex]
    modalRef.value[playerIndex].toggleDisplay()
    modalRef.value[playerIndex].playerIndex = playerIndex
    modalRef.value[playerIndex].position = position
  }
  const stratagemSelectionHandler = (playerIndex: number, position: number, stratagemCode: string) => {
    // console.log(playerIndex, position, stratagemCode)
    data.playerList[playerIndex].stratagemCodeList[position] = stratagemCode
  }
</script>

<style scoped></style>
