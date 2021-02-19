import { useEffect, useState } from 'react'

const keySequence = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
]

export const useKonamiCode = fn => {
  const [nextKeys, setNextKeys] = useState(keySequence)
  const [buffer, setBuffer] =  useState([])

  const reset = () => {
    setBuffer([])
    setNextKeys(keySequence)
  }

  useEffect(() => {
    const handleKeyUp = e => {
      const { key } = e
      const [next, ..._keySequence] = nextKeys
      if (key && key !== next){
        reset()
      } else {
        setNextKeys(_keySequence)
        setBuffer([...buffer, key])
      }
    }

    window.addEventListener('keyup', handleKeyUp)

    if (buffer.length === keySequence.length) {
      fn.call()
      reset()
    }

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [buffer, fn, nextKeys, setNextKeys, setBuffer])
}
