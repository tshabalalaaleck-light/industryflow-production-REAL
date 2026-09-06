import type { NextApiRequest, NextApiResponse } from "next"

let WORKFLOWS = [
  { id:"1", name:"Forging", steps:["Heating","Forging","Trimming","QC"], active:true },
  { id:"2", name:"Heat Treatment", steps:["Hardening","Tempering"], active:true }
]

export default function handler(req:NextApiRequest, res:NextApiResponse){
  if(req.method==="GET") return res.json({ workflows: WORKFLOWS })
  if(req.method==="POST"){
    const { name, steps } = req.body
    const wf = { id:Date.now().toString(), name, steps: steps||[], active:true }
    WORKFLOWS.push(wf)
    return res.json({success:true, workflow:wf})
  }
  if(req.method==="DELETE"){
    const { id } = req.query
    WORKFLOWS = WORKFLOWS.filter(w=>w.id !== id)
    return res.json({success:true})
  }
  return res.status(405).json({error:"Method not allowed"})
}
