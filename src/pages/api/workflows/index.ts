import type { NextApiRequest, NextApiResponse } from "next"
import { getAll, setAll } from "../../lib/db"
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  let workflows = await getAll("workflows") as any[]
  const { companyId, id } = req.query
  if(req.method==="GET"){ let f=workflows; if(companyId) f=workflows.filter((w:any)=>w.companyId===companyId); return res.status(200).json({ workflows:f }) }
  if(req.method==="POST"){ const { name, status, companyId:cId } = req.body; const nw={ id:"wf-"+Date.now().toString().slice(-4), name, status:status||"In Progress", companyId:cId, notes:[], createdAt:new Date().toISOString() }; workflows.push(nw); await setAll("workflows", workflows); return res.status(201).json({ success:true, workflow:nw }) }
  if(req.method==="PUT"){ const { id:bid, note, status } = req.body; const w=workflows.find((x:any)=>x.id===id||x.id===bid); if(!w) return res.status(404).json({ error:"Not found" }); if(note) w.notes.push({ text:note, date:new Date().toISOString() }); if(status) w.status=status; await setAll("workflows", workflows); return res.status(200).json({ success:true }) }
  if(req.method==="DELETE"){ workflows = workflows.filter((w:any)=>w.id!==id); await setAll("workflows", workflows); return res.status(200).json({ success:true }) }
  return res.status(405).json({ error:"Method not allowed" })
}
