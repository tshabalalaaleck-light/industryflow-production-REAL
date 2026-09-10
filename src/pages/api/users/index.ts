import type { NextApiRequest, NextApiResponse } from "next"
let users = [{ id: "1", email: "alecmshengu@outlook.com", role: "SUPER_ADMIN", companyId: "demo-company-123", name: "Alec Mshengu" }]
export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method==="GET") return res.status(200).json({ users })
  if(req.method==="POST"){ const { email, role, companyId, name } = req.body; const newUser={ id: Date.now().toString(), email, role: role||"USER", companyId: companyId||"demo-company-123", name: name||email }; users.push(newUser); return res.status(201).json({ success:true, user:newUser }) }
  if(req.method==="DELETE"){ const { id } = req.query; users = users.filter(u=>u.id!==id); return res.status(200).json({ success:true }) }
  return res.status(405).json({ error:"Method not allowed" })
}
