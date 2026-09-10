import { useState, useEffect } from "react"
export default function WorkflowsPage(){
  const [wfs,setWfs]=useState<any[]>([]); const [tenants,setTenants]=useState<any[]>([]); const [name,setName]=useState(""); const [status,setStatus]=useState("In Progress"); const [companyId,setCompanyId]=useState(""); const [me,setMe]=useState<any>(null)
  const load=async()=>{
    const m = JSON.parse(localStorage.getItem("user")||"null"); setMe(m)
    const t = await fetch("/api/tenants").then(r=>r.json()); setTenants(t.tenants||[])
    const url = m?.role==="SUPER_ADMIN" ? "/api/workflows" : `/api/workflows?companyId=${m?.companyId}`
    const w = await fetch(url).then(r=>r.json()); setWfs(w.workflows||[])
    if(m && m.role!=="SUPER_ADMIN") setCompanyId(m.companyId)
  }
  useEffect(()=>{load()},[])
  const addWf=async()=>{ if(!name||!companyId) return alert("Name & Company required"); await fetch("/api/workflows",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,status,companyId})}); setName(""); load() }
  const delWf=async(id:string)=>{ if(!confirm("Delete?")) return; await fetch(`/api/workflows?id=${id}`,{method:"DELETE"}); load() }
  return (
  <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white"}}>
    <div style={{width:240, background:"#111118", borderRight:"1px solid #222", padding:20}}>
      <div style={{color:"#ff7a00", fontWeight:900}}>FORGING<br/>LINE ERP</div>
      <a href="/dashboard" style={{color:"#999", fontSize:13, display:"block", marginTop:20, textDecoration:"none"}}>◀ Dashboard</a>
      <div style={{background:"#ff7a0022", color:"#ff7a00", padding:8, borderRadius:6, margin:"10px 0", fontSize:13}}>Workflows ({wfs.length})</div>
    </div>
    <div style={{flex:1, padding:25}}>
      <h1>Workflows - {me?.role==="SUPER_ADMIN"?"All Companies":`Company: ${tenants.find(t=>t.id===me?.companyId)?.name}`}</h1>
      <div style={{background:"#15151f", padding:18, borderRadius:10, border:"1px solid #222", margin:"15px 0"}}>
        <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
          <input placeholder="Workflow Name" value={name} onChange={e=>setName(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:220}}/>
          <select value={companyId} onChange={e=>setCompanyId(e.target.value)} disabled={me?.role!=="SUPER_ADMIN"} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6}}>
            <option value="">Select Company</option>
            {tenants.map((t:any)=><option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <select value={status} onChange={e=>setStatus(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6}}><option>In Progress</option><option>Completed</option><option>Pending</option></select>
          <button onClick={addWf} style={{padding:"10px 18px", background:"#ff7a00", color:"white", border:"none", borderRadius:6, fontWeight:700}}>Add Workflow</button>
        </div>
        <div style={{fontSize:11, color:"#666", marginTop:8}}>{me?.role==="SUPER_ADMIN"?"SUPER_ADMIN sees ALL companies workflows":"You only see workflows for YOUR company - other companies hidden"}</div>
      </div>
      <div style={{display:"grid", gap:10}}>
        {wfs.map((w:any)=><div key={w.id} style={{background:"#15151f", border:"1px solid #222", borderRadius:10, padding:15, display:"flex", justifyContent:"space-between"}}><div><b style={{color:"#ff7a00"}}>{w.name}</b> - {w.status}<br/><small style={{color:"#888"}}>{w.id} | Company: {tenants.find(t=>t.id===w.companyId)?.name||w.companyId}</small></div><button onClick={()=>delWf(w.id)} style={{background:"#ff333322", color:"#ff5555", border:"1px solid #ff3333", borderRadius:4, padding:"6px 12px"}}>Delete</button></div>)}
      </div>
    </div>
  </div>
  )
}
