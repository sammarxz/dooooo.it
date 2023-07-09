export function padNumber(number: number): string {
  return number.toString().padStart(2, '0')
}

export function formatTimer(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(
      remainingSeconds
    )}`
  } else {
    return `${padNumber(minutes)}:${padNumber(remainingSeconds)}`
  }
}
