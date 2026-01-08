import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'カウントダウンタイマー',
  description: '25分のカウントダウンタイマーアプリ',
}

export default function RootLayout({
  children,}: {
  children: ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>  
    </html>
  )
}

// childrenとは、nextjsのルールにより、自動的にpage.tsxを探してくれる変数である。