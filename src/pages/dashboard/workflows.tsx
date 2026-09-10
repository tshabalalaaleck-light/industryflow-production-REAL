import { useState, useEffect } from "react"
export default function WorkflowsPage(){
  const [workflows,setWorkflows]=useState<any[]>([]); const [tenants,setTenants]=useState<any[]>([]); const [name,setName]=useState(""); const [status,setStatus]=useState("In Progress"); const [companyId,setCompanyId]=useState(""); const [me,setMe]=useState<any>(null); const [noteText,setNoteText]=useState<{[key:string]:string}>({}); const [live,setLive]=useState(false)
  const load=async()=>{
    const m = JSON.parse(localStorage.getItem("user")||"null"); setMe(m)
    const t = await fetch("/api/tenants").then(r=>r.json()).then(d=>d.tenants||[]); setTenants(t)
    if(m?.role!=="SUPER_ADMIN") setCompanyId(m?.companyId)
    const url = m?.role==="SUPER_ADMIN"? "/api/workflows" : `/api/workflows?companyId=${m?.companyId}`
    const w = await fetch(url).then(r=>r.json()).then(d=>d.workflows||[]); setWorkflows(w); setLive(true); setTimeout(()=>setLive(false),800)
  }
  useEffect(()=>{ load(); const iv=setInterval(load,3000); return ()=>clearInterval(iv) },[])
  const addWf=async()=>{ if(me?.role!=="SUPER_ADMIN"){ alert("Only Main Admin can create!"); return } if(!name||!companyId) return alert("Required"); await fetch("/api/workflows",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,status,companyId})}); setName(""); load() }
  const delWf=async(id:string)=>{ if(me?.role!=="SUPER_ADMIN"){ alert("Only Main Admin!"); return } if(!confirm("Delete?")) return; await fetch(`/api/workflows?id=${id}`,{method:"DELETE"}); load() }
  const addNote=async(wfId:string)=>{ const text=noteText[wfId]; if(!text) return; await fetch(`/api/workflows?id=${wfId}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:wfId, note:text})}); setNoteText({...noteText,[wfId]:""}); load() }
  const isSuper = me?.role==="SUPER_ADMIN"
  return (
  <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
    <div style={{width:260, background:"#111118", borderRight:"1px solid #222", padding:20, display:"flex", flexDirection:"column"}}>
      <div style={{color:"#ff7a00", fontWeight:900, fontSize:18, lineHeight:1}}>FORGING<br/>LINE ERP</div>
      <div style={{marginTop:8, fontSize:10, color:live?"#00ff88":"#666"}}>{live?"● LIVE UPDATING 3s":"○ Live 3s"}</div>
      <a href="/dashboard" style={{color:"#666", fontSize:13, display:"block", marginTop:20, textDecoration:"none"}}>← Dashboard</a>
      <div style={{marginTop:20, background:"#ff7a001a", borderLeft:"3px solid #ff7a00", color:"#ff7a00", padding:"8px 12px", borderRadius:6, fontSize:13, fontWeight:700}}>Workflows {live?"●":""}</div>
      <div style={{marginTop:"auto", fontSize:11, color:"#666"}}>{me?.email}<br/>{me?.title||me?.role}<br/><span style={{color:"#00ff88", fontSize:10}}>🔄 Live 3s multi-user</span></div>
    </div>
    <div style={{flex:1, padding:24}}>
      <h1 style={{margin:0, fontSize:22, fontWeight:800}}>Workflows - {isSuper?"All":tenants.find((t:any)=>t.id===companyId)?.name||companyId} {live && <span style={{fontSize:11, color:"#00ff88"}}>● LIVE</span>}</h1>
      {isSuper? <div style={{background:"#15151f", border:"1px solid #222", borderRadius:10, padding:14, marginTop:16, display:"flex", gap:8}}><input placeholder="Workflow Name" value={name} onChange={e=>setName(e.target.value)} style={{padding:"10px 12px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:200}}/><select value={companyId} onChange={e=>setCompanyId(e.target.value)} style={{padding:"10px 12px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6}}>{tenants.map((t:any)=><option key={t.id} value={t.id}>{t.name}</option>)}</select><select value={status} onChange={e=>setStatus(e.target.value)} style={{padding:"10px 12px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6}}><option>In Progress</option><option>Completed</option></select><button onClick={addWf} style={{padding:"10px 18px", background:"#ff7a00", color:"white", border:"none", borderRadius:6, fontWeight:700}}>Add</button></div>
      : <div style={{background:"#0f2e1f", border:"1px solid #00ff8844", color:"#00ff88", padding:"10px 14px", borderRadius:8, marginTop:16, fontSize:12}}>👁️ View as {me?.title} - Live updates every 3s - Only Main Admin can add/delete</div>}
      <div style={{marginTop:20, background:"#15151f", border:"1px solid #222", borderRadius:12, overflow:"hidden"}}>
        {workflows.map((w:any)=><div key={w.id} style={{padding:"14px 16px", borderBottom:"1px solid #1a1a28", display:"flex", justifyContent:"space-between"}}>
          <div style={{flex:1}}><div style={{fontWeight:700, color:"#ff7a00"}}>{w.name} - {w.status}</div><div style={{fontSize:11, color:"#666"}}>{w.id} | {tenants.find((t:any)=>t.id===w.companyId)?.name||w.companyId}</div>{w.notes?.length>0 && <div style={{marginTop:8, background:"#0a0a0f", padding:"6px 10px", borderRadius:6, fontSize:11}}>{w.notes.map((n:any,i:number)=><div key={i}>📝 {n.text}</div>)}</div>}<div style={{marginTop:8, display:"flex", gap:6}}><input placeholder="Add note..." value={noteText[w.id]||""} onChange={e=>setNoteText({...noteText, [w.id]:e.target.value})} onKeyDown={e=>{if(e.key==="Enter") addNote(w.id)}} style={{padding:"6px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, fontSize:11, width:180}}/><button onClick={()=>addNote(w.id)} style={{padding:"6px 10px", background:"#222", color:"white", border:"none", borderRadius:6, fontSize:11}}>Add Note</button></div></div>
          <div>{isSuper? <button onClick={()=>delWf(w.id)} style={{background:"#ff333322", border:"1px solid #ff333344", color:"#ff5555", borderRadius:6, padding:"6px 12px", fontSize:11}}>Delete</button> : <span style={{color:"#444", fontSize:10}}>View Only</span>}</div>
        </div>)}
      </div>
    </div>
  </div>
  )
}
