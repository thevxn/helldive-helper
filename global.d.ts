declare global {
  interface Window {
    umami: {
      track: (props: unknown) => { url: string }
    }
  }
  declare const __brand: unique symbol
}

export {}
