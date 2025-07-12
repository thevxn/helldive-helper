import { ref } from 'vue'

import { config } from '@/utils/config'

export const useUmami = () => {
  // Initialize Umami here to prevent blocking of loading
  // of the entire app in case the server is down
  // which happens when importing it in index.html
  const script = document.createElement('script')

  const umami = ref()

  script.src = config.umami.url
  script.setAttribute('data-website-id', config.umami.websiteId)
  script.setAttribute('data-auto-track', config.umami.autotrack)
  script.setAttribute('data-domains', config.umami.domain)
  document.head.appendChild(script)

  window.addEventListener('load', function () {
    umami.value = window.umami

    if (umami.value) {
      umami.value.track((props: { url: string }) => ({
        ...props,
        url: props.url.includes('?') ? props.url.split('?')[0] : props.url
      }))
    }
  })
  return umami
}
