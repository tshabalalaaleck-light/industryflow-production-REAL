import { useState, useEffect } from "react"
import { useRouter } from "next/router"
export default function CompanyWorkspace(){
  const router = useRouter(); const { id } = router.query
  const [company,setCompany]=useState<any>(null); const [users,setUsers]=useState<any[]>([]); const [wfs,setWfs]=useState<any[]>([])
  const [email,setEmail]=useState(""); const [pwd,setPwd]=useState(""); const [role,setRole]=useState("USER")
  const [wfName,setWfName]=useState(""); const [me,setMe]=useState<any>(null); const [denied,setDenied]=useState(false)
  const load=async()=>{
    if(!id) return
    const m = JSON.parse(localStorage.getItem("user")||"null"); setMe(m)
    if(m && m.role!=="SUPER_ADMIN" && m.companyId!==id){ setDenied(true); return }
    const tenants = await fetch("/api/tenants").then(r=>r.json()); setCompany(tenants.tenants.find((t:any)=>t.id===id))
    const u = await fetch(`/api/users?companyId=${id}`).then(r=>r.json()); setUsers(u.users||[])
    const w = await fetch(`/api/workflows?companyId=${id}`).then(r=>r.json()); setWfs(w.workflows||[])
  }
  useEffect(()=>{load()},[id])
  const addUser=async()=>{ if(!email||!pwd) return alert("Required"); const res=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password:pwd,role,companyId:id})}); const d=await res.json(); if(!res.ok) return alert(d.error); setEmail(""); setPwd(""); load() }
  const addWf=async()=>{ if(!wfName) return; await fetch("/api/workflows",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:wfName,companyId:id})}); setWfName(""); load() }
  const printAll=()=>{
    const html = `<html><head><style>body{font-family:Arial;padding:30px} table{width:100%;border-collapse:collapse} th,td{border:1px solid #ddd;padding:8px} th{background:#f5f5f5} h1{color:#0f1014}</style></head><body><h1>${company?.name} - Production Report</h1><p>Date: ${new Date().toLocaleString()}</p><table><tr><th>Workflow</th><th>Status</th><th>Notes</th></tr>${wfs.map((w:any)=>`<tr><td>${w.name}</td><td>${w.status}</td><td>${w.notes?.map((n:any)=>n.text).join(", ")||""}</td></tr>`).join("")}</table></body></html>`; const win=window.open("","_blank"); win?.document.write(html); win?.document.close(); win?.print()
  }
  if(denied) return <div style={{minHeight:"100vh", background:"#f8f9fb", display:"flex", alignItems:"center", justifyContent:"center"}}><div style={{background:"white", padding:30, borderRadius:12, textAlign:"center", border:"1px solid #e5e7eb"}}><h2>Access Restricted</h2><p>You cannot access this company.</p><a href="/dashboard/tenants" style={{display:"inline-block", marginTop:10, background:"black", color:"white", padding:"10px 20px", borderRadius:8, textDecoration:"none"}}>Back</a></div></div>
  if(!company) return <div style={{padding:20}}>Loading...</div>
  return (
  <div style={{display:"flex", minHeight:"100vh", background:"#f8f9fb", fontFamily:"Inter, sans-serif"}}>
    <div style={{width:260, background:"#0f1014", color:"white", padding:24}}>
      <div style={{fontWeight:900}}><span style={{color:"#ff7a00"}}>FORGING</span><br/>LINE ERP</div>
      <a href="/dashboard/tenants" style={{color:"#888", fontSize:13, display:"block", marginTop:20, textDecoration:"none"}}>← Back</a>
      <div style={{marginTop:20, background:"#1a1a1f", borderRadius:10, padding:14}}><div style={{fontWeight:600, fontSize:13}}>{company.name}</div><div style={{fontSize:11, color:"#888", marginTop:4}}>{company.id}</div></div>
    </div>
    <div style={{flex:1, padding:32}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}><h1 style={{margin:0, fontSize:22}}>{company.name}</h1><div style={{display:"flex", gap:8}}><button onClick={printAll} style={{padding:"10px 16px", background:"black", color:"white", border:"none", borderRadius:8, fontSize:12, fontWeight:600}}>🖨️ Print Production Sheet</button><button onClick={()=>{ const subject=`Production Report - ${company.name}`; const body=`Company: ${company.name}\nWorkflows: ${wfs.map((w:any)=>w.name).join(", ")}`; window.location.href=`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` }} style={{padding:"10px 16px", background:"white", border:"1px solid #ddd", borderRadius:8, fontSize:12, fontWeight:600}}>📧 Email Sheet</button></div></div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginTop:24}}>
        <div style={{background:"white", border:"1px solid #e5e7eb", borderRadius:12, padding:20}}><h3 style={{marginTop:0, fontSize:14}}>Users ({users.length})</h3><div style={{display:"flex", gap:8, marginBottom:16}}><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{flex:1, padding:"8px 10px", border:"1px solid #e5e7eb", borderRadius:6, fontSize:12}}/><input placeholder="Password" value={pwd} onChange={e=>setPwd(e.target.value)} style={{width:100, padding:"8px 10px", border:"1px solid #e5e7eb", borderRadius:6, fontSize:12}}/><button onClick={addUser} style={{padding:"8px 14px", background:"black", color:"white", border:"none", borderRadius:6, fontSize:12}}>Add</button></div>{users.map((u:any)=><div key={u.id} style={{padding:"8px 0", borderBottom:"1px solid #f0f0f0", fontSize:13, display:"flex", justifyContent:"space-between"}}><span>{u.email}</span><span style={{color:"#888", fontSize:11}}>{u.role}</span></div>)}</div>
        <div style={{background:"white", border:"1px solid #e5e7eb", borderRadius:12, padding:20}}><h3 style={{marginTop:0, fontSize:14}}>Workflows ({wfs.length})</h3><div style={{display:"flex", gap:8, marginBottom:16}}><input placeholder="Workflow name" value={wfName} onChange={e=>setWfName(e.target.value)} style={{flex:1, padding:"8px 10px", border:"1px solid #e5e7eb", borderRadius:6, fontSize:12}}/><button onClick={addWf} style={{padding:"8px 14px", background:"#ff7a00", color:"white", border:"none", borderRadius:6, fontSize:12, fontWeight:600}}>Add</button></div>{wfs.map((w:any)=><div key={w.id} style={{padding:"8px 0", borderBottom:"1px solid #f0f0f0", fontSize:13}}><div style={{display:"flex", justifyContent:"space-between"}}><span style={{fontWeight:600}}>{w.name}</span><span style={{fontSize:11, color:"#888"}}>{w.status}</span></div>{w.notes?.length>0 && <div style={{fontSize:11, color:"#555", marginTop:4}}>📝 {w.notes.length} notes</div>}</div>)}</div>
      </div>
      <div style={{marginTop:24, background:"white", border:"1px solid #e5e7eb", borderRadius:12, padding:20}}><h3 style={{marginTop:0, fontSize:14}}>Production Sheet Actions</h3><p style={{fontSize:12, color:"#666"}}>Every user can print and email production sheets with notes</p><div style={{display:"flex", gap:10, marginTop:12}}><button onClick={printAll} style={{padding:"10px 18px", background:"black", color:"white", border:"none", borderRadius:8, fontSize:13}}>🖨️ Print Full Production Sheet</button><button onClick={()=>{ const subject=`${company.name} - Production Sheet`; const body=wfs.map((w:any)=>`${w.name} - ${w.status} - Notes: ${w.notes?.map((n:any)=>n.text).join("; ")}`).join("\n"); window.location.href=`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` }} style={{padding:"10px 18px", background:"white", border:"1px solid #ddd", borderRadius:8, fontSize:13}}>📧 Email Production Sheet</button></div></div>
    </div>
  </div>
  )
}
