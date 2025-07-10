<template>
  <div
    tabindex="0"
    ref="attachmentSelect"
    @keydown.esc="$emit('attachment-selected', playerIndex, position)"
    class="bg-diagonal-solid absolute z-10 mt-4 flex h-[350px] w-[88%] -translate-y-[-8%] translate-x-[0%] snap-start flex-col overflow-y-auto rounded-md border-4 border-solid border-yellow-300 focus:outline-none sm:w-[40%] sm:-translate-y-[31%] xl:w-[21%]"
    @click.stop
    v-if="display">
    <div class="flex h-fit w-full flex-row">
      <div class="ml-auto mr-3 mt-2" @click="$emit('attachment-selected', playerIndex, position)">
        <button
          class="h-8 w-8 snap-center place-self-center rounded border-2 border-solid border-yellow-300 bg-yellow-300 font-bold text-black hover:bg-black hover:text-yellow-300 active:bg-yellow-300 active:bg-none active:text-black">
          X
        </button>
      </div>
    </div>
    <div class="ml-auto mr-auto flex h-full w-full flex-row flex-wrap gap-2 p-3">
      <div
        class="flex max-h-[50%] w-[30%] flex-col rounded border-4 border-solid border-gray-900 bg-black bg-opacity-70 last:pb-4 hover:cursor-pointer hover:border-yellow-300"
        v-for="attachment in availableAttachments"
        :key="attachment">
        <div
          class="flex h-[80px] flex-col items-center justify-center"
          @click="$emit('attachment-selected', playerIndex, position, attachment)">
          <img
            class="max-h-[64px]"
            :src="props.primaryWeaponCode ? getAttachmentImageSource(attachment, props.primaryWeaponCode) : ''"
            :title="
              (
                attachments[attachmentCategory as AttachmentCategory][
                  attachment as keyof (typeof attachments)[AttachmentCategory]
                ] as IAttachment
              ).displayName
            " />
        </div>
        <span class="break-words text-center text-sm">{{
          (
            attachments[attachmentCategory as AttachmentCategory][
              attachment as keyof (typeof attachments)[AttachmentCategory]
            ] as IAttachment
          ).displayName
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, ref, watch } from 'vue'

  import type {
    AttachmentCategory,
    AttachmentKey,
    AttachmentKeysForWeaponForCategory,
    IAttachment
  } from '@/data/attachments'
  import { attachments, getAttachmentImageSource, getAttachmentsForWeaponForCategory } from '@/data/attachments'
  import type { PrimaryWeaponKey } from '@/data/weapons'

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
