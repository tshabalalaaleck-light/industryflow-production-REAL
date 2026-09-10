import type { NextApiRequest, NextApiResponse } from "next"
let workflows = [
  { id: "wf-001", name: "DEMO-001", status: "In Progress", companyId: "demo-company-123", steps: ["Cutting"] },
  { id: "wf-002", name: "SWASAP-001", status: "In Progress", companyId: "swasap-001", steps: ["Forging"] }
]
export default function handler(req: NextApiRequest, res: NextApiResponse){
  const { companyId } = req.query
  if(req.method==="GET"){
    let filtered = workflows
    if(companyId) filtered = workflows.filter(w=>w.companyId===companyId)
    return res.status(200).json({ workflows: filtered })
  }
  if(req.method==="POST"){
    const { name, status, companyId: cId, steps } = req.body
    if(!name || !cId) return res.status(400).json({ error:"Name & Company required" })
    const newWf = { id: "wf-"+Date.now().toString().slice(-4), name, status: status||"In Progress", companyId: cId, steps: steps||["Cutting"] }
    workflows.push(newWf)
    return res.status(201).json({ success:true, workflow:newWf })
  }
  if(req.method==="DELETE"){
    const { id } = req.query
    workflows = workflows.filter(w=>w.id!==id)
    return res.status(200).json({ success:true })
  }
  return res.status(405).json({ error:"Method not allowed" })
}
