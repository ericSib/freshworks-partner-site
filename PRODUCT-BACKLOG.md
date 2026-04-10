# Product Backlog — What A Service

> **Referentiel unique** — Ce fichier est la seule source de verite pour le produit.
> Mis a jour : 11/04/2026 — v7.7 (cloture Sprint 13 + activation Sprint 14 + D13 tranchee)
> Product Owner : Claude Code (assist) | Stakeholder : Eric Sib, Fondateur

---

## 1. Product Goal

```
PRODUCT GOAL : Transformer le site What A Service en machine de generation de leads
autonome couvrant ITSM (Freshservice) et CX (Freshdesk), avec un Score de Maturite
interactif a double parcours, pour generer 50-200 leads qualifies/mois
avec un CPL 10-50x inferieur au paid advertising.
```

### KPIs cibles

| KPI | Cible | Mesure |
|-----|-------|--------|
| Conversion visiteur → lead (quiz) | 15-30% | HubSpot + Vercel Analytics |
| Conversion visiteur → lead (formulaire) | > 3% | HubSpot |
| Prises de RDV Calendly | > 15/mois | Dashboard Calendly |
| Completions quiz ITSM + CX | > 200/mois | GA4 events |
| CPL (cout par lead) | 5-25 EUR | vs. 100-300 EUR paid |
| Lighthouse Performance | > 90 (4 categories) | Lighthouse CI |
| LCP (Largest Contentful Paint) | < 2s | Web Vitals |

---

## 2. Personas

### Sophie — DSI d'ETI (persona principal ITSM)

| Attribut | Detail |
|----------|--------|
| Entreprise | ETI, 500 personnes, secteur services |
| Contexte | Freshservice deploye depuis 2 ans, sous-utilise (adoption ~30%) |
| Besoin | Optimiser la configuration, former les equipes, mesurer le ROI |
| Frustration | "On paie cher pour un outil qu'on utilise a 30%" |
| Declencheur | Audit interne revelant un ROI licensing insuffisant |
| Canal | Google FR : "consultant Freshservice optimisation" |
| Pain | **Tool frustration** — low adoption |

### Marc — Responsable Support Client (persona principal CX)

| Attribut | Detail |
|----------|--------|
| Entreprise | PME, 120 personnes, e-commerce en croissance |
| Contexte | Freshdesk basique, pas de workflows automatises, tickets x3 en 1 an |
| Besoin | Automatisations, SLA, portail client self-service |
| Frustration | "Je n'ai pas l'expertise en interne pour aller plus loin" |
| Declencheur | Croissance des tickets, SLA breaches |
| Canal | LinkedIn / recommandation |
| Pain | **Growth pain** — processes don't scale |

### Karim — Responsable IT en migration

| Attribut | Detail |
|----------|--------|
| Entreprise | ETI, 350 personnes, industrie |
| Contexte | Sur ServiceNow mais trop cher/complexe, migration vers Freshservice envisagee |
| Frustration | "La migration precedente a echoue, on a peur de recommencer" |
| Pain | **Migration anxiety** |

### Nadia — DRH explorant l'ESM

| Attribut | Detail |
|----------|--------|
| Entreprise | ETI, 800 personnes, multi-sites |
| Contexte | IT sur Freshservice, les RH veulent le meme outil pour onboarding/offboarding |
| Pain | **Operational chaos** — manual, repetitive tasks |

---

## 3. Epics — Vue d'ensemble

### LIVRES (Sprint 1-12)

| Epic | Theme | Statut | Sprints |
|------|-------|--------|---------|
| E0 | Design System Premium | DONE | 1-3 |
| E1 | Animations (scroll reveal, count-up, text reveal) | DONE | 1-3 |
| E2 | Hero Premium + Trust bar | DONE | 1-3 |
| E3 | Nouvelles sections GTM (Process, ClientLogos, Products, TechStack) | DONE | 1-3 |
| E4 | Contact & Conversion (formulaire + Resend + Calendly) | DONE | 1-3 |
| E5 | Sections existantes (Problems, Metrics, Services, CaseStudies, About) | DONE | 1-3 |
| E6 | Navigation Premium (scroll spy, progress bar, mobile menu) | DONE | 1-3 |
| E7 | Copywriting GTM (FR/EN natifs, ITSM+CX equilibre) | DONE | 1-3 |
| E8 | Infra & Securite (headers, error boundaries, health endpoint) | DONE | 4-6 |
| E9 | Legal & Conformite (mentions legales, RGPD) | DONE | 3 |
| E13 | Securite API (Zod, rate limit, honeypot) | DONE | 5 |
| E14 | Testabilite & Couverture (Vitest, 489 tests) | DONE | 5-9 |
| E15 | Pipeline CI/CD (GitHub Actions, lint-staged) | DONE | 6 |
| E16 | Performance (images locales, CSP durcie) | DONE | 6, 9 |
| E17 | Nettoyage dette technique (Button.tsx, useReducedMotion, Calendly CSS) | DONE | 6 |
| **E18** | **Score de Maturite ITSM+CX (quiz lead gen)** | **DONE** | **7-9** |
| **E22** | **SEO/GEO Optimization (schema, E-E-A-T, GEO, meta sociaux, GA4)** | **DONE** | **10-12** |

### BACKLOG (a venir)

| Epic | Theme | Statut | Priorite |
|------|-------|--------|----------|
| E21 | Consolider la suite E2E (stabilite, couverture, a11y, POM) | Partiellement commence (voir notes) | Haute |
| E18+ | Pages SEO par niveau maturite (8 pages L2-L5 restantes) | Backlog (2 pilotes L1 livres Sprint 12) | Moyenne |
| E19 | Authentification Supabase (prerequis Scanner) | Backlog | Phase 2 |
| E20 | Scanner d'Environnement Freshservice + Freshdesk | Backlog | Phase 2 |
| E11 | Blog / Ressources (pillar-cluster SEO) | Backlog | Phase 3 (depend E22) |

---

## 4. Backlog ordonne — Stories actives

> Derniers sprints livres : Sprint 10 (SEO machines), Sprint 11 (SEO humains), Sprint 12 (GA4 + pages maturite), **Sprint 13 (quiz fiabilise + CI Playwright + bug HubSpot corrige)**.
> Details dans section 5 "Historique des Sprints".

### PRIORITE 1 — Sprint 14 "Consolider la qualite interne" — **SPRINT ACTIF** — 10 pts

> Sprint Goal : *Rembourser la dette de tests sur les 3 modules sous-couverts critiques (analytics, hubspot contact, useQuiz) et decomposer QuizResultsPreview en sous-composants testables, pour que le funnel lead magnet beneficie d'un filet de securite bout-en-bout.*
> **Etat DoR** : ✅ **5/5 stories Ready (10 pts)** — refinement complet post-QA 10/04 + recadrage post-Sprint 13.
> **Capacite cible** : 10-13 pts (bas de fourchette apres S13 a 15 pts). **Engagement : 10 pts.**
> **Demarrage** : 11/04/2026.

| Ordre | Story | Epic | Pts | MoSCoW | DoR | WSJF |
|-------|-------|------|-----|--------|-----|------|
| 1 | **US-21.6 Completer tests analytics.ts (100% trackers)** | E21 | 1 | Must | ✅ Ready ([AC](./docs/stories-ready/US-21.6.md)) | 5.0 |
| 2 | **US-21.8 Tests unit hubspot.ts (mapping + error paths)** | E21 | 2 | Must | ✅ Ready ([AC](./docs/stories-ready/US-21.8.md)) — recadre 11/04 | 4.5 |
| 3 | **US-21.11 Test E2E mobile menu keyboard nav (fix 28a8186)** | E21 | 1 | Should | ✅ Ready ([AC](./docs/stories-ready/US-21.11.md)) — piege hydratation note | 3.0 |
| 4 | **US-21.9 Tests unit useQuiz hook (state machine)** | E21 | 3 | Should | ✅ Ready ([AC](./docs/stories-ready/US-21.9.md)) | 2.5 |
| 5 | **US-21.7 Refacto QuizResultsPreview (4 sous-composants)** | E21 | 3 | Should | ✅ Ready ([AC](./docs/stories-ready/US-21.7.md)) | 2.0 |

> **Ordre d'implementation recommande** :
> 1. **US-21.6** (1 pt) — quick win analytics
> 2. **US-21.8** (2 pts) — aligner `src/lib/hubspot.ts` historique sur le niveau de `quiz/hubspot.ts` deja livre par US-18.9
> 3. **US-21.11** (1 pt) — quick win, filet a11y hors-sprint (commit `28a8186`)
> 4. **US-21.9** (3 pts) — **prerequis obligatoire** avant US-21.7 (jamais de refacto sans filet)
> 5. **US-21.7** (3 pts) — refacto beneficiant du filet US-21.9

> **Decisions tranchees Sprint 14** :
> - ✅ **D13 tranchee 11/04** : apres livraison de US-21.6 + US-21.8 + US-21.9, remonter le seuil vitest **60% → 70%** via un commit `chore(ci)` **hors velocite** en fin de sprint. Cible finale 80% en Sprint 16. Rationale : coverage global attendu post-S14 ~82%, donc le seuil 70% devient "gratuit". Incrementale pour eviter les explosions de gates.
> - 🕐 **D5** : Pages maturite L2-L5 vs blog — en attente stakeholder (hors Sprint 14)
> - ✅ **D6** : US-10.1 E2E homepage complementaires → **backlog lointain** (archive si couverture homepage suffisante post-US-15.4)
> - ✅ **D8** : Structured logging pino/winston → **backlog lointain** (volume actuel ne le justifie pas)

> **Stories deferees (hors Sprint 14)** :
> - US-21.4 QuizPage POM (3 pts, Could) → **Sprint 15** — non prioritaire tant que US-21.9 protege le contrat du hook
> - US-21.10 Stryker mutation testing (3 pts, Could) → **Sprint 15** — pre-requis modules critiques a 80%+

> **Chores immediats (hors story, hors velocite)** :
> - ✅ `b0faa47 chore(ci): ignore coverage/ in ESLint` — finding #6 (10/04)
> - 🟡 En attente fin Sprint 14 : `chore(ci): raise vitest coverage threshold to 70%` (D13 tranchee)

### PRIORITE 2 — Sprint 15 "Qualite avancee" (propose)

> Sprint Goal propose : *Installer les outils de mesure qualite avancee (mutation testing) et finaliser la maintenabilite E2E (POM).*
> **Etat DoR** : ✅ 1/2 stories Ready. **Pre-requis** : au moins 3/3 stories coverage de Sprint 14 livrees (US-21.6 + US-21.8 + US-21.9), sans quoi le mutation testing manque de signal.
> **Capacite cible** : 6-10 pts (sprint allege).

| Ordre | Story | Epic | Pts | MoSCoW | DoR | WSJF |
|-------|-------|------|-----|--------|-----|------|
| 1 | **US-21.10 Stryker mutation testing + CI** | E21 | 3 | Could | ✅ Ready ([AC](./docs/stories-ready/US-21.10.md)) | 1.5 |
| 2 | US-21.4 QuizPage POM (centraliser selecteurs, maintenabilite) | E21 | 3 | Could | 🕐 Refinement | 1.3 |
| 3 | Chore `chore(ci): raise vitest coverage 70% → 80%` (suite D13) | E21 | hors velocite | — | — | — |

### PRIORITE 3 — Phase 2 (Scanner) — Backlog lointain

> **Note refinement** : US-20.1 / US-20.2 a 8 pts sont a la limite du seuil SPIDR.
> Decoupage propose : separer API read-only (5 pts) de la restitution Health Score (3 pts).
> Dependance bloquante : US-19.1 (Spike Supabase) requis avant tout travail E20.

| # | Story | Epic | Pts | MoSCoW |
|---|-------|------|-----|--------|
| 6 | US-19.1 Spike Supabase (auth + schema + middleware coexistence) | E19 | 5 | Should |
| 7 | US-19.2 Magic link + OAuth Microsoft + Google | E19 | 5 | Should |
| 8 | US-19.3 Middleware auth + route groups (public/authenticated) | E19 | 3 | Should |
| 9 | US-20.1 Scanner Freshservice API v2 (8 dimensions) — decoupage SPIDR a faire | E20 | 8 | Should |
| 10 | US-20.2 Scanner Freshdesk API v2 (8 dimensions) — decoupage SPIDR a faire | E20 | 8 | Should |
| 11 | US-20.3 Health Score + rapport differencies | E20 | 5 | Should |
| 12 | US-20.4 Cles API ephemeres + UX securite | E20 | 3 | Must |

### PRIORITE 4 — Backlog lointain

> **Note refinement** : "Pillar pages SEO" a 13 pts est un epic deguise.
> Decoupage SPIDR propose : Spike MDX vs CMS (2) + 2 piliers pilotes (2x5) + cross-linking (3) = E11.1.

| # | Story | Pts | Notes |
|---|-------|-----|-------|
| US-18.7b Pages maturite ITSM L2-L3 | 3 | Depend de l'infra livree Sprint 12 |
| US-18.7c Pages maturite ITSM L4-L5 | 3 | Depend de l'infra livree Sprint 12 |
| US-18.7d Pages maturite CX L2-L3 | 3 | Depend de l'infra livree Sprint 12 |
| US-18.7e Pages maturite CX L4-L5 | 3 | Depend de l'infra livree Sprint 12 |
| Blog engine (MDX ou CMS headless) | 5 | Depend E22 (schema Article) — **D5 a trancher** |
| Pillar pages SEO (5 × 2000-5000 mots) | 13 | **A decouper SPIDR** — Epic E11.1 propose |
| Score cards virales LinkedIn | 5 | |
| Cross-tool nurture ITSM+CX | 5 | |
| Benchmark DB agregee | 8 | |
| Structured logging (pino/winston) | 3 | **D8 arbitree** : reste lointain (volume actuel ne le justifie pas) |
| US-10.1 Tests E2E complementaires homepage | 3 | **D6 arbitree** : archiver ou re-evaluer post-US-15.4 |

> **Notes** :
> - US-12.2 (Core Web Vitals) absorbe dans E22. Analytics GA4/GTM absorbe dans US-22.8.
> - **D5 (decision stakeholder)** : investir dans les 4 nouvelles US pages maturite (12 pts) OU pivoter vers le blog/pilliers (13+ pts) ?

---

## 5. Historique des Sprints

### Sprint 1-3 — Site vitrine (40+ pts) — LIVRES

Homepage 11 sections, design system premium, i18n FR/EN, formulaire contact + Resend + HubSpot, Calendly CTA, mentions legales, SEO, sitemap.

### Sprint 4 — Config production — LIVRE

Resend domain, security headers, error boundaries.

### Sprint 5 — "Securiser & Tester" (20 pts) — LIVRE

| Story | Pts |
|-------|-----|
| Rate limiting API (5 req/15min/IP) | 2 |
| Validation Zod (schema + limites + enum) | 3 |
| Setup Vitest + 73 tests unitaires | 2+5 |
| Tests integration API (health + contact) | 3 |
| Honeypot anti-spam | 2 |
| data-testid + a11y formulaire (htmlFor, aria) | 2 |
| Cleanup Button.tsx mort | 1 |

### Sprint 6 — "Industrialiser & Consolider" (12 pts) — LIVRE

| Story | Pts |
|-------|-----|
| GitHub Actions CI (lint + typecheck + test + build) | 3 |
| lint-staged pre-commit | 1 |
| Contrastes a11y (color-contrast enable) | 1 |
| Tests useContactForm (7 scenarios) | 3 |
| CSP sans unsafe-eval prod + Calendly CSS fix | 2 |
| useReducedMotion reactif partage | 2 |

### Sprint 7 — "Quiz fondations" (13 pts) — LIVRE

| Story | Pts |
|-------|-----|
| Config quiz types + donnees ITSM + CX (8 dim. × 2) | 3 |
| Moteur de scoring TDD (37 tests, formule blueprint) | 5 |
| Parcours ITSM (composants UI + route + i18n) | 5 |
| Bonus : selecteur ITSM/CX, entry points Hero+Problems, ecran resultats | — |

### Sprint 8 — "CX + Radar + Gating" (13 pts) — LIVRE

| Story | Pts |
|-------|-----|
| Traductions CX completes FR+EN (112 cles) | 2 |
| Radar chart SVG + hybrid gating email + HubSpot segment | 8 |
| Test E2E Playwright quiz flow (3 scenarios) | 3 |

### Sprint 9 — "Production-ready" (13 pts) — LIVRE

| Story | Pts |
|-------|-----|
| HOTFIX CTA resultats → Calendly | 1 |
| i18n extraction (8 strings hardcodees → traductions) | 1 |
| Test validation cles i18n (373 tests) | 2 |
| Rapport PDF avec en-tete charte WaS | 5 |
| Migration images Unsplash → local (10 images, 0 requete externe) | 3 |
| Branch protection main (pret a activer) | 1 |

### Sprint 10 — "Visible par les machines" (13 pts) — LIVRE

| Story | Pts |
|-------|-----|
| US-22.6 Sitemap complet + robots.txt AI crawlers | 2 |
| US-22.1 Schema JSON-LD Organization (site-wide) | 3 |
| US-22.5 Twitter Cards + og:image (1200x630) | 3 |
| US-22.2 Schema JSON-LD Person (consultant + credentials) | 2 |
| US-22.3 Schema JSON-LD Service x6 (i18n-driven) | 3 |

### Sprint 11 — "Credible et citable" (13 pts) — LIVRE

| Story | Pts |
|-------|-----|
| US-22.10 FAQ section + FAQPage JSON-LD (GEO) | 5 |
| US-22.7 Breadcrumbs UI + BreadcrumbList JSON-LD | 3 |
| US-22.9 About enrichi E-E-A-T (LinkedIn, stats) | 2 |
| US-22.11 Answer capsules GEO (i18n FR+EN) | 3 |

### Sprint 12 — "Mesurer et convertir" (13 pts) — LIVRE (09/04/2026)

| Story | Pts | Commit |
|-------|-----|--------|
| US-22.8 Analytics GA4 + cookie banner RGPD (GA4 ID G-P37MDYJ5M8) | 5 | `38620ae` |
| US-22.12 OG image v2 (marketing visuals) | 2 | `528bbac` |
| US-18.7a Infra pages maturite + 2 pages pilotes (ITSM L1 + CX L1) | 6 | `f98c81f` |

> **Cloture** : E22 (SEO/GEO Optimization) entierement DONE apres Sprint 12 (3 sprints, 39 pts, 13 US).
> **Bonus hors-sprint** (hardening post-audit, non attribues a une US) :
> - `096cb5b` fix(a11y): WCAG 2 AA color-contrast violations
> - `28a8186` fix(a11y): keyboard nav mobile menu (Escape + focus trap)
> - `a300a20` fix(e2e): mock contact API + CTA regex form tests
> - `05a2749` fix(e2e): CTA text expectations language-switch test
> - `f56c73a` docs(config): consolidation backlogs Sprint 10-12

### Sprint 13 — "Fiabiliser et couvrir" (15 pts + 2 hotfix) — LIVRE (11/04/2026)

| Story | Pts | Commit | Note |
|-------|-----|--------|------|
| **US-21.5** Tests unitaires generate-pdf.ts (hotfix hors-velocite) | **2** | `788cd8f` | Coverage 38% 🔴 → 75.31% ✅ |
| **US-21.1** Eliminer waitForTimeout E2E | 1 | `5168a96` | `grep waitForTimeout tests/e2e/` = 0 match, 15/15 green × 5 repeats |
| **US-21.2** Smoke + a11y /mentions-legales (FR+EN) | 2 | `ca5d2d1` | 5 tests E2E, 0 violation WCAG 2.1 AA |
| **US-21.3** Scan axe-core quiz (5 etats) | 3 | `1287a91` + `da42ccc` | 1 fix a11y `text-slate-400` + 5 tests, < seuil US-21.3b |
| **US-15.4** Playwright CI GitHub Actions | 5 | `6f4f8c6` | Workflow `.github/workflows/e2e.yml` + cache browsers + artefacts |
| **US-18.9** API quiz dediee `/api/quiz/submit` (bug critique fixe) | 4 | `9d1228e` | 19 nouveaux tests, route.ts 100% lines/funcs, 11 props HubSpot |

> **Sprint Goal** : *Fiabiliser le quiz en production et couvrir les trous de qualite post-audit.* ✅ **100% atteint.**
> **Engagement 15 pts → Livre 15 pts in-sprint + 2 pts hotfix — 0 spillover.**
>
> **Decisions tranchees durant le sprint** :
> - ✅ **D3** : Option A — endpoint dedie `/api/quiz/submit` (vs mutualisation contact)
> - ✅ **D4** : Playwright CI en Must (ex-Could)
> - ✅ **D7** : US-21.5 en hotfix hors-velocite
>
> **Bug critique corrige** : la validation Zod `/api/contact` rejetait silencieusement `challenge: "quiz-itsm"` / `"quiz-cx"` depuis Sprint 7. Aucun lead quiz n'etait capture dans HubSpot. Corrige par US-18.9 (endpoint dedie + 11 proprietes custom).
>
> **Actions stakeholder post-merge** :
> 1. 🔴 Bloquant merge prod : creer les 11 proprietes HubSpot custom (runbook dans commit `9d1228e`)
> 2. 🟡 Recommande : activer Branch Protection "Require status checks → e2e" sur `main`
> 3. 🟢 Monitorer les leads `quiz_segment=itsm|cx` sur 7 jours post-merge

---

## 6. Metriques actuelles (post Sprint 13 — 11/04/2026)

| Metrique | Valeur |
|----------|--------|
| Tests unitaires + i18n + SEO | **609** (+21 vs post-US-21.5 : +8 `quiz/hubspot` + +13 `quiz/submit/route`) |
| Tests E2E (Playwright) | **21** chromium (8 homepage + 3 quiz + 5 mentions-legales + 5 quiz-a11y) — Sprint 14 ajoutera +4 (US-21.11) |
| Couverture code globale | ✅ **~74% lines / ~63% funcs / ~73% stmts / ~63% branches** (seuil 60/60/60/50 GREEN) |
| Couverture `quiz/submit/route.ts` | ✅ **100% lines / 100% funcs / 76.92% branches** (livre US-18.9) |
| Couverture `quiz/hubspot.ts` | ✅ **~78% lines / 100% funcs** (livre US-18.9) |
| Modules sous-testes restants (Sprint 14 scope) | `hubspot.ts` 28% (US-21.8), `useQuiz.ts` 0% (US-21.9), `analytics.ts` 37.5% (US-21.6) |
| Mutation score | 🔴 **Non mesure** (US-21.10 Sprint 15) |
| Vulns critiques | **0** |
| Images Unsplash | **0** (toutes locales) |
| Pipeline CI | **GitHub Actions** (lint + typecheck + test + build) |
| Playwright en CI | ✅ **Oui** — workflow `.github/workflows/e2e.yml` (livre US-15.4, Sprint 13) |
| Bug capture leads quiz | ✅ **Fixe** (US-18.9 Sprint 13) — endpoint dedie `/api/quiz/submit` avec 11 props HubSpot |
| `waitForTimeout` residuels E2E | ✅ **0** (US-21.1 Sprint 13) |
| CSP unsafe-eval prod | **Non** (dev only) |
| Schemas JSON-LD | **10+ types** (Org, Person, Service x6, FAQPage, BreadcrumbList) |
| AI crawlers autorises | **5** (GPTBot, ChatGPT-User, Perplexity, Claude, Google-Ext) |
| Analytics | **GA4 (G-P37MDYJ5M8)** + cookie banner RGPD |
| Pages maturite | **2/10** (ITSM L1 + CX L1 pilotes) |
| Score SEO estime | **9/10** (post Sprint 12, E22 DONE) |
| Story points cumules (Sprint 1-13 + hotfix US-21.5) | **~129** (+17 Sprint 13 = 15 in-sprint + 2 hotfix) |
| **Rapport tracabilite QA** | Prochain run : fin Sprint 14 (scheduled task `acceptance-traceability-check`) |

---

## 7. Definition of Done (universelle)

- [ ] `npm run build` passe sans erreur
- [ ] `npm run lint` — 0 erreur
- [ ] `npm run test` — tous les tests passent
- [ ] Contenu bilingue FR + EN
- [ ] Responsive verifie (mobile 375px + desktop 1440px)
- [ ] Commit conventionnel : `type(scope): description`
- [ ] Aucun secret hardcode
- [ ] 1 commit par US (max)

---

## 8. Stack technique

| Composant | Choix |
|-----------|-------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 |
| i18n | next-intl (FR/EN) |
| Email | Resend |
| CRM | HubSpot (API v3) |
| RDV | Calendly (popup widget) |
| Tests unitaires | Vitest + Testing Library |
| Tests E2E | Playwright + axe-core |
| CI/CD | GitHub Actions + Vercel |
| PDF | jsPDF (client-side) |
| Deploiement | Vercel (CDN global) |

---

*PRODUCT-BACKLOG.md — Referentiel unique — v7.7 (cloture Sprint 13 + activation Sprint 14 + D13 tranchee — 11/04/2026)*
*What A Service — "Freshworks Consulting, Done Right."*

---

## Changelog v7.7 (cloture Sprint 13 + activation Sprint 14 — 11/04/2026)

**Declencheur** : Sprint 13 livre a 100% (15 pts in-sprint + 2 pts hotfix, 0 spillover). Sprint 14 active.

### Sprint 13 cloture

- **6/6 stories DONE** : US-21.5, 21.1, 21.2, 21.3, 15.4, 18.9
- **Bug critique** capture leads quiz : corrige par US-18.9 (endpoint dedie + 11 props HubSpot)
- **CI Playwright** activee : workflow `.github/workflows/e2e.yml` (US-15.4)
- **Coverage nouvelle** `quiz/submit/route.ts` = 100% lines/funcs, `quiz/hubspot.ts` = 100% funcs
- **0 flakiness E2E** : `waitForTimeout` elimines (US-21.1)
- **Pattern reutilisable** : `expect.toPass()` pour absorber race hydratation React SSR
- **1 fix a11y** quiz (`text-slate-400` sur 3 composants, < seuil US-21.3b)

### Sprint 14 activation

- **5/5 stories Ready** (10 pts engagement, bas de fourchette 10-13)
- **Ordre** : US-21.6 → US-21.8 → US-21.11 → US-21.9 → US-21.7
- **Refinement post-Sprint 13** :
  - US-21.8 recadree : scope recentre sur `src/lib/hubspot.ts` (historique) uniquement, `quiz/hubspot.ts` deja livre par US-18.9
  - US-21.11 : note "piege hydratation SSR" ajoutee avec pattern `expect.toPass` de reference

### Decisions tranchees (nouvelles)

- ✅ **D13** : remontee seuil coverage vitest **60% → 70%** en fin de Sprint 14, commit `chore(ci)` hors velocite. Cible 80% en Sprint 16. Coverage global attendu post-S14 ~82%.
- ✅ **D6** : US-10.1 (E2E homepage) → backlog lointain
- ✅ **D8** : Structured logging → backlog lointain

### Metriques mises a jour

- Tests unit : 588 → **609** (+21)
- Tests E2E chromium : 11 → **21** (+10)
- Couverture globale : 75.31% → ~74% (stable, nouveaux modules couverts 100%)
- Story points cumules : ~112 → **~129** (+17)
- Pipeline : `Playwright en CI = Non` → ✅ **Oui**
- Bug capture leads quiz : 🔴 non fixe → ✅ **fixe**

### Prochaine etape

- **11/04** : demarrage implementation Sprint 14 dans l'ordre US-21.6 → 21.8 → 21.11 → 21.9 → 21.7
- **Fin Sprint 14** : application D13 via commit `chore(ci): raise vitest coverage threshold to 70%`
- **Sprint Planning Sprint 15** : evaluer US-21.10 (Stryker) en fonction du coverage atteint

---

## Changelog v7.6 (refinement post-QA 10/04/2026)

**Declencheur** : rapport de tracabilite AC→Tests du 10/04 22:00 (scheduled task `acceptance-traceability-check`).

### Nouvelles stories Ready (4)

- **US-21.8** Tests unit hubspot.ts (mapping + error paths) — 2 pts Must Sprint 14 — gap B2 QA
- **US-21.9** Tests unit useQuiz hook (state machine) — 3 pts Should Sprint 14 — gap B3 QA
- **US-21.10** Stryker mutation testing + CI — 3 pts Could Sprint 15 — gap B5 QA (DoD mutation score)
- **US-21.11** Test E2E mobile menu keyboard nav — 1 pt Should Sprint 14 — gap B4 QA (fix hors-sprint 28a8186)

### Decisions tranchees (4)

- **D9** : US-21.7 refacto QuizResultsPreview **avant** A/B test gating (coût refacto posterior >> anterior)
- **D10** : Tests hubspot.ts en **story dediee** (US-21.8) plutot qu'integres a US-18.9 (INVEST respect)
- **D11** : Tests useQuiz hook en **unit prioritaire** (US-21.9) plutot qu'E2E seul (cout 10x + protege refacto)
- **D12** : Mutation testing Stryker **Sprint 15** (differe 1 sprint, pre-requis : modules critiques remontes a 80%+ coverage)

### Decisions ouvertes promues

- **D13** : Remontee progressive du seuil coverage vitest (60% → 70% → 80%) — a trancher Sprint Planning Sprint 15

### Sprint 14 refinement

- Etait : 2/5 Ready (4 pts) — US-21.6 + US-21.7
- Devient : **5/5 Ready (10 pts)** — US-21.6 + US-21.8 + US-21.11 + US-21.7 + US-21.9
- Capacite cible 10-13 pts → consommation 10 pts (bas de la fourchette)
- Stories deferees : US-21.4 → Sprint 15, Structured logging + US-10.1 → backlog lointain (D6/D8 arbitrees)

### Sprint 15 propose

- Nouveau sprint **"Qualite avancee"** avec US-21.10 (Stryker) + US-21.4 (POM) + D13 seuil coverage
- Capacite allegee 6-10 pts pour absorber spillover Sprint 13-14

### Traceabilite fixes hors-sprint rattachee

- `096cb5b` (a11y contrast) → US-21.3 Sprint 13 pour le quiz
- `28a8186` (keyboard nav) → US-21.11 Sprint 14 (**nouveau**)
- `a300a20` + `05a2749` (e2e hardening) → absorbe dans US-15.4 Sprint 13

### Metriques mises a jour

- Tests 566 → **588** (post-US-21.5 hotfix)
- Coverage lines 38% 🔴 → **75.31% ✅** (post-US-21.5 hotfix)
- Story points cumules ~110+ → **~112**

### Prochaine etape

- **Lun 13/04** : demarrage implementation Sprint 13 dans l'ordre US-21.5 ✅ → 21.1 → 21.2 → 21.3 → 15.4 → 18.9
- **Fin Sprint 13 (17/04)** : prochain check tracabilite automatise
- **Sprint Planning Sprint 14** : arbitrer D13 (seuil coverage)
