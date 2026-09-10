import type { NextApiRequest, NextApiResponse } from "next"
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method!=="POST") return res.status(405).json({error:"POST only"})
  const { email, password } = req.body
  try{
    const base = `http://${req.headers.host}`
    const r = await fetch(`${base}/api/users`)
    const data = await r.json()
    // data.all contains passwords (internal), data.users is safe
    const all = (data.all || data.users || [])
    const user = all.find((u:any)=>u.email.toLowerCase()===email.toLowerCase() && u.password===password)
    if(!user) return res.status(401).json({ error:"Wrong email or password" })
    return res.status(200).json({ success:true, user:{ id:user.id, email:user.email, role:user.role, companyId:user.companyId } })
  }catch(e){
    return res.status(500).json({ error:"Login failed" })
  }
}
