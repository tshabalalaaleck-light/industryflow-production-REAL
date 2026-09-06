import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== "POST"){
    return res.status(405).json({error:"Method not allowed"})
  }

  const { email, password } = req.body

  // SUPER ADMIN - REAL LOGIN
  if(email === "alecmshengu@outlook.com" && password === "Admin123!"){
    return res.status(200).json({
      success: true,
      user: {
        email: "alecmshengu@outlook.com",
        role: "SUPER_ADMIN",
        companyId: "demo-company-123",
        name: "Alec Mshengu"
      },
      companyId: "demo-company-123"
    })
  }

  // Optional: Allow your old demo login too
  if(email === "admin@industryflow.co.za" && password === "admin123"){
    return res.status(200).json({
      success: true,
      user: { email, role:"ADMIN", companyId:"demo-company-123" },
      companyId: "demo-company-123"
    })
  }

  return res.status(401).json({ success:false, error:"Invalid email or password" })
}