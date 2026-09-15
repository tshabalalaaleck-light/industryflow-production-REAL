const mem = (global as any)
if(!mem._store){
  mem._store = {
    tenants: [{id:"SWASAP", name:"SWASAP"}],
    workflows: [{id:"SWASAP-001", name:"SWASAP-001", status:"In Progress", companyId:"SWASAP", notes:[]}],
    machines: [],
    users: []
  }
}
async function getList(k:string){ return mem._store[k] || [] }
async function setList(k:string, v:any[]){ mem._store[k]=v }
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
