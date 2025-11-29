import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useRouter } from 'next/router'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const signUp = async () => {
    setMessage('Signing up...')

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      setMessage(error.message)
      return
    }

    const user = data.user

    setMessage('Check your email for confirmation. Creating profile...')

    // only runs when email confirmation is disabled
    if (user) {
      const { error: pErr } = await supabase.from('profiles').upsert([
        {
          id: user.id,
          full_name: '',
          role: 'dealer'
        }
      ])

      if (pErr) setMessage('Signed up but failed to create profile: ' + pErr.message)
      else setMessage('Account created successfully!')
    }
  }

  const signIn = async () => {
    setMessage('Signing in...')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage('Login successful!')
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">Authentication</h2>

      <div className="flex flex-col gap-4 max-w-md">
        <input
          className="border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white p-2" onClick={signUp}>
          Sign Up
        </button>

        <button className="bg-green-600 text-white p-2" onClick={signIn}>
          Sign In
        </button>

        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </main>
  )
}
