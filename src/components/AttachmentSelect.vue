<template>
  <div
    class="bg-diagonal-solid absolute z-10 mt-4 flex h-[70vh] w-[88%] -translate-y-[107%] translate-x-[0%] snap-start flex-col overflow-y-auto rounded-md border-4 border-solid border-yellow-300 p-4 sm:h-[75vh] sm:w-[40%] xl:w-[21%]"
    @click.stop
    v-if="display">
    <div class="flex h-fit w-full flex-row">
      <div class="ml-auto mr-0">
        <button @click="$emit('attachment-selected', playerIndex, position)">X</button>
      </div>
    </div>
    <div :class="'flex flex-row flex-wrap items-start justify-center gap-2'">
      <!-- TODO: title could be refactored to be returned by a getDisplayName helper function to be cleaner.. -->
      <img
        v-for="attachment in shownAttachments"
        :key="attachment"
        :src="`/attachments/primary/${attachment}.webp`"
        :class="`h-[50px] w-[50px] rounded-md hover:border-4 hover:border-solid hover:border-yellow-300`"
        :title="
          (
            attachments[attachmentCategory as AttachmentCategory][
              attachment as keyof (typeof attachments)[AttachmentCategory]
            ] as IAttachment
          ).displayName
        "
        @click="$emit('attachment-selected', playerIndex, position, attachment)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import { getAttachmentsForCategory } from '../data/attachments'

  import { AttachmentCategory, IAttachment, PrimaryWeaponAttachments, attachments } from '@/data/attachments'
  import { weapons } from '@/data/weapons'
  import { SelectedAttachment } from '@/utils/filter'

  // TODO: Summary:
  // This component should receive information about:
  // - Weapon for which attachments should be displayed
  // - The category of the attachments to be displayed (will be used for all 4 categories so it needs to be generic)
  // - Currently selected attachment to filter it out of the selection
  // - Position (copied from strat. select, could be turned into an enum??)
  // - Player Index
  // - Display (whether to display the modal or not)

  interface IProps {
    primaryWeaponCode: keyof typeof weapons.primary | null
    attachmentCategory: AttachmentCategory | null
    selectedAttachment: SelectedAttachment | null
    playerIndex: number | null
    position: number | null
    display: boolean
  }

  // TODO: Make a function to dynamically retrieve default attachments for a given weapon code
  const props = withDefaults(defineProps<IProps>(), {
    primaryWeaponCode: null,
    attachmentCategory: null,
    selectedAttachment: null,
    playerIndex: null,
    position: null,
    display: false
  })

  const shownAttachments = ref<PrimaryWeaponAttachments[AttachmentCategory][]>()

  if (props.selectedAttachment !== null && props.attachmentCategory !== null) {
    shownAttachments.value = getAttachmentsForCategory(props.attachmentCategory)
  }

  defineEmits(['attachment-selected'])
</script>

<style scoped></style>
