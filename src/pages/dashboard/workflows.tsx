import { useState, useEffect } from "react"
export default function WorkflowsPage(){
  const [wfs,setWfs]=useState<any[]>([]); const [name,setName]=useState(""); const [status,setStatus]=useState("In Progress")
  const load=()=>fetch("/api/workflows").then(r=>r.json()).then(d=>setWfs(d.workflows||[]))
  useEffect(()=>{load()},[])
  const addWf=async()=>{ if(!name) return; await fetch("/api/workflows",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,status})}); setName(""); load() }
  const delWf=async(id:string)=>{ if(!confirm("Delete workflow "+id+"?")) return; await fetch(`/api/workflows?id=${id}`,{method:"DELETE"}); load() }
  return <div style={{padding:20,fontFamily:"sans-serif"}}><h1>Workflows - Super Admin</h1><div style={{background:"#eee",padding:15,margin:"15px 0"}}><h3>Add Workflow Manually</h3><input placeholder="Workflow Name e.g. FORGE-002" value={name} onChange={e=>setName(e.target.value)} style={{padding:8,marginRight:10,width:250}}/><select value={status} onChange={e=>setStatus(e.target.value)} style={{padding:8,marginRight:10}}><option>In Progress</option><option>Completed</option><option>Pending</option><option>Cancelled</option></select><button onClick={addWf} style={{padding:"8px 15px",background:"black",color:"white",cursor:"pointer"}}>Add Workflow</button></div><p>Total: {wfs.length}</p><div style={{display:"grid",gap:10}}>{wfs.map((w:any)=><div key={w.id} style={{border:"1px solid #ccc",padding:15,display:"flex",justifyContent:"space-between"}}><div><b>{w.name}</b> - {w.status} <br/><small>{w.id} | {w.companyId}</small></div><button onClick={()=>delWf(w.id)} style={{color:"red",cursor:"pointer"}}>Delete</button></div>)}</div></div>
}
