import { kv } from "@vercel/kv"
// Fallback to memory if KV not setup yet
const mem = globalThis as any
mem._db = mem._db || { tenants: [{id:"demo-company-123",name:"Demo Company"},{id:"swasap-001",name:"SWASAP"}], users: [{id:"1",email:"alecmshengu@outlook.com",password:"Admin123!",role:"SUPER_ADMIN",companyId:"demo-company-123",title:"Super Admin"},{id:"2",email:"nkosi@swasap.cm",password:"Nkosi123!",role:"USER",companyId:"swasap-001",title:"Manager"}], workflows: [{id:"wf-001",name:"DEMO-001",status:"In Progress",companyId:"demo-company-123",notes:[]},{id:"wf-002",name:"SWASAP-001",status:"In Progress",companyId:"swasap-001",notes:[]}], machines: [{id:"m-001",name:"Do All Billet Saw",category:"Cutting",status:"Running",runningHrs:3249,downtime:11,workNumber:"SWASAP-001",companyId:"swasap-001"}] }

export async function getAll(key:string){
  try{ const data = await kv.get(key); if(data) return data; }catch(e){ }
  return mem._db[key] || []
}
export async function setAll(key:string, val:any){
  mem._db[key] = val
  try{ await kv.set(key,val); }catch(e){ }
  return val
}
