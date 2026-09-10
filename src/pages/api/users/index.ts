import type { NextApiRequest, NextApiResponse } from "next"
let users = [
  { id: "1", email: "alecmshengu@outlook.com", password:"Admin123!", role: "SUPER_ADMIN", companyId: "demo-company-123", name: "Alec Mshengu", title: "Super Admin" },
  { id: "2", email: "nkosi@swasap.cm", password:"Nkosi123!", role: "USER", companyId: "swasap-001", name: "Nkosi", title: "Manager" }
]
export default function handler(req: NextApiRequest, res: NextApiResponse){
  const { companyId } = req.query
  if(req.method==="GET"){
    let filtered = users
    if(companyId) filtered = users.filter(u=>u.companyId===companyId)
    const safe = filtered.map(({password,...u})=>u)
    return res.status(200).json({ users: safe, all: filtered })
  }
  if(req.method==="POST"){
    const { email, password, role, companyId: cId, name, title } = req.body
    if(!email ||!password ||!cId) return res.status(400).json({ error:"Email, Password & Company required" })
    if(users.find(u=>u.email.toLowerCase()===email.toLowerCase())) return res.status(400).json({ error:"User exists" })
    const newUser={ id: Date.now().toString(), email, password, role: role||"USER", companyId: cId, name: name||email, title: title||"Data Capturer" }
    users.push(newUser)
    return res.status(201).json({ success:true, user:{...newUser, password:undefined} })
  }
  if(req.method==="PUT"){
    const { id, title, role } = req.body
    const u = users.find(x=>x.id===id)
    if(!u) return res.status(404).json({ error:"Not found" })
    if(title) u.title = title
    if(role) u.role = role
    return res.status(200).json({ success:true, user:{...u, password:undefined} })
  }
  if(req.method==="DELETE"){ const { id } = req.query; users = users.filter(u=>u.id!==id); return res.status(200).json({ success:true }) }
  return res.status(405).json({ error:"Method not allowed" })
}
