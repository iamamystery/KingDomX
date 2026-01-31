import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const { token } = router.query as { token?: string }
    if (token) {
      localStorage.setItem('token', token)
      router.replace('/dashboard')
    }
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to KingdomX</h1>
        <p className="mt-4">King Group of Technology — CEO & Founder: Muhammad Jawad</p>
      </div>
    </main>
  )
}
