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
    <div className="flex flex-col items-center justify-center space-y-8 bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md">
      {/* タイマー表示 */}
      <div className="text-center">
        {seconds === 0 ? (
          <p className="text-4xl md:text-5xl font-bold text-red-500 animate-pulse">
            終了！
          </p>
        ) : (
          <p className="text-6xl md:text-7xl font-bold text-gray-800 font-mono tracking-wider">
            {formatTime(seconds)}
          </p>
        )}
      </div>

      {/* ボタン群 */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button
          onClick={handleStartPause}
          className="flex-1 px-8 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 active:scale-95 transition-all duration-150 cursor-pointer transform hover:scale-105"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="flex-1 px-8 py-4 text-lg font-semibold text-gray-700 bg-gray-200 rounded-lg shadow-lg hover:bg-gray-300 active:scale-95 transition-all duration-150 cursor-pointer transform hover:scale-105"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
