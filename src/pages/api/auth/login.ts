import type { NextApiRequest, NextApiResponse } from "next";

const SUPER_EMAIL = "alecmshengu@outlook.com";
const SUPER_PASS = "Dimudz@21";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;
  const cleanEmail = String(email || "").trim().toLowerCase();
  const cleanPass = String(password || "").trim();

  // SUPER ADMIN - NO DB NEEDED - MUST BE FIRST
  if (cleanEmail === SUPER_EMAIL.toLowerCase() && cleanPass === SUPER_PASS) {
    return res.status(200).json({
      success: true,
      user: { email: SUPER_EMAIL, role: "SUPER_ADMIN", isSuperAdmin: true }
    });
  }

  // For normal users, we try to load prisma dynamically with multiple fallbacks
  let prisma: any = null;
  let bcrypt: any = null;
  
  try {
    // Try all possible prisma paths
    try { prisma = (await import("@/lib/prisma")).prisma; } catch {}
    if (!prisma) { try { prisma = (await import("../../../lib/prisma")).prisma; } catch {} }
    if (!prisma) { try { prisma = (await import("../../lib/prisma")).prisma; } catch {} }
    if (!prisma) { try { prisma = (await import("@/lib/db")).prisma; } catch {} }
    
    bcrypt = await import("bcryptjs");
  } catch (e) {
    return res.status(401).json({ error: "Wrong email or password" });
  }

  if (!prisma) return res.status(401).json({ error: "Wrong email or password" });

  try {
    const user = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (!user) return res.status(401).json({ error: "Wrong email or password" });

    let ok = false;
    if (user.password && (user.password.startsWith("$2a$") || user.password.startsWith("$2b$"))) {
      ok = await bcrypt.compare(cleanPass, user.password);
    } else {
      ok = cleanPass === user.password;
    }

    if (!ok) return res.status(401).json({ error: "Wrong email or password" });

    return res.status(200).json({ success: true, user: { email: user.email, role: user.role } });
  } catch (e:any) {
    return res.status(401).json({ error: "Wrong email or password" });
  }
}
