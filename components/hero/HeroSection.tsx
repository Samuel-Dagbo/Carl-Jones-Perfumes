'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const HERO_IMAGE =
  'https://res.cloudinary.com/dlv5tvzsa/image/upload/v1780042721/carljones.jpg_eyhyl3.jpg'

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={ref}
      className="relative bg-[#1a1210]"
    >
      {/* ── MOBILE: full-screen background image with text overlay ── */}
      <div className="lg:hidden relative w-full h-[calc(100vh-4.5rem)] min-h-[550px] overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Carl Jones Signature Perfume"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/50" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-10 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-[1px] bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-[0.55rem] tracking-[0.35em] uppercase font-semibold">
              Carl Jones Parfums
            </span>
          </motion.div>
          <div className="mb-3">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-white text-[clamp(2.4rem,8vw,3.5rem)] leading-[0.92] tracking-[-0.02em]"
              style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
            >
              Define Your
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(2.4rem,8vw,3.5rem)] leading-[0.92] tracking-[-0.02em]"
              style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
            >
              <span className="bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] bg-clip-text text-transparent">
                Signature
              </span>
            </motion.h1>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-10 h-[1.5px] bg-gradient-to-r from-[#C9A84C] to-transparent origin-left mb-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/85 text-[0.85rem] leading-relaxed mb-8 max-w-sm"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
          >
            Rare botanicals meet avant-garde chemistry.
            Each scent is a symphony — crafted for those who
            appreciate the finest things.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center gap-2.5 h-12 px-8 bg-gradient-to-r from-[#C9A84C] to-[#D4BC6A] text-[#0A0A0A] font-semibold text-sm tracking-wide rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_25px_rgba(201,168,76,0.3)] hover:scale-[1.02] active:scale-[0.98] w-fit"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">Explore Collection</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center h-12 px-8 border border-white/30 text-white/90 text-sm tracking-wide rounded-full backdrop-blur-sm transition-all duration-500 hover:border-white/50 hover:text-white hover:bg-white/10 active:scale-[0.98] w-fit"
            >
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── DESKTOP: full-screen background image with refined text overlay ── */}
      <div className="hidden lg:relative lg:block w-full h-[calc(100vh-8rem)] min-h-[600px] max-h-[900px] overflow-hidden">
        {/* Parallax background image */}
        <motion.div style={{ scale: imgScale }} className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Carl Jones Signature Perfume"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>

        {/* Layered overlay for depth and text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

        {/* Content */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative z-10 h-full flex items-center px-16 xl:px-24 2xl:px-32"
        >
          <div className="max-w-xl">
            {/* Brand label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="w-14 h-[1px] bg-gradient-to-r from-[#C9A84C] to-transparent" />
              <span className="text-[#C9A84C] text-[0.6rem] tracking-[0.35em] uppercase font-medium">
                Carl Jones Parfums
              </span>
            </motion.div>

            {/* Headline */}
            <div className="mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-white text-[clamp(3rem,5vw,5.5rem)] leading-[0.9] tracking-[-0.03em] mb-2"
                style={{ textShadow: '0 4px 40px rgba(0,0,0,0.3), 0 2px 12px rgba(0,0,0,0.5)' }}
              >
                Define Your
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[0.9] tracking-[-0.03em]"
                style={{ textShadow: '0 4px 40px rgba(0,0,0,0.3), 0 2px 12px rgba(0,0,0,0.5)' }}
              >
                <span className="bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] bg-clip-text text-transparent">
                  Signature
                </span>
              </motion.h1>
            </div>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-[1.5px] bg-gradient-to-r from-[#C9A84C] via-[#C9A84C]/50 to-transparent origin-left mb-8"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/85 text-sm lg:text-base max-w-lg leading-relaxed mb-12"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
            >
              Rare botanicals meet avant-garde chemistry.
              Each scent is a symphony — crafted for those who
              appreciate the finest things.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-row gap-4"
            >
              <Link
                href="/shop"
                className="group relative inline-flex items-center justify-center gap-2.5 h-12 px-8 bg-gradient-to-r from-[#C9A84C] to-[#D4BC6A] text-[#0A0A0A] font-semibold text-sm tracking-wide rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(201,168,76,0.35)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">Explore Collection</span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center h-12 px-8 border border-white/25 text-white/90 text-sm tracking-wide rounded-full backdrop-blur-sm transition-all duration-500 hover:border-white/50 hover:text-white hover:bg-white/10 active:scale-[0.98]"
              >
                Our Story
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[6px] text-white/35 tracking-[0.6em] uppercase">Scroll</span>
            <div className="w-px h-5 bg-gradient-to-b from-[#C9A84C]/40 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
