import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function submit(e: any) {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/login`, { email, password })
      localStorage.setItem('token', res.data.token)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold">Sign in to KingdomX</h2>
        <p className="text-sm mt-2">King Group of Technology — Muhammad Jawad</p>
        <form className="mt-6" onSubmit={submit}>
          <input id="emailSignIn" className="w-full p-2 border rounded mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="w-full p-2 border rounded mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full py-2 px-4 bg-brand-500 text-white rounded shadow" type="submit">Sign in</button>
        </form>
        {error && <p className="text-red-500 mt-3">{error}</p>}

        <div className="mt-6">
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a className="py-2 px-4 bg-red-500 text-white rounded text-center block" href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/oauth/google`}>Sign in with Google</a>
            <a className="py-2 px-4 bg-gray-800 text-white rounded text-center block" href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/oauth/github`}>Sign in with GitHub</a>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
            <button className="py-1 px-2 bg-yellow-400 rounded" onClick={async () => {
              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/demo?role=ADMIN`)
              const data = await res.json()
              localStorage.setItem('token', data.token)
              router.push('/dashboard')
            }}>Demo Admin</button>
            <button className="py-1 px-2 bg-yellow-300 rounded" onClick={async () => {
              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/demo?role=MANAGER`)
              const data = await res.json()
              localStorage.setItem('token', data.token)
              router.push('/dashboard')
            }}>Demo Manager</button>
            <button className="py-1 px-2 bg-yellow-200 rounded" onClick={async () => {
              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/demo?role=CLIENT`)
              const data = await res.json()
              localStorage.setItem('token', data.token)
              router.push('/dashboard')
            }}>Demo Client</button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <a href="/signup" className="text-sm text-brand-500">Create an account</a>
        </div>
      </div>
    </main>
  )
}
