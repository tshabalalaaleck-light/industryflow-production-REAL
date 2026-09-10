import { useState, useEffect } from "react"
export default function TenantsPage(){
  const [tenants,setTenants]=useState<any[]>([]); const [name,setName]=useState(""); const [me,setMe]=useState<any>(null)
  const load=async()=>{
    const m = JSON.parse(localStorage.getItem("user")||"null"); setMe(m)
    const data = await fetch("/api/tenants").then(r=>r.json())
    let list = data.tenants||[]
    // IF NOT SUPER_ADMIN -> ONLY SHOW OWN COMPANY
    if(m && m.role!=="SUPER_ADMIN"){
      list = list.filter((t:any)=>t.id===m.companyId)
    }
    setTenants(list)
  }
  useEffect(()=>{load()},[])
  const addTenant=async()=>{ if(!name) return; await fetch("/api/tenants",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name})}); setName(""); load() }
  const delTenant=async(id:string)=>{ if(!confirm("Delete "+id+"?")) return; await fetch(`/api/tenants?id=${id}`,{method:"DELETE"}); load() }
  const isSuper = me?.role==="SUPER_ADMIN"
  return (
  <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
    <div style={{width:240, background:"#111118", borderRight:"1px solid #222", padding:20}}>
      <div style={{color:"#ff7a00", fontWeight:900, fontSize:18}}>FORGING<br/>LINE ERP</div>
      <a href="/dashboard" style={{color:"#999", fontSize:13, display:"block", marginTop:20, textDecoration:"none"}}>◀ Dashboard</a>
      <div style={{background:isSuper?"#ff7a0022":"#0f2e1f", color:isSuper?"#ff7a00":"#00ff88", padding:"8px 12px", borderRadius:6, fontSize:11, margin:"10px 0"}}>{isSuper?`● All Companies (${tenants.length})`:`● My Company: ${me?.companyId}`}</div>
      <div style={{fontSize:10, color:"#666", marginTop:10}}>Logged: {me?.email}<br/>Role: {me?.role}<br/>Company: {me?.companyId}</div>
    </div>
    <div style={{flex:1, padding:25}}>
      <h1 style={{margin:0}}>{isSuper?"Companies - Click to Manage":"My Company"}</h1>
      <p style={{fontSize:12, color:"#888"}}>{isSuper?"SUPER ADMIN - You see ALL companies":"You only see YOUR company - other companies hidden"}</p>
      {isSuper && <div style={{background:"#15151f", borderRadius:10, padding:18, margin:"20px 0", border:"1px solid #222", display:"flex", gap:10}}>
        <input placeholder="New Company Name e.g. ArcelorMittal" value={name} onChange={e=>setName(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:300}}/>
        <button onClick={addTenant} style={{padding:"10px 18px", background:"#ff7a00", color:"white", border:"none", borderRadius:6, fontWeight:700}}>Add Company</button>
      </div>}
      {!isSuper && <div style={{background:"#0f2e1f", border:"1px solid #00ff88", color:"#00ff88", padding:"10px 14px", borderRadius:8, fontSize:12, margin:"15px 0"}}>🔒 You are locked to your company: {tenants[0]?.name} ({me?.companyId}) - You cannot see or delete other companies</div>}
      <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:15}}>
        {tenants.map((t:any)=><div key={t.id} style={{background:"#15151f", border:"1px solid #222", borderRadius:12, padding:18}}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <div><div style={{fontWeight:800, fontSize:16, color:"#ff7a00"}}>{t.name}</div><div style={{fontSize:11, color:"#666"}}>{t.id}</div><div style={{fontSize:11, color:"#00ff88", marginTop:4}}>● ACTIVE - Your Workspace</div></div>
            {isSuper && <button onClick={()=>delTenant(t.id)} style={{background:"none", border:"1px solid #333", color:"#666", borderRadius:4, padding:"4px 8px", fontSize:11, height:30}}>Delete</button>}
          </div>
          <a href={`/dashboard/tenants/${t.id}`} style={{display:"block", marginTop:15, background:"#ff7a00", color:"white", textAlign:"center", padding:"10px", borderRadius:6, textDecoration:"none", fontWeight:700, fontSize:13}}>OPEN COMPANY → Manage, Print, Email</a>
        </div>)}
      </div>
      {tenants.length===0 && <div style={{color:"#666", marginTop:20}}>No company found for your account - Contact Super Admin</div>}
    </div>
  </div>
  )
}
