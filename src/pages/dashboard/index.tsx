export default function Dashboard(){
  return (
    <div style={{display:"flex", minHeight:"100vh", background:"#0a0a0f", color:"white", fontFamily:"sans-serif"}}>
      <div style={{width:240, background:"#111118", borderRight:"1px solid #222", padding:20}}>
        <div style={{color:"#ff7a00", fontWeight:900, fontSize:18}}>FORGING<br/>LINE ERP</div>
        <div style={{background:"#ff7a0022", color:"#ff7a00", padding:"8px 12px", borderRadius:6, fontSize:13, margin:"20px 0"}}>● Dashboard</div>
        <div style={{fontSize:10, color:"#666", margin:"15px 0 8px"}}>GENEALOGY</div>
        <div style={{color:"#999", fontSize:13, padding:"5px 0"}}>Goods Receiving</div>
        <div style={{color:"#999", fontSize:13, padding:"5px 0"}}>Bloom Stock</div>
        <div style={{color:"#999", fontSize:13, padding:"5px 0"}}>Trace / Search</div>
        <div style={{fontSize:10, color:"#666", margin:"15px 0 8px"}}>PRODUCTION</div>
        <div style={{color:"#fff", fontSize:13, padding:"5px 0"}}>Production Orders</div>
        <div style={{color:"#999", fontSize:13, padding:"5px 0"}}>Route Cards</div>
        <div style={{color:"#999", fontSize:13, padding:"5px 0"}}>Production Board</div>
        <div style={{color:"#999", fontSize:13, padding:"5px 0"}}>Machines</div>
        <div style={{fontSize:10, color:"#666", margin:"15px 0 8px"}}>ADMIN</div>
        <a href="/dashboard/users" style={{color:"#999", fontSize:13, padding:"5px 0", display:"block", textDecoration:"none"}}>Users</a>
        <a href="/dashboard/tenants" style={{color:"#999", fontSize:13, padding:"5px 0", display:"block", textDecoration:"none"}}>Tenants</a>
        <a href="/dashboard/workflows" style={{color:"#999", fontSize:13, padding:"5px 0", display:"block", textDecoration:"none"}}>Workflows</a>
      </div>
      <div style={{flex:1, padding:25}}>
        <h1 style={{fontSize:22, margin:0}}>Forging Line Dashboard</h1>
        <p style={{fontSize:12, color:"#888"}}>Bloom-to-dispatch genealogy overview - 2026-09-10</p>
        <div style={{background:"#0f2e1f", border:"1px solid #00ff88", color:"#00ff88", padding:"8px 14px", borderRadius:8, fontSize:12, margin:"15px 0"}}>Live cloud sync is active - connected to Firebase project "forging-line-erp"</div>
        
        <div style={{fontWeight:700, margin:"15px 0 10px"}}>Materials</div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:15}}>
          <div style={{background:"#15151f", borderRadius:10, padding:18, borderBottom:"3px solid #ff7a00"}}><div style={{fontSize:10, color:"#aaa"}}>TOTAL BLOOMS</div><div style={{fontSize:28, fontWeight:800}}>40</div><div style={{fontSize:11, color:"#888"}}>30 available</div></div>
          <div style={{background:"#15151f", borderRadius:10, padding:18, borderBottom:"3px solid #00bfff"}}><div style={{fontSize:10, color:"#aaa"}}>ALLOCATED / RESERVED</div><div style={{fontSize:28, fontWeight:800}}>4</div><div style={{fontSize:11, color:"#888"}}>6 consumed</div></div>
          <div style={{background:"#15151f", borderRadius:10, padding:18, borderBottom:"3px solid #ff4500"}}><div style={{fontSize:10, color:"#aaa"}}>REJECTED / SCRAPPED</div><div style={{fontSize:28, fontWeight:800}}>0</div><div style={{fontSize:11, color:"#888"}}>stock healthy</div></div>
          <div style={{background:"#15151f", borderRadius:10, padding:18, borderBottom:"3px solid #ff7a00"}}><div style={{fontSize:10, color:"#aaa"}}>MACHINES RUNNING</div><div style={{fontSize:28, fontWeight:800}}>10/17</div><div style={{fontSize:11, color:"#888"}}>0 late order(s)</div></div>
        </div>

        <div style={{fontWeight:700, margin:"20px 0 10px"}}>Production</div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:15}}>
          <div style={{background:"#15151f", borderRadius:10, padding:18}}><div style={{fontSize:10, color:"#aaa"}}>ACTIVE ROUTE CARDS</div><div style={{fontSize:28, fontWeight:800}}>1</div></div>
          <div style={{background:"#15151f", borderRadius:10, padding:18}}><div style={{fontSize:10, color:"#aaa"}}>AXLES IN PRODUCTION</div><div style={{fontSize:28, fontWeight:800}}>24</div></div>
          <div style={{background:"#15151f", borderRadius:10, padding:18}}><div style={{fontSize:10, color:"#aaa"}}>COMPLETED AXLES</div><div style={{fontSize:28, fontWeight:800}}>0</div></div>
          <div style={{background:"#15151f", borderRadius:10, padding:18}}><div style={{fontSize:10, color:"#aaa"}}>QUALITY PASS RATE</div><div style={{fontSize:28, fontWeight:800}}>100%</div><div style={{fontSize:11, color:"#888"}}>0 rejected inspections</div></div>
        </div>

        <div style={{fontWeight:700, margin:"20px 0 10px"}}>Recent Stage Movements</div>
        <div style={{background:"#15151f", borderRadius:10, padding:15}}>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", fontSize:10, color:"#666", paddingBottom:10, borderBottom:"1px solid #222"}}><span>UNIT</span><span>STAGE</span><span>OPERATOR</span><span>REJECTS</span><span>WHEN</span></div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", fontSize:13, padding:"10px 0", borderBottom:"1px solid #1a1a28"}}><span>BT-2026-000004</span><span>Heat Treatment</span><span>Chulu</span><span>-</span><span style={{color:"#888"}}>8/18/2026, 7:37:51 PM</span></div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", fontSize:13, padding:"10px 0", borderBottom:"1px solid #1a1a28"}}><span>BT-2026-000022</span><span>Tempering</span><span>Chulu</span><span>-</span><span style={{color:"#888"}}>8/18/2026, 7:36:59 PM</span></div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", fontSize:13, padding:"10px 0", borderBottom:"1px solid #1a1a28"}}><span>BT-2026-000021</span><span>Heat Treatment</span><span>Chulu</span><span>-</span><span style={{color:"#888"}}>8/18/2026, 7:36:41 PM</span></div>
        </div>
      </div>
    </div>
  )
}
