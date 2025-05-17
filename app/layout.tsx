import type React from "react"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import { CartProvider } from "./context/cart-context";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <title>لحوم دلمون</title>
        <meta name="description" content="لحوم دلمون - اللحوم الطازجة والمستوردة والدواجن المميزة" />
      </head>
      <body>
        <CartProvider>
          <Toaster position="top-center" />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
