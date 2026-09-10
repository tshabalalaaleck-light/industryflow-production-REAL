import { useState, useEffect } from "react"
export default function WorkflowsPage(){
  const [wfs,setWfs]=useState<any[]>([]); const [name,setName]=useState(""); const [status,setStatus]=useState("In Progress")
  const load=()=>fetch("/api/workflows").then(r=>r.json()).then(d=>setWfs(d.workflows||[]))
  useEffect(()=>{load()},[])
  const addWf=async()=>{ if(!name) return; await fetch("/api/workflows",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,status})}); setName(""); load() }
  const delWf=async(id:string)=>{ if(!confirm("Delete workflow "+id+"?")) return; await fetch(`/api/workflows?id=${id}`,{method:"DELETE"}); load() }
  return (
  <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
    <div style={{width:240, background:"#111118", borderRight:"1px solid #222", padding:20}}>
      <div style={{color:"#ff7a00", fontWeight:900, fontSize:18}}>FORGING<br/>LINE ERP</div>
      <a href="/dashboard" style={{color:"#999", fontSize:13, padding:"10px 0", display:"block", textDecoration:"none", marginTop:20}}>◀ Back to Dashboard</a>
      <a href="/dashboard/users" style={{color:"#999", fontSize:13, display:"block", textDecoration:"none", padding:"5px 0"}}>Users</a>
      <a href="/dashboard/tenants" style={{color:"#999", fontSize:13, display:"block", textDecoration:"none", padding:"5px 0"}}>Tenants</a>
      <div style={{background:"#ff7a0022", color:"#ff7a00", padding:"8px 12px", borderRadius:6, fontSize:13, margin:"10px 0"}}>● Workflows ({wfs.length})</div>
    </div>
    <div style={{flex:1, padding:25}}>
      <h1 style={{fontSize:22, margin:0}}>Workflows - Super Admin</h1>
      <p style={{fontSize:12, color:"#888"}}>Add and manage production workflows manually</p>
      <div style={{background:"#15151f", borderRadius:10, padding:18, margin:"20px 0", border:"1px solid #222"}}>
        <h3 style={{margin:"0 0 10px", fontSize:14}}>Add Workflow Manually</h3>
        <input placeholder="Workflow Name e.g. FORGE-101" value={name} onChange={e=>setName(e.target.value)} style={{padding:10, marginRight:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:250}}/>
        <select value={status} onChange={e=>setStatus(e.target.value)} style={{padding:10, marginRight:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6}}><option>In Progress</option><option>Completed</option><option>Pending</option><option>Cancelled</option></select>
        <button onClick={addWf} style={{padding:"10px 18px", background:"#ff7a00", color:"white", border:"none", borderRadius:6, cursor:"pointer", fontWeight:700}}>Add Workflow</button>
      </div>
      <div style={{display:"grid", gap:10}}>
        {wfs.map((w:any)=><div key={w.id} style={{background:"#15151f", border:"1px solid #222", borderRadius:10, padding:15, display:"flex", justifyContent:"space-between", alignItems:"center"}}><div><b style={{color:"#ff7a00"}}>{w.name}</b> - <span style={{color:"#aaa", fontSize:13}}>{w.status}</span><br/><small style={{color:"#666"}}>{w.id} | {w.companyId}</small></div><button onClick={()=>delWf(w.id)} style={{background:"#ff333322", color:"#ff5555", border:"1px solid #ff3333", borderRadius:4, padding:"6px 12px", cursor:"pointer"}}>Delete</button></div>)}
      </div>
    </div>
  </div>
  )
}
