import type { NextApiRequest, NextApiResponse } from "next"
let tenants = [{ id: "demo-company-123", name: "Demo Company", status: "ACTIVE", createdAt: new Date().toISOString() }]
export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method==="GET") return res.status(200).json({ tenants })
  if(req.method==="POST"){ const { name } = req.body; const id=name.toLowerCase().replace(/\s+/g,"-")+"-"+Date.now().toString().slice(-4); const newTenant={ id, name, status:"ACTIVE", createdAt:new Date().toISOString() }; tenants.push(newTenant); return res.status(201).json({ success:true, tenant:newTenant }) }
  if(req.method==="DELETE"){ const { id } = req.query; tenants = tenants.filter(t=>t.id!==id); return res.status(200).json({ success:true }) }
  return res.status(405).json({ error:"Method not allowed" })
}
