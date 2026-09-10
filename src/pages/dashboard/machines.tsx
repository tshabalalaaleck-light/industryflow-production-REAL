import { useState, useEffect } from "react"
const CATEGORIES = ["Cutting","Heating","Forging","Heat Treatment","Quenching","Billet Preparation","Morando","Stamping","CNC Machining","Grinding","Cold Rolling"]
const STATUSES = ["Running","Idle","Maintenance"]
export default function MachinesPage(){
  const [machines,setMachines]=useState<any[]>([]); const [workflows,setWorkflows]=useState<any[]>([]); const [me,setMe]=useState<any>(null)
  const [name,setName]=useState(""); const [category,setCategory]=useState("Cutting"); const [status,setStatus]=useState("Idle"); const [workNumber,setWorkNumber]=useState(""); const [runningHrs,setRunningHrs]=useState(""); const [downtime,setDowntime]=useState("")
  const load=async()=>{
    const m = JSON.parse(localStorage.getItem("user")||"null"); setMe(m)
    const cId = m?.role==="SUPER_ADMIN" ? "" : `?companyId=${m?.companyId}`
    const ma = await fetch(`/api/machines${cId}`).then(r=>r.json()); setMachines(ma.machines||[])
    const wfUrl = m?.role==="SUPER_ADMIN" ? "/api/workflows" : `/api/workflows?companyId=${m?.companyId}`
    const wf = await fetch(wfUrl).then(r=>r.json()); setWorkflows(wf.workflows||[])
  }
  useEffect(()=>{load()},[])
  const addMachine=async()=>{
    if(!name) return alert("Machine name required")
    const companyId = me?.role==="SUPER_ADMIN" ? (prompt("Enter Company ID (swasap-001 or demo-company-123):")||me.companyId) : me.companyId
    await fetch("/api/machines",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,category,status,runningHrs,downtime,workNumber,companyId})})
    setName(""); setRunningHrs(""); setDowntime(""); setWorkNumber(""); load()
  }
  const changeStatus=async(id:string,newStatus:string)=>{
    if(me?.role!=="SUPER_ADMIN"){ alert("Only Main Admin can change machine status"); return }
    await fetch(`/api/machines?id=${id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id, status:newStatus})}); load()
  }
  const delMachine=async(id:string)=>{
    if(me?.role!=="SUPER_ADMIN"){ alert("Only Main Admin can delete machines"); return }
    if(!confirm("Delete machine?")) return; await fetch(`/api/machines?id=${id}`,{method:"DELETE"}); load()
  }
  const runningCount = machines.filter(m=>m.status==="Running").length
  const isSuper = me?.role==="SUPER_ADMIN"
  const getStatusStyle=(s:string)=>{
    if(s==="Running") return {bg:"#0f2e1f", color:"#00ff88", border:"1px solid #00ff8844", dot:"#00ff88"}
    if(s==="Idle") return {bg:"#1a1a24", color:"#888", border:"1px solid #333", dot:"#888"}
    if(s==="Maintenance") return {bg:"#2a1a0a", color:"#ffb02e", border:"1px solid #ffb02e44", dot:"#ffb02e"}
    return {bg:"#1a1a24", color:"#888", border:"1px solid #333", dot:"#888"}
  }
  return (
  <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
    <div style={{width:260, background:"#111118", borderRight:"1px solid #222", padding:20, display:"flex", flexDirection:"column"}}>
      <div style={{color:"#ff7a00", fontWeight:900, fontSize:18, lineHeight:1}}>FORGING<br/>LINE ERP</div>
      <div style={{marginTop:30, fontSize:10, color:"#666"}}>PRODUCTION</div>
      <a href="/dashboard" style={{color:"#666", fontSize:13, padding:"8px 0", display:"block", textDecoration:"none"}}>Dashboard</a>
      <a href="/dashboard/workflows" style={{color:"#666", fontSize:13, padding:"8px 0", display:"block", textDecoration:"none"}}>Production Orders</a>
      <div style={{color:"#ff7a00", background:"#ff7a001a", borderLeft:"3px solid #ff7a00", padding:"8px 12px", borderRadius:6, fontSize:13, fontWeight:700, marginTop:5}}>Machines</div>
      <a href="/dashboard/tenants" style={{color:"#666", fontSize:13, padding:"8px 0", display:"block", textDecoration:"none"}}>Companies</a>
      <div style={{marginTop:"auto", borderTop:"1px solid #222", paddingTop:15, fontSize:11, color:"#666"}}>{me?.email}<br/><span style={{color:isSuper?"#ff7a00":"#888"}}>{me?.title||me?.role} {isSuper?"(Main Admin)":""}</span><br/>{!isSuper && <span style={{color:"#00ff88", fontSize:10}}>✓ View Only - Management</span>}</div>
    </div>
    <div style={{flex:1, padding:24}}>
      <div style={{display:"flex", justifyContent:"space-between"}}><div><h1 style={{margin:0, fontSize:26, fontWeight:800}}>Machines</h1><p style={{margin:"4px 0 0", color:"#888", fontSize:13}}>{runningCount}/{machines.length} running • {isSuper? "All Companies - Main Admin Access" : `${me?.companyId} - View Only for ${me?.title||me?.role}`}</p></div></div>

      {isSuper ? (
        <div style={{background:"#15151f", border:"1px solid #222", borderRadius:12, padding:16, marginTop:20, display:"flex", gap:8, flexWrap:"wrap", alignItems:"end"}}>
          <div><div style={{fontSize:10, color:"#888"}}>MACHINE NAME</div><input placeholder="e.g. Do All Billet Saw" value={name} onChange={e=>setName(e.target.value)} style={{padding:"8px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:200, fontSize:12, marginTop:4}}/></div>
          <div><div style={{fontSize:10, color:"#888"}}>CATEGORY</div><select value={category} onChange={e=>setCategory(e.target.value)} style={{padding:"8px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, fontSize:12, marginTop:4}}>{CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
          <div><div style={{fontSize:10, color:"#888"}}>STATUS</div><select value={status} onChange={e=>setStatus(e.target.value)} style={{padding:"8px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, fontSize:12, marginTop:4}}>{STATUSES.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
          <div><div style={{fontSize:10, color:"#888"}}>WORK NUMBER</div><select value={workNumber} onChange={e=>setWorkNumber(e.target.value)} style={{padding:"8px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:140, fontSize:12, marginTop:4}}><option value="">No Work</option>{workflows.map((w:any)=><option key={w.id} value={w.name}>{w.name}</option>)}</select></div>
          <div><div style={{fontSize:10, color:"#888"}}>RUNNING HRS</div><input placeholder="3249.0" value={runningHrs} onChange={e=>setRunningHrs(e.target.value)} style={{padding:"8px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:90, fontSize:12, marginTop:4}}/></div>
          <div><div style={{fontSize:10, color:"#888"}}>DOWNTIME</div><input placeholder="11" value={downtime} onChange={e=>setDowntime(e.target.value)} style={{padding:"8px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:70, fontSize:12, marginTop:4}}/></div>
          <button onClick={addMachine} style={{padding:"9px 18px", background:"#ff7a00", color:"white", border:"none", borderRadius:8, fontWeight:700, fontSize:12, height:36}}>Add Machine</button>
        </div>
      ) : (
        <div style={{background:"#0f2e1f", border:"1px solid #00ff8844", color:"#00ff88", padding:"12px 16px", borderRadius:10, marginTop:20, fontSize:12}}>👁️ You are viewing as <b>{me?.title||"Manager"}</b> - You can view all machines and work numbers. Only Main Admin (Super Admin) can add/remove machines.</div>
      )}

      <div style={{marginTop:20, background:"#15151f", border:"1px solid #222", borderRadius:12, overflow:"hidden"}}>
        <div style={{display:"grid", gridTemplateColumns:"2fr 1.2fr 1fr 1fr 0.8fr 1.2fr 0.8fr", padding:"12px 16px", fontSize:10, color:"#666", textTransform:"uppercase", borderBottom:"1px solid #222", background:"#111118"}}>
          <div>MACHINE</div><div>CATEGORY</div><div>STATUS</div><div>RUNNING HRS</div><div>DOWNTIME</div><div>WORK NUMBER</div><div>ACTION</div>
        </div>
        {machines.map((m:any)=>{
          const st = getStatusStyle(m.status)
          return (
          <div key={m.id} style={{display:"grid", gridTemplateColumns:"2fr 1.2fr 1fr 1fr 0.8fr 1.2fr 0.8fr", padding:"14px 16px", borderBottom:"1px solid #1a1a28", alignItems:"center", fontSize:13}}>
            <div style={{fontWeight:600}}>{m.name}<div style={{fontSize:10, color:"#666"}}>{m.id}</div></div>
            <div style={{color:"#ccc"}}>{m.category}</div>
            <div><span onClick={()=>changeStatus(m.id, m.status==="Running"? "Idle" : m.status==="Idle"? "Maintenance":"Running")} style={{background:st.bg, color:st.color, border:st.border, padding:"4px 10px", borderRadius:12, fontSize:11, fontWeight:600, cursor:isSuper?"pointer":"default", display:"inline-flex", alignItems:"center", gap:5}}><span style={{width:6, height:6, borderRadius:"50%", background:st.dot, display:"inline-block"}}></span>{m.status}</span></div>
            <div style={{color:"#ccc"}}>{m.runningHrs}.0</div>
            <div style={{color:"#ccc"}}>{m.downtime}</div>
            <div><span style={{background:m.workNumber?"#ff7a0022":"#1a1a24", color:m.workNumber?"#ff7a00":"#666", padding:"4px 8px", borderRadius:6, fontSize:11}}>{m.workNumber||"No Work"}</span></div>
            <div>{isSuper ? <button onClick={()=>delMachine(m.id)} style={{background:"#ff333322", border:"1px solid #ff333344", color:"#ff5555", borderRadius:4, padding:"3px 8px", fontSize:10}}>Del</button> : <span style={{color:"#444", fontSize:10}}>View Only</span>}</div>
          </div>
          )
        })}
      </div>
    </div>
  </div>
  )
}
