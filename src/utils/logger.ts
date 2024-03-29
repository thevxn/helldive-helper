export const Logger = () => ({
  log: (...data: any[]) => {
    console.log(...data)
  },
  debug: (...data: any[]) => {
    if (NODE_ENV !== 'production') {
      console.debug(...data)
    }
  },
  error: (...data: any[]) => {
    if (NODE_ENV !== 'production') {
      console.error(...data)
    }
  }
})
