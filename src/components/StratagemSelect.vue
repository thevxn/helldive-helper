<template>
  <div
    :class="`bg-diagonal-solid absolute z-10 mt-4 flex h-[70vh] w-[88%] -translate-y-[107%] translate-x-[0%] snap-start flex-row flex-wrap justify-center gap-2 overflow-y-auto  rounded-md border-4 border-solid border-yellow-300 p-4 sm:h-[75vh] sm:w-[40%] xl:w-[21%]`"
    @click.stop
    v-if="display">
    <div v-for="(attachmentList, category) in stratagemMap" :key="category" class="flex w-full flex-col">
      <span class="mb-2 w-full rounded-md border-2 border-yellow-300 bg-black bg-opacity-90 p-2">{{ category }}</span>
      <div class="m-1 flex w-full flex-row flex-wrap gap-1">
        <img
          v-for="stratagem in attachmentList"
          :key="stratagem"
          :src="`/icons/stratagems/${stratagem}.webp`"
          :class="`h-[60px] w-[60px] rounded-md hover:border-4 hover:border-solid hover:border-yellow-300`"
          :title="stratagems[stratagem].displayName"
          @click="$emit('stratagem-selected', playerIndex, position, stratagem), (display = false)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { type Ref, ref } from 'vue'

  import { type StratagemCategory, type StratagemKey, stratagems } from '@/data/stratagems'
  import { getStratagemMap } from '@/data/stratagems'

  const stratagemMap = ref(getStratagemMap())

  const display = ref(false)

  const playerIndex = ref(null) as Ref<number | null>

  const position = ref(null) as Ref<number | null>

  const props = defineProps({
    selectedStratagems: {
      type: Array,
      default: () => ['MECH', 'RAILGUN', 'JUMP_PACK', 'EAGLE_AIRSTRIKE']
    }
  })

  const displayOn = () => {
    display.value = true

    stratagemMap.value = getStratagemMap()

    for (const [category, stratagemList] of Object.entries(stratagemMap.value)) {
      stratagemMap.value[category as StratagemCategory] = stratagemList.filter(
        (stratagem: StratagemKey) => !props.selectedStratagems.includes(stratagem)
      )
    }
  }

  const displayOff = () => {
    display.value = false
  }

  defineEmits(['stratagem-selected'])
  defineExpose({ position, playerIndex, displayOn, displayOff })
</script>

<style scoped></style>
