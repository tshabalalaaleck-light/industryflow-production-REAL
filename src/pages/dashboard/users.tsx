import { useState, useEffect } from "react"
const TITLES = ["Data Capturer","Manager","Quality Manager","Foreman","Auditor","Auditor Manager","Super Admin","Operator","Supervisor"]
export default function UsersPage(){
  const [users,setUsers]=useState<any[]>([]); const [tenants,setTenants]=useState<any[]>([]); const [email,setEmail]=useState(""); const [pwd,setPwd]=useState(""); const [role,setRole]=useState("USER"); const [title,setTitle]=useState("Data Capturer"); const [companyId,setCompanyId]=useState(""); const [me,setMe]=useState<any>(null)
  const load=async()=>{
    const m = JSON.parse(localStorage.getItem("user")||"null"); setMe(m)
    const t = await fetch("/api/tenants").then(r=>r.json()); setTenants(t.tenants||[])
    const url = m?.role==="SUPER_ADMIN"? "/api/users" : `/api/users?companyId=${m?.companyId}`
    const u = await fetch(url).then(r=>r.json()); setUsers(u.users||[])
    if(m && m.role!=="SUPER_ADMIN") setCompanyId(m.companyId)
  }
  useEffect(()=>{load()},[])
  const addUser=async()=>{
    if(!email||!pwd||!companyId) return alert("Email, Password & Company required")
    const res=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password:pwd,role,companyId,title})})
    const data=await res.json(); if(!res.ok) return alert(data.error)
    setEmail(""); setPwd(""); load()
  }
  const delUser=async(id:string)=>{ if(!confirm("Delete user?")) return; await fetch(`/api/users?id=${id}`,{method:"DELETE"}); load() }
  if(me && me.role!=="SUPER_ADMIN" && me.role!=="ADMIN") return <div style={{padding:20, background:"#0a0a0f", minHeight:"100vh", color:"white"}}>Access Denied - Only ADMIN can manage users</div>
  return (
  <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
    <div style={{width:240, background:"#111118", borderRight:"1px solid #222", padding:20}}>
      <div style={{color:"#ff7a00", fontWeight:900}}>FORGING<br/>LINE ERP</div>
      <a href="/dashboard" style={{color:"#999", fontSize:13, display:"block", marginTop:20, textDecoration:"none"}}>◀ Dashboard</a>
      <div style={{background:"#ff7a0022", color:"#ff7a00", padding:8, borderRadius:6, margin:"10px 0", fontSize:13}}>Users ({users.length})</div>
    </div>
    <div style={{flex:1, padding:25}}>
      <h1 style={{margin:0}}>Users Management</h1>
      <p style={{color:"#888", fontSize:12}}>Add users with job title</p>
      <div style={{background:"#15151f", padding:18, borderRadius:10, border:"1px solid #222", margin:"15px 0"}}>
        <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:180}}/>
          <input placeholder="Password" value={pwd} onChange={e=>setPwd(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:110}}/>
          <select value={title} onChange={e=>setTitle(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:150}}>
            {TITLES.map(t=><option key={t} value={t}>{t}</option>)}
          </select>
          <select value={companyId} onChange={e=>setCompanyId(e.target.value)} disabled={me?.role!=="SUPER_ADMIN"} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6}}>
            <option value="">Company</option>
            {tenants.map((t:any)=><option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <select value={role} onChange={e=>setRole(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6}}><option>USER</option><option>ADMIN</option><option>SUPER_ADMIN</option></select>
          <button onClick={addUser} style={{padding:"10px 18px", background:"#ff7a00", color:"white", border:"none", borderRadius:6, fontWeight:700}}>Add User</button>
        </div>
      </div>
      <div style={{background:"#15151f", borderRadius:10, padding:15}}>
        <div style={{display:"flex", gap:10, fontSize:10, color:"#888", padding:"0 0 8px", borderBottom:"1px solid #222"}}><span style={{flex:2}}>EMAIL</span><span style={{flex:1}}>TITLE</span><span style={{flex:1}}>COMPANY</span><span style={{width:80}}>ACTION</span></div>
        {users.map((u:any)=><div key={u.id} style={{display:"flex", gap:10, padding:"12px 0", borderBottom:"1px solid #222", fontSize:13, alignItems:"center"}}><span style={{flex:2}}>{u.email}</span><span style={{flex:1}}><span style={{background:"#ff7a0022", color:"#ff7a00", padding:"3px 8px", borderRadius:4, fontSize:11}}>{u.title||"Data Capturer"}</span></span><span style={{flex:1, color:"#888", fontSize:11}}>{tenants.find((t:any)=>t.id===u.companyId)?.name||u.companyId}</span><button onClick={()=>delUser(u.id)} style={{width:80, background:"#ff333322", color:"#ff5555", border:"1px solid #ff3333", borderRadius:4, padding:"4px 8px", fontSize:11}}>Delete</button></div>)}
      </div>
    </div>
  </div>
  )
}
