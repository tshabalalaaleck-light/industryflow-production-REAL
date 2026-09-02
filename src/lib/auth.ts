
import jwt from 'jsonwebtoken'; import bcrypt from 'bcryptjs';
export async function hashPassword(p:string){ return bcrypt.hash(p,10); }
export async function verifyPassword(p:string,h:string){ return bcrypt.compare(p,h); }
export function signToken(payload:any){ return jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn:'7d'}); }
export function verifyJWT(token:string){ return jwt.verify(token, process.env.JWT_SECRET!) as any; }
// Middleware: enforce tenant isolation
export function requireCompany(req:any){
  const user = verifyJWT(req.headers.authorization?.replace('Bearer ',''));
  if(user.role==='SuperAdmin') return null; // can access all with explicit company filter
  return user.companyId;
}
