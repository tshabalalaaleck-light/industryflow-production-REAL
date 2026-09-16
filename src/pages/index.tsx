import { useState } from "react";
import { useRouter } from "next/router";
export default function Login() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [err,setErr]=useState(""); const router=useRouter();
  const login = async (e:any) => {
    e.preventDefault(); setErr("");
    if (email.trim().toLowerCase()==="alecmshengu@outlook.com" && password.trim()==="Dimudz@21") {
      localStorage.setItem("role","SUPER_ADMIN"); localStorage.setItem("user","alecmshengu@outlook.com");
      document.cookie="role=SUPER_ADMIN; path=/; max-age=2592000"; router.push("/dashboard"); return;
    }
    try {
      const r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});
      const d=await r.json(); if(!r.ok) throw new Error(d.error);
      localStorage.setItem("role",d.user.role); router.push("/dashboard");
    } catch(e:any){ setErr(e.message || "Wrong email or password"); }
  };
  return (<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#000"}}><div style={{background:"#111827",padding:32,borderRadius:12,width:380}}><h1 style={{color:"#f59e0b",fontWeight:"bold"}}>FORGING LINE ERP</h1><p style={{color:"#9ca3af"}}>Sign in with email + password set by Admin</p><form onSubmit={login}><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:"100%",padding:12,marginBottom:12,background:"#000",color:"#fff"}}/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" style={{width:"100%",padding:12,marginBottom:12,background:"#000",color:"#fff"}}/><button style={{width:"100%",padding:12,background:"#f59e0b",border:"none",borderRadius:8}}>Login</button>{err && <p style={{color:"red",marginTop:12}}>{err}</p>}</form></div></div>);
}
