import { motion } from 'framer-motion'

export default function Card({ children, className = '' }: any) {
  return (
    <motion.div whileHover={{ y: -4 }} className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm ${className}`}>
      {children}
    </motion.div>
  )
}