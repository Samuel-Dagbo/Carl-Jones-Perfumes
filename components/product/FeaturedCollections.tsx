'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Product } from '@/types'

interface FeaturedCollectionsProps {
  products?: Product[]
}

const defaultCollections = [
  {
    id: '1',
    name: 'Signature Collection',
    description: 'Timeless elegance, redefined for the modern connoisseur. Each fragrance in this collection represents the pinnacle of olfactory artistry.',
    image: 'https://images.unsplash.com/photo-1541108253-1f8d38466b04?q=80&w=1974&auto=format&fit=crop',
    link: '/shop?collection=signature',
    productCount: 42,
  },
  {
    id: '2',
    name: 'Seasonal Allure',
    description: 'Embrace the spirit of the season with curated fragrances that capture the essence of every moment.',
    image: 'https://images.unsplash.com/photo-1550927958-857e101f375f?q=80&w=1974&auto=format&fit=crop',
    link: '/shop?collection=seasonal',
    productCount: 28,
  },
  {
    id: '3',
    name: 'Niche & Exclusive',
    description: 'Rare finds and limited editions for the true perfume connoisseur who seeks the extraordinary.',
    image: 'https://images.unsplash.com/photo-1621217032731-137a28e99e90?q=80&w=1974&auto=format&fit=crop',
    link: '/shop?collection=niche',
    productCount: 16,
  },
]

export function FeaturedCollections({ products = [] }: FeaturedCollectionsProps) {
  const collections = products.length > 0
    ? products.slice(0, 3).map((product) => ({
        id: product._id,
        name: product.name,
        description: product.description.slice(0, 100) + '...',
        image: product.images?.[0] || defaultCollections[0].image,
        link: `/product/${product.slug || product._id}`,
        productCount: 1,
      }))
    : defaultCollections

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
            Our <span className="bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] bg-clip-text text-transparent">Collections</span>
          </h2>
          <p className="mt-3 sm:mt-5 text-sm sm:text-base text-[#4a3f35]/60 max-w-lg mx-auto leading-relaxed">
            Handpicked selections to guide your olfactory journey through luxury.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link href={collection.link} className="group block h-full">
                <div className="relative h-full rounded-2xl overflow-hidden border border-black/[0.06] hover:border-[#C9A84C]/20 transition-all duration-500 bg-white">
                  <div className="relative h-72 sm:h-80 md:h-96 w-full overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Product count badge */}
                    <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/[0.08]">
                      <span className="text-[11px] font-medium text-white/80">
                        {collection.productCount} scent{collection.productCount !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Hover arrow */}
                    <div className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 border border-white/10">
                      <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#1a1210] group-hover:text-[#C9A84C] transition-colors duration-400">
                      {collection.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4a3f35]/60 leading-relaxed line-clamp-2 mt-2">
                      {collection.description}
                    </p>
                    <div className="pt-3 flex items-center gap-1.5 text-[#C9A84C]/70 text-xs sm:text-sm font-medium tracking-wide group-hover:text-[#C9A84C] transition-colors duration-300">
                      <span>Explore Collection</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
