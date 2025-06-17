<template>
  <div
    :class="`bg-diagonal-solid absolute z-10 mt-4 flex h-[70vh] w-[88%] -translate-y-[107%] translate-x-[0%] snap-start flex-row flex-wrap justify-center gap-2 overflow-y-auto  rounded-md border-4 border-solid border-yellow-300 p-4 sm:h-[75vh] sm:w-[40%] xl:w-[21%]`"
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
  import { Ref, ref } from 'vue'

  import { stratagemCodeList, stratagems } from '@/data/stratagems'
  import { sortStratagems } from '@/utils/sort'

  const sortedStratagemCodeList = sortStratagems(stratagemCodeList)

  const display = ref(false)

  const playerIndex = ref(null) as Ref<number | null>

  const position = ref(null) as Ref<number | null>

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
