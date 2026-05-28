import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { image, folder } = await req.json()

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    const uploadFolder = folder || 'kartel-products'

    const result = await cloudinary.uploader.upload(image, {
      folder: uploadFolder,
    })

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    }, { status: 200 })
  } catch (error: any) {
    console.error('Cloudinary upload error:', error?.message || error)
    const message = error?.http_code
      ? `Cloudinary (${error.http_code}): ${error.message}`
      : error?.message || 'Unknown error'
    return NextResponse.json(
      { error: 'Upload failed: ' + message },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { publicId } = await req.json()

    if (!publicId) {
      return NextResponse.json({ error: 'Public ID required' }, { status: 400 })
    }

    const result = await cloudinary.uploader.destroy(publicId)

    return NextResponse.json({
      message: 'Image deleted',
      result: result.result
    }, { status: 200 })
  } catch (error: any) {
    console.error('Cloudinary delete error:', error)
    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    )
  }
}