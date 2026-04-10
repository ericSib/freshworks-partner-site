# Product Backlog — What A Service

> **Referentiel unique** — Ce fichier est la seule source de verite pour le produit.
> Mis a jour : 10/04/2026 — v7.3 (Sprint 12 DONE + E22 closed + backlog cleanup post-refinement)
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

> Derniers sprints livres : Sprint 10 (SEO machines), Sprint 11 (SEO humains), Sprint 12 (GA4 + pages maturite).
> Details dans section 5 "Historique des Sprints".

### PRIORITE 1 — Sprint 13 "Fiabiliser et couvrir" (E21 + E18) — cible 13 pts

> Sprint Goal propose : *Fiabiliser le quiz en production et couvrir les trous de qualite post-audit.*
> **Etat DoR** : 0/5 stories Ready — voir `docs/stories-ready/` (a creer).

| # | Story | Epic | Pts | MoSCoW | DoR |
|---|-------|------|-----|--------|-----|
| 1 | US-21.1 Eliminer waitForTimeout quiz (waits explicites, 0 flakiness CI) | E21 | 1 | Must | Partiel |
| 2 | US-18.9 API quiz dediee /api/quiz/submit (endpoint + Zod + HubSpot) | E18 | 3 | Must | Non Ready (D3 archi) |
| 3 | US-21.3 Scan axe-core quiz (chargement, resultats, email gate) | E21 | 3 | Must | Partiel |
| 4 | US-21.2 Test E2E smoke + a11y /mentions-legales (FR+EN, axe-core) | E21 | 2 | Should | Partiel |
| 5 | US-15.4 Playwright dans GitHub Actions CI (ex-Could, remontee Must) | E15 | 5 | Must (D4) | Non Ready |

> **Decisions bloquantes Sprint 13** :
> - D3 : Archi API quiz — endpoint dedie vs. mutualisation /api/contact ?
> - D4 : Playwright CI en Must ou Could ?
> - D6 : Scope US-10.1 "E2E complementaires" a clarifier (sinon archivee)

### PRIORITE 2 — QA & stabilite — backlog E21 restant (post Sprint 13)

| # | Story | Epic | Pts | MoSCoW |
|---|-------|------|-----|--------|
| 1 | US-10.1 Tests E2E complementaires (parcours critique homepage) | E10 | 3 | Could (D6) |
| 2 | US-21.4 QuizPage POM (centraliser selecteurs, maintenabilite) | E21 | 3 | Could |

> **Notes avancement E21 (hors-sprint 10/04/2026)** :
> - `096cb5b` fix(a11y): WCAG 2 AA color-contrast — couvre partiellement US-21.3 (a rattacher explicitement)
> - `28a8186` fix(a11y): keyboard nav mobile menu (Escape + focus trap) — dette hors US, a backlogger si recurrent
> - `a300a20` fix(e2e): mock contact API + CTA regex — hardening non attribue
> - `05a2749` fix(e2e): CTA text expectations language-switch — hardening non attribue
> - `waitForTimeout` residuels : `tests/e2e/quiz.spec.ts:31,82` + `tests/e2e/accessibility.spec.ts:68` (US-21.1)

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
| Structured logging (pino/winston) | 3 | |

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

---

## 6. Metriques actuelles

| Metrique | Valeur |
|----------|--------|
| Tests unitaires + i18n + SEO | **522+** (ajout test maturity) |
| Tests E2E (Playwright) | **11** (8 homepage + 3 quiz) |
| Couverture code (logique metier) | **72.8%** |
| Vulns critiques | **0** |
| Images Unsplash | **0** (toutes locales) |
| Pipeline CI | **GitHub Actions** (lint + typecheck + test + build) |
| Playwright en CI | **Non** (US-15.4 backlog Sprint 13) |
| CSP unsafe-eval prod | **Non** (dev only) |
| Schemas JSON-LD | **10+ types** (Org, Person, Service x6, FAQPage, BreadcrumbList) |
| AI crawlers autorises | **5** (GPTBot, ChatGPT-User, Perplexity, Claude, Google-Ext) |
| Analytics | **GA4 (G-P37MDYJ5M8)** + cookie banner RGPD |
| Pages maturite | **2/10** (ITSM L1 + CX L1 pilotes) |
| Score SEO estime | **9/10** (post Sprint 12, E22 DONE) |
| Story points cumules (Sprint 1-12) | **~110+** |

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

*PRODUCT-BACKLOG.md — Referentiel unique — v7.3*
*What A Service — "Freshworks Consulting, Done Right."*
