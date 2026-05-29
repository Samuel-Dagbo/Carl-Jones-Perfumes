'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const highlights = [
  {
    icon: '01',
    title: 'Rare & Exotic Ingredients',
    description:
      'We source the finest raw materials from across the globe, ensuring each fragrance is a masterpiece of olfactory art.',
  },
  {
    icon: '02',
    title: 'Master Perfumers',
    description:
      'Each CARL JONES scent is crafted by world-renowned perfumers with decades of experience in haute parfumerie.',
  },
  {
    icon: '03',
    title: 'Sustainable Luxury',
    description:
      'Our commitment to the environment means sustainable sourcing, eco-friendly packaging, and ethical practices.',
  },
]

export function BrandStory() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-[#C9A84C]/15 to-transparent" />

      <div className="container-luxury relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[3/4] lg:aspect-[4/5] rounded-2xl lg:rounded-[2rem] overflow-hidden border border-black/[0.06]">
              <Image
                src="https://res.cloudinary.com/dlv5tvzsa/image/upload/v1780059858/carljones_perfume.jpg_wyjopb.jpg"
                alt="CARL JONES Brand Story"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md p-5 rounded-xl border border-white/[0.08]"
              >
                <p className="text-2xl font-serif font-bold text-[#C9A84C]">15+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 mt-1">Years of Craft</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="space-y-6 lg:space-y-8 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A84C]/70 mb-5 px-4 py-2 border border-[#C9A84C]/[0.12] rounded-full">
                Our Story
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1210] leading-[1.05] tracking-[-0.02em]">
                The <span className="bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] bg-clip-text text-transparent">Essence</span> of CARL JONES
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-[#4a3f35]/70 leading-[1.8]"
            >
              At CARL JONES, we believe that fragrance is an art form — an invisible
              accessory that speaks volumes before you utter a word. Born from a
              passion for exquisite scents and meticulous craftsmanship, our
              journey began with a singular vision.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-[#4a3f35]/70 leading-[1.8]"
            >
              Each CARL JONES perfume is a symphony of rare ingredients, carefully
              sourced from the far corners of the world and blended by master
              perfumers with decades of experience.
            </motion.p>

            {/* Highlight features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C9A84C]/[0.08] flex items-center justify-center border border-[#C9A84C]/[0.1]">
                    <span className="text-[#C9A84C] text-xs font-bold">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-[#1a1210] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4a3f35]/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-10 sm:gap-14 pt-2"
            >
              {[
                { value: '200+', label: 'Unique Scents' },
                { value: '40+', label: 'Countries' },
                { value: '50K+', label: 'Happy Clients' },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1.5">
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1210]">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-[#4a3f35]/50 uppercase tracking-[0.15em]">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 border border-black/[0.08] hover:border-[#C9A84C]/25 text-[#1a1210] hover:text-[#C9A84C] text-sm font-medium px-6 py-3 rounded-full transition-all duration-400"
              >
                Learn More
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
