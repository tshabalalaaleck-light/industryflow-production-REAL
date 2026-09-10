import { useState, useEffect } from "react"
export default function TenantsPage(){
  const [tenants,setTenants]=useState<any[]>([]); const [name,setName]=useState("")
  const load=()=>fetch("/api/tenants").then(r=>r.json()).then(d=>setTenants(d.tenants||[]))
  useEffect(()=>{load()},[])
  const addTenant=async()=>{ if(!name) return; await fetch("/api/tenants",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name})}); setName(""); load() }
  const delTenant=async(id:string)=>{ if(!confirm("Delete "+id+"?")) return; await fetch(`/api/tenants?id=${id}`,{method:"DELETE"}); load() }
  return (
  <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
    <div style={{width:240, background:"#111118", borderRight:"1px solid #222", padding:20}}>
      <div style={{color:"#ff7a00", fontWeight:900, fontSize:18}}>FORGING<br/>LINE ERP</div>
      <a href="/dashboard" style={{color:"#999", fontSize:13, padding:"10px 0", display:"block", textDecoration:"none", marginTop:20}}>◀ Back to Dashboard</a>
      <a href="/dashboard/users" style={{color:"#999", fontSize:13, display:"block", textDecoration:"none", padding:"5px 0"}}>Users</a>
      <div style={{background:"#ff7a0022", color:"#ff7a00", padding:"8px 12px", borderRadius:6, fontSize:13, margin:"10px 0"}}>● Tenants ({tenants.length})</div>
      <a href="/dashboard/workflows" style={{color:"#999", fontSize:13, display:"block", textDecoration:"none", padding:"5px 0"}}>Workflows</a>
    </div>
    <div style={{flex:1, padding:25}}>
      <h1 style={{fontSize:22, margin:0}}>Tenants / Companies - Super Admin</h1>
      <p style={{fontSize:12, color:"#888"}}>Manage companies and licensing</p>
      <div style={{background:"#15151f", borderRadius:10, padding:18, margin:"20px 0", border:"1px solid #222"}}>
        <h3 style={{margin:"0 0 10px", fontSize:14}}>Add New Company</h3>
        <input placeholder="Company Name" value={name} onChange={e=>setName(e.target.value)} style={{padding:10, marginRight:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:300}}/>
        <button onClick={addTenant} style={{padding:"10px 18px", background:"#ff7a00", color:"white", border:"none", borderRadius:6, cursor:"pointer", fontWeight:700}}>Add Company</button>
      </div>
      <div style={{background:"#15151f", borderRadius:10, padding:15}}>
        <div style={{display:"grid", gridTemplateColumns:"2fr 1fr 1fr", fontSize:10, color:"#666", paddingBottom:10, borderBottom:"1px solid #222"}}><span>COMPANY NAME</span><span>ID</span><span>ACTION</span></div>
        {tenants.map((t:any)=><div key={t.id} style={{display:"grid", gridTemplateColumns:"2fr 1fr 1fr", padding:"12px 0", borderBottom:"1px solid #1a1a28", fontSize:13}}><span>{t.name}</span><span style={{color:"#888", fontSize:11}}>{t.id}</span><button onClick={()=>delTenant(t.id)} style={{background:"#ff333322", color:"#ff5555", border:"1px solid #ff3333", borderRadius:4, padding:"4px 8px", cursor:"pointer", width:70}}>Delete</button></div>)}
      </div>
    </div>
  </div>
  )
}
