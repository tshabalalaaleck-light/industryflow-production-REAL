import { useState, useEffect } from "react"
export default function UsersPage(){
  const [users,setUsers]=useState<any[]>([])
  useEffect(()=>{fetch("/api/users").then(r=>r.json()).then(d=>setUsers(d.users||d||[]))},[])
  return <div style={{padding:20}}><h1>Users - Super Admin</h1><p>Total: {users.length}</p><table border={1} cellPadding={10}><tr><th>Email</th><th>Role</th></tr>{users.map((u:any)=><tr key={u.id}><td>{u.email}</td><td>{u.role}</td></tr>)}</table></div>
}
