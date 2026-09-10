import { useState, useEffect } from "react"
export default function UsersPage(){
  const [users,setUsers]=useState<any[]>([]); const [email,setEmail]=useState(""); const [role,setRole]=useState("USER")
  const load=()=>fetch("/api/users").then(r=>r.json()).then(d=>setUsers(d.users||[]))
  useEffect(()=>{load()},[])
  const addUser=async()=>{ if(!email) return; await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,role,companyId:"demo-company-123"})}); setEmail(""); load() }
  const delUser=async(id:string)=>{ if(!confirm("Delete user?")) return; await fetch(`/api/users?id=${id}`,{method:"DELETE"}); load() }
  return <div style={{padding:20}}><h1>Users - Super Admin</h1><div style={{background:"#eee",padding:15}}><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:8,marginRight:10}}/><select value={role} onChange={e=>setRole(e.target.value)} style={{padding:8,marginRight:10}}><option>USER</option><option>ADMIN</option><option>SUPER_ADMIN</option></select><button onClick={addUser} style={{padding:"8px 15px",background:"black",color:"white"}}>Add User</button></div><p>Total: {users.length}</p><table border={1} cellPadding={10}><tr><th>Email</th><th>Role</th><th>Action</th></tr>{users.map((u:any)=><tr key={u.id}><td>{u.email}</td><td>{u.role}</td><td><button onClick={()=>delUser(u.id)} style={{color:"red"}}>Delete</button></td></tr>)}</table></div>
}
