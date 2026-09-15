const mem = (global as any)
if(!mem._store){
  mem._store = {
    tenants: [{id:"SWASAP", name:"SWASAP"}],
    workflows: [{id:"SWASAP-001", name:"SWASAP-001", status:"In Progress", companyId:"SWASAP", notes:[]}],
    machines: [],
    users: []
  }
}

export async function getAll(key:string){
  return mem._store[key] || []
}
export async function setAll(key:string, val:any[]){
  mem._store[key]=val
  try{
    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN
    if(url && token){
      // @ts-ignore - ignore if package not installed during build check
      const { Redis } = await import("@upstash/redis")
      const redis = new Redis({url, token})
      await redis.set(key, val)
    }
  }catch(e){}
  return val
}

export const db = {
  async getTenants(){ return await getAll("tenants") },
  async setTenants(v:any[]){ return await setAll("tenants", v) },
  async getWorkflows(){ return await getAll("workflows") },
  async setWorkflows(v:any[]){ return await setAll("workflows", v) },
  async getMachines(){ return await getAll("machines") },
  async setMachines(v:any[]){ return await setAll("machines", v) },
  async getUsers(){ return await getAll("users") },
  async setUsers(v:any[]){ return await setAll("users", v) },
}
