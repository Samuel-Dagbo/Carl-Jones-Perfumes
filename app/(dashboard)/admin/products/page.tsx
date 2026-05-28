'use client'

import React, { useState, useEffect, useRef, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, Search, Package, X, Eye, Tag, Upload, Link as LinkIcon, Sparkles, Percent } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { Product as ProductType } from '@/types'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

const NOTE_CATEGORIES = ['top', 'middle', 'base'] as const
const NOTE_OPTIONS = [
  'Bergamot', 'Lemon', 'Orange', 'Lime', 'Grapefruit', 'Pear', 'Apple', 'Mint',
  'Sea Salt', 'Saffron', 'Cardamom', 'Black Pepper', 'Rose', 'Jasmine', 'Lily',
  'Lavender', 'Geranium', 'Iris', 'Lotus', 'Peony', 'Orange Blossom', 'Tuberose',
  'Cinnamon', 'Tobacco', 'Leather', 'Green Tea', 'Vanilla', 'Sandalwood', 'Musk',
  'Patchouli', 'Oud', 'Amber', 'Cedar', 'Vetiver', 'Tonka Bean', 'Incense',
  'Dark Chocolate', 'White Musk', 'Cashmere', 'Guaiac Wood'
]

function ProductsContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    comparePrice: '',
    category: 'unisex',
    brand: '',
    size: '100ml',
    concentration: 'EDP',
    quantity: '',
    images: [''],
    featured: false,
    new: false,
    tags: '',
    notes: { top: [] as string[], middle: [] as string[], base: [] as string[] }
  })
  const [imageMode, setImageMode] = useState<'url' | 'upload'>('url')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [noteInput, setNoteInput] = useState<Record<string, string>>({ top: '', middle: '', base: '' })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      resetForm()
      setEditingProduct(null)
      setIsModalOpen(true)
      router.replace('/admin/products')
    }
  }, [searchParams, router])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/customer')
    } else if (status === 'authenticated') {
      fetchProducts()
    }
  }, [status, session, router])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(Array.isArray(data) ? data : data.products || [])
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : []

      const cleanImages = formData.images.filter(Boolean)

      if (cleanImages.length === 0) {
        toast({ title: 'Validation Error', description: 'At least one product image is required', variant: 'destructive' })
        setSaving(false)
        return
      }

      const payload = {
        ...formData,
        images: cleanImages,
        tags: tagsArray,
        price: parseFloat(formData.price),
        comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : undefined,
        quantity: parseInt(formData.quantity),
        inStock: parseInt(formData.quantity) > 0
      }

      const url = editingProduct 
        ? `/api/admin/products?id=${editingProduct._id}` 
        : '/api/admin/products'
      const method = editingProduct ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        toast({
          title: editingProduct ? 'Product Updated' : 'Product Created',
          description: editingProduct ? 'Product has been updated successfully.' : 'New product has been added to inventory.'
        })
        setIsModalOpen(false)
        setEditingProduct(null)
        resetForm()
        fetchProducts()
      } else {
        const data = await res.json()
        toast({ title: 'Error', description: data.error || 'Failed to save product', variant: 'destructive' })
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Something went wrong', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const res = await fetch(`/api/admin/products?id=${productId}`, { method: 'DELETE' })
      if (res.ok) {
        toast({ title: 'Product Deleted', description: 'Product has been removed from inventory.' })
        fetchProducts()
      } else {
        toast({ title: 'Error', description: 'Failed to delete product', variant: 'destructive' })
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Something went wrong', variant: 'destructive' })
    }
  }

  const openEditModal = (product: ProductType) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      comparePrice: product.comparePrice?.toString() || '',
      category: product.category,
      brand: product.brand,
      size: product.size,
      concentration: product.concentration,
      quantity: product.quantity.toString(),
      images: product.images.length > 0 ? product.images : [''],
      featured: product.featured || false,
      new: product.new || false,
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
      notes: product.notes || { top: [], middle: [], base: [] }
    })
    setNoteInput({ top: '', middle: '', base: '' })
    setTagInput('')
    setIsModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      comparePrice: '',
      category: 'unisex',
      brand: '',
      size: '100ml',
      concentration: 'EDP',
      quantity: '',
      images: [''],
      featured: false,
      new: false,
      tags: '',
      notes: { top: [], middle: [], base: [] }
    })
    setNoteInput({ top: '', middle: '', base: '' })
    setTagInput('')
  }

  const addNote = (category: 'top' | 'middle' | 'base', note: string) => {
    if (!note.trim()) return
    if (formData.notes[category].includes(note.trim())) return
    setFormData({
      ...formData,
      notes: {
        ...formData.notes,
        [category]: [...formData.notes[category], note.trim()]
      }
    })
    setNoteInput({ ...noteInput, [category]: '' })
  }

  const removeNote = (category: 'top' | 'middle' | 'base', index: number) => {
    setFormData({
      ...formData,
      notes: {
        ...formData.notes,
        [category]: formData.notes[category].filter((_, i) => i !== index)
      }
    })
  }

  const addTag = () => {
    if (!tagInput.trim()) return
    const existing = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    if (existing.includes(tagInput.trim())) return
    setFormData({ ...formData, tags: [...existing, tagInput.trim()].join(', ') })
    setTagInput('')
  }

  const removeTag = (index: number) => {
    const existing = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    setFormData({ ...formData, tags: existing.filter((_, i) => i !== index).join(', ') })
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-kartel-gold border-t-transparent rounded-full animate-spin" />
          <span className="text-muted text-sm">Loading inventory...</span>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'admin') {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-heading">Inventory Management</h1>
          <p className="text-muted text-sm mt-1">Manage your fragrance collection</p>
        </div>
        <button 
          onClick={() => { resetForm(); setEditingProduct(null); setIsModalOpen(true) }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-kartel-gold to-amber-600 text-kartel-black font-semibold text-sm shadow-lg shadow-kartel-gold/25 hover:shadow-kartel-gold/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: products.length, icon: Package, color: 'from-blue-500/20' },
          { label: 'In Stock', value: products.filter(p => p.inStock).length, icon: Eye, color: 'from-green-500/20' },
          { label: 'Out of Stock', value: products.filter(p => !p.inStock).length, icon: Trash2, color: 'from-red-500/20' },
          { label: 'Total Value', value: formatPrice(products.reduce((sum, p) => sum + (p.price * p.quantity), 0)), icon: Tag, color: 'from-kartel-gold/20' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 glass-card rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-4 h-4 text-kartel-gold" />
              </div>
              <div>
                <p className="text-muted text-xs">{stat.label}</p>
                <p className="text-lg font-bold text-heading">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input 
            type="text" 
            placeholder="Search by name or brand..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-luxury w-full pl-11 pr-4 py-3 rounded-xl text-sm" 
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="input-luxury px-4 py-3 rounded-xl text-sm"
        >
          <option value="all">All Categories</option>
          <option value="mens">Men&apos;s</option>
          <option value="womens">Women&apos;s</option>
          <option value="unisex">Unisex</option>
          <option value="niche">Niche</option>
        </select>
      </div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-kartel-white-50 dark:bg-kartel-black">
                <th className="px-5 py-4 text-left text-[10px] font-semibold text-muted uppercase tracking-wider">Product</th>
                <th className="px-5 py-4 text-left text-[10px] font-semibold text-muted uppercase tracking-wider">Category</th>
                <th className="px-5 py-4 text-left text-[10px] font-semibold text-muted uppercase tracking-wider">Price</th>
                <th className="px-5 py-4 text-left text-[10px] font-semibold text-muted uppercase tracking-wider">Stock</th>
                <th className="px-5 py-4 text-left text-[10px] font-semibold text-muted uppercase tracking-wider">Status</th>
                <th className="px-5 py-4 text-right text-[10px] font-semibold text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, i) => (
                  <motion.tr 
                    key={product._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-black/[0.05] dark:border-white/[0.05] glass shrink-0">
                          {product.images?.[0] ? (
                            <Image src={product.images[0]} alt={product.name} fill className="object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg' }} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-5 h-5 text-muted" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-heading">{product.name}</p>
                          <p className="text-xs text-muted">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-body capitalize">{product.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-heading">{formatPrice(product.price)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-sm ${product.quantity < 10 ? 'text-yellow-400' : 'text-body'}`}>
                        {product.quantity} units
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                        product.inStock 
                          ? product.quantity < 10 
                            ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20'
                            : 'bg-green-500/15 text-green-400 border border-green-500/20'
                          : 'bg-red-500/15 text-red-400 border border-red-500/20'
                      }`}>
                        {product.inStock ? (product.quantity < 10 ? 'Low Stock' : 'In Stock') : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(product)}
                          className="p-2 rounded-lg glass-card text-muted hover:text-kartel-gold hover:border-kartel-gold/20 transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-2 rounded-lg glass-card text-muted hover:text-red-400 hover:border-red-500/20 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full glass-card flex items-center justify-center mb-4">
                        <Package className="w-6 h-6 text-muted" />
                      </div>
                      <p className="text-muted">
                        {products.length === 0 ? 'No products yet' : 'No products found'}
                      </p>
                      <p className="text-muted/50 text-sm mt-1">
                        {products.length === 0
                          ? 'Add your first fragrance to get started'
                          : 'Try adjusting your search or filters'}
                      </p>
                      {products.length === 0 && (
                        <button
                          onClick={() => { resetForm(); setEditingProduct(null); setIsModalOpen(true) }}
                          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-kartel-gold to-amber-600 text-kartel-black font-semibold text-sm shadow-lg shadow-kartel-gold/25 hover:shadow-kartel-gold/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                        >
                          <Plus className="w-4 h-4" />
                          Create Your First Product
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl"
            >
              <div className="p-6 border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
                <h2 className="font-serif text-xl font-semibold text-heading">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg glass-card text-muted hover:text-heading hover:border-kartel-gold/20 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-muted uppercase tracking-wider">Product Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-luxury w-full px-4 py-3 rounded-xl"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted uppercase tracking-wider">Brand</label>
                    <input
                      type="text"
                      required
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="input-luxury w-full px-4 py-3 rounded-xl"
                      placeholder="Enter brand name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted uppercase tracking-wider">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-luxury w-full px-4 py-3 rounded-xl resize-none"
                    placeholder="Enter product description"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-muted uppercase tracking-wider">Price (GHS)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="input-luxury w-full px-4 py-3 rounded-xl"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted uppercase tracking-wider">Compare Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.comparePrice}
                      onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value })}
                      className="input-luxury w-full px-4 py-3 rounded-xl"
                      placeholder="Original price"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted uppercase tracking-wider">Quantity</label>
                    <input
                      type="number"
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="input-luxury w-full px-4 py-3 rounded-xl"
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted uppercase tracking-wider">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="input-luxury w-full px-4 py-3 rounded-xl"
                    >
                      <option value="unisex">Unisex</option>
                      <option value="mens">Men&apos;s</option>
                      <option value="womens">Women&apos;s</option>
                      <option value="niche">Niche</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-muted uppercase tracking-wider">Size</label>
                    <select
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="input-luxury w-full px-4 py-3 rounded-xl"
                    >
                      <option value="50ml">50ml</option>
                      <option value="100ml">100ml</option>
                      <option value="150ml">150ml</option>
                      <option value="200ml">200ml</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted uppercase tracking-wider">Concentration</label>
                    <select
                      value={formData.concentration}
                      onChange={(e) => setFormData({ ...formData, concentration: e.target.value })}
                      className="input-luxury w-full px-4 py-3 rounded-xl"
                    >
                      <option value="EDP">EDP</option>
                      <option value="EDT">EDT</option>
                      <option value="Parfum">Parfum</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted uppercase tracking-wider">Flags</label>
                    <div className="flex gap-3 h-full items-center pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="w-4 h-4 rounded border-black/[0.2] dark:border-white/[0.2] text-kartel-gold focus:ring-kartel-gold"
                        />
                        <Sparkles className={`w-3.5 h-3.5 ${formData.featured ? 'text-kartel-gold' : 'text-muted'}`} />
                        <span className="text-xs text-muted">Featured</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.new}
                          onChange={(e) => setFormData({ ...formData, new: e.target.checked })}
                          className="w-4 h-4 rounded border-black/[0.2] dark:border-white/[0.2] text-kartel-gold focus:ring-kartel-gold"
                        />
                        <span className="text-xs text-muted">New</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted uppercase tracking-wider">Fragrance Notes</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {NOTE_CATEGORIES.map((cat) => (
                      <div key={cat} className="space-y-2">
                        <label className="text-[10px] text-muted uppercase tracking-wider capitalize">{cat}</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={noteInput[cat]}
                            onChange={(e) => setNoteInput({ ...noteInput, [cat]: e.target.value })}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addNote(cat, noteInput[cat]) } }}
                            className="input-luxury flex-1 px-3 py-2 rounded-xl text-sm"
                            placeholder={`Add ${cat} note`}
                            list={`notes-${cat}`}
                          />
                          <button
                            type="button"
                            onClick={() => addNote(cat, noteInput[cat])}
                            className="p-2 rounded-xl glass-card text-muted hover:text-kartel-gold transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <datalist id={`notes-${cat}`}>
                          {NOTE_OPTIONS.map((n) => <option key={n} value={n} />)}
                        </datalist>
                        <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                          {formData.notes[cat].map((note, i) => (
                            <span key={i} className="inline-flex items-center gap-1 px-2 py-1 text-[11px] rounded-lg bg-kartel-gold/10 text-kartel-gold border border-kartel-gold/20">
                              {note}
                              <button type="button" onClick={() => removeNote(cat, i)} className="hover:text-red-400">
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted uppercase tracking-wider">Tags</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                      className="input-luxury flex-1 px-4 py-3 rounded-xl text-sm"
                      placeholder="Add a tag and press Enter"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="p-3 rounded-xl glass-card text-muted hover:text-kartel-gold transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {formData.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {formData.tags.split(',').map((t, i) => t.trim() ? (
                        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] rounded-lg bg-black/[0.05] dark:bg-white/[0.05] text-muted border border-black/[0.08] dark:border-white/[0.08]">
                          <Tag className="w-3 h-3" />
                          {t.trim()}
                          <button type="button" onClick={() => removeTag(i)} className="hover:text-red-400">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ) : null)}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted uppercase tracking-wider">Product Images</label>
                  <div className="flex gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setImageMode('url')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                        imageMode === 'url'
                          ? 'btn-primary'
                          : 'glass-card text-muted hover:text-heading'
                      }`}
                    >
                      <LinkIcon className="w-4 h-4" />
                      URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMode('upload')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                        imageMode === 'upload'
                          ? 'btn-primary'
                          : 'glass-card text-muted hover:text-heading'
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      Upload
                    </button>
                  </div>
                  {imageMode === 'url' ? (
                    <div className="space-y-2">
                      {formData.images.map((img, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="url"
                            value={img}
                            onChange={(e) => {
                              const updated = [...formData.images]
                              updated[idx] = e.target.value
                              setFormData({ ...formData, images: updated })
                            }}
                            className="input-luxury flex-1 px-4 py-3 rounded-xl text-sm"
                            placeholder={`Image URL ${idx + 1}`}
                          />
                          {formData.images.length > 1 && (
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== idx) })}
                              className="p-3 rounded-xl glass-card text-muted hover:text-red-400 transition-all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, images: [...formData.images, ''] })}
                        className="text-xs text-kartel-gold hover:underline mt-1"
                      >
                        + Add another image URL
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (!file) return
                          if (file.size > 10 * 1024 * 1024) {
                            toast({ title: 'File Too Large', description: 'Maximum file size is 10MB', variant: 'destructive' })
                            return
                          }
                          setUploading(true)
                          const reader = new FileReader()
                          reader.onload = async () => {
                            try {
                              const res = await fetch('/api/upload', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ image: reader.result })
                              })
                              const data = await res.json()
                              if (!res.ok || !data.url) {
                                toast({ title: 'Upload Failed', description: data.error || 'Server error. Check console for details.', variant: 'destructive' })
                                console.error('Upload error:', data)
                              } else {
                                setFormData({ ...formData, images: [...formData.images.filter(Boolean), data.url] })
                                toast({ title: 'Upload Successful', description: 'Image uploaded to Cloudinary' })
                              }
                            } catch (err) {
                              toast({ title: 'Upload Failed', description: 'Network error. Check console.', variant: 'destructive' })
                              console.error('Upload network error:', err)
                            }
                            setUploading(false)
                          }
                          reader.readAsDataURL(file)
                        }}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-black/[0.1] dark:border-white/[0.1] rounded-xl cursor-pointer hover:border-kartel-gold/30 transition-all glass"
                      >
                        {uploading ? (
                          <div className="w-8 h-8 border-2 border-kartel-gold/30 border-t-kartel-gold rounded-full animate-spin" />
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-muted mb-2" />
                            <span className="text-muted text-sm">Click to upload image</span>
                          </>
                        )}
                      </label>
                      {formData.images.filter(Boolean).length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                          {formData.images.filter(Boolean).map((img, idx) => (
                            <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-black/[0.05] dark:border-white/[0.05]">
                              <Image src={img} alt={`Product ${idx + 1}`} fill className="object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg' }} />
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== idx) })}
                                className="absolute top-1 right-1 p-1 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 glass-card px-5 py-3 text-body hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary flex-1 px-5 py-3"
                  >
                    {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function AdminProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-kartel-gold border-t-transparent rounded-full animate-spin" />
          <span className="text-muted text-sm">Loading...</span>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}