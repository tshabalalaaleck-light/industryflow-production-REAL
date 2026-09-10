import type { NextApiRequest, NextApiResponse } from "next"
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== "POST") return res.status(405).json({error:"Method not allowed"})
  const { email, password } = req.body
  if(email === "alecmshengu@outlook.com" && password === "Admin123!"){
    return res.status(200).json({ success: true, user: { email: "alecmshengu@outlook.com", role: "SUPER_ADMIN", companyId: "demo-company-123", name: "Alec Mshengu" }, companyId: "demo-company-123" })
  }
  return res.status(401).json({ success:false, error:"Invalid email or password" })
}
