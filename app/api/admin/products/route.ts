import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Product from '@/models/Product'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

async function getUniqueSlug(baseSlug: string): Promise<string> {
  const existing = await Product.findOne({ slug: baseSlug }).select('_id')
  if (!existing) return baseSlug

  let counter = 1
  while (true) {
    const slug = `${baseSlug}-${counter}`
    const found = await Product.findOne({ slug }).select('_id')
    if (!found) return slug
    counter++
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
    }

    const products = await Product.find().sort({ createdAt: -1 })
    return NextResponse.json(products, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
    }

    const body = await req.json()
    
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const baseSlug = generateSlug(body.name)
    const slug = await getUniqueSlug(baseSlug)

    const product = await Product.create({
      ...body,
      slug,
      rating: body.rating ?? 0,
      reviewCount: body.reviewCount ?? 0,
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    const message = error.code === 11000
      ? 'A product with this name already exists'
      : error.message || 'Failed to create product'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB()
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const productId = searchParams.get('id')

    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }

    const body = await req.json()

    const updateData: Record<string, any> = { ...body }
    if (body.name) {
      const baseSlug = generateSlug(body.name)
      const existing = await Product.findById(productId).select('slug')
      if (existing && existing.slug !== baseSlug) {
        updateData.slug = await getUniqueSlug(baseSlug)
      }
    }

    delete updateData._id
    delete updateData.__v

    const product = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    )

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB()
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const productId = searchParams.get('id')

    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }

    const product = await Product.findByIdAndDelete(productId)

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Product deleted' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
