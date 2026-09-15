import type { NextApiRequest, NextApiResponse } from "next"
import { getAll, setAll } from "../../lib/db"
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  let users = await getAll("users") as any[]
  const { companyId } = req.query
  if(req.method==="GET"){ let f=users; if(companyId) f=users.filter((u:any)=>u.companyId===companyId); return res.status(200).json({ users: f.map(({password,...u}:any)=>u), all:f }) }
  if(req.method==="POST"){ const { email, password, role, companyId:cId, title } = req.body; if(users.find((u:any)=>u.email.toLowerCase()===email.toLowerCase())) return res.status(400).json({ error:"User exists" }); const nu={ id:Date.now().toString(), email, password, role:role||"USER", companyId:cId, title:title||"Data Capturer" }; users.push(nu); await setAll("users", users); return res.status(201).json({ success:true, user:nu }) }
  if(req.method==="DELETE"){ const { id } = req.query; users = users.filter((u:any)=>u.id!==id); await setAll("users", users); return res.status(200).json({ success:true }) }
  return res.status(405).json({ error:"Method not allowed" })
}
