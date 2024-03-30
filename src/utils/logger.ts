export const Logger = () => ({
  log: (...data: unknown[]) => {
    console.log(...data)
  },
  debug: (...data: unknown[]) => {
    if (NODE_ENV !== 'production') {
      console.debug(...data)
    }
  },
  error: (...data: unknown[]) => {
    if (NODE_ENV !== 'production') {
      console.error(...data)
    }
  }
})
