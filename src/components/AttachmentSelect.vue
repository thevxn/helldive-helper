<template>
  <!-- TODO: Fix img and modal sizes -->
  <div
    tabindex="0"
    ref="attachmentSelect"
    @keydown.esc="$emit('attachment-selected', playerIndex, position)"
    class="bg-diagonal-solid absolute z-10 mt-4 flex h-[70vh] w-[88%] -translate-y-[107%] translate-x-[0%] snap-start flex-col overflow-y-auto rounded-md border-4 border-solid border-yellow-300 p-4 focus:outline-none sm:h-[75vh] sm:w-[40%] xl:w-[21%]"
    @click.stop
    v-if="display">
    <div class="flex h-fit w-full flex-row">
      <div class="ml-auto mr-0">
        <button @click="$emit('attachment-selected', playerIndex, position)">X</button>
      </div>
    </div>
    <div :class="'flex flex-row flex-wrap items-start justify-center gap-2'">
      <img
        v-for="attachment in availableAttachments"
        :key="attachment"
        :src="props.primaryWeaponCode ? getAttachmentImageSource(attachment, props.primaryWeaponCode) : ''"
        class="h-[50px] w-[50px] rounded-md hover:border-4 hover:border-solid hover:border-yellow-300"
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
  import { nextTick, ref, watch } from 'vue'

  import {
    AttachmentCategory,
    AttachmentKey,
    AttachmentKeysForWeaponForCategory,
    IAttachment,
    attachments,
    getAttachmentImageSource,
    getAttachmentsForWeaponForCategory
  } from '@/data/attachments'
  import { PrimaryWeaponKey } from '@/data/weapons'

  interface IProps {
    primaryWeaponCode: PrimaryWeaponKey | null
    attachmentCategory: AttachmentCategory | null
    selectedAttachment: AttachmentKey | null
    playerIndex: number | null
    position: number | null
    display: boolean
  }

  const props = withDefaults(defineProps<IProps>(), {
    primaryWeaponCode: null,
    attachmentCategory: null,
    selectedAttachment: null,
    playerIndex: null,
    position: null,
    display: false
  })

  const availableAttachments = ref<AttachmentKeysForWeaponForCategory<PrimaryWeaponKey, AttachmentCategory> | never[]>()

  if (props.selectedAttachment && props.attachmentCategory && props.primaryWeaponCode) {
    availableAttachments.value = getAttachmentsForWeaponForCategory(props.primaryWeaponCode, props.attachmentCategory)
  }

  // Update available attachments each time the selected weapon changes
  watch(
    () => props.primaryWeaponCode,
    () => {
      if (props.primaryWeaponCode && props.attachmentCategory) {
        availableAttachments.value = getAttachmentsForWeaponForCategory(
          props.primaryWeaponCode,
          props.attachmentCategory
        )
      }
    }
  )

  // Autofocus the modal when opened, so it can be closed with the ESC key immediately
  const attachmentSelect = ref<HTMLElement | null>(null)

  watch(
    () => props.display,
    newVal => {
      if (newVal) {
        nextTick(() => {
          attachmentSelect.value?.focus()
        })
      }
    }
  )

  defineEmits(['attachment-selected'])
</script>

<style scoped></style>
