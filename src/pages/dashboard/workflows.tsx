import { useState, useEffect } from "react"
export default function WorkflowsPage(){
  const [wfs,setWfs]=useState<any[]>([])
  useEffect(()=>{fetch("/api/workflows").then(r=>r.json()).then(d=>setWfs(d.workflows||d||[]))},[])
  return <div style={{padding:20}}><h1>Workflows - Super Admin</h1><p>Total: {wfs.length}</p>{wfs.map((w:any)=><div key={w.id} style={{border:"1px solid #ccc",padding:10,margin:10}}><b>{w.name}</b> - {w.status}</div>)}</div>
}
