declare global {
  interface Window {
    umami: {
      track: (props: unknown) => { url: string }
    }
  }
}

export {}
