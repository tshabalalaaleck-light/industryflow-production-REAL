import { useState, useEffect } from "react"
export default function TenantsPage(){
  const [tenants,setTenants]=useState<any[]>([]); const [name,setName]=useState("")
  const load=()=>fetch("/api/tenants").then(r=>r.json()).then(d=>setTenants(d.tenants||[]))
  useEffect(()=>{load()},[])
  const addTenant=async()=>{ if(!name) return; await fetch("/api/tenants",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name})}); setName(""); load() }
  const delTenant=async(id:string)=>{ if(!confirm("Delete "+id+"?")) return; await fetch(`/api/tenants?id=${id}`,{method:"DELETE"}); load() }
  return <div style={{padding:20}}><h1>Tenants / Companies - Super Admin</h1><div style={{background:"#eee",padding:15}}><input placeholder="Company Name" value={name} onChange={e=>setName(e.target.value)} style={{padding:8,marginRight:10,width:250}}/><button onClick={addTenant} style={{padding:"8px 15px",background:"black",color:"white"}}>Add Company</button></div><p>Total: {tenants.length}</p><table border={1} cellPadding={10}><tr><th>ID</th><th>Name</th><th>Action</th></tr>{tenants.map((t:any)=><tr key={t.id}><td>{t.id}</td><td>{t.name}</td><td><button onClick={()=>delTenant(t.id)} style={{color:"red"}}>Delete</button></td></tr>)}</table></div>
}
