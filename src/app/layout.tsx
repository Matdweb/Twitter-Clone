import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import localFont from 'next/font/local'
import Providers from '@/redux/providers'
import './globals.css'

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
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${Segoe_UI.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
