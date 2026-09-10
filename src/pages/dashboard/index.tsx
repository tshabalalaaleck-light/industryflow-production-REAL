import { useState, useEffect } from "react"

export default function Dashboard(){
  const [blooms,setBlooms]=useState({total:40, avail:30, alloc:4, consumed:6, rejected:0, machines:"10/17"})
  const [production,setProduction]=useState({routeCards:1, inProd:24, completed:0, quality:"100%"})
  const [movements,setMovements]=useState([
    {unit:"BT-2026-000004",stage:"Heat Treatment",operator:"Chulu",reject:"—",when:"8/18/2026, 7:37:51 PM"},
    {unit:"BT-2026-000022",stage:"Tempering",operator:"Chulu",reject:"—",when:"8/18/2026, 7:36:59 PM"},
    {unit:"BT-2026-000021",stage:"Heat Treatment",operator:"Chulu",reject:"—",when:"8/18/2026, 7:36:41 PM"},
    {unit:"BT-2026-000004",stage:"Heating",operator:"Chulu",reject:"—",when:"8/18/2026, 7:34:08 PM"},
    {unit:"BT-2026-000009",stage:"Heating",operator:"Chulu",reject:"—",when:"8/18/2026, 7:33:55 PM"},
    {unit:"BT-2026-000018",stage:"Heating",operator:"Chulu",reject:"—",when:"8/18/2026, 7:33:58 PM"},
  ])
  const [users,setUsers]=useState<any[]>([])
  useEffect(()=>{fetch("/api/users").then(r=>r.json()).then(d=>setUsers(d.users||[])).catch(()=>{}); fetch("/api/workflows").then(r=>r.json()).then(d=>{ if(d.workflows?.length){ setProduction(p=>({...p, routeCards:d.workflows.length, inProd:d.workflows.length*4})) } }).catch(()=>{})},[])

  return (
    <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"Inter, sans-serif"}}>
      {/* SIDEBAR - EXACT AS PHOTO */}
      <div style={{width:240, background:"#111118", borderRight:"1px solid #1f1f2e", padding:20, display:"flex", flexDirection:"column"}}>
        <div style={{marginBottom:30}}><div style={{color:"#ff7a00", fontWeight:900, fontSize:18, lineHeight:1}}>FORGING</div><div style={{color:"#ff7a00", fontWeight:900, fontSize:18, lineHeight:1}}>LINE ERP</div></div>
        <div style={{background:"#ff7a001a", color:"#ff7a00", padding:"8px 12px", borderRadius:6, fontSize:13, marginBottom:20}}>● Dashboard</div>
        <div style={{fontSize:10, color:"#666", letterSpacing:1, margin:"15px 0 8px"}}>GENEALOGY</div>
        {["Goods Receiving","Bloom Stock","Trace / Search"].map(i=><div key={i} style={{padding:"7px 0", color:"#999", fontSize:13, cursor:"pointer"}}>■ {i}</div>)}
        <div style={{fontSize:10, color:"#666", letterSpacing:1, margin:"15px 0 8px"}}>PRODUCTION</div>
        {["Production Orders","Route Cards","Production Board","Machines"].map(i=><div key={i} style={{padding:"7px 0", color:i==="Production Orders"?"#fff":"#999", fontSize:13, cursor:"pointer"}}>{i==="Production Orders"?"$ ":"○ "}{i}</div>)}
        <div style={{fontSize:10, color:"#666", letterSpacing:1, margin:"15px 0 8px"}}>QUALITY & PARTIES</div>
        {["Quality","Customers & Suppliers"].map(i=><div key={i} style={{padding:"7px 0", color:"#999", fontSize:13}}>✓ {i}</div>)}
        <div style={{fontSize:10, color:"#666", letterSpacing:1, margin:"15px 0 8px"}}>INSIGHTS</div>
        <div style={{padding:"7px 0", color:"#999", fontSize:13}}>■ Reports</div>
        <div style={{fontSize:10, color:"#666", letterSpacing:1, margin:"15px 0 8px"}}>ADMIN</div>
        <div onClick={()=>location.href="/dashboard/users"} style={{padding:"7px 0", color:"#999", fontSize:13, cursor:"pointer"}}>● Users ({users.length})</div>
        <div onClick={()=>location.href="/dashboard/tenants"} style={{padding:"7px 0", color:"#999", fontSize:13, cursor:"pointer"}}>▤ Licensing</div>
        <div style={{padding:"7px 0", color:"#999", fontSize:13}}>≡ Audit Log</div>
        <div style={{padding:"7px 0", color:"#999", fontSize:13}}>* Stage Settings</div>
        <div style={{marginTop:"auto", paddingTop:20, borderTop:"1px solid #1f1f2e"}}>
          <div style={{fontSize:12, color:"#fff"}}>Fifi Mshengu (Administrator)</div>
          <div style={{fontSize:10, color:"#ff7a00"}}>alecmshengu@outlook.com</div>
          <div onClick={()=>{localStorage.clear(); location.href="/"}} style={{fontSize:12, color:"#666", marginTop:10, cursor:"pointer"}}>Sign out</div>
        </div>
      </div>

      {/* MAIN - EXACT AS PHOTO */}
      <div style={{flex:1, padding:"25px 30px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:15}}>
          <div><h1 style={{fontSize:22, fontWeight:700, margin:0}}>Forging Line Dashboard</h1><div style={{fontSize:12, color:"#888"}}>Bloom-to-dispatch genealogy overview · 2026-09-10</div></div>
          <button style={{background:"#ff7a00", color:"white", border:"none", padding:"8px 16px", borderRadius:6, fontSize:13, fontWeight:600}}>+ Receive Blooms</button>
        </div>

        <div style={{background:"#0f2e1f", border:"1px solid #00ff88", color:"#00ff88", padding:"8px 14px", borderRadius:8, fontSize:12, marginBottom:20}}>
          ☁ Live cloud sync is active — connected to Firebase project "forging-line-erp". Everyone signed in to this deployment (any device, anywhere) shares this exact data in real time.
        </div>

        <div style={{fontSize:14, fontWeight:700, marginBottom:10}}>Materials</div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:15, marginBottom:25}}>
          <div style={{background:"#15151f", borderRadius:10, padding:18, borderBottom:"3px solid #ff7a00"}}
cd C:\Users\Alec\Downloads\industryflow-production-REAL
@'
import { useState, useEffect } from "react"

export default function Dashboard(){
  const [blooms,setBlooms]=useState({total:40, avail:30, alloc:4, consumed:6, rejected:0, machines:"10/17"})
  const [production,setProduction]=useState({routeCards:1, inProd:24, completed:0, quality:"100%"})
  const [movements,setMovements]=useState([
    {unit:"BT-2026-000004",stage:"Heat Treatment",operator:"Chulu",reject:"—",when:"8/18/2026, 7:37:51 PM"},
    {unit:"BT-2026-000022",stage:"Tempering",operator:"Chulu",reject:"—",when:"8/18/2026, 7:36:59 PM"},
    {unit:"BT-2026-000021",stage:"Heat Treatment",operator:"Chulu",reject:"—",when:"8/18/2026, 7:36:41 PM"},
    {unit:"BT-2026-000004",stage:"Heating",operator:"Chulu",reject:"—",when:"8/18/2026, 7:34:08 PM"},
    {unit:"BT-2026-000009",stage:"Heating",operator:"Chulu",reject:"—",when:"8/18/2026, 7:33:55 PM"},
    {unit:"BT-2026-000018",stage:"Heating",operator:"Chulu",reject:"—",when:"8/18/2026, 7:33:58 PM"},
  ])
  const [users,setUsers]=useState<any[]>([])
  useEffect(()=>{fetch("/api/users").then(r=>r.json()).then(d=>setUsers(d.users||[])).catch(()=>{}); fetch("/api/workflows").then(r=>r.json()).then(d=>{ if(d.workflows?.length){ setProduction(p=>({...p, routeCards:d.workflows.length, inProd:d.workflows.length*4})) } }).catch(()=>{})},[])

  return (
    <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"Inter, sans-serif"}}>
      {/* SIDEBAR - EXACT AS PHOTO */}
      <div style={{width:240, background:"#111118", borderRight:"1px solid #1f1f2e", padding:20, display:"flex", flexDirection:"column"}}>
        <div style={{marginBottom:30}}><div style={{color:"#ff7a00", fontWeight:900, fontSize:18, lineHeight:1}}>FORGING</div><div style={{color:"#ff7a00", fontWeight:900, fontSize:18, lineHeight:1}}>LINE ERP</div></div>
        <div style={{background:"#ff7a001a", color:"#ff7a00", padding:"8px 12px", borderRadius:6, fontSize:13, marginBottom:20}}>● Dashboard</div>
        <div style={{fontSize:10, color:"#666", letterSpacing:1, margin:"15px 0 8px"}}>GENEALOGY</div>
        {["Goods Receiving","Bloom Stock","Trace / Search"].map(i=><div key={i} style={{padding:"7px 0", color:"#999", fontSize:13, cursor:"pointer"}}>■ {i}</div>)}
        <div style={{fontSize:10, color:"#666", letterSpacing:1, margin:"15px 0 8px"}}>PRODUCTION</div>
        {["Production Orders","Route Cards","Production Board","Machines"].map(i=><div key={i} style={{padding:"7px 0", color:i==="Production Orders"?"#fff":"#999", fontSize:13, cursor:"pointer"}}>{i==="Production Orders"?"$ ":"○ "}{i}</div>)}
        <div style={{fontSize:10, color:"#666", letterSpacing:1, margin:"15px 0 8px"}}>QUALITY & PARTIES</div>
        {["Quality","Customers & Suppliers"].map(i=><div key={i} style={{padding:"7px 0", color:"#999", fontSize:13}}>✓ {i}</div>)}
        <div style={{fontSize:10, color:"#666", letterSpacing:1, margin:"15px 0 8px"}}>INSIGHTS</div>
        <div style={{padding:"7px 0", color:"#999", fontSize:13}}>■ Reports</div>
        <div style={{fontSize:10, color:"#666", letterSpacing:1, margin:"15px 0 8px"}}>ADMIN</div>
        <div onClick={()=>location.href="/dashboard/users"} style={{padding:"7px 0", color:"#999", fontSize:13, cursor:"pointer"}}>● Users ({users.length})</div>
        <div onClick={()=>location.href="/dashboard/tenants"} style={{padding:"7px 0", color:"#999", fontSize:13, cursor:"pointer"}}>▤ Licensing</div>
        <div style={{padding:"7px 0", color:"#999", fontSize:13}}>≡ Audit Log</div>
        <div style={{padding:"7px 0", color:"#999", fontSize:13}}>* Stage Settings</div>
        <div style={{marginTop:"auto", paddingTop:20, borderTop:"1px solid #1f1f2e"}}>
          <div style={{fontSize:12, color:"#fff"}}>Fifi Mshengu (Administrator)</div>
          <div style={{fontSize:10, color:"#ff7a00"}}>alecmshengu@outlook.com</div>
          <div onClick={()=>{localStorage.clear(); location.href="/"}} style={{fontSize:12, color:"#666", marginTop:10, cursor:"pointer"}}>Sign out</div>
        </div>
      </div>

      {/* MAIN - EXACT AS PHOTO */}
      <div style={{flex:1, padding:"25px 30px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:15}}>
          <div><h1 style={{fontSize:22, fontWeight:700, margin:0}}>Forging Line Dashboard</h1><div style={{fontSize:12, color:"#888"}}>Bloom-to-dispatch genealogy overview · 2026-09-10</div></div>
          <button style={{background:"#ff7a00", color:"white", border:"none", padding:"8px 16px", borderRadius:6, fontSize:13, fontWeight:600}}>+ Receive Blooms</button>
        </div>

        <div style={{background:"#0f2e1f", border:"1px solid #00ff88", color:"#00ff88", padding:"8px 14px", borderRadius:8, fontSize:12, marginBottom:20}}>
          ☁ Live cloud sync is active — connected to Firebase project "forging-line-erp". Everyone signed in to this deployment (any device, anywhere) shares this exact data in real time.
        </div>

        <div style={{fontSize:14, fontWeight:700, marginBottom:10}}>Materials</div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:15, marginBottom:25}}>
          <div style={{background:"#15151f", borderRadius:10, padding:18, borderBottom:"3px solid #ff7a00"}}><div style={{fontSize:10, color:"#aaa", letterSpacing:1}}>TOTAL BLOOMS</div><div style={{fontSize:28, fontWeight:800, margin:"5px 0"}}>{blooms.total}</div><div style={{fontSize:11, color:"#888"}}>{blooms.avail} available</div></div>
          <div style={{background:"#15151f", borderRadius:10, padding:18, borderBottom:"3px solid #00bfff"}}><div style={{fontSize:10, color:"#aaa", letterSpacing:1}}>ALLOCATED / RESERVED</div><div style={{fontSize:28, fontWeight:800, margin:"5px 0"}}>{blooms.alloc}</div><div style={{fontSize:11, color:"#888"}}>{blooms.consumed} consumed</div></div>
          <div style={{background:"#15151f", borderRadius:10, padding:18, borderBottom:"3px solid #ff4500"}}><div style={{fontSize:10, color:"#aaa", letterSpacing:1}}>REJECTED / SCRAPPED</div><div style={{fontSize:28, fontWeight:800, margin:"5px 0"}}>{blooms.rejected}</div><div style={{fontSize:11, color:"#888"}}>stock healthy</div></div>
          <div style={{background:"#15151f", borderRadius:10, padding:18, borderBottom:"3px solid #ff7a00"}}><div style={{fontSize:10, color:"#aaa", letterSpacing:1}}>MACHINES RUNNING</div><div style={{fontSize:28, fontWeight:800, margin:"5px 0"}}>{blooms.machines}</div><div style={{fontSize:11, color:"#888"}}>0 late order(s)</div></div>
        </div>

        <div style={{fontSize:14, fontWeight:700, marginBottom:10}}>Production</div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:15, marginBottom:25}}>
          <div style={{background:"#15151f", borderRadius:10, padding:18}}><div style={{fontSize:10, color:"#aaa", letterSpacing:1}}>ACTIVE ROUTE CARDS</div><div style={{fontSize:28, fontWeight:800, margin:"5px 0"}}>{production.routeCards}</div></div>
          <div style={{background:"#15151f", borderRadius:10, padding:18}}><div style={{fontSize:10, color:"#aaa", letterSpacing:1}}>AXLES IN PRODUCTION</div><div style={{fontSize:28, fontWeight:800, margin:"5px 0"}}>{production.inProd}</div></div>
          <div style={{background:"#15151f", borderRadius:10, padding:18}}><div style={{fontSize:10, color:"#aaa", letterSpacing:1}}>COMPLETED AXLES</div><div style={{fontSize:28, fontWeight:800, margin:"5px 0"}}>{production.completed}</div></div>
          <div style={{background:"#15151f", borderRadius:10, padding:18}}><div style={{fontSize:10, color:"#aaa", letterSpacing:1}}>QUALITY PASS RATE</div><div style={{fontSize:28, fontWeight:800, margin:"5px 0"}}>{production.quality}</div><div style={{fontSize:11, color:"#888"}}>0 rejected inspections</div></div>
        </div>

        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
          <div style={{fontSize:14, fontWeight:700}}>Recent Stage Movements</div>
          <div onClick={()=>location.href="/dashboard/workflows"} style={{fontSize:12, color:"#5da9ff", cursor:"pointer"}}>Production board →</div>
        </div>
        <div style={{background:"#15151f", borderRadius:10, padding:15}}>
          <div style={{display:"grid", gridTemplateColumns:"1.2fr 1fr 0.8fr 0.6fr 1.2fr", fontSize:10, color:"#666", letterSpacing:1, padding:"0 10px 10px", borderBottom:"1px solid #222"}}><div>UNIT</div><div>STAGE</div><div>OPERATOR</div><div>REJECTS</div><div>WHEN</div></div>
          {movements.map((m,i)=><div key={i} style={{display:"grid", gridTemplateColumns:"1.2fr 1fr 0.8fr 0.6fr 1.2fr", fontSize:13, padding:"12px 10px", borderBottom:"1px solid #1a1a28", color:"#ddd"}}><div>{m.unit}</div><div>{m.stage}</div><div>{m.operator}</div><div>{m.reject}</div><div style={{color:"#888"}}>{m.when}</div></div>)}
        </div>
      </div>
    </div>
  )
}
