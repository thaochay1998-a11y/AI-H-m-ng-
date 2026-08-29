import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI H’Mông - Trợ lý thông minh',
  description: 'Trợ lý AI dành riêng cho cộng đồng H’Mông',
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-900 text-slate-100 antialiased h-dvh overflow-hidden">
        {children}
      </body>
    </html>
  )
}
