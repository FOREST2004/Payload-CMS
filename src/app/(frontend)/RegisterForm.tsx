'use client'

import { createUser } from './actions'
import { useState } from 'react'

export function RegisterForm() {
  const [message, setMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    const result = await createUser({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    })

    if (result.success) {
      setMessage(`✅ Tạo user thành công (use client action): ${result.user?.email}`)
    } else {
      setMessage(`❌ Lỗi (use client action): ${result.error}`)
    }
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
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  )
}
