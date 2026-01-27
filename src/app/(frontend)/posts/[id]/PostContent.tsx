'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { useState, useEffect } from 'react'
import type { Post } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  initialPost: Post
}

export function PostContent({ initialPost }: Props) {
  const [mounted, setMounted] = useState(false)

  // Chỉ render RichText sau khi mount trên client (tránh hydration error)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Hook live preview - tự động cập nhật khi edit trong admin
  const { data: post } = useLivePreview<Post>({
    initialData: initialPost,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 1,
  })

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{post.title}</h1>

      <div style={{ marginTop: '20px' }}>
        {mounted && post.content && <RichText data={post.content} />}
      </div>
    </div>
  )
}
