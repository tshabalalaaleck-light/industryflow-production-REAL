import type { NextApiRequest, NextApiResponse } from "next"
let workflows = [
  { id: "wf-001", name: "DEMO-001", status: "In Progress", companyId: "demo-company-123", steps: ["Cutting","Forging","QC"] }
]
export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method==="GET") return res.status(200).json({ workflows })
  if(req.method==="POST"){
    const { name, status, steps } = req.body
    const newWf = { id: "wf-"+Date.now().toString().slice(-4), name, status: status||"In Progress", companyId: "demo-company-123", steps: steps||["Cutting"] }
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
