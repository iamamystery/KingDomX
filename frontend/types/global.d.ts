/**
 * Type declarations for KingdomX Frontend
 */

// Declare JSON modules for Lottie animations and other JSON imports
declare module '*.json' {
  const value: any
  export default value
}

// Additional type declarations can be added here
declare module 'lottie-react' {
  import { ComponentType, CSSProperties } from 'react'
  
  interface LottieProps {
    animationData: any
    loop?: boolean
    autoplay?: boolean
    style?: CSSProperties
    className?: string
    onComplete?: () => void
    onLoopComplete?: () => void
    onEnterFrame?: (frame: number) => void
    onDataReady?: () => void
  }
  
  const Lottie: ComponentType<LottieProps>
  export default Lottie
}
