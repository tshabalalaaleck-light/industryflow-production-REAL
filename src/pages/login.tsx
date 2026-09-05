import { useState } from "react"
import { useRouter } from "next/router"

export default function Login() {
  const [email, setEmail] = useState("alecmshengu@outlook.com")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e:any) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try{
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if(!res.ok || !data.success){
        setError(data.error || "Invalid login")
        setLoading(false)
        return
      }
      localStorage.setItem("companyId", data.companyId)
      localStorage.setItem("userEmail", data.user.email)
      localStorage.setItem("userRole", data.user.role)
      router.push("/dashboard")
    }catch(err){
      setError("Login failed. Check connection.")
      setLoading(false)
    }
  }

  return (
    <div style={{minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#0f172a"}}>
      <div style={{background:"white", padding:40, borderRadius:16, width:380, boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
        <h1 style={{fontSize:28, fontWeight:800, marginBottom:8}}>IndustryFlow</h1>
        <p style={{color:"#64748b", marginBottom:24}}>Super Admin Login</p>
        <form onSubmit={handleLogin}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:"100%", padding:12, marginBottom:12, borderRadius:8, border:"1px solid #e2e8f0"}}/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password Admin123!" style={{width:"100%", padding:12, marginBottom:12, borderRadius:8, border:"1px solid #e2e8f0"}}/>
          {error && <p style={{color:"red", fontSize:13, marginBottom:12}}>{error}</p>}
          <button disabled={loading} style={{width:"100%", padding:12, background:"#0f172a", color:"white", borderRadius:8, fontWeight:700, cursor:"pointer"}}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p style={{marginTop:16, fontSize:12, color:"#94a3b8"}}>Super Admin: alecmshengu@outlook.com</p>
      </div>
    </div>
  )
}