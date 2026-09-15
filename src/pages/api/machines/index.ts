import type { NextApiRequest, NextApiResponse } from "next"
import { getAll, setAll } from "../../lib/db"
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  let machines = await getAll("machines") as any[]
  const { companyId, id } = req.query
  if(req.method==="GET"){ let f=machines; if(companyId) f=machines.filter((m:any)=>m.companyId===companyId); return res.status(200).json({ machines:f }) }
  if(req.method==="POST"){ const { name, category, status, runningHrs, downtime, workNumber, companyId:cId } = req.body; const nm={ id:"m-"+Date.now().toString().slice(-4), name, category, status, runningHrs:parseFloat(runningHrs)||0, downtime:parseInt(downtime)||0, workNumber, companyId:cId }; machines.push(nm); await setAll("machines", machines); return res.status(201).json({ success:true }) }
  if(req.method==="PUT"){ const { id:bid, status, workNumber } = req.body; const m=machines.find((x:any)=>x.id===id||x.id===bid); if(m){ if(status) m.status=status; if(workNumber!==undefined) m.workNumber=workNumber; await setAll("machines", machines); } return res.status(200).json({ success:true }) }
  if(req.method==="DELETE"){ machines = machines.filter((m:any)=>m.id!==id); await setAll("machines", machines); return res.status(200).json({ success:true }) }
  return res.status(405).json({ error:"Method not allowed" })
}
