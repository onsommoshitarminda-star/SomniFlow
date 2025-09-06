import type { Metadata } from 'next'
import { Inter, Audiowide } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ClientWrapper } from '@/components/ClientWrapper'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Providers } from './providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

// Retro‑futuristic rounded display font for branding
// 复古未来主义风格的品牌展示字体（用于标题/Logo 风格文案）
const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-audiowide',
})

export const metadata: Metadata = {
  title: 'OneClick DeFi - Email to DeFi in One Click',
  description: 'The simplest way to start using DeFi with just your email. No gas fees, no complexity.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${audiowide.variable}`} suppressHydrationWarning>
      {/* Force a consistent dark dreamscape base to avoid white bands at page bottom */}
      <body className={`${inter.className} antialiased bg-[#0b0b1a] text-gray-100 transition-colors`}>
        <ErrorBoundary>
          <Providers>
            <ThemeProvider>
              <ClientWrapper>
                {children}
              </ClientWrapper>
            </ThemeProvider>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}