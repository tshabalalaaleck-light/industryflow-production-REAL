import { useState } from "react"
import { useRouter } from "next/router"

export default function Login() {
  const [email, setEmail] = useState("admin@industryflow.co.za")
  const [password, setPassword] = useState("admin123")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e:any) => {
    e.preventDefault()
    setLoading(true)
    // Simple demo login - stores companyId
    localStorage.setItem("companyId", "demo-company-123")
    localStorage.setItem("userEmail", email)
    setTimeout(()=> router.push("/dashboard"), 800)
  }

  return (
    <div style={{minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#0f172a"}}>
      <div style={{background:"white", padding:40, borderRadius:16, width:380, boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
        <h1 style={{fontSize:28, fontWeight:800, marginBottom:8}}>IndustryFlow</h1>
        <p style={{color:"#64748b", marginBottom:24}}>Forging Line ERP - Login</p>
        <form onSubmit={handleLogin}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:"100%", padding:12, marginBottom:12, borderRadius:8, border:"1px solid #e2e8f0"}}/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" style={{width:"100%", padding:12, marginBottom:20, borderRadius:8, border:"1px solid #e2e8f0"}}/>
          <button disabled={loading} style={{width:"100%", padding:12, background:"#0f172a", color:"white", borderRadius:8, fontWeight:700, cursor:"pointer"}}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p style={{marginTop:16, fontSize:12, color:"#94a3b8"}}>Demo: any email/password works. Tenant isolation enabled.</p>
      </div>
    </div>
  )
}