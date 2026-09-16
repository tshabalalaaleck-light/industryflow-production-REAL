import type { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method!== "POST") return res.status(405).end();
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "").trim();
  // SUPER ADMIN - ALWAYS 200
  if (email === "alecmshengu@outlook.com" && password === "Dimudz@21") {
    return res.status(200).json({ success: true, user: { email: "alecmshengu@outlook.com", role: "SUPER_ADMIN" } });
  }
  return res.status(401).json({ error: "Wrong email or password" });
}
