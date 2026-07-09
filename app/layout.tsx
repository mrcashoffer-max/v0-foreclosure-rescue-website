import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { TrackingPixels } from '@/components/tracking-pixels'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const viewport: Viewport = {
  themeColor: '#0f766e',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://homerescuetx.com'),
  title: {
    default: 'Home Rescue Texas | Know Your Options & Keep Your Home',
    template: '%s | Home Rescue Texas',
  },
  description:
    'Behind on your mortgage in Texas? Explore every option to keep or sell your home and get a free, confidential consultation with a foreclosure specialist with 20+ years of experience.',
  keywords: [
    'Texas foreclosure help',
    'pre-foreclosure',
    'stop foreclosure',
    'loan modification',
    'short sale',
    'foreclosure specialist',
  ],
  openGraph: {
    title: 'Home Rescue Texas | Know Your Options',
    description:
      'Behind on your mortgage? You still have options. Free, confidential consultation with a Texas foreclosure specialist.',
    type: 'website',
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <div className="flex min-h-dvh flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
        <TrackingPixels />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
