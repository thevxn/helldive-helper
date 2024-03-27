<template>
  <div>
    <div
      class="mt-4 flex w-full flex-row flex-wrap justify-center gap-2 rounded-md border-4 border-solid border-yellow-400 bg-gray-600 p-4"
      v-if="display">
      <img
        v-for="stratagem in shownStratagems"
        :key="stratagem"
        :src="`/icons/stratagems/${stratagem}.webp`"
        class="h-[50px] w-[50px] rounded-md hover:border-4 hover:border-solid hover:border-yellow-400"
        :title="stratagems[stratagem as keyof typeof stratagems].displayName"
        @click="$emit('stratagem-selected', playerIndex, position, stratagem), (display = false)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import { stratagemCodeList, stratagems } from '@/utils/stratagems'

  const display = ref(false)
  const playerIndex = ref(null)
  const position = ref(null)
  const props = defineProps({
    selectedStratagems: {
      type: Array,
      default: () => ['MECH', 'RAILGUN', 'JUMP_PACK', 'EAGLE_AIRSTRIKE']
    }
  })
  const shownStratagems = ref(
    stratagemCodeList.filter(e => {
      if (!props.selectedStratagems.find(el => el === e)) {
        return e
      }
    })
  )
  const displayOn = () => {
    display.value = true
    shownStratagems.value = stratagemCodeList.filter(e => {
      if (!props.selectedStratagems.find(el => el === e)) {
        return e
      }
    })
  }
  const displayOff = () => {
    display.value = false
  }

  defineEmits(['stratagem-selected'])
  defineExpose({ position, playerIndex, displayOn, displayOff })
</script>

<style scoped></style>
