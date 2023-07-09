import { useState, useEffect } from 'react'

export function useTimer(initialValue: number, isRunning: boolean) {
  const [amountSecondsPassed, setSecondsPassed] = useState(initialValue)

  useEffect(() => {
    let startTime: number
    let requestId: number

    const updateStopwatch = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime
      }

      const elapsedTime = Math.floor((currentTime - startTime) / 1000)

      setSecondsPassed(initialValue + elapsedTime)

      requestId = requestAnimationFrame(updateStopwatch)
    }

    if (isRunning) {
      requestId = requestAnimationFrame(updateStopwatch)
    }

    return () => {
      cancelAnimationFrame(requestId)
    }
  }, [initialValue, isRunning])

  return {
    passedTime: amountSecondsPassed
  }
}
