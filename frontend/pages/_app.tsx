import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../components/ThemeProvider'
import MotionPage from '../components/MotionPage'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <MotionPage>
        <Component {...pageProps} />
      </MotionPage>
    </ThemeProvider>
  )
}
