import Timer from './components/Timer'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        カウントダウンタイマー
      </h1>
      <Timer />
    </main>
  )
}
