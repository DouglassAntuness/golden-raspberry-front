// polyfill structuredClone para Chakra UI
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (val: any) => {
    if (val === undefined) return undefined
    return JSON.parse(JSON.stringify(val))
  }
}

// polyfill matchMedia para next-themes, Chakra etc.
if (!window.matchMedia) {
  window.matchMedia = function () {
    return {
      matches: false,
      addEventListener: () => { },
      removeEventListener: () => { },
      addListener: () => { },
      removeListener: () => { },
      dispatchEvent: () => false,
    }
  } as any
}

import '@testing-library/jest-dom'
