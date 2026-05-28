'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trash2, ShoppingBag, ChevronRight, Sparkles, Loader2 } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { Product as ProductType } from '@/types'
import { useCart } from '@/components/providers/CartProvider'
import { toast } from '@/components/ui/use-toast'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

export default function WishlistPage() {
  const { addItem } = useCart()
  const [wishlist, setWishlist] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const res = await fetch('/api/wishlist')
      if (res.ok) {
        const data = await res.json()
        setWishlist(Array.isArray(data) ? data : [])
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (productId: string) => {
    try {
      const res = await fetch(`/api/wishlist?productId=${productId}`, { method: 'DELETE' })
      if (res.ok) {
        setWishlist(prev => prev.filter(p => p._id !== productId))
        toast({ title: "Removed", description: "Item removed from wishlist." })
      }
    } catch {
      toast({ title: "Error", description: "Failed to remove item.", variant: 'destructive' })
    }
  }

  const moveToCart = (product: ProductType) => {
    addItem({ product, quantity: 1 })
    removeFromWishlist(product._id)
    toast({
      title: "Moved to cart",
      description: `${product.name} is now in your shopping bag.`,
    })
  }

  const totalValue = wishlist.reduce((sum, p) => sum + p.price, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 text-kartel-gold animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-heading flex items-center gap-3">
            <Heart className="w-7 h-7 text-kartel-gold" />
            My Wishlist
          </h1>
          <p className="text-muted text-sm mt-1">Your saved fragrances</p>
        </div>
        {wishlist.length > 0 && (
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl glass-card">
            <Sparkles className="w-4 h-4 text-kartel-gold" />
            <span className="text-muted text-sm">{wishlist.length} fragrance{wishlist.length !== 1 ? 's' : ''}</span>
            <span className="text-muted/30">•</span>
            <span className="text-heading text-sm font-medium">{formatPrice(totalValue)}</span>
          </div>
        )}
      </motion.div>

      {wishlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-12 rounded-2xl glass-card text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-kartel-gold/10 to-kartel-gold/5 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-kartel-gold/40" />
          </div>
          <h3 className="text-xl font-semibold text-heading mb-3">Your wishlist is empty</h3>
          <p className="text-muted mb-8 max-w-sm mx-auto">
            Save fragrances you love to easily find them later and keep track of your favorite scents.
          </p>
          <Link
            href="/shop"
            className="btn-primary inline-flex items-center gap-2"
          >
            Discover Fragrances
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {wishlist.map((product) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative"
              >
                <ProductCard product={product} />

                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => moveToCart(product)}
                    className="p-3 rounded-full bg-kartel-gold text-kartel-black shadow-lg hover:shadow-xl hover:bg-kartel-gold-light transition-all"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromWishlist(product._id)}
                    className="p-3 rounded-full bg-red-500/90 text-white shadow-lg hover:bg-red-500 transition-all"
                    title="Remove"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {wishlist.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pt-8 border-t border-black/[0.06] dark:border-white/[0.06]"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-lg font-semibold text-heading">You might also like</h2>
            <Link href="/shop" className="text-sm text-kartel-gold hover:text-kartel-gold/80 flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-muted text-sm">Explore more fragrances from our collection</p>
        </motion.div>
      )}
    </div>
  )
}
