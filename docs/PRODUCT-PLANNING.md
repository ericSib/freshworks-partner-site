# Product Planning — What A Service (whataservice.fr)

> **Date** : 16 avril 2026 (derniere mise a jour)
> **Product Owner** : Eric Sib
> **Horizon** : Sprints 18-22 (5 semaines)
> **Sprint actif** : Sprint 18 — en cours (J5/7)

---

## 1 · Etat du produit

### Ce qui est livre

| Domaine | Statut | Chiffres |
|---|---|---|
| **Pages** | 4 pages live | Homepage, Quiz, Mentions legales, Pages maturite SEO |
| **API** | 3 endpoints | /api/contact, /api/quiz/submit, /api/health |
| **Composants** | 43 composants | 13 sections, 14 quiz, 2 layout, 3 SEO, 11 UI |
| **i18n** | Bilingue FR/EN | next-intl, 2 fichiers messages |
| **Integrations** | 4/5 operationnelles | Resend, HubSpot, GA4, Calendly. Freshchat : non configure |
| **Tests unitaires** | 684 tests, 27 fichiers | Coverage : 92.03% Stmts, 83.42% Branches |
| **Tests E2E** | 95 tests, 10 spec files | 0 fail, 0 flaky |
| **Mutation testing** | 71.43% (5 modules) | Stryker operationnel, threshold 65% |
| **CI** | 2 workflows | ci.yml (lint+test+build), e2e.yml (Playwright) |
| **SEO** | 83 tests, 9 schemas JSON-LD | FAQ, Organization, Person, Service, Breadcrumb |
| **Observabilite** | Logger JSON + X-Request-ID + deep health | D19, livre S18 |
| **Commits** | ~100 sur main | 11 jours de dev (5-16 avril) |

### Integrations

| Service | Statut | Usage |
|---|---|---|
| **HubSpot** | Operationnel | Contact form + Quiz leads (11 proprietes custom) |
| **Resend** | Operationnel | Notifications internes + confirmations prospects |
| **GA4** | Operationnel | Tracking avec consentement RGPD (cookie banner) |
| **Calendly** | Operationnel | Popup CTA "Reserver un appel" |
| **Freshchat** | Non configure | 0 reference dans le code |

---

## 2 · Sante du backlog

### Diagnostic

Les 3 backlogs existants sont **significativement obsoletes** :

| Backlog | Stories totales | Deja done | Vraiment restantes |
|---|---|---|---|
| BACKLOG-REFONTE-PREMIUM.md | 8 stories | 5 (US-10.1, 10.2, 11.1, 16.1, 8.1) | 3 (blog, ROI calc, CWV) |
| BACKLOG-AUDIT-REMEDIATION.md | 16 stories | 11 | 5 (a11y contrast, CSP, grain, Button, useReducedMotion) |
| E22-SEO-GEO-BACKLOG.md | ~12 stories | ~10 | 2 (OG image v2, tests complementaires) |

**70% des stories dans les backlogs sont deja livrees.** Le premier chantier est d'assainir.

---

## 3 · Ce qui reste vraiment a faire

### A · Remediation & dette technique (~8 pts)

| # | Story | Pts | Priorite | Impact |
|---|---|---|---|---|
| 1 | Fix a11y color contrast (supprimer `disableRules` workaround) | 2 | Should | A11y WCAG AA |
| 2 | CSP + Calendly CSS hardening | 2 | Should | Securite headers |
| 3 | useReducedMotion verification + fix | 2 | Could | A11y motion |
| 4 | Grain texture GPU perf | 1 | Could | Performance mobile |
| 5 | Coverage gaps : hubspot.ts (35%), useCountUp (39%), useScrollReveal (60%) | 2 | Should | Mutation score → 60% |

### B · Conversion & lead gen avancee (~26 pts)

| # | Story | Pts | Priorite | Impact |
|---|---|---|---|---|
| 6 | Blog / Ressources (pillar-cluster SEO) | 13 | Should | SEO organique, trafic x3 |
| 7 | ROI Calculator (lead magnet #2) | 8 | Could | Conversion, persona Sophie |
| 8 | Core Web Vitals audit pass | 5 | Should | Lighthouse 90+, SEO ranking |

### C · Expansion site (~13 pts)

| # | Story | Pts | Priorite | Impact |
|---|---|---|---|---|
| 9 | Pages services dediees (6 pages) | 8 | Should | SEO longue traine, conversion |
| 10 | Page pricing / tarifs | 5 | Could | Transparence, qualification leads |

### D · Ops (~2 pts)

| # | Story | Pts | Priorite | Impact |
|---|---|---|---|---|
| 11 | Resend domaine verification (DNS) | 1 | Must | Emails en production |
| 12 | Branch protection sur main | 1 | Should | Securite CI |

**Total restant reel : ~49 pts** (5 sprints a 10 pts reel/sprint)

---

## 4 · Roadmap proposee

### Sprint 15 — "Assainir et consolider" (10 pts)

> **Goal** : Nettoyer les backlogs, corriger les dernieres dettes a11y/securite, monter le mutation score a 60%.

| Story | Pts |
|---|---|
| T7 (retro) — Audit et archivage backlogs obsoletes | 1 |
| T5 (retro) — Couvrir hubspot.ts wrappers (mutation +4%) | 2 |
| T6 (retro) — Ratchet mutation score break: 60% | 1 |
| Fix a11y color contrast | 2 |
| CSP + Calendly CSS hardening | 2 |
| Coverage gaps useCountUp + useScrollReveal | 2 |

### Sprint 16 — "Core Web Vitals & Performance" (10 pts)

> **Goal** : Atteindre Lighthouse 90+ sur les 4 categories, optimiser la performance mobile.

| Story | Pts |
|---|---|
| Core Web Vitals audit pass (LCP, CLS, INP) | 5 |
| Grain texture GPU perf | 1 |
| useReducedMotion fix | 2 |
| Seuil coverage CI → 80% | 1 |
| Domaine custom freshworks.whataservice.fr (D14) | 1 |

### Sprint 17 — "Refonte homepage : catalogue 8 offres complexity-first" (12 pts) — ✅ **LIVRE 12/04/2026**

> **Goal** : Refondre le contenu homepage avec le nouveau catalogue d'offres, le narratif PAS, les personas Thomas/Mathieu/Nadia, et le pricing "a partir de".
> **Resultat** : Sprint Goal ATTEINT. Commits `513afe5`, `a7d5e7a`, `6f0e21b`, `31f9d87`.

| Story | Pts | Statut |
|---|---|---|
| Refonte config catalogue (8 offres, tiers, pricing "a partir de") | 3 | ✅ `513afe5` |
| Refonte i18n hero + problems + services (narratif PAS, complexity-first) | 5 | ✅ `a7d5e7a` |
| Refonte section Services (premium "sur devis" + implement "a partir de") | 3 | ✅ `6f0e21b` |
| CTA sticky persistant au scroll | 1 | ✅ `31f9d87` |

### Sprint 18 — "Refonte quiz → Service Maturity Index™" (14 pts engages) — 🔄 **EN COURS** (J5/7)

> **Goal** : Transformer le quiz en SMI™ avec 3 parcours (ITSM/CX/ESM), ROI estime et mapping maturite → offres.
> **Livre a J5** : 4 pts / 14 pts. 10 pts restants non demarres (stories NOT READY, cf. [refinement S18](./refinement/sprint-18-refinement.md)).

| Story | Pts | Statut |
|---|---|---|
| T16 — Test i18n deep parity (Try retro S17) | 1 | ✅ `ba410c1` |
| SMI-rename — Renommage SMI™ | 2 | ✅ `efd55ee` |
| OPS-obs — Observabilite API (D19, ajout mi-sprint) | 1 | ✅ `97913b8` |
| SMI-esm — Full ESM path (config + questions + i18n) | 6 | 🔴 Non demarre (NOT READY — bloque D20) |
| SMI-roi — ROI estime dans resultats | 2 | 🔴 Non demarre (NOT READY — bloque D21) |
| SMI-offers — Mapping maturite → offre | 2 | 🔴 Non demarre (NOT READY — bloque D22) |

**Arbitrage PO necessaire Sprint Review S18 (17/04)** : trancher D20/D21/D22, puis reaffecter les 10 pts residuels sur Sprint 19.

### Sprint 19 — "Pages services dediees + SEO" (10 pts)

> **Goal** : Deployer les 4 pages services dediees avec contenu detaille, SEO, et tests.

| Story | Pts |
|---|---|
| Route dynamique /services/[slug] + config + nav + breadcrumbs | 3 |
| Contenu 4 pages FR+EN (Transformation, Migration, Freddy AI, Managed) | 5 |
| Schema Service JSON-LD + machine-readable summary + tests | 2 |

### Sprint 20 — "Blog + thought leadership" (10 pts)

> **Goal** : Lancer le blog avec 3 articles pillar sur les themes 2026.

| Story | Pts |
|---|---|
| Spike Ghost CMS (D10) + infrastructure blog | 5 |
| 3 articles pillar (IA agentique, Freshdesk vs Zendesk, ESM) | 5 |

---

## 5 · KPIs de suivi

| KPI | Actuel | Cible Sprint 16 | Cible Sprint 20 |
|---|---|---|---|
| Conversion visiteur → lead | Non mesure | > 2% | > 3% |
| Prises de RDV Calendly | Non mesure | > 3/mois | > 5/mois |
| Quiz completions | Non mesure | > 15/mois | > 50/mois |
| Lighthouse Performance | ~85 (estime) | > 90 | > 95 |
| Coverage | 87.57% | 80% seuil CI | 85% seuil CI |
| Mutation score | 56.04% | 65% | 70% |
| Pages indexees | 4 | 10 | 15+ |
| Tests unitaires | 645 | 700+ | 800+ |
| Tests E2E | 95 | 100+ | 120+ |

---

## 6 · Decisions strategiques

### Tranchees

| ID | Decision | Date |
|---|---|---|
| D9 | **Pas de Freshchat.** Pas d'integration chat sur le site. | 12/04 |
| D11 | **Pas de ROI Calculator standalone.** SMI sert de lead magnet unique (l'estimation ROI est INTEGREE au SMI, cf. D21 et SMI-roi). | 12/04 |
| D12 | **Page pricing : "Sur devis".** (Annule par D15.) | 12/04 |
| D13 | **Resend DNS : configure.** Domaine verifie. | 12/04 |
| D15 | **Pricing "A partir de"** sur toutes les offres (annule D12). | 12/04 |
| D16 | **Quiz renomme Service Maturity Index™** — garde 5 dimensions par parcours. | 12/04 |
| D17 | **Personas** : Thomas (DSI), Mathieu (Lead Transfo), Nadia (DRH ESM). | 12/04 |
| D18 | **8 offres complexity-first** : CX/ESM Transfo, Migration, Freddy AI, Freshservice, Freshdesk, ESM Sprints, Audit, Managed Services. | 12/04 |
| D19 | **Observabilite API** — structured JSON logger, correlation ID (x-request-id), health check `?deep=1`. | 14/04 |

### A arbitrer (Sprint Review S18 — 17/04)

| ID | Decision | Bloque |
|---|---|---|
| D10 | **Blog : Ghost a explorer** (CMS headless). Spike avant implementation. | Sprint 20 |
| D14 | **Domaine custom Vercel : freshworks.whataservice.fr** — a configurer dans Vercel dashboard. | Ops |
| D20 | **Choix des 5 dimensions ESM** pour le parcours SMI. | SMI-esm |
| D21 | **Source benchmarks ROI** + inputs moteur (score seul ou + taille entreprise ?). | SMI-roi |
| D22 | **Regle mapping maturite → offre** : matrice 5×3 ou regle generique ? | SMI-offers |

---

*Ce document est vivant. Il evolue a chaque Sprint Review via la boucle universelle.*
*Derniere mise a jour : 16 avril 2026 (cloture S17, status S18, ajout D19-D22).*
