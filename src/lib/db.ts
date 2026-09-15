import { Redis } from "@upstash/redis"

let redis: Redis | null = null
try {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  if(url && token){
    redis = new Redis({ url, token })
  }
} catch(e){
  console.log("Redis not configured, using memory")
}

const mem = (global as any)
if(!mem._store){
  mem._store = {
    tenants: [{id:"SWASAP", name:"SWASAP"}],
    workflows: [{id:"SWASAP-001", name:"SWASAP-001", status:"In Progress", companyId:"SWASAP", notes:[]}],
    machines: [],
    users: []
  }
}

async function getList(k:string){
  if(redis){
    try{ const v = await redis.get(k); if(Array.isArray(v)) return v }catch{}
  }
  return mem._store[k] || []
}

async function setList(k:string, v:any[]){
  mem._store[k]=v
  if(redis){
    try{ await redis.set(k,v) }catch{}
  }
}

export const db = {
  async getTenants(){ const l=await getList("tenants"); return l.length?l:mem._store.tenants },
  async setTenants(v:any[]){ await setList("tenants",v) },
  async getWorkflows(){ const l=await getList("workflows"); return l.length?l:mem._store.workflows },
  async setWorkflows(v:any[]){ await setList("workflows",v) },
  async getMachines(){ return await getList("machines") },
  async setMachines(v:any[]){ await setList("machines",v) },
  async getUsers(){ return await getList("users") },
  async setUsers(v:any[]){ await setList("users",v) },
}
