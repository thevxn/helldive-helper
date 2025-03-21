<template>
  <div
    :class="`bg-diagonal-solid  absolute z-10 mt-4 flex -translate-y-[80%] translate-x-[0%] snap-start flex-row flex-wrap justify-center gap-2 rounded-md border-4  border-solid  border-yellow-300 p-4 sm:w-[45%] sm:-translate-y-[90%] md:w-[45%] lg:w-[45%] xl:w-[22%] xl:-translate-y-[90%]`"
    @click.stop
    v-if="display">
    <img
      v-for="stratagem in shownStratagems"
      :key="stratagem"
      :src="`/icons/stratagems/${stratagem}.webp`"
      :class="`h-[50px] w-[50px] rounded-md hover:border-4 hover:border-solid hover:border-yellow-300`"
      :title="stratagems[stratagem].displayName"
      @click="$emit('stratagem-selected', playerIndex, position, stratagem), (display = false)" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import { stratagemCodeList, stratagems } from '@/data/stratagems'
  import { sortStratagems } from '@/utils/sort'

  const sortedStratagemCodeList = sortStratagems(stratagemCodeList)
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
    sortedStratagemCodeList.filter(e => {
      if (!props.selectedStratagems.find(el => el === e)) {
        return e
      }
    })
  )
  const displayOn = () => {
    display.value = true
    shownStratagems.value = sortedStratagemCodeList.filter(e => {
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
