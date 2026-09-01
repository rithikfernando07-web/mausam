import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import AssistantModal from './AssistantModal'

export default function AssistantButton() {
  const [open, setOpen] = useState(false)
  const { weather } = useApp()
  if (!weather) return null

  return (
    <>
      {/* Floating button */}
      <motion.button
        id="assistant-btn"
        className="fixed bottom-[calc(var(--nav-height)+16px)] right-4 lg:bottom-6 lg:right-6 z-50 w-14 h-14 rounded-full shadow-glow flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        aria-label="Open Mausam AI Assistant"
        animate={open ? { scale: 0.9, opacity: 0.8 } : { scale: 1, opacity: 1 }}
      >
        <MessageCircle size={24} className="text-white" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-25 bg-sky-400" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && <AssistantModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
