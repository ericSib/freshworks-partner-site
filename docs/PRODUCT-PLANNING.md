# Product Planning — What A Service (whataservice.fr)

> **Date** : 12 avril 2026
> **Product Owner** : Eric Sib
> **Horizon** : Sprints 15-20 (5 semaines)

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
| **Tests unitaires** | 645 tests, 23 fichiers | Coverage : 87.57% Stmts, 77.54% Branches |
| **Tests E2E** | 95 tests, 10 spec files | 0 fail, 0 flaky |
| **Mutation testing** | 56.04% (5 modules) | Stryker operationnel |
| **CI** | 2 workflows | ci.yml (lint+test+build), e2e.yml (Playwright) |
| **SEO** | 83 tests, 9 schemas JSON-LD | FAQ, Organization, Person, Service, Breadcrumb |
| **Commits** | 92 sur main | 8 jours de dev (5-12 avril) |

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

### Sprint 17 — "Refonte homepage : catalogue 8 offres complexity-first" (12 pts)

> **Goal** : Refondre le contenu homepage avec le nouveau catalogue d'offres, le narratif PAS, les personas Thomas/Mathieu/Nadia, et le pricing "a partir de".

| Story | Pts |
|---|---|
| Refonte config catalogue (8 offres, tiers, pricing "a partir de") | 3 |
| Refonte i18n hero + problems + services (narratif PAS, complexity-first) | 5 |
| Refonte section Services (premium "sur devis" + implement "a partir de") | 3 |
| CTA sticky persistant au scroll | 1 |

### Sprint 18 — "Refonte quiz → Service Maturity Index™" (8 pts)

> **Goal** : Renommer et re-brander le quiz en SMI™, ajouter routing initial, ROI estime, PDF brande, mapping maturite → offres.

| Story | Pts |
|---|---|
| Renommage quiz → SMI™ (i18n, composants, config) | 2 |
| Routing initial par contexte (ITSM/CX/ESM) | 3 |
| ROI estime dans resultats + mapping maturite → offre WaS | 3 |

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

## 6 · Decisions strategiques — arbitrees le 12/04/2026

| ID | Decision | Statut |
|---|---|---|
| D9 | **Pas de Freshchat.** Pas d'integration chat sur le site. | Tranchee |
| D10 | **Blog : Ghost a explorer** (CMS headless). Spike a planifier avant implementation. | A instruire |
| D11 | **Pas de ROI Calculator.** Le quiz ITSM/CX suffit comme lead magnet unique. | Tranchee |
| D12 | **Page pricing : "Sur devis".** Pas d'affichage de prix. | Tranchee |
| D13 | **Resend DNS : configure.** Domaine verifie. | Tranchee |
| D14 | **Domaine custom Vercel : freshworks.whataservice.fr** au lieu du domaine Vercel par defaut. A configurer dans Vercel dashboard. | A configurer |

---

*Ce document est vivant. Il evolue a chaque Sprint Review via la boucle universelle.*
