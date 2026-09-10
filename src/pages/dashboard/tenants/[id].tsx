import { useState, useEffect } from "react"
import { useRouter } from "next/router"
export default function CompanyWorkspace(){
  const router = useRouter(); const { id } = router.query
  const [company,setCompany]=useState<any>(null); const [users,setUsers]=useState<any[]>([]); const [wfs,setWfs]=useState<any[]>([])
  const [email,setEmail]=useState(""); const [pwd,setPwd]=useState(""); const [role,setRole]=useState("USER")
  const [wfName,setWfName]=useState(""); const [wfStatus,setWfStatus]=useState("In Progress")
  const [tab,setTab]=useState("overview")
  const load=async()=>{
    if(!id) return
    const tenants = await fetch("/api/tenants").then(r=>r.json()); setCompany(tenants.tenants.find((t:any)=>t.id===id))
    const u = await fetch(`/api/users?companyId=${id}`).then(r=>r.json()); setUsers(u.users||[])
    const w = await fetch(`/api/workflows?companyId=${id}`).then(r=>r.json()); setWfs(w.workflows||[])
  }
  useEffect(()=>{load()},[id])
  const addUser=async()=>{ if(!email||!pwd) return alert("Email & Password required"); const res=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password:pwd,role,companyId:id})}); const d=await res.json(); if(!res.ok) return alert(d.error); setEmail(""); setPwd(""); load() }
  const addWf=async()=>{ if(!wfName) return alert("Name required"); await fetch("/api/workflows",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:wfName,status:wfStatus,companyId:id})}); setWfName(""); load() }
  const printSheet=()=>{
    const html = `<html><head><title>Product Sheet - ${company?.name}</title><style>body{font-family:sans-serif;padding:30px} h1{color:#ff7a00} table{width:100%;border-collapse:collapse;margin-top:20px} th,td{border:1px solid #ccc;padding:8px;text-align:left} th{background:#ff7a00;color:white}</style></head><body><h1>${company?.name} - Product Sheet</h1><p>Company ID: ${id} | Date: ${new Date().toLocaleString()}</p><h2>Users (${users.length})</h2><table><tr><th>Email</th><th>Role</th></tr>${users.map((u:any)=>`<tr><td>${u.email}</td><td>${u.role}</td></tr>`).join("")}</table><h2>Workflows (${wfs.length})</h2><table><tr><th>Name</th><th>Status</th><th>ID</th></tr>${wfs.map((w:any)=>`<tr><td>${w.name}</td><td>${w.status}</td><td>${w.id}</td></tr>`).join("")}</table></body></html>`
    const win = window.open("","_blank"); win?.document.write(html); win?.document.close(); win?.print()
  }
  const emailSheet=()=>{
    const subject = `Product Sheet - ${company?.name}`
    const body = `Company: ${company?.name}\nID: ${id}\nUsers: ${users.length}\nWorkflows: ${wfs.length}\n\nUsers:\n${users.map((u:any)=>`- ${u.email} (${u.role})`).join("\n")}\n\nWorkflows:\n${wfs.map((w:any)=>`- ${w.name} - ${w.status}`).join("\n")}`
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
  if(!company) return <div style={{padding:20, background:"#0a0a0f", color:"white", minHeight:"100vh"}}>Loading company {id}...</div>
  return (
  <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
    <div style={{width:240, background:"#111118", borderRight:"1px solid #222", padding:20}}>
      <div style={{color:"#ff7a00", fontWeight:900}}>FORGING<br/>LINE ERP</div>
      <a href="/dashboard/tenants" style={{color:"#999", fontSize:13, display:"block", marginTop:20, textDecoration:"none"}}>◀ All Companies</a>
      <div style={{background:"#15151f", border:"1px solid #222", borderRadius:8, padding:12, margin:"15px 0"}}>
        <div style={{fontSize:12, color:"#ff7a00", fontWeight:800}}>{company.name}</div>
        <div style={{fontSize:10, color:"#666"}}>{company.id}</div>
      </div>
      <div style={{display:"grid", gap:5, marginTop:10}}>
        <div onClick={()=>setTab("overview")} style={{padding:"8px 12px", borderRadius:6, cursor:"pointer", background:tab==="overview"?"#ff7a0022":"", color:tab==="overview"?"#ff7a00":"#888", fontSize:13}}>📊 Overview</div>
        <div onClick={()=>setTab("users")} style={{padding:"8px 12px", borderRadius:6, cursor:"pointer", background:tab==="users"?"#ff7a0022":"", color:tab==="users"?"#ff7a00":"#888", fontSize:13}}>👥 Users ({users.length})</div>
        <div onClick={()=>setTab("workflows")} style={{padding:"8px 12px", borderRadius:6, cursor:"pointer", background:tab==="workflows"?"#ff7a0022":"", color:tab==="workflows"?"#ff7a00":"#888", fontSize:13}}>⚙️ Workflows ({wfs.length})</div>
        <div onClick={()=>setTab("print")} style={{padding:"8px 12px", borderRadius:6, cursor:"pointer", background:tab==="print"?"#ff7a0022":"", color:tab==="print"?"#ff7a00":"#888", fontSize:13}}>🖨️ Print / Email</div>
      </div>
    </div>
    <div style={{flex:1, padding:25}}>
      {tab==="overview" && <><h1 style={{margin:0}}>{company.name} - Workspace</h1><p style={{color:"#888", fontSize:12}}>Full control for this company</p><div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:15, margin:"20px 0"}}><div style={{background:"#15151f", padding:20, borderRadius:10}}><div style={{fontSize:10}}>USERS</div><div style={{fontSize:32, fontWeight:800}}>{users.length}</div></div><div style={{background:"#15151f", padding:20, borderRadius:10}}><div style={{fontSize:10}}>WORKFLOWS</div><div style={{fontSize:32, fontWeight:800}}>{wfs.length}</div></div><div style={{background:"#15151f", padding:20, borderRadius:10}}><div style={{fontSize:10}}>STATUS</div><div style={{fontSize:18, color:"#00ff88"}}>ACTIVE</div></div></div><button onClick={printSheet} style={{padding:"12px 20px", background:"#ff7a00", color:"white", border:"none", borderRadius:6}}>🖨️ Print Product Sheet</button></>}
      {tab==="users" && <><h2>Users for {company.name}</h2><div style={{background:"#15151f", padding:15, borderRadius:10, display:"flex", gap:10, flexWrap:"wrap", marginBottom:15}}><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:200}}/><input placeholder="Password" value={pwd} onChange={e=>setPwd(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:130}}/><select value={role} onChange={e=>setRole(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6}}><option>USER</option><option>ADMIN</option></select><button onClick={addUser} style={{padding:"10px 18px", background:"#ff7a00", color:"white", border:"none", borderRadius:6}}>Add to {company.name}</button></div><div style={{background:"#15151f", borderRadius:10, padding:10}}>{users.map((u:any)=><div key={u.id} style={{padding:"10px", borderBottom:"1px solid #222", display:"flex", justifyContent:"space-between"}}><span>{u.email} - {u.role}</span></div>)}</div></>}
      {tab==="workflows" && <><h2>Workflows for {company.name}</h2><div style={{background:"#15151f", padding:15, borderRadius:10, display:"flex", gap:10, marginBottom:15}}><input placeholder="Workflow Name" value={wfName} onChange={e=>setWfName(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6, width:220}}/><select value={wfStatus} onChange={e=>setWfStatus(e.target.value)} style={{padding:10, background:"#0a0a0f", border:"1px solid #333", color:"white", borderRadius:6}}><option>In Progress</option><option>Completed</option></select><button onClick={addWf} style={{padding:"10px 18px", background:"#ff7a00", color:"white", border:"none", borderRadius:6}}>Add to {company.name}</button></div><div style={{display:"grid", gap:10}}>{wfs.map((w:any)=><div key={w.id} style={{background:"#15151f", border:"1px solid #222", borderRadius:10, padding:15}}><b style={{color:"#ff7a00"}}>{w.name}</b> - {w.status}</div>)}</div></>}
      {tab==="print" && <><h2>Print & Email - {company.name}</h2><div style={{background:"#15151f", padding:20, borderRadius:10}}><div style={{background:"#0a0a0f", padding:15, borderRadius:8, margin:"15px 0"}}><div style={{color:"#ff7a00", fontWeight:800}}>{company.name}</div><div>Users: {users.length} | Workflows: {wfs.length}</div></div><div style={{display:"flex", gap:10}}><button onClick={printSheet} style={{padding:"12px 24px", background:"#ff7a00", color:"white", border:"none", borderRadius:6, fontWeight:700}}>🖨️ Print Product Sheet</button><button onClick={emailSheet} style={{padding:"12px 24px", background:"#15151f", border:"1px solid #00ff88", color:"#00ff88", borderRadius:6}}>📧 Email Product Sheet</button></div></div></>}
    </div>
  </div>
  )
}
