'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

// Tạo user mới
export async function createUser(data: { email: string; password: string }) {
  const payload = await getPayload({ config })

  try {
    const user = await payload.create({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
        role: 'user',
      },
      // overrideAccess: false,
    })
    console.log('✅ Created user (server action):', user.email)
    return { success: true, user }
  } catch (error) {
    console.error('❌ Error creating user (server action):', error)
    return { success: false, error: (error as Error).message }
  }
}

// export async function doSomething() {
//   const payload = await getPayload({ config })

//   await payload.jobs.queue({
//     task: 'log-message',
//     input: { message: 'Từ Server Action!' },
//   })
// }

// Lấy tất cả users
export async function getAllUsers() {
  const payload = await getPayload({ config })

  const users = await payload.find({
    collection: 'users',
    select: { email: true, role: true, createdAt: true },
  })

  return users.docs
}
