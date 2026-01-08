'use client'

import { useState, useEffect } from 'react'

export default function Timer() {
  const [seconds, setSeconds] = useState(1500) // 25分 = 1500秒
  const [isRunning, setIsRunning] = useState(false)

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  const playSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
  

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800 // 音の高さ（Hz）
    oscillator.type = 'sine' // 音の種類

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  useEffect(() => {
    if (isRunning && seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prev: number) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isRunning, seconds])

  useEffect(() => {
    if (seconds === 0 && isRunning) {
      setIsRunning(false)
      playSound()
    }
  }, [seconds, isRunning])

  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setSeconds(1500)
  }

  return (
    <div>
      {seconds === 0 ? (
        <p>終了！</p>
      ) : (
        <p>{formatTime(seconds)}</p>
      )}
      <button onClick={handleStartPause}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}
