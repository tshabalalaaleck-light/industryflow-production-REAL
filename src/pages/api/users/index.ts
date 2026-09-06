import type { NextApiRequest, NextApiResponse } from "next"

// In-memory demo - later we connect to Prisma
let USERS = [
  { id:"1", email:"alecmshengu@outlook.com", role:"SUPER_ADMIN", name:"Alec Mshengu" },
  { id:"2", email:"admin@industryflow.co.za", role:"ADMIN", name:"Demo Admin" }
]

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === "GET"){
    return res.json({ users: USERS })
  }
  if(req.method === "POST"){
    const { email, role, name } = req.body
    if(!email) return res.status(400).json({error:"Email required"})
    const newUser = { id: Date.now().toString(), email, role: role||"USER", name: name||email }
    USERS.push(newUser)
    return res.json({ success:true, user:newUser })
  }
  if(req.method === "DELETE"){
    const { id } = req.query
    USERS = USERS.filter(u=>u.id !== id)
    return res.json({ success:true })
  }
  return res.status(405).json({error:"Method not allowed"})
}