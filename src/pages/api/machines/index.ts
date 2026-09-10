import type { NextApiRequest, NextApiResponse } from "next"
let machines = [
  { id: "m-001", name: "Do All Billet Saw", category: "Cutting", status: "Running", runningHrs: 3249.0, downtime: 11, workNumber: "SWASAP-001", companyId: "swasap-001" },
  { id: "m-002", name: "Electrical Heating Coils", category: "Heating", status: "Running", runningHrs: 1015.0, downtime: 17, workNumber: "SWASAP-001", companyId: "swasap-001" },
  { id: "m-003", name: "Gas Furnace", category: "Heating", status: "Running", runningHrs: 3230.0, downtime: 26, workNumber: "DEMO-001", companyId: "demo-company-123" },
  { id: "m-004", name: "GFM CNC Forge", category: "Forging", status: "Idle", runningHrs: 765.0, downtime: 15, workNumber: "DEMO-001", companyId: "demo-company-123" },
  { id: "m-005", name: "Hardening Furnace", category: "Heat Treatment", status: "Running", runningHrs: 1134.0, downtime: 4, workNumber: "", companyId: "demo-company-123" },
  { id: "m-006", name: "Tempering Furnace", category: "Heat Treatment", status: "Running", runningHrs: 2521.0, downtime: 14, workNumber: "", companyId: "swasap-001" },
  { id: "m-007", name: "Quench Tank", category: "Quenching", status: "Idle", runningHrs: 3023.0, downtime: 16, workNumber: "", companyId: "swasap-001" }
]
export default function handler(req: NextApiRequest, res: NextApiResponse){
  const { companyId, id } = req.query
  if(req.method==="GET"){
    let filtered = machines
    if(companyId) filtered = machines.filter(m=>m.companyId===companyId)
    return res.status(200).json({ machines: filtered })
  }
  if(req.method==="POST"){
    const { name, category, status, runningHrs, downtime, workNumber, companyId: cId } = req.body
    if(!name ||!cId) return res.status(400).json({ error:"Name & Company required" })
    const newM = { id: "m-"+Date.now().toString().slice(-4), name, category: category||"Cutting", status: status||"Idle", runningHrs: parseFloat(runningHrs)||0, downtime: parseInt(downtime)||0, workNumber: workNumber||"", companyId: cId }
    machines.push(newM)
    return res.status(201).json({ success:true, machine:newM })
  }
  if(req.method==="PUT"){
    const { id: bodyId, status, workNumber } = req.body
    const m = machines.find(x=>x.id=== (id as string) || x.id===bodyId)
    if(!m) return res.status(404).json({ error:"Not found" })
    if(status) m.status = status
    if(workNumber!==undefined) m.workNumber = workNumber
    return res.status(200).json({ success:true, machine:m })
  }
  if(req.method==="DELETE"){ machines = machines.filter(m=>m.id!==id); return res.status(200).json({ success:true }) }
  return res.status(405).json({ error:"Method not allowed" })
}
