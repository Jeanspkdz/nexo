# Peru opportunity research: catering, automotive workshops, and specialty contractors

**Research date:** 15 July 2026  
**Decision:** Which of these three growing Peruvian sectors offers the most practical, sellable software/automation MVP?

## Executive answer

The best first market is **independent automotive workshops**, specifically structured service shops (air-conditioning, tires/alignment/suspension, or bodywork/paint) that receive quotation requests through WhatsApp. The best first product is **not a workshop ERP**. It is a lightweight inquiry-to-estimate control layer: collect the minimum vehicle/job data, assign the estimate, alert on delays, send the human-approved quote, follow up, and show accepted/lost work.

The ranking is:

1. **Automotive workshops — inquiry-to-estimate follow-up**
2. **Catering/event-food operators — event brief-to-approved quotation**
3. **Specialty construction contractors — site visit-to-quote/change/evidence packet**

Construction has the strongest broad headline activity, but its workflows and buyer requirements vary most. Catering has a strong, relatively simple commercial workflow, but is seasonal and its 2025 monthly series was volatile. Automotive combines current activity growth, high-value transactions, an owner-accessible buyer, and the narrowest buildable workflow.

This is a desk-research ranking, not proof of willingness to pay. Official statistics establish sector momentum; vendor pages establish what products claim to offer and at what published price. Neither proves that Peruvian SMEs experience the proposed pain or will pay for this MVP.

## Evidence rules and common context

- **Official evidence:** Peruvian government statistics, registries, or regulatory services.
- **Vendor evidence:** what a supplier says its product does or costs. It is useful for mapping competition, not neutral proof of customer outcomes.
- **Inference:** a conclusion reasonably drawn from evidence but not directly measured.
- **Assumption:** a hypothesis that must be tested through a demo, paid pilot, or usage data.

Peru had 2,346,592 formal firms at year-end 2024; 99.1% were MYPE, while commerce and services represented 85.8% of the MYPE base ([PRODUCE](https://www.gob.pe/institucion/produce/noticias/1168972-produce-peru-cerro-el-2024-con-2-34-millones-de-empresas-formales)). This supports a large SME market but says nothing about software budgets. Household connectivity is high—OSIPTEL reported 96% of households with fixed or mobile internet and 95.4% with a smartphone in 2025 ([OSIPTEL ERESTEL 2025](https://www.osiptel.gob.pe/portal-del-usuario/noticias/erestel-2025-aumenta-a-96-los-hogares-peruanos-que-tienen-acceso-a-internet-fijo-o-movil/)). These are household measures, not business WhatsApp-adoption or SaaS-spend measures.

Electronic invoicing is already infrastructure, not a useful MVP wedge by itself. SUNAT offers its own electronic issuance systems and documents the available electronic document types ([SEE-SOL](https://www.gob.pe/institucion/sunat/pages/7332-sistema-de-emision-electronica-see-sol), [electronic document types](https://www.gob.pe/institucion/sunat/pages/26395-tipos-de-comprobantes-electronicos)). A new product should hand off to SUNAT-compatible providers rather than recreating tax compliance.

## Comparative scorecard

Scores are judgment calls from 1 (weak) to 5 (strong), not market statistics. Weights: market momentum 15%, pain/value 25%, likely ability to pay 20%, buyer accessibility 15%, MVP feasibility 15%, competitive opening 10%.

| Rank | Sector and wedge                                | Momentum | Pain/value | Pay | Buyer access | MVP | Opening |  Weighted |
| ---: | ----------------------------------------------- | -------: | ---------: | --: | -----------: | --: | ------: | --------: |
|    1 | Automotive — inquiry/estimate/follow-up         |      4.5 |        4.5 | 4.0 |          4.0 | 4.0 |     3.5 | **4.2/5** |
|    2 | Catering — event brief/costed quote/follow-up   |      4.0 |        4.0 | 3.5 |          4.0 | 3.5 |     3.5 | **3.8/5** |
|    3 | Construction — site visit/quote/change/evidence |      5.0 |        4.5 | 4.0 |          2.5 | 2.5 |     2.5 | **3.7/5** |

Construction loses narrowly despite stronger sector growth because a first-time builder faces specialty variation, deeper incumbents, per-project configuration, field adoption, and pressure to add costing, procurement, payroll, BIM, public-procurement, and accounting features.

## 1. Catering and event-food operators

### Market momentum and evidence limits

**Official evidence:** INEI reports that catering (`suministro de comidas por encargo`) grew **9.07% over full-year 2025**, driven by corporate and social-event contracts and customized requirements ([INEI December/full-year 2025 technical report, pp. 36–37](https://www.inei.gob.pe/media/MenuRecursivo/boletines/02-informe-tecnico-produccion-nacional-diciembre-2025.pdf)). The monthly path was volatile: April 2025 was reported up 34.56%, while December was down 13.28% year over year in the same statistical series ([INEI April 2025 report](https://www1.inei.gob.pe/media/MenuRecursivo/boletines/informe-tecnico_produccionnacional_abr2025.pdf), [INEI full-year report](https://www.inei.gob.pe/media/MenuRecursivo/boletines/02-informe-tecnico-produccion-nacional-diciembre-2025.pdf)).

**Evidence limit:** this aggregate does not size independent caterers, distinguish corporate contracts from weddings/private events, measure profitability, or prove durable multi-year growth. It supports momentum plus seasonality/volatility, not a precise TAM.

### Best ICP and core workflow

Best initial ICP (**inference/assumption**): Lima caterer with 3–20 staff, 8+ qualified event inquiries per month, average event above roughly S/1,500, repeatable menu/package components, and an owner or commercial coordinator handling WhatsApp/email quotations.

Workflow:

1. Lead asks about an event through WhatsApp, Instagram, email, or referral.
2. Coordinator collects date, venue, guest count, service style, menu, dietary needs, equipment/staffing, and budget.
3. Staff choose a package, calculate additions, prepare versions, and negotiate.
4. Client approves, pays a deposit, and supplies final counts.
5. Team turns the quote into production, purchasing, staffing, transport, and event checklists.
6. Balance, invoice, and follow-up close the event.

### Costly problems and current handling

The following are **assumptions requiring sales validation**: incomplete briefs cause repeated messaging; custom quotes take too long; version changes are lost; an outdated menu price damages margin; deposits/final-count deadlines are missed; approved details do not reliably reach kitchen/purchasing/service teams. Likely substitutes are WhatsApp, Excel/Google Sheets, Word/PDF templates, Google Calendar, Trello, and coordinator labor.

### Existing tool landscape

| Tool/category                             | Officially described capability                                                                                                                                                                                                                                                                                                                                                  | Published price/availability                                                                                                                                   | Strength                                    | Gap for target ICP                                                                                        |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Alegra Peru                               | SUNAT-compatible electronic invoices, quotations, inventory, purchasing and accounting ([product](https://www.alegra.com/peru/contabilidad/))                                                                                                                                                                                                                                    | Facturación plans S/49, S/59, S/99 and S/199 monthly, IGV included; features vary by tier ([prices](https://www.alegra.com/peru/factura-electronica/precios/)) | Local tax/accounting layer; low entry price | Not a catering-specific event brief, menu-version, staffing, or production workflow                       |
| Kommo                                     | Shared WhatsApp/Instagram inbox, pipelines, forms, tasks, bots, templates and AI assistance ([WhatsApp CRM](https://www.kommo.com/es/whatsapp/))                                                                                                                                                                                                                                 | US$15/US$25/US$45 per user/month, minimum six-month subscription; billing in USD ([prices](https://www.kommo.com/es/precios/comparar-planes/))                 | Strong messaging and lead automation        | Per-user cost/commitment; no event costing, menu constraints, production handoff, or SUNAT-native invoice |
| Restaurant POS products (Komanda, Toteat) | Local POS, sales/inventory and SUNAT invoicing; Toteat publishes a 0.7% net-sales plan ([Komanda](https://komanda.pe/), [Toteat Peru](https://toteat.com/es-pe/precios))                                                                                                                                                                                                         | Peru availability; pricing varies, Toteat publishes percentage-based plan                                                                                      | Transactional food operations               | Designed around orders/POS, not pre-sale event design and quote versions                                  |
| Caterease                                 | Specialized event manager, food/service/staffing items, proposals, per-guest totals and menu price/markup controls ([user guide](https://www.caterease.com/wp-content/uploads/CateringSoftDocs/ProgramGuidebooks/UsersGuide.pdf), [proposal fields](https://www.caterease.com/wp-content/uploads/CateringSoftDocs/ProgramGuidebooks/GB_v16_Creating_Custom_Merge_Documents.pdf)) | No Peru-local price confirmed in this research                                                                                                                 | Deep catering/event model                   | Localization, SUNAT integration, onboarding, and local affordability are unverified                       |
| WhatsApp Business + spreadsheets          | Messaging/catalog/templates plus flexible manual costing                                                                                                                                                                                                                                                                                                                         | Low software cost                                                                                                                                              | Familiar and adaptable                      | No reliable pipeline, structured brief, version/audit trail, or operational handoff                       |

**Competitive conclusion:** accounting/POS and general CRM are already available. The opening is not “all-in-one catering ERP”; it is a localized layer connecting the customer brief to a controlled, human-approved quote and downstream checklist.

### Best narrow opportunity

**Event brief-to-approved quote assistant:** a guided Spanish intake, package/rule-based quote draft, version comparison, margin guardrail, follow-up timers, deposit/final-count reminders, and one-click production summary. Every price remains human-approved.

Willingness to pay is **unproven**. It is plausibly medium when one incremental event or one avoided underquote covers several months, but seasonality and owner price sensitivity may cause churn. MVP complexity is medium: simple if constrained to one operator's packages; high if it calculates real-time ingredient costs, purchases, staff rosters, or arbitrary custom menus.

## 2. Independent automotive workshops

### Market momentum and evidence limits

**Official evidence:** INEI's annual national accounts put real value added for motor-vehicle maintenance and repair at S/3.711 billion in 2023 and S/3.803 billion in 2024, a **2.5%** annual increase ([INEI National Accounts 1950–2024, pp. 54–55](https://www.inei.gob.pe/media/MenuRecursivo/publicaciones_digitales/Est/Lib2046/libro.pdf)). INEI then reported the activity up **7.3% year on year in Q1 2025** and **11.7% in Q4 2025**; the broader sale, maintenance and repair grouping rose 6.95% in full-year 2025 ([INEI Q1 release](https://www.gob.pe/institucion/inei/noticias/1173385-pbi-crecio-3-9-en-el-primer-trimestre-de-2025), [INEI Q4/full-year release](https://www.gob.pe/institucion/inei/noticias/1357291-producto-bruto-interno-aumento-3-2-en-el-cuarto-trimestre-de-2025-y-durante-el-ano-2025-acumulo-un-crecimiento-de-3-4), [technical report, pp. 32–33](https://www.inei.gob.pe/media/MenuRecursivo/boletines/02-informe-tecnico-produccion-nacional-diciembre-2025.pdf)).

**Evidence limit:** the series does not isolate independent workshops, Lima, specific repair niches, revenue, number of establishments, or multi-year persistence. It supports current activity—not the proposed lead-leakage problem.

### Best ICP and workflow

Best initial ICP (**assumption**): independent workshop in Lima with 4–12 technicians, owner/service adviser as buyer, high use of WhatsApp, 50–100+ inbound inquiries monthly, average ticket above roughly S/250, and no disciplined CRM. Prefer air-conditioning, tires/alignment/suspension, or bodywork/paint over a one-person general mechanic because their initial questions and service packages are easier to template.

Workflow: inbound inquiry → vehicle/service/photo intake → diagnostic visit or estimate task → human price/parts decision → quote → customer approval/deposit → appointment/job card → status updates → invoice/payment → maintenance follow-up.

### Costly problems and current handling

**Assumptions:** chats lack plate/model/year/symptom/photos; service advisers interrupt technicians to obtain estimates; unassigned leads and quotes wait; there is no reason-lost record; customers repeatedly request status. Current substitutes likely include WhatsApp Business, calls, paper job cards, spreadsheets, workshop-management products, general CRM, and SUNAT invoicing tools.

### Existing tool landscape

| Tool/category                 | Capability/price                                                                                                                                                                                                                                   | Strength                                             | Remaining gap                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| TallerPro Peru                | Work orders, quotes/approval through WhatsApp, inventory, cash, Yape/card payments, technician app, and SUNAT via Nubefact; from **S/149 + IGV/month**, 30-day trial ([vendor](https://tallerpro.io/))                                             | Local direct competitor with a broad workshop flow   | SUNAT is described as pilot; exact unattended-quote recovery and real adoption need verification             |
| Mi Taller CRM                 | Work orders, leads, quotes, inventory, POS, WhatsApp, store and SUNAT; Basic **S/129.99/month**, Professional **S/189.99/month**, 15-day trial ([vendor](https://mitaller.com.pe/))                                                                | Strong local price anchor and direct module overlap  | A new MVP must beat it on setup, coexistence, or measurable recovery—not feature count                       |
| Appli-Car                     | Quotes/work orders, agenda, customer status/approval portal, inventory, assignments and notifications; declares Peru presence; Basic **US$25/month**, Advanced **US$32/month** ([vendor](https://www.appli-car.com/es/))                           | Low-cost regional suite                              | Page shows Chilean SII e-invoicing; Peru fiscal localization must be confirmed                               |
| AutoControl / EasyFact Peru   | Cloud ERP for vehicles, inventory, sales, profitability and SUNAT invoicing; no public price found ([vendor](https://easyfactperu.pe/))                                                                                                            | Local integrated suite                               | Price, onboarding cost and automated quote-follow-up depth require a sales demo                              |
| Alegra Peru                   | Quotations, electronic invoices, inventory, purchasing and accounting; S/49–S/199 monthly for published invoicing tiers ([product](https://www.alegra.com/peru/contabilidad/), [prices](https://www.alegra.com/peru/factura-electronica/precios/)) | Local tax/commercial back office                     | Does not own workshop intake, inspection, estimate SLA, or job-status conversation                           |
| Kommo                         | WhatsApp/Instagram pipeline, shared inbox, automation and AI; US$15–45/user/month with six-month minimum ([features](https://www.kommo.com/es/whatsapp/), [prices](https://www.kommo.com/es/precios/comparar-planes/))                             | Can already implement much of generic lead follow-up | Requires configuration; no vehicle/job/inspection model, parts/labor estimate handoff, or workshop reporting |
| Odoo                          | CRM, quotations, inventory, purchasing, projects, appointments and other integrated apps ([pricing/product scope](https://www.odoo.com/es/pricing))                                                                                                | Broad extensible ERP                                 | Implementation/localization burden; may be too broad for a small workshop and still needs workflow design    |
| SUNAT / invoicing providers   | Electronic tax documents and APIs/services                                                                                                                                                                                                         | Mandatory/compliant output                           | Not customer acquisition, workshop execution, or follow-up                                                   |
| WhatsApp Business/paper/Excel | Familiar, cheap, flexible                                                                                                                                                                                                                          | Near-zero switching barrier                          | Fragmented accountability and weak measurable pipeline                                                       |

The local offers are the most important competitive correction: “ERP for workshops” is already available around **S/130–149/month**, with free trials and WhatsApp/SUNAT claims. The existence of TallerPro, Mi Taller, Appli-Car, AutoControl, Kommo and Odoo means a generic “WhatsApp CRM for workshops” is not defensible. The wedge must be **opinionated workflow + fast setup + measurable estimate recovery**, ideally integrating with—not replacing—the current invoicing/job-card system. A second viable business model is implementation/automation service on top of an incumbent rather than proprietary software on day one.

### Best narrow opportunity

**Inquiry-to-estimate control:** structured vehicle/job intake; lead owner and timer; missing-data prompts; estimate task; human-edited quotation message; two approved follow-ups; accepted/lost reason; appointment/deposit handoff; weekly response, quote, and conversion report.

Willingness to pay is **unproven but plausibly highest of the three** because a single repair order can be valuable and the owner can observe accepted work. MVP complexity is medium-low if it never diagnoses, prices parts/labor, manages stock, or generates tax documents.

## 3. Small and specialty construction contractors

### Market momentum and evidence limits

**Official evidence:** construction output grew **6.67% in 2025**. INEI attributes this to private residential, commercial, industrial and infrastructure works plus public works; local-government public construction grew 19.56% ([INEI technical report, pp. 30–31](https://www.inei.gob.pe/media/MenuRecursivo/boletines/02-informe-tecnico-produccion-nacional-diciembre-2025.pdf)). Domestic cement consumption increased 7.50% over 2025 ([INEI](https://www.gob.pe/institucion/inei/noticias/1345083-consumo-interno-de-cemento-aumento-18-05-en-diciembre-2025-y-durante-el-ano-2025-acumulo-un-incremento-de-7-50)).

**Evidence limit:** public infrastructure and large private projects can drive these indicators; they do not prove uniform growth or profitability among small electricians, HVAC installers, metalworkers, remodelers, finishers, or maintenance contractors.

### Best ICP and workflow

Do not target “construction” horizontally. Best initial ICP (**inference**) is one repeatable specialty—commercial HVAC, electrical installations, metalwork, fit-out, waterproofing, or facility maintenance—with 5–30 field workers, 5+ active quotations monthly, recurring site visits, and private B2B clients. Avoid general contractors and public works first.

Workflow: inquiry/RFQ → site visit and measurements/photos → scope/quantities/cost estimate → quote and negotiation → contract/PO → crew/material plan → daily evidence and changes → progress valuation/approval → invoice/collection → closeout.

### Costly problems and current handling

**Assumptions:** site data is scattered across WhatsApp and photos; quotes wait for measurements and cost inputs; scope changes lack approval; crews use outdated documents; payment valuations lack organized evidence. Current substitutes include WhatsApp, Excel, folders, paper sign-offs, S10, general accounting/ERP, and field-management products.

### Existing tool landscape

| Tool           | Officially described scope                                                                                                                                                                                                                                                             | Published price/availability                                                                                                                                                                                         | Strength                                                 | Gap/barrier for small specialty contractor                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| S10 ERP (Peru) | Modular budgets, planning, purchases, project management, payroll, real estate sales, finance/accounting ([S10 overview](https://www.s10peru.com/)); budget module supports work-specific sales/baseline budgets and price analysis ([budgets](https://www.s10peru.com/presupuestos/)) | Peru-native; price by sales contact, not publicly confirmed                                                                                                                                                          | Deep local construction model and established vocabulary | Implementation/training depth; product is broader than a fast mobile site-to-quote workflow   |
| Procore        | Project/field/financial collaboration for owners, GCs and specialty contractors ([platform](https://www.procore.com/es-es), [project management](https://www.procore.com/es-es/gestion-de-proyectos))                                                                                  | Custom annual upfront price based on selected products and annual construction volume ([pricing](https://www.procore.com/es-es/tarificacion))                                                                        | Comprehensive connected construction platform            | Enterprise-style sale and price; excessive for a small first customer                         |
| Fieldwire      | Plans, tasks, photos, checklists; paid tiers add reports, forms, integrations, RFIs, change orders and budget                                                                                                                                                                          | Free up to 5 users/3 projects/100 sheets; US$39, $64, $89 per user/month billed annually ([pricing](https://www.fieldwire.com/pricing/))                                                                             | Easy field collaboration and transparent entry tier      | Not Peru/SUNAT-specific; paid per-user cost; not lead/site-visit-to-commercial-quote oriented |
| PlanRadar      | Drawings, tickets, photos, forms, signatures, document versions, approvals, reports and AI workflows ([platform](https://www.planradar.com/es/plataforma/))                                                                                                                            | Basic US$32/user/month annual; Starter US$107; Pro US$159; Enterprise custom on displayed USD pricing ([prices](https://www.planradar.com/es/precios/))                                                              | Strong field evidence and reporting                      | Price and scope favor formal project teams; local tax/quote handoff not established           |
| Alegra/Odoo    | General quotation, purchasing, inventory, project and accounting capabilities                                                                                                                                                                                                          | Alegra Peru S/49–S/199 for published invoicing tiers; Odoo publishes configurable subscription pricing ([Alegra](https://www.alegra.com/peru/factura-electronica/precios/), [Odoo](https://www.odoo.com/es/pricing)) | Accessible back office                                   | Lacks construction-specific quantities, site evidence, change control unless configured       |

**Competitive conclusion:** construction is not underserved in general. The opening is below or between established categories: a mobile, specialty-specific site capture that produces a quote/change/evidence packet and hands it to S10/Alegra/Odoo or PDF. Competing as another full project-management suite would be a poor MVP.

### Best narrow opportunity

**Structured site visit-to-quote/change/evidence packet** for one specialty. Mobile checklist captures measurements, photos, assumptions and exclusions; office staff approves unit costs and margin; system produces a versioned PDF/WhatsApp quote; approved changes and daily evidence become a payment-ready packet.

Willingness to pay is plausibly medium-high because project values are high and documentation can gate payment, but this is **an assumption**. MVP complexity is highest of the three: template design, offline/mobile work, attachments, permissions, revisions, and each specialty's costing logic all matter.

## Where the actual openings are

| Sector       | Do not build                                               | Better wedge                                                                                         |
| ------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Catering     | POS, generic CRM, full recipe/procurement ERP              | Complete event brief → controlled quote version → deposit/final-count reminders → production summary |
| Automotive   | Full workshop ERP, diagnosis, autonomous prices, inventory | Qualified inquiry → owned estimate task → approved quote → follow-up → accepted/lost value           |
| Construction | General project-management suite, BIM, S10 replacement     | Specialty site capture → approved quote/change → evidence packet → export/handoff                    |

All three share a useful product principle: **automate the commercial and documentary handoff around the incumbent system, not the incumbent system itself.**

## Recommended MVP

### Problem statement

Independent structured-service workshops receive vehicle-service inquiries in chats, but the details, estimate task, price approval, and follow-up are not consistently connected. A qualified inquiry can wait, receive no quote, or disappear after a quote without a recorded next action or outcome. This is a commercial hypothesis; Peru-wide leakage rates are not published.

### Solution statement

A WhatsApp-adjacent inquiry-to-estimate controller collects required vehicle/job information, assigns and times the human estimate, sends only staff-approved messages, follows up on a configured schedule, records acceptance/loss, and reports recovered work. It coordinates people; it does not diagnose vehicles or decide prices.

### Ideal first customer

- Lima air-conditioning or tires/alignment/suspension workshop.
- Owner/service adviser plus 4–12 technicians.
- Regular WhatsApp inquiries and quotes; no disciplined CRM.
- Average ticket sufficiently high that one incremental job can cover the monthly fee.
- Will use a demo with sample jobs, then pay for a 30-day pilot.
- Does not demand inventory, SUNAT invoicing, insurance claims, or ERP replacement.

### Core v1 features

1. Web inbox/import/forwarding method that avoids forced number migration during the demo.
2. Configurable vehicle and job intake with photo attachments.
3. Pipeline: new, missing data, awaiting estimate, quote sent, accepted, lost.
4. Estimate owner, due time, and overdue alert.
5. Human-editable quote message or attached PDF; no automatic price.
6. Two configurable follow-ups, opt-out, and instant human takeover.
7. Appointment/deposit handoff.
8. Weekly response-time, quotes-sent, accepted/lost, and attributable-value report.
9. Audit trail and minimum-data deletion controls.

### Avoid in v1

- Voice/phone agents.
- Diagnosis or repair recommendations.
- Automatic labor/parts pricing.
- Inventory, purchasing, accounting, SUNAT invoicing, payroll, or full ERP.
- Parts catalogs, insurer claims, predictive maintenance.
- Open-ended generative answers without approved sources and takeover.
- Multi-branch enterprise administration.

## Pricing hypothesis

These are experiments, not market evidence:

- **Demo:** free, using sample or manually entered jobs; no integration promise.
- **30-day paid pilot:** S/149, one location, setup included, capped usage.
- **Starter after demonstrated value:** S/249/month, one location and up to three staff.
- **Higher-volume hypothesis:** S/399/month with more staff, deposit/payment handoff, and custom reporting.

Why this is credible but unproven: local workshop suites establish direct anchors around S/130–149/month, Alegra establishes low-cost local software at S/49–199/month, while Kommo begins at US$15/user/month with a six-month minimum. A vertical product at S/249 must deliver more immediate, measurable quote recovery than those workshop suites, not merely a nicer pipeline. The buyer's actual alternative is also WhatsApp Business plus memory—not only paid software.

## Go-to-market: first five customers without a long interview program

1. **Build a clickable demo, not production infrastructure.** Use 10 realistic example inquiries and show intake, overdue estimate alert, approved quote, follow-up, and weekly recovered-value report.
2. **Choose one micro-vertical and two Lima clusters.** Air-conditioning or tires/alignment/suspension; compile 30 prospects from public listings and in-person observation.
3. **Sell through a 15-minute live workflow replay.** Ask for one recent anonymized inquiry while demonstrating; this is both discovery and sales, not a separate interview program.
4. **Offer five paid founding pilots.** S/149 for 30 days, manual onboarding, cancel at end; promise process coverage (every qualified inquiry has an owner/next action), never sales results.
5. **Operate concierge-style behind the MVP.** Manually configure templates and import leads where needed. Build integration only after two customers use the same workflow.
6. **Use a hard decision rule.** Pitch 25 qualified shops. Continue if at least 3 pay and at least 2 convert to S/249 after 30 days. If not, show the same level of demo to 15 caterers before expanding features.
7. **Get customers 4–5 from proof/referral.** Present before/after estimate latency and accepted-job evidence; give a referral credit only after the referred workshop pays.

## Risks and fastest validation

| Risk                                                             | Fast selling/demo/pilot test                                      | Stop or change signal                                                             |
| ---------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Workshops do not lose estimates                                  | Replay one recent day/week during demos; manually tag lead state  | Most prospects already quote/follow up reliably                                   |
| Owners will not pay                                              | Ask S/149 at the end of the demo, not “would you pay?”            | Fewer than 3 payments from 25 qualified pitches                                   |
| Generic CRM is good enough                                       | Demonstrate workshop-specific setup vs Kommo/manual process       | Buyer prefers configuring Kommo and sees no vertical value                        |
| Existing workshop ERP already solves it                          | Take a real trial/demo of TallerPro and Mi Taller before coding   | Quote-recovery alerts, follow-up and attribution are already simple and effective |
| Staff reject another inbox                                       | Concierge pilot beside existing WhatsApp                          | Persistent duplicate entry or missed handoffs after week one                      |
| WhatsApp API/number migration blocks adoption                    | Pilot forwarding/import before API; test a dedicated number early | No coexistence path owners accept                                                 |
| Value cannot be attributed                                       | Link accepted quote to job-card/payment reference                 | Outcomes cannot be reconciled                                                     |
| Automotive niche is too variable                                 | Use only one service category first                               | Intake/estimate steps differ in most shops                                        |
| Catering is actually easier to sell                              | Keep a catering demo storyboard ready as fallback                 | Caterers pay at a materially higher rate or adopt faster                          |
| Construction has larger contract value but impossible onboarding | Show one specialty template before coding                         | Every buyer requires different costing/ERP/public-work features                   |

## Data still needing verification before production build

1. Counts and geographic density of independent workshops, caterers, and specialty contractors by target micro-vertical.
2. Multi-year durability of 2025 activity growth.
3. Real inquiry/quote volume, turnaround, conversion and reasons lost.
4. Average ticket, gross margin, seasonality, and value of one recovered sale.
5. Current paid software and satisfaction—not merely awareness.
6. Production WhatsApp coexistence, template, fee, consent, and opt-out requirements at launch date.
7. Staff adoption and duplicate-work rate.
8. Paid conversion at S/149 and retention at S/249.
9. For catering: menu/version complexity, deposit/final-count failure frequency, and event seasonality.
10. For construction: which specialty has the most repeatable site-to-quote template and whether S10/Alegra exports are required.
11. Current Peruvian personal-data obligations and processor contracts; obtain local legal review before storing customer conversations or vehicle/site data.

## Final recommendation

**Build the automotive workshop inquiry-to-estimate controller first because** it has the best combination of current Peruvian activity growth, owner-accessible buyers, high-value transactions, measurable commercial outcomes, and a narrow MVP that can sit beside existing WhatsApp and invoicing tools. Catering is the best fallback if workshop owners will not pay; construction may support larger contracts later, but is the worst first build because specialty variation and incumbent-system expectations create the highest implementation and sales risk.
