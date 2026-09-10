import { useState, useEffect } from "react"
export default function TenantsPage(){
  const [tenants,setTenants]=useState<any[]>([]); const [name,setName]=useState("")
  const load=()=>fetch("/api/tenants").then(r=>r.json()).then(d=>setTenants(d.tenants||[]))
  useEffect(()=>{load()},[])
  const addTenant=async()=>{ if(!name) return; await fetch("/api/tenants",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name})}); setName(""); load() }
  const delTenant=async(id:string)=>{ if(!confirm("Delete "+id+"? All users & workflows for this company will be orphaned!")) return; await fetch(`/api/tenants?id=${id}`,{method:"DELETE"}); load() }
  return (
  <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
    <div style={{width:240, background:"#111118", borderRight:"1px solid #222", padding:20}}>
      <div style={{color:"#ff7a00", fontWeight:900, fontSize:18}}>FORGING<br/>LINE ERP</div>
      <a href="/dashboard" style={{color:"#999", fontSize:13, padding:"10px 0", display:"block", textDecoration:"none", marginTop:20}}>◀ Back to Dashboard</a>
      <div style={{background:"#ff7a0022", color:"#ff7a00", padding:"8px 12px", borderRadius:6, fontSize:13, margin:"10px 0"}}>● Companies ({tenants.length})</div>
    </div>
    <div style={{flex:1, padding:25}}>
      <h1 style={{margin:0}}>Companies - Click to Manage</h1>
      <p style={{fontSize:12, color:"#888"}}>Add company, then click OPEN to control users, workflows, printing, emailing</p>
      <div style={{background:"#15151f", borderRadius:10, padding:18, margin:"20px 0", border:"1px solid #222", display:"flex", gap:10}}>
        <input placeholder="New Company Name e.g. ArcelorMittal" value={name} onChange={e=>setName(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:300}}/>
        <button onClick={addTenant} style={{padding:"10px 18px", background:"#ff7a00", color:"white", border:"none", borderRadius:6, fontWeight:700}}>Add Company</button>
      </div>
      <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:15}}>
        {tenants.map((t:any)=><div key={t.id} style={{background:"#15151f", border:"1px solid #222", borderRadius:12, padding:18}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"start"}}>
            <div><div style={{fontWeight:800, fontSize:16, color:"#ff7a00"}}>{t.name}</div><div style={{fontSize:11, color:"#666"}}>{t.id}</div><div style={{fontSize:11, color:"#00ff88", marginTop:4}}>● ACTIVE</div></div>
            <button onClick={()=>delTenant(t.id)} style={{background:"none", border:"1px solid #333", color:"#666", borderRadius:4, padding:"4px 8px", fontSize:11}}>Delete</button>
          </div>
          <a href={`/dashboard/tenants/${t.id}`} style={{display:"block", marginTop:15, background:"#ff7a00", color:"white", textAlign:"center", padding:"10px", borderRadius:6, textDecoration:"none", fontWeight:700, fontSize:13}}>OPEN COMPANY → Manage Users, Workflows, Print</a>
        </div>)}
      </div>
    </div>
  </div>
  )
}
