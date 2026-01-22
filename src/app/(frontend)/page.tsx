import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  // 1. In ra headers
  console.log('🔍 Headers:', Object.fromEntries(headers.entries()))

  // 2. In ra cookie cụ thể
  const cookie = headers.get('cookie')
  console.log('🍪 Cookie:', cookie)

  // // 3. Gọi auth và đo thời gian
  // console.time('⏱️ payload.auth')
  const { user } = await payload.auth({ headers })
  console.log(
    '👤 User:',
    user
      ? {
          id: user.id,
          email: user.email,
        }
      : 'Chưa đăng nhập',
  )

  const allUsers = await payload.find({
    collection: 'users',
    select: { email: true, createdAt: true },
  })
  console.log('📋 All users:', allUsers.docs)

  const allMedia = await payload.find({
    collection: 'media',
    depth: 0,
  })
  console.log('🖼️ All media:', allMedia.docs)

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {!user && <h1>Payload của Công Thụn</h1>}
        {user && <h1>Công Thụn đang đăng nhập với tài khoản {user.email}</h1>}
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
