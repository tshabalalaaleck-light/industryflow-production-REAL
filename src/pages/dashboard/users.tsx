import { useState, useEffect } from "react"
export default function UsersPage(){
  const [users,setUsers]=useState<any[]>([]); const [email,setEmail]=useState(""); const [pwd,setPwd]=useState(""); const [role,setRole]=useState("USER")
  const load=()=>fetch("/api/users").then(r=>r.json()).then(d=>setUsers(d.users||[]))
  useEffect(()=>{load()},[])
  const addUser=async()=>{ if(!email||!pwd) return alert("Email & Password required"); const res=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password:pwd,role,companyId:"demo-company-123"})}); const data=await res.json(); if(!res.ok) return alert(data.error); setEmail(""); setPwd(""); load() }
  const delUser=async(id:string)=>{ if(!confirm("Delete user?")) return; await fetch(`/api/users?id=${id}`,{method:"DELETE"}); load() }
  return (
  <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
    <div style={{width:240, background:"#111118", borderRight:"1px solid #222", padding:20}}>
      <div style={{color:"#ff7a00", fontWeight:900, fontSize:18}}>FORGING<br/>LINE ERP</div>
      <a href="/dashboard" style={{color:"#999", fontSize:13, padding:"10px 0", display:"block", textDecoration:"none", marginTop:20}}>◀ Back to Dashboard</a>
      <div style={{background:"#ff7a0022", color:"#ff7a00", padding:"8px 12px", borderRadius:6, fontSize:13, margin:"10px 0"}}>● Users ({users.length})</div>
    </div>
    <div style={{flex:1, padding:25}}>
      <h1 style={{fontSize:22, margin:0}}>Users - Super Admin</h1>
      <p style={{fontSize:12, color:"#888"}}>Add email + password - user can login immediately</p>
      <div style={{background:"#15151f", borderRadius:10, padding:18, margin:"20px 0", border:"1px solid #222"}}>
        <h3 style={{margin:"0 0 10px", fontSize:14}}>Add New User with Password</h3>
        <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
          <input placeholder="Email e.g. nkosi@swasap.com" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:220}}/>
          <input placeholder="Password e.g. Nkosi123!" value={pwd} onChange={e=>setPwd(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:150}}/>
          <select value={role} onChange={e=>setRole(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6}}><option>USER</option><option>ADMIN</option><option>SUPER_ADMIN</option></select>
          <button onClick={addUser} style={{padding:"10px 18px", background:"#ff7a00", color:"white", border:"none", borderRadius:6, cursor:"pointer", fontWeight:700}}>Add User</button>
        </div>
        <div style={{fontSize:11, color:"#666", marginTop:8}}>User will login at main page with this email + password</div>
      </div>
      <div style={{background:"#15151f", borderRadius:10, padding:15}}>
        <div style={{display:"grid", gridTemplateColumns:"2fr 1fr 1fr", fontSize:10, color:"#666", paddingBottom:10, borderBottom:"1px solid #222"}}><span>EMAIL</span><span>ROLE</span><span>ACTION</span></div>
        {users.map((u:any)=><div key={u.id} style={{display:"grid", gridTemplateColumns:"2fr 1fr 1fr", padding:"12px 0", borderBottom:"1px solid #1a1a28", fontSize:13}}><span>{u.email}</span><span style={{color:u.role==="SUPER_ADMIN"?"#ff7a00":"#aaa"}}>{u.role}</span><button onClick={()=>delUser(u.id)} style={{background:"#ff333322", color:"#ff5555", border:"1px solid #ff3333", borderRadius:4, padding:"4px 8px", cursor:"pointer", width:70}}>Delete</button></div>)}
      </div>
    </div>
  </div>
  )
}
