import { useState, useEffect } from "react"
const CATEGORIES = ["Cutting","Heating","Forging","Heat Treatment","Quenching","Billet Preparation","Morando","Stamping","CNC Machining","Grinding","Cold Rolling"]
const STATUSES = ["Running","Idle","Maintenance"]
export default function MachinesPage(){
  const [machines,setMachines]=useState<any[]>([]); const [workflows,setWorkflows]=useState<any[]>([]); const [me,setMe]=useState<any>(null)
  const [name,setName]=useState(""); const [category,setCategory]=useState("Cutting"); const [status,setStatus]=useState("Idle"); const [workNumber,setWorkNumber]=useState(""); const [runningHrs,setRunningHrs]=useState(""); const [downtime,setDowntime]=useState(""); const [live,setLive]=useState(false)
  const load=async()=>{
    const m = JSON.parse(localStorage.getItem("user")||"null"); setMe(m)
    const cId = m?.role==="SUPER_ADMIN"? "" : `?companyId=${m?.companyId}`
    const ma = await fetch(`/api/machines${cId}`).then(r=>r.json()).then(d=>d.machines||[]); setMachines(ma); setLive(true); setTimeout(()=>setLive(false),800)
    const wfUrl = m?.role==="SUPER_ADMIN"? "/api/workflows" : `/api/workflows?companyId=${m?.companyId}`
    const wf = await fetch(wfUrl).then(r=>r.json()).then(d=>d.workflows||[]); setWorkflows(wf)
  }
  useEffect(()=>{ load(); const iv=setInterval(load,3000); return ()=>clearInterval(iv) },[])
  const addMachine=async()=>{ if(!name) return alert("Name required"); const companyId = me?.role==="SUPER_ADMIN"? (prompt("Company ID:")||me.companyId) : me.companyId; await fetch("/api/machines",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,category,status,runningHrs,downtime,workNumber,companyId})}); setName(""); load() }
  const changeStatus=async(id:string,newStatus:string)=>{ if(me?.role!=="SUPER_ADMIN"){ alert("Only Main Admin!"); return } await fetch(`/api/machines?id=${id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id, status:newStatus})}); load() }
  const delMachine=async(id:string)=>{ if(me?.role!=="SUPER_ADMIN"){ alert("Only Main Admin!"); return } if(!confirm("Delete?")) return; await fetch(`/api/machines?id=${id}`,{method:"DELETE"}); load() }
  const isSuper = me?.role==="SUPER_ADMIN"
  const getStatusStyle=(s:string)=>{ if(s==="Running") return {bg:"#0f2e1f", color:"#00ff88", dot:"#00ff88"}; if(s==="Idle") return {bg:"#1a1a24", color:"#888", dot:"#888"}; return {bg:"#2a1a0a", color:"#ffb02e", dot:"#ffb02e"} }
  return (
  <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
    <div style={{width:260, background:"#111118", borderRight:"1px solid #222", padding:20, display:"flex", flexDirection:"column"}}>
      <div style={{color:"#ff7a00", fontWeight:900, fontSize:18, lineHeight:1}}>FORGING<br/>LINE ERP</div>
      <div style={{marginTop:8, fontSize:10, color:live?"#00ff88":"#666"}}>{live?"● LIVE 3s UPDATING":"○ Live 3s"}</div>
      <div style={{marginTop:20, color:"#ff7a00", background:"#ff7a001a", borderLeft:"3px solid #ff7a00", padding:"8px 12px", borderRadius:6, fontSize:13, fontWeight:700}}>Machines {live?"●":""}</div>
      <a href="/dashboard" style={{color:"#666", fontSize:13, padding:"8px 0", display:"block", textDecoration:"none"}}>Dashboard</a>
      <a href="/dashboard/workflows" style={{color:"#666", fontSize:13, padding:"8px 0", display:"block", textDecoration:"none"}}>Workflows</a>
      <div style={{marginTop:"auto", fontSize:11, color:"#666"}}>{me?.email}<br/><span style={{color:"#00ff88"}}>🔄 Live multi-user 3s</span></div>
    </div>
    <div style={{flex:1, padding:24}}>
      <h1 style={{margin:0, fontSize:26, fontWeight:800}}>Machines {live && <span style={{fontSize:12, color:"#00ff88"}}>● LIVE</span>}</h1>
      <p style={{margin:"4px 0 0", color:"#888", fontSize:12}}>{machines.filter((m:any)=>m.status==="Running").length}/{machines.length} running • Auto-refresh every 3s for all users</p>
      {isSuper? <div style={{background:"#15151f", border:"1px solid #222", borderRadius:12, padding:16, marginTop:20, display:"flex", gap:8, flexWrap:"wrap"}}><input placeholder="Machine Name" value={name} onChange={e=>setName(e.target.value)} style={{padding:"8px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:180}}/><select value={category} onChange={e=>setCategory(e.target.value)} style={{padding:"8px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6}}>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select><select value={status} onChange={e=>setStatus(e.target.value)} style={{padding:"8px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6}}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select><select value={workNumber} onChange={e=>setWorkNumber(e.target.value)} style={{padding:"8px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6}}><option value="">No Work</option>{workflows.map((w:any)=><option key={w.id} value={w.name}>{w.name}</option>)}</select><button onClick={addMachine} style={{padding:"8px 16px", background:"#ff7a00", color:"white", border:"none", borderRadius:8, fontWeight:700}}>Add</button></div>
      : <div style={{background:"#0f2e1f", border:"1px solid #00ff8844", color:"#00ff88", padding:"10px 14px", borderRadius:8, marginTop:16, fontSize:12}}>👁️ Live view as {me?.title} - Updates every 3s - Only Main Admin can add/remove</div>}
      <div style={{marginTop:20, background:"#15151f", border:"1px solid #222", borderRadius:12, overflow:"hidden"}}>
        <div style={{display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 0.8fr 1.2fr 0.8fr", padding:"12px 16px", fontSize:10, color:"#666", borderBottom:"1px solid #222", background:"#111118"}}><div>MACHINE</div><div>CATEGORY</div><div>STATUS</div><div>HRS</div><div>DOWN</div><div>WORK NUMBER</div><div>ACTION</div></div>
        {machines.map((m:any)=>{ const st=getStatusStyle(m.status); return <div key={m.id} style={{display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 0.8fr 1.2fr 0.8fr", padding:"14px 16px", borderBottom:"1px solid #1a1a28", fontSize:13}}><div>{m.name}</div><div style={{color:"#888"}}>{m.category}</div><div><span onClick={()=>changeStatus(m.id, m.status==="Running"?"Idle":m.status==="Idle"?"Maintenance":"Running")} style={{background:st.bg, color:st.color, padding:"4px 10px", borderRadius:12, fontSize:11, cursor:isSuper?"pointer":"default"}}>● {m.status}</span></div><div>{m.runningHrs}</div><div>{m.downtime}</div><div><span style={{background:m.workNumber?"#ff7a0022":"#1a1a24", color:m.workNumber?"#ff7a00":"#666", padding:"4px 8px", borderRadius:6, fontSize:11}}>{m.workNumber||"No Work"}</span></div><div>{isSuper? <button onClick={()=>delMachine(m.id)} style={{background:"#ff333322", color:"#ff5555", border:"1px solid #ff333344", borderRadius:4, padding:"3px 8px", fontSize:10}}>Del</button> : <span style={{color:"#444", fontSize:10}}>Live View</span>}</div></div> })}
      </div>
    </div>
  </div>
  )
}
