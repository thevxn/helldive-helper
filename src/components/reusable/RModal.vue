<template>
  <div>
    <div class="flex flex-row w-full flex-wrap gap-2 mt-4" v-if="display">
      <img
        v-for="stratagem in shownStratagems"
        :key="stratagem"
        :src="`/icons/stratagems/${stratagem}.webp`"
        class="w-[40px] h-[40px]"
        @click="$emit('stratagem-selected', playerIndex, position, stratagem), (display = false)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import { stratagemCodeList } from '@/utils/stratagems'

  const display = ref(false)
  const playerIndex = ref(0)
  const position = ref(0)
  const props = defineProps({
    selectedStratagems: {
      type: Array,
      default: () => ['MECH', 'RAILGUN', 'JUMP_PACK', 'EAGLE_AIRSTRIKE']
    }
  })

  defineEmits(['stratagem-selected'])
  defineExpose({ position, display, playerIndex })

  const shownStratagems = stratagemCodeList.filter(e => {
    if (!props.selectedStratagems.find(el => el === e)) {
      return e
    }
  })
</script>

<style scoped></style>
