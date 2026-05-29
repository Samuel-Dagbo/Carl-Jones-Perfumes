'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 't1',
    name: 'Elara Vance',
    title: 'Fragrance Enthusiast',
    quote:
      "Carl Jones perfumes are simply unparalleled. The depth and complexity of 'Midnight Bloom' captivate every time I wear it. It's truly a luxurious experience from the moment you open the exquisite packaging.",
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Julian Thorne',
    title: 'Creative Director',
    quote:
      "'Golden Oasis' is a masterpiece. Its unique blend of notes transports me to another world. Carl Jones doesn't just sell perfumes; they sell emotions and stories.",
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Seraphina Lee',
    title: 'Fashion Stylist',
    quote:
      "As a stylist, I appreciate attention to detail, and Carl Jones delivers. 'Celestial Mist' has become my signature scent — subtle yet powerful. The sleek design of the bottle itself is a work of art.",
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop',
    rating: 4,
  },
]

export function Testimonials() {
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
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A84C]/70 mb-4 sm:mb-6 px-4 sm:px-5 py-2 border border-[#C9A84C]/[0.12] rounded-full">
            Testimonials
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1210] leading-[1.05] tracking-[-0.02em]">
            What Our <span className="bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="mt-3 sm:mt-5 text-sm sm:text-base text-[#4a3f35]/60 max-w-lg mx-auto leading-relaxed">
            Real experiences from our valued customers around the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="relative rounded-2xl p-7 lg:p-8 h-full border border-black/[0.06] hover:border-[#C9A84C]/15 transition-all duration-400 bg-white">
                {/* Quote icon */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-[#C9A84C]/20" strokeWidth={1} />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < testimonial.rating
                          ? 'text-[#C9A84C] fill-[#C9A84C]'
                          : 'text-black/10'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-sm sm:text-base text-[#4a3f35]/70 leading-[1.8] flex-1 mb-8">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-black/[0.06]">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden ring-1 ring-black/[0.06]">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1a1210]">
                      {testimonial.name}
                    </h3>
                    <p className="text-[11px] text-[#4a3f35]/50 mt-0.5 tracking-wide">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
