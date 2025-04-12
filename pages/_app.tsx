import type { AppProps } from "next/app"
import { Inter } from "next/font/google"
import "../app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WishlistProvider } from "@/context/wishlist-context"
import { AuthProvider } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <WishlistProvider>
          <div className={`flex min-h-screen flex-col ${inter.className}`}>
            <Navbar />
            <div className="flex-1">
              <Component {...pageProps} />
            </div>
            <Footer />
          </div>
          <Toaster />
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
