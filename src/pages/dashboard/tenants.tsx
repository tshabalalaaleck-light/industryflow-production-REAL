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
  const addTenant=async()=>{
    if(me?.role!=="SUPER_ADMIN"){ alert("Only Main Admin can add companies!"); return }
    if(!name) return; await fetch("/api/tenants",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name})}); setName(""); load()
  }
  const delTenant=async(id:string)=>{
    if(me?.role!=="SUPER_ADMIN"){ alert("Only Main Admin can delete companies!"); return }
    if(id==="swasap-001"){ if(!confirm("⚠️ DELETE SWASAP COMPANY? This is critical! Are you sure Main Admin?")) return } else { if(!confirm("Delete "+id+"?")) return }
    await fetch(`/api/tenants?id=${id}`,{method:"DELETE"}); load()
  }
  const isSuper = me?.role==="SUPER_ADMIN"
  return (
  <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
    <div style={{width:260, background:"#111118", borderRight:"1px solid #222", padding:20}}>
      <div style={{color:"#ff7a00", fontWeight:900, fontSize:18, lineHeight:1}}>FORGING<br/>LINE ERP</div>
      <a href="/dashboard" style={{color:"#999", fontSize:13, display:"block", marginTop:20, textDecoration:"none"}}>← Dashboard</a>
      <div style={{marginTop:20, fontSize:11, color:"#666"}}>{me?.email}<br/><span style={{color:isSuper?"#ff7a00":"#888"}}>{me?.role} {isSuper?"(Main Admin)":""}</span></div>
    </div>
    <div style={{flex:1, padding:28}}>
      <h1 style={{margin:0, fontSize:22, fontWeight:800}}>{isSuper?"Companies":"My Company"}</h1>
      {!isSuper && <div style={{background:"#0f2e1f", border:"1px solid #00ff8844", color:"#00ff88", padding:"10px 14px", borderRadius:8, marginTop:12, fontSize:12}}>👁️ You are viewing as {me?.title||me?.role} - Only Main Admin can delete SWASAP company</div>}
      {isSuper && <div style={{marginTop:20, background:"#15151f", border:"1px solid #222", borderRadius:10, padding:14, display:"flex", gap:10}}><input placeholder="New company name" value={name} onChange={e=>setName(e.target.value)} style={{padding:"10px 14px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:8, width:280, fontSize:13}}/><button onClick={addTenant} style={{padding:"10px 18px", background:"#ff7a00", color:"white", border:"none", borderRadius:8, fontWeight:700, fontSize:13}}>Add Company</button></div>}
      <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14, marginTop:22}}>
        {tenants.map((t:any)=><div key={t.id} style={{background:"#15151f", border:"1px solid #222", borderRadius:12, padding:18}}><div style={{display:"flex", justifyContent:"space-between"}}><div><div style={{fontWeight:800, color:"#ff7a00"}}>{t.name}</div><div style={{fontSize:11, color:"#666", marginTop:4}}>{t.id}</div></div>{isSuper? <button onClick={()=>delTenant(t.id)} style={{background:"#ff333322", border:"1px solid #ff333344", color:"#ff5555", borderRadius:6, padding:"4px 10px", fontSize:11, height:28}}>Delete</button> : <span style={{color:"#444", fontSize:10, border:"1px solid #222", padding:"4px 8px", borderRadius:4, height:16}}>View Only</span>}</div><a href={`/dashboard/tenants/${t.id}`} style={{display:"block", marginTop:14, background:"#ff7a00", color:"white", textAlign:"center", padding:"10px", borderRadius:8, textDecoration:"none", fontSize:13, fontWeight:700}}>OPEN →</a></div>)}
      </div>
    </div>
  </div>
  )
}
