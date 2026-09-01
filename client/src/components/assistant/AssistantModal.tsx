import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Send, Sparkles } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { processAssistantQuery, QUICK_QUESTIONS } from '../../services/assistantService'
import type { AssistantMessage } from '../../types'

interface AssistantModalProps {
  onClose: () => void
}

export default function AssistantModal({ onClose }: AssistantModalProps) {
  const { weather, user } = useApp()
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: `Hi ${user.name}! 👋 I'm your Mausam Weather Assistant. Ask me anything about today's weather in ${weather?.location.city ?? 'your city'}!`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function sendMessage(query: string) {
    if (!query.trim() || !weather) return

    const userMsg: AssistantMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = processAssistantQuery(query, weather, user)
      const assistantMsg: AssistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMsg])
      setIsTyping(false)
    }, 700 + Math.random() * 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-[calc(var(--nav-height)+80px)] right-4 lg:bottom-28 lg:right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)]"
    >
      <div className="glass-card overflow-hidden flex flex-col"
        style={{ maxHeight: '70vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-sky-600/20 to-ocean-600/15">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-ocean-600 flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Mausam Assistant</div>
              <div className="text-sky-400 text-xs">● Online</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close assistant"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-sky-500/30 text-white border border-sky-500/30 rounded-br-sm'
                    : 'bg-white/10 text-slate-200 border border-white/10 rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-sm px-3 py-2">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick questions (shown when empty) */}
        {messages.length <= 1 && (
          <div className="px-3 pb-2">
            <p className="text-slate-500 text-[10px] mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_QUESTIONS.slice(0, 4).map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-sky-500/20 hover:text-sky-300 hover:border-sky-500/30 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-3 border-t border-white/10">
          <form
            onSubmit={e => { e.preventDefault(); sendMessage(input) }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about the weather..."
              className="input-field text-sm py-2 flex-1"
              aria-label="Ask a weather question"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="btn-primary px-3 py-2 text-sm"
              aria-label="Send question"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
