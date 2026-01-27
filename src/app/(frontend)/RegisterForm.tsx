// 'use client'

// import { createUser } from './actions'
// import { useState } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

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

export function RegisterForm() {
  // const [message, setMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    'use server'

    const result = await createUser({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    })

    // if (result) {
    //   setMessage(`✅ Tạo user thành công (use client action): ${result}`)
    // } else {
    //   setMessage(`❌ Lỗi (use client action): ${result}`)
    // }
  }

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h3>Test Server Action - Tạo User</h3>
      <form action={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          Đăng ký
        </button>
      </form>
      {/* {message && <p style={{ marginTop: '10px' }}>{message}</p>} */}
    </div>
  )
}
