'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, Plus } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Pob tsawg! Tôi là AI H’Mông. Bạn cần tôi hỗ trợ dịch thuật, viết bài hay giải toán hôm nay?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Dữ liệu nhận được: "${userMsg.content}". (Hệ thống đang chạy chế độ thử nghiệm).`,
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-slate-900 border-x border-slate-800">
      <header className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-600/30">
            H
          </div>
          <div>
            <h1 className="font-semibold text-sm leading-none text-slate-100">AI H’Mông</h1>
            <span className="text-[10px] text-emerald-400 font-medium">Phiên bản Miễn Phí</span>
          </div>
        </div>
        <button className="px-2.5 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full hover:bg-emerald-500/20 transition">
          Nâng cấp Pro
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                msg.role === 'user' ? 'bg-indigo-600' : 'bg-emerald-600'
              }`}
            >
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>

            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-800 text-slate-200 border border-slate-700/50 rounded-tl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs pl-9">
            <Sparkles size={14} className="animate-spin text-emerald-400" />
            AI H’Mông đang suy nghĩ...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-3 border-t border-slate-800 bg-slate-900/90 backdrop-blur">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex items-center gap-2 bg-slate-800/80 rounded-full px-3 py-1.5 border border-slate-700 focus-within:border-emerald-500 transition"
        >
          <button
            type="button"
            className="text-slate-400 hover:text-slate-200 p-1 rounded-full transition"
          >
            <Plus size={18} />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 bg-transparent text-sm focus:outline-none text-slate-100 placeholder-slate-500"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 flex items-center justify-center text-white transition shrink-0"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  )
               }
