import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Product from '@/models/Product'
import mongoose from 'mongoose'

async function findProduct(id: string) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const byId = await Product.findById(id).lean()
    if (byId) return byId
  }
  return Product.findOne({ slug: id }).lean()
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const product = await findProduct(params.id)

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product, { status: 200 })
  } catch (error: any) {
    console.error('Product API Error:', error)
    return NextResponse.json({ error: 'Failed to load product' }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
    }
    const body = await req.json()
    const product = await Product.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    )

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
    }
    const product = await Product.findByIdAndDelete(params.id)

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Product deleted' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
