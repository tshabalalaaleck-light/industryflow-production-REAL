import { useState, useEffect } from "react"
import { useRouter } from "next/router"
const TITLES = ["Data Capturer","Manager","Quality Manager","Foreman","Auditor","Auditor Manager","Operator","Supervisor"]
export default function CompanyWorkspace(){
  const router = useRouter(); const { id } = router.query
  const [company,setCompany]=useState<any>(null); const [users,setUsers]=useState<any[]>([]); const [wfs,setWfs]=useState<any[]>([])
  const [email,setEmail]=useState(""); const [pwd,setPwd]=useState(""); const [title,setTitle]=useState("Data Capturer"); const [wfName,setWfName]=useState(""); const [me,setMe]=useState<any>(null); const [denied,setDenied]=useState(false)
  const load=async()=>{
    if(!id) return
    const m = JSON.parse(localStorage.getItem("user")||"null"); setMe(m)
    if(m && m.role!=="SUPER_ADMIN" && m.companyId!==id){ setDenied(true); return }
    const tenants = await fetch("/api/tenants").then(r=>r.json()); setCompany(tenants.tenants.find((t:any)=>t.id===id))
    const u = await fetch(`/api/users?companyId=${id}`).then(r=>r.json()); setUsers(u.users||[])
    const w = await fetch(`/api/workflows?companyId=${id}`).then(r=>r.json()); setWfs(w.workflows||[])
  }
  useEffect(()=>{load()},[id])
  const addUser=async()=>{ if(!email||!pwd) return alert("Email & Password required"); await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password:pwd,role:"USER",companyId:id,title})}); setEmail(""); setPwd(""); load() }
  const addWf=async()=>{ if(!wfName) return; await fetch("/api/workflows",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:wfName,companyId:id})}); setWfName(""); load() }
  const printAll=()=>{ const html=`<html><body style="font-family:Arial;padding:30px"><h1>${company?.name} - Production Sheet</h1><p>Date: ${new Date().toLocaleString()}</p><h2>Users</h2><table border=1 cellpadding=8 style="border-collapse:collapse;width:100%"><tr><th>Email</th><th>Title</th><th>Role</th></tr>${users.map((u:any)=>`<tr><td>${u.email}</td><td>${u.title||""}</td><td>${u.role}</td></tr>`).join("")}</table><h2>Workflows</h2><table border=1 cellpadding=8 style="border-collapse:collapse;width:100%"><tr><th>Name</th><th>Status</th></tr>${wfs.map((w:any)=>`<tr><td>${w.name}</td><td>${w.status}</td></tr>`).join("")}</table></body></html>`; const win=window.open("","_blank"); win?.document.write(html); win?.document.close(); win?.print() }
  if(denied) return <div style={{minHeight:"100vh", background:"#0a0a0f", color:"white", display:"flex", alignItems:"center", justifyContent:"center"}}><div style={{background:"#15151f", padding:30, borderRadius:12, textAlign:"center"}}><h2>Access Restricted</h2><a href="/dashboard/tenants" style={{display:"inline-block", marginTop:10, background:"#ff7a00", color:"white", padding:"10px 20px", borderRadius:8, textDecoration:"none"}}>Back</a></div></div>
  if(!company) return <div style={{padding:20, background:"#0a0a0f", color:"white"}}>Loading...</div>
  return (
  <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
    <div style={{width:260, background:"#111118", borderRight:"1px solid #222", padding:20}}>
      <div style={{color:"#ff7a00", fontWeight:900, lineHeight:1}}>FORGING<br/>LINE ERP</div>
      <a href="/dashboard/tenants" style={{color:"#999", fontSize:13, display:"block", marginTop:20, textDecoration:"none"}}>← Back</a>
      <div style={{marginTop:20, background:"#15151f", border:"1px solid #222", borderRadius:10, padding:14}}><div style={{fontWeight:700, fontSize:13, color:"#ff7a00"}}>{company.name}</div><div style={{fontSize:11, color:"#666"}}>{company.id}</div></div>
    </div>
    <div style={{flex:1, padding:28}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}><h1 style={{margin:0, fontSize:22}}>{company.name}</h1><button onClick={printAll} style={{padding:"10px 16px", background:"#ff7a00", color:"white", border:"none", borderRadius:8, fontSize:12, fontWeight:700}}>🖨️ Print Sheet</button></div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginTop:22}}>
        <div style={{background:"#15151f", border:"1px solid #222", borderRadius:12, padding:18}}><h3 style={{marginTop:0, fontSize:14}}>Users ({users.length}) - With Title</h3><div style={{display:"flex", gap:6, marginBottom:14, flexWrap:"wrap"}}><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{flex:1, minWidth:120, padding:"8px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, fontSize:12}}/><input placeholder="Pwd" value={pwd} onChange={e=>setPwd(e.target.value)} style={{width:80, padding:"8px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, fontSize:12}}/><select value={title} onChange={e=>setTitle(e.target.value)} style={{padding:"8px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, fontSize:11}}>{TITLES.map(t=><option key={t} value={t}>{t}</option>)}</select><button onClick={addUser} style={{padding:"8px 14px", background:"#ff7a00", color:"white", border:"none", borderRadius:6, fontSize:12}}>Add</button></div>{users.map((u:any)=><div key={u.id} style={{padding:"8px 0", borderBottom:"1px solid #1a1a28", fontSize:12, display:"flex", justifyContent:"space-between"}}><span>{u.email}</span><span style={{background:"#ff7a0022", color:"#ff7a00", padding:"2px 6px", borderRadius:4, fontSize:10}}>{u.title||"Data Capturer"}</span></div>)}</div>
        <div style={{background:"#15151f", border:"1px solid #222", borderRadius:12, padding:18}}><h3 style={{marginTop:0, fontSize:14}}>Workflows ({wfs.length})</h3><div style={{display:"flex", gap:8, marginBottom:14}}><input placeholder="Workflow name" value={wfName} onChange={e=>setWfName(e.target.value)} style={{flex:1, padding:"8px 10px", background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, fontSize:12}}/><button onClick={addWf} style={{padding:"8px 14px", background:"#ff7a00", color:"white", border:"none", borderRadius:6, fontSize:12}}>Add</button></div>{wfs.map((w:any)=><div key={w.id} style={{padding:"8px 0", borderBottom:"1px solid #1a1a28", fontSize:13}}><span style={{fontWeight:600, color:"#ff7a00"}}>{w.name}</span> - <span style={{fontSize:11, color:"#888"}}>{w.status}</span></div>)}</div>
      </div>
    </div>
  </div>
  )
}
