
import { PrismaClient } from '@prisma/client'; import { verifyJWT } from '../../lib/auth';
const prisma = new PrismaClient();
export default async function handler(req:any,res:any){
  try{
    const token = req.headers.authorization?.replace('Bearer ','');
    if(!token) return res.status(401).json({error:'No token'});
    const user = verifyJWT(token) as any;
    const companyFilter = user.role==='SuperAdmin' ? {} : {companyId: user.companyId};
    if(req.method==='GET'){
      const orders = await prisma.productionOrder.findMany({ where: companyFilter, include:{material:true, workflow:true, movements:true}, orderBy:{createdAt:'desc'} });
      return res.json(orders);
    }
    if(req.method==='POST'){
      const {customer, product, quantity, workflowId, materialId, plannedStart, plannedEnd, priority} = req.body;
      const companyId = user.role==='SuperAdmin' ? req.body.companyId : user.companyId;
      const number = `PO-2026-${Date.now().toString().slice(-5)}`;
      const po = await prisma.productionOrder.create({ data:{ companyId, number, customer, product, quantity, workflowId, materialId, plannedStart:new Date(plannedStart), plannedEnd:new Date(plannedEnd), priority, currentOperation:'Receiving', status:'Waiting', serialNumbers: Array.from({length:quantity},(_,i)=>`AX-${Date.now().toString().slice(-4)}-${String(i+1).padStart(4,'0')}`) } });
      await prisma.auditLog.create({ data:{ companyId, userId:user.id, action:`Created ${number} for ${customer}`, metadata:{poId:po.id}} });
      return res.json(po);
    }
    res.status(405).end();
  }catch(e:any){ res.status(500).json({error:e.message}); }
}
