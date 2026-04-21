// frontend/app/signup/page.tsx
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    
    try {
      const res = await fetch("/api/signup", {  // ✅ Correct endpoint!
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      })
      
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || "Signup failed")
      }
      
      alert("✅ Account created! Please sign in.")
      router.push("/signin")
      
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            className="mt-1 w-full p-2 border rounded"
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full p-2 border rounded"
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="mt-1 w-full p-2 border rounded"
            required
            minLength={6}
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
        
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">Sign in</a>
        </p>
      </form>
    </div>
  )
}
