'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

interface FeaturedCollectionsProps {
  products?: Product[]
}

export function FeaturedCollections({ products = [] }: FeaturedCollectionsProps) {
  if (products.length === 0) return null

  const featured = products.slice(0, 3)

  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-[#C9A84C]/15 to-transparent" />

      <div className="container-luxury relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C9A84C]/70 mb-4 sm:mb-6 px-4 sm:px-5 py-2 border border-[#C9A84C]/[0.12] rounded-full">
            Curated For You
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1210] leading-[1.05] tracking-[-0.02em]">
            Featured <span className="bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="mt-3 sm:mt-5 text-sm sm:text-base text-[#4a3f35]/60 max-w-lg mx-auto leading-relaxed">
            Discover our most exquisite fragrances, crafted for those who appreciate the finest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link href={`/product/${product.slug || product._id}`} className="group block h-full">
                <div className="relative h-full rounded-2xl overflow-hidden border border-black/[0.06] hover:border-[#C9A84C]/20 transition-all duration-500 bg-white">
                  <div className="relative h-72 sm:h-80 md:h-96 w-full overflow-hidden bg-[#f5f5f5]">
                    <Image
                      src={product.images?.[0] || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/[0.08]">
                      <span className="text-[11px] font-medium text-white/80 capitalize">
                        {product.category}
                      </span>
                    </div>

                    {/* Hover arrow */}
                    <div className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 border border-white/10">
                      <ArrowRight className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C9A84C]/60 mb-1.5">
                      {product.brand || 'CARL JONES'}
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#1a1210] group-hover:text-[#C9A84C] transition-colors duration-400">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4a3f35]/60 leading-relaxed line-clamp-2 mt-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/[0.06]">
                      <span className="text-lg sm:text-xl font-bold text-[#1a1210]">
                        {formatPrice(product.price)}
                      </span>
                      <span className="flex items-center gap-1.5 text-[#C9A84C] text-xs sm:text-sm font-medium tracking-wide group-hover:gap-2.5 transition-all duration-300">
                        View Product
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 h-12 px-8 bg-gradient-to-r from-[#C9A84C] to-[#D4BC6A] text-[#0A0A0A] font-semibold text-sm tracking-wide rounded-full transition-all duration-500 hover:shadow-[0_0_25px_rgba(201,168,76,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
