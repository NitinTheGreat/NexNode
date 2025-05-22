import type React from "react"
import { Inter, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import Navbar from "../components/Navbar"


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-poppins" })

export const metadata = {
  title: "NexNode - Digital Universe Creators",
  description:
    "NexNode transforms ideas into immersive digital experiences through cutting-edge web development and design.",
  keywords:
    "web development, digital experiences, Next.js, React, UI/UX design, mobile apps, e-commerce, CMS integration, API development",
  authors: [{ name: "NexNode Team" }],
  creator: "NexNode",
  publisher: "NexNode",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nexnode.tech"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NexNode - Digital Universe Creators",
    description:
      "NexNode transforms ideas into immersive digital experiences through cutting-edge web development and design.",
    url: "https://nexnode.tech",
    siteName: "NexNode",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "NexNode Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexNode - Digital Universe Creators",
    description:
      "NexNode transforms ideas into immersive digital experiences through cutting-edge web development and design.",
    images: ["/logo.jpg"],
    creator: "@nexnode",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
