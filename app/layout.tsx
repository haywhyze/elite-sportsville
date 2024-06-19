import './globals.css'
import { Montserrat } from 'next/font/google'

export const metadata = {
  metadataBase: new URL('https://elitesportsville.com'),
  title: 'Elite Sportsville',
  description: 'Your Ultimate Football Experience',
  image: '/hero.png',
  url: 'https://elitesportsville.com',
  type: 'website',
  keywords: ['football', 'soccer', 'sports', 'recreation', 'leisure'],
};

const montserrat = Montserrat({
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>{children}</body>
    </html>
  )
}
