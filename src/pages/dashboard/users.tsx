import { useState, useEffect } from "react"
export default function UsersPage(){
  const [users,setUsers]=useState<any[]>([]); const [tenants,setTenants]=useState<any[]>([]); const [email,setEmail]=useState(""); const [pwd,setPwd]=useState(""); const [role,setRole]=useState("USER"); const [companyId,setCompanyId]=useState(""); const [me,setMe]=useState<any>(null)
  const load=async()=>{
    const m = JSON.parse(localStorage.getItem("user")||"null"); setMe(m)
    const t = await fetch("/api/tenants").then(r=>r.json()); setTenants(t.tenants||[])
    // if not SUPER_ADMIN, only load own company users
    const url = m?.role==="SUPER_ADMIN" ? "/api/users" : `/api/users?companyId=${m?.companyId}`
    const u = await fetch(url).then(r=>r.json()); setUsers(u.users||[])
    if(m && m.role!=="SUPER_ADMIN") setCompanyId(m.companyId)
  }
  useEffect(()=>{load()},[])
  const addUser=async()=>{
    if(!email||!pwd||!companyId) return alert("Email, Password & Company required")
    const res=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password:pwd,role,companyId})})
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
      <div style={{background:"#ff7a0022", color:"#ff7a00", padding:8, borderRadius:6, margin:"10px 0", fontSize:13}}>Users ({users.length}) {me?.role!=="SUPER_ADMIN" ? ` - ${me?.companyId}`:""}</div>
    </div>
    <div style={{flex:1, padding:25}}>
      <h1>Users - {me?.role==="SUPER_ADMIN"?"Super Admin (All Companies)":`Company: ${tenants.find(t=>t.id===me?.companyId)?.name}`}</h1>
      <div style={{background:"#15151f", padding:18, borderRadius:10, border:"1px solid #222", margin:"15px 0"}}>
        <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:200}}/>
          <input placeholder="Password" value={pwd} onChange={e=>setPwd(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:130}}/>
          <select value={companyId} onChange={e=>setCompanyId(e.target.value)} disabled={me?.role!=="SUPER_ADMIN"} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6}}>
            <option value="">Select Company</option>
            {tenants.map((t:any)=><option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <select value={role} onChange={e=>setRole(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6}}><option>USER</option><option>ADMIN</option><option>SUPER_ADMIN</option></select>
          <button onClick={addUser} style={{padding:"10px 18px", background:"#ff7a00", color:"white", border:"none", borderRadius:6, fontWeight:700}}>Add User</button>
        </div>
      </div>
      <div style={{background:"#15151f", borderRadius:10, padding:15}}>
        {users.map((u:any)=><div key={u.id} style={{display:"flex", justifyContent:"space-between", padding:"12px 0", borderBottom:"1px solid #222", fontSize:13}}><span>{u.email} | {tenants.find(t=>t.id===u.companyId)?.name||u.companyId} | <b style={{color:u.role==="SUPER_ADMIN"?"#ff7a00":"#aaa"}}>{u.role}</b></span><button onClick={()=>delUser(u.id)} style={{background:"#ff333322", color:"#ff5555", border:"1px solid #ff3333", borderRadius:4, padding:"4px 8px"}}>Delete</button></div>)}
      </div>
    </div>
  </div>
  )
}
