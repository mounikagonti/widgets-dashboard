import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {ReduxProvider} from '@/redux/ReduxProvider'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Dashboard Project',
  description: 'A dynamic dashboard built with Next.js and Redux',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
