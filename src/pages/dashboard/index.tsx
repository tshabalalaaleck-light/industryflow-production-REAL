import { useEffect, useState } from "react"
export default function Dashboard(){
  const [me,setMe]=useState<any>(null); const [wfs,setWfs]=useState<any[]>([]); const [tenants,setTenants]=useState<any[]>([]); const [noteText,setNoteText]=useState<{[key:string]:string}>({}); const [live,setLive]=useState(false)
  const loadData = async()=>{
    const m = JSON.parse(localStorage.getItem("user")||"null"); if(!m){ location.href="/"; return }; setMe(m)
    const t = await fetch("/api/tenants").then(r=>r.json()).then(d=>d.tenants||[]); setTenants(t)
    const url = m.role==="SUPER_ADMIN"? "/api/workflows" : `/api/workflows?companyId=${m.companyId}`
    const w = await fetch(url).then(r=>r.json()).then(d=>d.workflows||[]); setWfs(w); setLive(true); setTimeout(()=>setLive(false),800)
  }
  useEffect(()=>{
    loadData()
    const iv = setInterval(loadData, 3000)
    return ()=>clearInterval(iv)
  },[])
  const companyName = tenants.find((t:any)=>t.id===me?.companyId)?.name || me?.companyId
  const isSuper = me?.role==="SUPER_ADMIN"
  const addNote=async(wfId:string)=>{ const text = noteText[wfId]; if(!text) return; await fetch(`/api/workflows?id=${wfId}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:wfId, note:text})}); setNoteText({...noteText, [wfId]:""}); loadData() }
  const printWorkflow=(w:any)=>{
    const html = `<html><body><h1>${w.name}</h1><p>Company: ${companyName} | Status: ${w.status}</p><p>Notes: ${w.notes?.map((n:any)=>n.text).join(", ")}</p></body></html>`; const win=window.open("","_blank"); win?.document.write(html); win?.document.close(); win?.print()
  }
  const emailWorkflow=(w:any)=>{ const subject=`Production Sheet - ${w.name}`; const body=`Workflow: ${w.name}\nCompany: ${companyName}\nStatus: ${w.status}\nNotes: ${w.notes?.map((n:any)=>n.text).join(", ")}`; window.location.href=`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` }
  return (
    <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
      <div style={{width:260, background:"#111118", borderRight:"1px solid #222", padding:20, display:"flex", flexDirection:"column"}}>
        <div style={{color:"#ff7a00", fontWeight:900, fontSize:20, lineHeight:1}}>FORGING<br/>LINE ERP</div>
        <div style={{marginTop:10, fontSize:10, color:live?"#00ff88":"#666"}}>{live?"● LIVE UPDATING":"○ Live every 3s"}</div>
        <div style={{marginTop:30, fontSize:10, color:"#666"}}>NAVIGATION</div>
        <div style={{marginTop:12, display:"grid", gap:4}}>
          <div style={{background:"#ff7a001a", color:"#ff7a00", borderLeft:"3px solid #ff7a00", padding:"10px 14px", borderRadius:6, fontSize:13, fontWeight:700}}>Dashboard {live?"●":""}</div>
          <a href="/dashboard/tenants" style={{color:"#999", padding:"10px 14px", fontSize:13, textDecoration:"none"}}>{isSuper?"Companies":"My Company"}</a>
          <a href="/dashboard/workflows" style={{color:"#999", padding:"10px 14px", fontSize:13, textDecoration:"none"}}>Workflows</a>
          <a href="/dashboard/machines" style={{color:"#999", padding:"10px 14px", fontSize:13, textDecoration:"none"}}>Machines</a>
          {isSuper && <a href="/dashboard/users" style={{color:"#999", padding:"10px 14px", fontSize:13, textDecoration:"none"}}>Users</a>}
        </div>
        <div style={{marginTop:"auto", borderTop:"1px solid #222", paddingTop:16}}>
          <div style={{fontSize:12, color:"#ccc"}}>{me?.email}</div>
          <div style={{fontSize:11, color:"#ff7a00"}}>{isSuper?"Super Admin":`${companyName} • ${me?.role}`}</div>
          <div style={{fontSize:10, color:"#666", marginTop:6}}>🔄 Auto-refresh 3s - Multi-user live</div>
          <div onClick={()=>{localStorage.clear(); location.href="/"}} style={{marginTop:12, fontSize:11, color:"#666", cursor:"pointer", background:"#1a1a24", padding:"8px 12px", borderRadius:6, textAlign:"center"}}>Sign out</div>
        </div>
      </div>
      <div style={{flex:1, padding:28}}>
        <div style={{display:"flex", justifyContent:"space-between"}}><div><h1 style={{margin:0, fontSize:24, fontWeight:800}}>{isSuper?"Dashboard":`${companyName}`} {live && <span style={{fontSize:12, color:"#00ff88"}}>● LIVE</span>}</h1><p style={{margin:"6px 0 0", color:"#888", fontSize:12}}>{isSuper?`${tenants.length} companies • ${wfs.length} workflows`:`Production overview • ${wfs.length} workflows`} • Auto-refresh 3s</p></div>
          <div style={{display:"flex", gap:8}}><button onClick={()=>{ const html=`<html><body><h1>${companyName} Report</h1>${wfs.map((w:any)=>`<p>${w.name} - ${w.status}</p>`).join("")}</body></html>`; const win=window.open("","_blank"); win?.document.write(html); win?.document.close(); win?.print() }} style={{padding:"10px 16px", background:"#ff7a00", color:"white", border:"none", borderRadius:8, fontSize:12, fontWeight:700}}>🖨️ Print</button><button onClick={()=>{ const s=`Report - ${companyName}`; const b=wfs.map((w:any)=>`${w.name} (${w.status})`).join("\n"); window.location.href=`mailto:?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(b)}` }} style={{padding:"10px 16px", background:"#15151f", border:"1px solid #333", color:"#ccc", borderRadius:8, fontSize:12}}>📧 Email</button></div>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginTop:24}}>
          <div style={{background:"#15151f", border:"1px solid #222", borderRadius:12, padding:18, borderBottom:"3px solid #ff7a00"}}><div style={{fontSize:10, color:"#888"}}>TOTAL WORKFLOWS</div><div style={{fontSize:28, fontWeight:800, marginTop:6}}>{wfs.length}</div><div style={{fontSize:11, color:live?"#00ff88":"#666"}}>{live?"Updating...":"Live"}</div></div>
          <div style={{background:"#15151f", border:"1px solid #222", borderRadius:12, padding:18, borderBottom:"3px solid #ff7a00"}}><div style={{fontSize:10, color:"#888"}}>IN PROGRESS</div><div style={{fontSize:28, fontWeight:800, marginTop:6, color:"#ff7a00"}}>{wfs.filter((w:any)=>w.status==="In Progress").length}</div></div>
          <div style={{background:"#15151f", border:"1px solid #222", borderRadius:12, padding:18, borderBottom:"3px solid #00ff88"}}><div style={{fontSize:10, color:"#888"}}>COMPLETED</div><div style={{fontSize:28, fontWeight:800, marginTop:6, color:"#00ff88"}}>{wfs.filter((w:any)=>w.status==="Completed").length}</div></div>
        </div>
        <div style={{marginTop:24, background:"#15151f", border:"1px solid #222", borderRadius:12, overflow:"hidden"}}>
          <div style={{padding:"14px 18px", borderBottom:"1px solid #222", display:"flex", justifyContent:"space-between"}}><div style={{fontWeight:700, fontSize:14}}>Production Workflows {live && <span style={{color:"#00ff88", fontSize:10}}>● LIVE 3s</span>}</div><a href="/dashboard/workflows" style={{fontSize:12, color:"#ff7a00", textDecoration:"none"}}>Manage all →</a></div>
          {wfs.map((w:any)=><div key={w.id} style={{padding:"14px 18px", borderBottom:"1px solid #1a1a28", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div style={{flex:1}}><div style={{fontWeight:600, color:"#ff7a00"}}>{w.name}</div><div style={{fontSize:11, color:"#666"}}>{w.id} • {w.status}</div>{w.notes?.length>0 && <div style={{fontSize:11, color:"#aaa", marginTop:6, background:"#0a0a0f", padding:"6px 10px", borderRadius:6}}>📝 {w.notes[w.notes.length-1].text}</div>}</div>
            <div style={{display:"flex", gap:6}}><input placeholder="Add note..." value={noteText[w.id]||""} onChange={e=>setNoteText({...noteText, [w.id]:e.target.value})} onKeyDown={e=>{if(e.key==="Enter") addNote(w.id)}} style={{padding:"6px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, fontSize:12, width:140}}/><button onClick={()=>addNote(w.id)} style={{padding:"6px 10px", background:"#222", color:"white", border:"none", borderRadius:6, fontSize:11}}>Add</button><button onClick={()=>printWorkflow(w)} style={{padding:"6px 10px", background:"#ff7a00", color:"white", border:"none", borderRadius:6, fontSize:11}}>Print</button><button onClick={()=>emailWorkflow(w)} style={{padding:"6px 10px", background:"#15151f", border:"1px solid #333", color:"#ccc", borderRadius:6, fontSize:11}}>Email</button></div>
          </div>)}
        </div>
      </div>
    </div>
  )
}
