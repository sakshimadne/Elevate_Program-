import React, { useRef, useState } from 'react'

const DebounceComponent = () => {
  const timerRef = useRef(null)
  const [count, setCount] = useState(0)

  // Custom debounce function inside the same component
  const useDebounce = (callback, delay) => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      timerRef.current = setTimeout(() => {
        callback()
      }, delay)
    }
  }

  const handleClick = () => {
    console.log('Button clicked!')
    setCount((prev) => prev + 1)
  }

  const debouncedClick = useDebounce(handleClick, 1000) // 1-second debounce

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Debounce</h2>
      <button onClick={debouncedClick}>Click Me</button>
      <p>Button Click Count: {count}</p>
    </div>
  )
}

export default DebounceComponent
