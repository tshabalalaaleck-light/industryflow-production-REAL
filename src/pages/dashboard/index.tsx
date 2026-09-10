import { useEffect, useState } from "react"
export default function Dashboard(){
  const [me,setMe]=useState<any>(null); const [wfs,setWfs]=useState<any[]>([]); const [tenants,setTenants]=useState<any[]>([])
  useEffect(()=>{
    const m = JSON.parse(localStorage.getItem("user")||"null"); if(!m){ location.href="/"; return }; setMe(m)
    fetch("/api/tenants").then(r=>r.json()).then(d=>setTenants(d.tenants||[]))
    const url = m.role==="SUPER_ADMIN" ? "/api/workflows" : `/api/workflows?companyId=${m.companyId}`
    fetch(url).then(r=>r.json()).then(d=>setWfs(d.workflows||[]))
  },[])
  const companyName = tenants.find(t=>t.id===me?.companyId)?.name || me?.companyId
  return (
    <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
      <div style={{width:240, background:"#111118", borderRight:"1px solid #222", padding:20}}>
        <div style={{color:"#ff7a00", fontWeight:900, fontSize:18}}>FORGING<br/>LINE ERP</div>
        <div style={{background:"#ff7a001a", color:"#ff7a00", padding:"8px 12px", borderRadius:6, fontSize:13, margin:"20px 0"}}>● Dashboard</div>
        <div style={{fontSize:11, color:"#00ff88", background:"#0f2e1f", padding:6, borderRadius:4}}>Company: {companyName}<br/>Role: {me?.role}</div>
        <a href="/dashboard/users" style={{color:"#999", fontSize:13, display:"block", textDecoration:"none", padding:"10px 0", marginTop:15}}>Users</a>
        <a href="/dashboard/tenants" style={{color:"#999", fontSize:13, display:"block", textDecoration:"none", padding:"5px 0"}}>Tenants</a>
        <a href="/dashboard/workflows" style={{color:"#999", fontSize:13, display:"block", textDecoration:"none", padding:"5px 0"}}>Workflows ({wfs.length})</a>
        <div style={{marginTop:"auto", paddingTop:20, borderTop:"1px solid #222", position:"absolute", bottom:20}}>
          <div style={{fontSize:12}}>{me?.email}</div>
          <div style={{fontSize:10, color:"#ff7a00"}}>{me?.companyId}</div>
          <div onClick={()=>{localStorage.clear(); location.href="/"}} style={{fontSize:12, color:"#666", marginTop:10, cursor:"pointer"}}>Sign out</div>
        </div>
      </div>
      <div style={{flex:1, padding:25}}>
        <h1 style={{margin:0}}>Dashboard - {me?.role==="SUPER_ADMIN"?`All Companies (${wfs.length} workflows)`:`${companyName} - Isolated View`}</h1>
        <p style={{fontSize:12, color:"#888"}}>{me?.role==="SUPER_ADMIN"?"You see EVERY company - Super Admin":"You only see YOUR company data - other companies hidden for security"}</p>
        <div style={{background:"#0f2e1f", border:"1px solid #00ff88", color:"#00ff88", padding:"8px 14px", borderRadius:8, fontSize:12, margin:"15px 0"}}>🔒 Isolation Active - {me?.email} can ONLY access company: {companyName}</div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:15, margin:"20px 0"}}>
          <div style={{background:"#15151f", borderRadius:10, padding:18, borderBottom:"3px solid #ff7a00"}}><div style={{fontSize:10, color:"#aaa"}}>WORKFLOWS FOR YOUR COMPANY</div><div style={{fontSize:28, fontWeight:800}}>{wfs.length}</div></div>
          <div style={{background:"#15151f", borderRadius:10, padding:18, borderBottom:"3px solid #00bfff"}}><div style={{fontSize:10, color:"#aaa"}}>YOUR COMPANY</div><div style={{fontSize:16, fontWeight:800}}>{companyName}</div></div>
          <div style={{background:"#15151f", borderRadius:10, padding:18, borderBottom:"3px solid #ff4500"}}><div style={{fontSize:10, color:"#aaa"}}>YOUR ROLE</div><div style={{fontSize:16, fontWeight:800}}>{me?.role}</div></div>
          <div style={{background:"#15151f", borderRadius:10, padding:18, borderBottom:"3px solid #ff7a00"}}><div style={{fontSize:10, color:"#aaa"}}>ISOLATION</div><div style={{fontSize:16, fontWeight:800, color:"#00ff88"}}>ACTIVE</div></div>
        </div>
        <div style={{fontWeight:700, margin:"20px 0 10px"}}>Workflows for {companyName}</div>
        <div style={{background:"#15151f", borderRadius:10, padding:15}}>
          {wfs.length===0 ? <div style={{color:"#666"}}>No workflows for this company yet - add one</div> : wfs.map((w:any)=><div key={w.id} style={{display:"flex", justifyContent:"space-between", padding:"12px 0", borderBottom:"1px solid #1a1a28"}}><span>{w.name} - {w.status} - {w.companyId}</span><span style={{color:"#888", fontSize:11}}>{w.id}</span></div>)}
        </div>
      </div>
    </div>
  )
}
