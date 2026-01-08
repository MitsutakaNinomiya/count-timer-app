# カウントダウンタイマー (Next.js + TypeScript)

25分のポモドーロ風カウントダウンタイマーです。Start / Pause / Reset に対応し、0になると「終了！」表示とビープ音が鳴ります。

## 使い方

```
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

## 主な機能
- 25分（1500秒）カウントダウン
- Start / Pause / Reset
- mm:ss 表示
- 0で「終了！」表示と音声通知

## 技術スタック
- Next.js 14 (App Router)
- React 18
- TypeScript

## デプロイ想定
- Vercel
