import html2canvas from 'html2canvas'
import type { ToastPluginApi } from 'vue-toast-notification'

import { Logger } from '@/utils/logger'

const logger = Logger()

const generateCanvas = async (players: number) => {
  const element = players > 1 ? document.querySelector('main') : document.querySelector('#p-1')

  return await html2canvas(element as HTMLElement, { backgroundColor: 'black', logging: false })
}

// https://stackoverflow.com/a/44487883
export const exportImage = async (players: number, toast: ToastPluginApi) => {
  try {
    const canvas = await generateCanvas(players)

    const link = document.createElement('a')

    URL.revokeObjectURL(link.href)

    link.setAttribute('download', 'helldive-helper.png')
    link.setAttribute('href', canvas.toDataURL('image/png', 1).replace('image/png', 'image/octet-stream'))
    link.click()
    toast.success('Image downloaded!')
  } catch (e) {
    toast.error('Error when downloading image.')
    logger.error(e)
  }
}

export const copyImageToClipboard = async (players: number, toast: ToastPluginApi) => {
  try {
    const canvas = await generateCanvas(players)

    canvas.toBlob(async blob => {
      const item = new ClipboardItem({ 'image/png': blob as Blob })

      await navigator.clipboard.write([item])
      toast.success('Image copied!')
    })
  } catch (e) {
    toast.error('Error when downloading image.')
    logger.error(e)
  }
}
