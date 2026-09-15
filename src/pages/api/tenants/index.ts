import type { NextApiRequest, NextApiResponse } from "next"
import { getAll, setAll } from "../../../lib/db"
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  let tenants = await getAll("tenants") as any[]
  if(req.method==="GET") return res.status(200).json({ tenants })
  if(req.method==="POST"){ const { name } = req.body; const newT = { id: name.toLowerCase().replace(/\s+/g,"-")+"-"+Date.now().toString().slice(-3), name }; tenants.push(newT); await setAll("tenants", tenants); return res.status(201).json({ success:true, tenant:newT }) }
  if(req.method==="DELETE"){ const { id } = req.query; tenants = tenants.filter((t:any)=>t.id!==id); await setAll("tenants", tenants); return res.status(200).json({ success:true }) }
  return res.status(405).json({ error:"Method not allowed" })
}
