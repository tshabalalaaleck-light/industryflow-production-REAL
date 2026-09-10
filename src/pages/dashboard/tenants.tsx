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
  <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
    <div style={{width:260, background:"#111118", borderRight:"1px solid #222", padding:20}}>
      <div style={{color:"#ff7a00", fontWeight:900, fontSize:18, lineHeight:1}}>FORGING<br/>LINE ERP</div>
      <a href="/dashboard" style={{color:"#999", fontSize:13, display:"block", marginTop:20, textDecoration:"none"}}>← Dashboard</a>
      <div style={{marginTop:20, fontSize:11, color:"#666"}}>{me?.email}<br/><span style={{color:"#ff7a00"}}>{me?.role}</span></div>
    </div>
    <div style={{flex:1, padding:28}}>
      <h1 style={{margin:0, fontSize:22, fontWeight:800}}>{isSuper?"Companies":"My Company"}</h1>
      <p style={{color:"#888", fontSize:12, marginTop:6}}>{isSuper?"Manage client companies":"Your company workspace"}</p>
      {isSuper && <div style={{marginTop:20, background:"#15151f", border:"1px solid #222", borderRadius:10, padding:14, display:"flex", gap:10}}><input placeholder="New company name" value={name} onChange={e=>setName(e.target.value)} style={{padding:"10px 14px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:8, width:280, fontSize:13}}/><button onClick={addTenant} style={{padding:"10px 18px", background:"#ff7a00", color:"white", border:"none", borderRadius:8, fontWeight:700, fontSize:13}}>Add Company</button></div>}
      <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14, marginTop:22}}>
        {tenants.map((t:any)=><div key={t.id} style={{background:"#15151f", border:"1px solid #222", borderRadius:12, padding:18}}><div style={{fontWeight:800, color:"#ff7a00"}}>{t.name}</div><div style={{fontSize:11, color:"#666", marginTop:4}}>{t.id}</div><a href={`/dashboard/tenants/${t.id}`} style={{display:"block", marginTop:14, background:"#ff7a00", color:"white", textAlign:"center", padding:"10px", borderRadius:8, textDecoration:"none", fontSize:13, fontWeight:700}}>OPEN COMPANY →</a></div>)}
      </div>
    </div>
  </div>
  )
}
