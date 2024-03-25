<template>
  <div>
    <div class="flex flex-row w-full flex-wrap justify-center gap-2 mt-4" v-if="display">
      <img
        v-for="stratagem in shownStratagems"
        :key="stratagem"
        :src="`/icons/stratagems/${stratagem}.webp`"
        class="w-[40px] h-[40px] hover:border-solid hover:border-4 hover:border-yellow-400"
        :title="stratagems[stratagem as keyof typeof stratagems].displayName"
        @click="$emit('stratagem-selected', playerIndex, position, stratagem), (display = false)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import { stratagemCodeList, stratagems } from '@/utils/stratagems'

  const display = ref(false)
  const playerIndex = ref(0)
  const position = ref(0)
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
  const toggleDisplay = () => {
    display.value = !display.value
    shownStratagems.value = stratagemCodeList.filter(e => {
      if (!props.selectedStratagems.find(el => el === e)) {
        return e
      }
    })
  }

  defineEmits(['stratagem-selected'])
  defineExpose({ position, toggleDisplay, playerIndex })
</script>

<style scoped></style>
