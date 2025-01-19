import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    console.log("hello")
    setValue('')
  }

  return {
   safe: {type,
    value,
    onChange},
    reset: reset
  }
}

// modules can have several named exports

export const useAnotherHook = () => {
  // ...
}