declare global {
  interface Window {
    umami: {
      track: (props: unknown) => { url: string }
    }
  }
  declare const __brand: unique symbol
  type Branded<T, Brand> = T & { [__brand]: Brand }
}

export {}
