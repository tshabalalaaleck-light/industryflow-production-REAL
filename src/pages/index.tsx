import { useState } from "react"
export default function Login(){
  const [email,setEmail]=useState(""); const [pwd,setPwd]=useState(""); const [msg,setMsg]=useState("")
  const login=async()=>{
    if(!email||!pwd) return setMsg("Enter email & password")
    setMsg("Logging in...")
    const res=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password:pwd})})
    const data=await res.json()
    if(!res.ok) return setMsg(data.error)
    localStorage.setItem("user", JSON.stringify(data.user))
    location.href="/dashboard"
  }
  return (
    <div style={{minHeight:"100vh", background:"#0a0a0f", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"sans-serif"}}>
      <div style={{background:"#15151f", border:"1px solid #222", borderRadius:12, padding:30, width:380}}>
        <div style={{color:"#ff7a00", fontWeight:900, fontSize:20, marginBottom:5}}>FORGING LINE ERP</div>
        <div style={{fontSize:12, color:"#888", marginBottom:20}}>Sign in with email + password set by Admin</div>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%", padding:12, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, marginBottom:12}}/>
        <input placeholder="Password" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} style={{width:"100%", padding:12, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, marginBottom:15}}/>
        <button onClick={login} style={{width:"100%", padding:12, background:"#ff7a00", color:"white", border:"none", borderRadius:6, fontWeight:700, cursor:"pointer"}}>Login</button>
        {msg && <div style={{marginTop:12, fontSize:12, color:msg.includes("Wrong")?"#ff5555":"#00ff88"}}>{msg}</div>}
        <div style={{marginTop:15, fontSize:11, color:"#666"}}>Demo: alecmshengu@outlook.com / Admin123!</div>
      </div>
    </div>
  )
}
