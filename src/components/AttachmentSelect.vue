<template>
  <div
    :class="`bg-diagonal-solid absolute z-10 mt-4 flex h-[70vh] w-[88%] -translate-y-[107%] translate-x-[0%] snap-start flex-row flex-wrap justify-center gap-2 overflow-y-auto  rounded-md border-4 border-solid border-yellow-300 p-4 sm:h-[75vh] sm:w-[40%] xl:w-[21%]`"
    @click.stop
    v-if="display">
    <img
      v-for="attachment in shownAttachments"
      :key="attachment"
      :src="`/attachments/primary/${attachment}.webp`"
      :class="`h-[50px] w-[50px] rounded-md hover:border-4 hover:border-solid hover:border-yellow-300`"
      :title="attachments[attachment].displayName"
      @click="$emit('attachment-selected', playerIndex, position, attachment), display" />
  </div>
</template>

<script setup lang="ts">
  import { Ref, ref } from 'vue'

  import { AttachmentCategory, PrimaryWeaponAttachments, attachments } from '@/data/attachments'
  import { weapons } from '@/data/weapons'

  // TODO: Summary:
  // This component should receive information about:
  // - Weapon for which attachments should be displayed
  // - The category of the attachments to be displayed (will be used for all 4 categories so it needs to be generic)
  // - Currently selected attachment to filter it out of the selection
  // - Position (copied from strat. select, could be turned into an enum??)
  // - Player Index
  // - Display (whether to display the modal or not)

  // TODO: Get attachment code, its category and use a function to sort & filter out the currently selected attachment

  const shownAttachments = ref() as Ref<PrimaryWeaponAttachments[AttachmentCategory]>

  interface IProps {
    primaryWeaponCode: keyof typeof weapons.primary | null
    attachmentCategory: AttachmentCategory | null
    selectedAttachment: PrimaryWeaponAttachments[AttachmentCategory] | null
    position: number | null
    playerIndex: number | null
    display: boolean
  }

  // TODO: Make a function to dynamically retrieve default attachments for a given weapon code
  withDefaults(defineProps<IProps>(), {
    display: false,
    playerIndex: null,
    position: null,
    primaryWeaponCode: null,
    selectedAttachments: null
  })
  defineEmits(['attachment-selected'])
</script>

<style scoped></style>
