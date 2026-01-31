import { motion } from 'framer-motion'

export default function Button({ children, className = '', ...props }: any) {
  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`px-4 py-2 rounded shadow-sm bg-brand-500 text-white ${className}`} {...props}>
      {children}
    </motion.button>
  )
}
