import type { NextApiRequest, NextApiResponse } from "next";

const SUPER_EMAIL = "alecmshengu@outlook.com";
const SUPER_PASS = "Dimudz@21";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;
  const cleanEmail = String(email || "").trim().toLowerCase();
  const cleanPass = String(password || "").trim();

  // === SUPER ADMIN - NO DB - ALWAYS WORKS ===
  if (cleanEmail === SUPER_EMAIL.toLowerCase() && cleanPass === SUPER_PASS) {
    return res.status(200).json({
      success: true,
      user: { email: SUPER_EMAIL, role: "SUPER_ADMIN", isSuperAdmin: true }
    });
  }

  // === NORMAL USERS - Try DB only after super admin fails ===
  try {
    const { prisma } = await import("@/lib/prisma");
    const bcrypt = await import("bcryptjs");

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
    console.error(e);
    return res.status(401).json({ error: "Wrong email or password - DB error: " + e.message });
  }
}
