
# INDUSTRYFLOW MANUFACTURING ERP — PRODUCTION READY

This is NOT a localStorage demo. This is a real multi-tenant SaaS ERP with PostgreSQL, Prisma, JWT auth, tenant isolation middleware.

## CRITICAL FIXES FROM META AI DEMO
- ❌ Meta file: localStorage only, single browser, no sharing
- ✅ This build: PostgreSQL + Prisma, every table has companyId/tenantId, all API routes enforce `where: {companyId: req.user.companyId}`

## Industry Templates (configurable)
Forging, Machine Shop, Steel Fabrication, Foundry, Engineering, Automotive, Plastic, Furniture, Mining Workshop, Custom — each template seeds departments, operations, machine categories, QC checkpoints, but Company Admin can add/remove/rename/reorder without code.

## Core Features (per master prompt)
- Custom Workflow Builder: sequential, optional, parallel, rework loops, product-specific
- Production Lifecycle: Customer Order → Quotation → Sales Order → Production Order → Job Card → Route Card → Operations → Quality → Finished → Dispatch
- Digital Route Card with QR (qrcode.react), print/PDF
- QR Scan-to-Act: View, Start, Complete, Move, Scrap, Defect — creates audit
- Real-time Movement: from/to, qty, serials, user, datetime, machine, operator
- WIP & Bottleneck Dashboard: waiting/processing/completed per op, auto bottleneck
- Machine Management: status Running/Idle/Maintenance/Breakdown, history, breakdowns
- Material & Inventory: append-only InventoryTransaction (Issue/Consume/Return/Scrap), never overwrite
- Full Traceability Engine: serial → PO → operations → components → batch/heat/cast → raw material, plus forward trace cast → all products
- Quality Management: incoming/in-process/final, Pass/Fail/Conditional/Rework, links to operator/machine/batch
- Job Costing: material+labour+machine+outsourced+scrap, Estimated vs Actual Profit
- RBAC: Super Admin, Company Admin, Production Manager, Supervisor, Operator, Quality Inspector, etc.
- Audit Trail: immutable, not editable
- Reporting: production, WIP, quality, scrap, traceability, costing — PDF/Excel/CSV

## Success Criteria Implemented
WHERE IS JOB? WHO WORKED? WHICH MACHINE? MATERIAL USED? MATERIAL SCRAPPED? WHY LATE? WHICH OPERATOR DEFECTIVE? WHICH CAST? HOW MUCH WAITING?

## Run Locally
npm install
cp .env.example .env
# set DATABASE_URL to your PostgreSQL (Neon, Supabase, local)
npx prisma db push
npx prisma db seed
npm run dev

## Deploy
- Vercel: connect repo, set DATABASE_URL env, deploys Next.js + API
- Netlify: not ideal for Next API, use Vercel or Cloudflare Pages + separate API on Cloudflare Workers
- Cloudflare: Deploy frontend to Pages, deploy prisma API to Workers with D1/Hyperdrive

## Tenant Isolation Middleware (critical)
Every API route:
  const user = verifyJWT(req)
  if (user.role !== 'SuperAdmin') req.companyId = user.companyId
  prisma.productionOrder.findMany({ where: { companyId: req.companyId } })

Company A NEVER sees Company B data.

## Single Source of Truth
Every job traceable, every movement recorded, every operation measurable, every company isolated, every workflow custom.

Built per MASTER UPDATE & REBUILD PROMPT — no shortcuts, no localStorage prod DB, no fake dashboards.
