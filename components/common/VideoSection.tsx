'use client'

import { motion } from 'framer-motion'

const VIDEO_URL =
  'https://res.cloudinary.com/dlv5tvzsa/video/upload/v1780059898/Golden_finish_wksp6o.mp4'

export function VideoSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container-luxury py-10 md:py-16 lg:py-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 md:mb-10 lg:mb-12"
        >
          <span className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A84C]/70 mb-3 sm:mb-4 px-4 sm:px-5 py-2 border border-[#C9A84C]/[0.12] rounded-full">
            The Craft
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1210] leading-[1.05] tracking-[-0.02em]">
            A Golden <span className="bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] bg-clip-text text-transparent">Finish</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#4a3f35]/60 max-w-lg mx-auto leading-relaxed">
            Every detail, perfected. Watch the artistry behind each Carl Jones creation.
          </p>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Video container */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.1)] bg-[#1a1210]">
            <video
              src={VIDEO_URL}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              className="w-full aspect-video object-cover max-h-[65vh]"
              poster="https://res.cloudinary.com/dlv5tvzsa/image/upload/v1780042721/carljones.jpg_eyhyl3.jpg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
