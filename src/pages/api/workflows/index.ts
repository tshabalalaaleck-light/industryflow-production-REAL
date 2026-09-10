import type { NextApiRequest, NextApiResponse } from "next"
let workflows = [
  { id: "wf-001", name: "DEMO-001", status: "In Progress", companyId: "demo-company-123", notes: [], createdAt: new Date().toISOString() },
  { id: "wf-002", name: "SWASAP-001", status: "In Progress", companyId: "swasap-001", notes: [], createdAt: new Date().toISOString() }
]
export default function handler(req: NextApiRequest, res: NextApiResponse){
  const { companyId, id } = req.query
  if(req.method==="GET"){
    let filtered = workflows
    if(companyId) filtered = workflows.filter(w=>w.companyId===companyId)
    return res.status(200).json({ workflows: filtered })
  }
  if(req.method==="POST"){
    const { name, status, companyId: cId, notes } = req.body
    if(!name ||!cId) return res.status(400).json({ error:"Name & Company required" })
    const newWf = { id: "wf-"+Date.now().toString().slice(-4), name, status: status||"In Progress", companyId: cId, notes: notes||[], createdAt: new Date().toISOString() }
    workflows.push(newWf)
    return res.status(201).json({ success:true, workflow:newWf })
  }
  if(req.method==="PUT"){
    const { id: bodyId, note, status } = req.body
    const wf = workflows.find(w=>w.id=== (id as string) || w.id===bodyId)
    if(!wf) return res.status(404).json({ error:"Not found" })
    if(note){ wf.notes.push({ text: note, date: new Date().toISOString(), by: "User" }) }
    if(status) wf.status = status
    return res.status(200).json({ success:true, workflow:wf })
  }
  if(req.method==="DELETE"){
    workflows = workflows.filter(w=>w.id!==id)
    return res.status(200).json({ success:true })
  }
  return res.status(405).json({ error:"Method not allowed" })
}
