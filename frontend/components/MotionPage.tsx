import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

const variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function MotionPage({ children }: { children: ReactNode }) {
  const router = useRouter()
  return (
    <div className="relative min-h-screen bg-black">
      <AnimatePresence mode="sync" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div 
          key={router.pathname} 
          variants={variants} 
          initial="initial" 
          animate="enter" 
          exit="exit"
          className="relative z-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
