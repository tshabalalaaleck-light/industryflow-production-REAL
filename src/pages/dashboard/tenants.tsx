import { useState, useEffect } from "react"
export default function TenantsPage(){
  const [tenants,setTenants]=useState<any[]>([]); const [name,setName]=useState(""); const [me,setMe]=useState<any>(null)
  const load=async()=>{
    const m = JSON.parse(localStorage.getItem("user")||"null"); setMe(m)
    const data = await fetch("/api/tenants").then(r=>r.json()); let list=data.tenants||[]
    if(m && m.role!=="SUPER_ADMIN"){ list = list.filter((t:any)=>t.id===m.companyId) }
    setTenants(list)
  }
  useEffect(()=>{load()},[])
  const addTenant=async()=>{ if(!name) return; await fetch("/api/tenants",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name})}); setName(""); load() }
  const isSuper = me?.role==="SUPER_ADMIN"
  return (
  <div style={{display:"flex", minHeight:"100vh", background:"#f8f9fb", color:"#1a1a1a", fontFamily:"Inter, sans-serif"}}>
    <div style={{width:260, background:"#0f1014", color:"white", padding:24}}>
      <div style={{fontWeight:900, fontSize:18}}><span style={{color:"#ff7a00"}}>FORGING</span><br/>LINE ERP</div>
      <a href="/dashboard" style={{color:"#888", fontSize:13, display:"block", marginTop:24, textDecoration:"none"}}>← Dashboard</a>
      <div style={{marginTop:20, fontSize:12, color:"#666"}}>{me?.email}<br/>{me?.role}</div>
    </div>
    <div style={{flex:1, padding:32}}>
      <h1 style={{margin:0, fontSize:22, fontWeight:700}}>{isSuper?"Companies":"My Company"}</h1>
      <p style={{color:"#666", fontSize:13, marginTop:6}}>{isSuper?"Manage all client companies":"Your company workspace"}</p>
      {isSuper && <div style={{marginTop:20, background:"white", border:"1px solid #e5e7eb", borderRadius:10, padding:16, display:"flex", gap:10}}><input placeholder="New company name" value={name} onChange={e=>setName(e.target.value)} style={{padding:"10px 14px", border:"1px solid #e5e7eb", borderRadius:8, width:300, fontSize:13}}/><button onClick={addTenant} style={{padding:"10px 18px", background:"#0f1014", color:"white", border:"none", borderRadius:8, fontWeight:600, fontSize:13}}>Add Company</button></div>}
      <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16, marginTop:24}}>
        {tenants.map((t:any)=><div key={t.id} style={{background:"white", border:"1px solid #e5e7eb", borderRadius:12, padding:20}}><div style={{fontWeight:700, fontSize:16}}>{t.name}</div><div style={{fontSize:11, color:"#888", marginTop:4}}>{t.id}</div><div style={{marginTop:16, display:"flex", gap:8}}><a href={`/dashboard/tenants/${t.id}`} style={{flex:1, background:"#0f1014", color:"white", textAlign:"center", padding:"10px", borderRadius:8, textDecoration:"none", fontSize:13, fontWeight:600}}>Open Workspace</a></div></div>)}
      </div>
    </div>
  </div>
  )
}
