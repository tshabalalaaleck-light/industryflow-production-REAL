import type { NextApiRequest, NextApiResponse } from "next"
let users = [{ id: "1", email: "alecmshengu@outlook.com", password:"Admin123!", role: "SUPER_ADMIN", companyId: "demo-company-123", name: "Alec Mshengu" }]
export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method==="GET"){
    const safe = users.map(({password, ...u})=>u)
    return res.status(200).json({ users: safe, all: users })
  }
  if(req.method==="POST"){
    const { email, password, role, companyId, name } = req.body
    if(!email || !password) return res.status(400).json({ error:"Email & Password required" })
    if(users.find(u=>u.email===email)) return res.status(400).json({ error:"User exists" })
    const newUser={ id: Date.now().toString(), email, password, role: role||"USER", companyId: companyId||"demo-company-123", name: name||email }
    users.push(newUser)
    return res.status(201).json({ success:true, user:{...newUser, password:undefined} })
  }
  if(req.method==="DELETE"){ const { id } = req.query; users = users.filter(u=>u.id!==id); return res.status(200).json({ success:true }) }
  return res.status(405).json({ error:"Method not allowed" })
}
