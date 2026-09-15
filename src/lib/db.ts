import { Redis } from "@upstash/redis"

let redis: Redis | null = null
try {
  if(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN){
    redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN })
  } else if(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN){
    redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN })
  }
} catch(e){ console.log("No Redis, using memory") }

// Memory fallback
const mem = global as any
if(!mem._store) mem._store = { tenants:[{id:"SWASAP", name:"SWASAP"}], workflows:[{id:"SWASAP-001", name:"SWASAP-001", status:"In Progress", companyId:"SWASAP", notes:[]}], machines:[], users:[] }

async function getList(key:string){
  if(redis){ const v=await redis.get(key); return v as any[] || [] }
  return mem._store[key]||[]
}
async function setList(key:string, val:any[]){
  if(redis){ await redis.set(key,val) } else { mem._store[key]=val }
}

export const db = {
  async getTenants(){ const list=await getList("tenants"); return list.length?list:mem._store.tenants },
  async setTenants(v:any[]){ await setList("tenants",v) },
  async getWorkflows(){ return await getList("workflows") },
  async setWorkflows(v:any[]){ await setList("workflows",v) },
  async getMachines(){ return await getList("machines") },
  async setMachines(v:any[]){ await setList("machines",v) },
  async getUsers(){ return await getList("users") },
  async setUsers(v:any[]){ await setList("users",v) },
}
