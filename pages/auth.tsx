import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const signUp = async () => {
    setMessage('Signing up...')
    const { user, error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else {
      setMessage('Check your email for confirmation. Creating profile...')
      // Create minimal profile after sign up - will be confirmed after email
      // Profiles should be created after email confirmation in production
      const { error: pErr } = await supabase.from('profiles').upsert([{ id: user?.id, full_name: '', role: 'dealer' }])
      if (pErr) setMessage('Signed up but failed to create profile: ' + pErr.message)
      else setMessage('Signed up — please confirm email. Then log in.')
    }
  }

  const signIn = async () => {
    setMessage('Signing in...')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else router.push('/invoices')
  }

  return (
    <main className="min-h-screen p-8">
      <h2 className="text-2xl font-semibold mb-4">Sign up / Sign in</h2>
      <div className="max-w-md space-y-3">
        <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={signUp}>Sign up</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={signIn}>Sign in</button>
        </div>
        {message && <p className="text-sm text-gray-700">{message}</p>}
      </div>
    </main>
  )
}
