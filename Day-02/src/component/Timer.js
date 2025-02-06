import { useState, useEffect } from 'react'

function App() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    let interval
    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [running])

  function handleStart() {
    setRunning(true)
  }

  function handleStop() {
    setRunning(false)
  }

  function handleReset() {
    setTime(0)
    setRunning(false)
  }

  return (
    <>
      <h1>Timer App</h1>
      <p>{time}</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </>
  )
}

export default App
