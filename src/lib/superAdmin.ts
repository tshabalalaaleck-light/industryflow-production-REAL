export const SUPER_ADMIN = {
  email: process.env.SUPER_ADMIN_EMAIL || "alecmshengu@outlook.com",
  password: process.env.SUPER_ADMIN_PASSWORD!,
  role: "SUPER_ADMIN" as const
};
export function isSuperAdmin(email: string) {
  return email.toLowerCase() === SUPER_ADMIN.email.toLowerCase();
}
