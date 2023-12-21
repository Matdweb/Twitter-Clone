import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import localFont from 'next/font/local'
import Providers from '@/components/Providers/Providers'
import './globals.css'
import ThemeProvider from '@/components/Providers/ThemeProvider'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '900',
  variable: '--font-roboto'
});

const Segoe_UI = localFont({
  src: [
    {
      path: '../fonts/Segoe_UI/Segoe_UI.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Segoe_UI/Segoe_UI_Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/Segoe_UI/Segoe_UI_Bold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-segoe-ui',
});

export const metadata: Metadata = {
  title: 'Twitter clone - Mat_dweb',
  description: 'Twitter clone Next.js 13 social media application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
        <body className={`${roboto.variable} ${Segoe_UI.variable}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  )
}
