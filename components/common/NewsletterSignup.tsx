'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, Check, AlertCircle } from 'lucide-react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Failed')
      setMessage({
        type: 'success',
        text: 'Welcome to CARL JONES. Expect extraordinary.',
      })
      setEmail('')
    } catch {
      setMessage({
        type: 'error',
        text: 'Please enter a valid email address.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section-padding relative overflow-hidden bg-white">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-[#C9A84C]/15 to-transparent" />

      <div className="container-luxury relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative rounded-2xl sm:rounded-[2rem] p-8 sm:p-12 md:p-16 border border-black/[0.06] overflow-hidden bg-white">
            {/* Content */}
            <div className="text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#C9A84C]/[0.08] mb-8 border border-[#C9A84C]/[0.1]"
              >
                <Mail className="w-6 h-6 text-[#C9A84C]" strokeWidth={1.5} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.7 }}
              >
                <span className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A84C]/70 mb-5 px-4 py-2 border border-[#C9A84C]/[0.12] rounded-full">
                  Stay Connected
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1210] leading-[1.1] tracking-[-0.02em] mt-3"
              >
                Stay Connected with <br />
                <span className="bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] bg-clip-text text-transparent">CARL JONES</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="mt-4 sm:mt-5 text-sm sm:text-base text-[#4a3f35]/60 leading-relaxed max-w-md mx-auto"
              >
                Be the first to discover new arrivals, exclusive offers, and the
                latest from the world of luxury fragrances.
              </motion.p>

              <motion.form
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mt-10"
              >
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-3.5 rounded-full text-sm border border-black/[0.08] bg-[#fafafa] focus:outline-none focus:border-[#C9A84C]/40 focus:ring-1 focus:ring-[#C9A84C]/20 transition-all duration-300 placeholder:text-black/30"
                    required
                    aria-label="Email for newsletter signup"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="group relative inline-flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A84C] to-[#D4BC6A] text-[#0A0A0A] font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,168,76,0.25)]">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
                        Subscribing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Subscribe
                        <ArrowRight
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                          strokeWidth={2}
                        />
                      </span>
                    )}
                  </span>
                </motion.button>
              </motion.form>

              <AnimatePresence mode="wait">
                {message && (
                  <motion.div
                    key={message.type}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-5 inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full ${
                      message.type === 'success'
                        ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                        : 'bg-red-500/10 text-red-600 border border-red-500/20'
                    }`}
                  >
                    {message.type === 'success' ? (
                      <Check className="w-4 h-4" strokeWidth={2} />
                    ) : (
                      <AlertCircle className="w-4 h-4" strokeWidth={2} />
                    )}
                    {message.text}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-5 text-[11px] text-[#4a3f35]/40 tracking-wide"
              >
                No spam, ever. Unsubscribe at any time.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
