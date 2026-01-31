import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function submit(e: any) {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/signup`, { email, password, name })
      localStorage.setItem('token', res.data.token)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold">Create an account — KingdomX</h2>
        <form className="mt-6" onSubmit={submit}>
          <input className="w-full p-2 border rounded mb-3" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full p-2 border rounded mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="w-full p-2 border rounded mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full py-2 px-4 bg-brand-500 text-white rounded" type="submit">Sign up</button>
        </form>
        {error && <p className="text-red-500 mt-3">{error}</p>}
        <div className="mt-4 text-center">
          <a href="/login" className="text-sm text-brand-500">Already have an account? Sign in</a>
        </div>
      </div>
    </main>
  )
}