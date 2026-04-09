# Product Backlog — What A Service

> **Referentiel unique** — Ce fichier est la seule source de verite pour le produit.
> Mis a jour : 09/04/2026 — v6.0 (consolidation post Sprint 9)
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

### LIVRES (Sprint 1-9)

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

### BACKLOG (a venir)

| Epic | Theme | Statut | Priorite |
|------|-------|--------|----------|
| E18+ | Pages SEO par niveau maturite (5 ITSM + 5 CX) | Backlog | Moyenne |
| E19 | Authentification Supabase (prerequis Scanner) | Backlog | Phase 2 |
| E20 | Scanner d'Environnement Freshservice + Freshdesk | Backlog | Phase 2 |
| E11 | Blog / Ressources (pillar-cluster SEO) | Backlog | Phase 3 |

---

## 4. Backlog ordonne — Stories actives

### PRIORITE 1 — Prochains sprints

| # | Story | Epic | Pts | MoSCoW |
|---|-------|------|-----|--------|
| 1 | US-18.7 Pages SEO par niveau maturite (5 ITSM + 5 CX, Schema markup) | E18 | 3 | Should |
| 2 | US-18.9 API quiz dediee /api/quiz/submit (endpoint + Zod + HubSpot enrichi) | E18 | 3 | Should |
| 3 | US-10.1 Tests E2E complementaires (parcours critique homepage) | E10 | 3 | Should |
| 4 | US-12.2 Core Web Vitals < seuils "Good" | E12 | 5 | Could |
| 5 | Playwright dans GitHub Actions CI | E15 | 5 | Could |

### PRIORITE 2 — Phase 2 (Scanner)

| # | Story | Epic | Pts | MoSCoW |
|---|-------|------|-----|--------|
| 6 | US-19.1 Spike Supabase (auth + schema + middleware coexistence) | E19 | 5 | Should |
| 7 | US-19.2 Magic link + OAuth Microsoft + Google | E19 | 5 | Should |
| 8 | US-19.3 Middleware auth + route groups (public/authenticated) | E19 | 3 | Should |
| 9 | US-20.1 Scanner Freshservice API v2 (8 dimensions) | E20 | 8 | Should |
| 10 | US-20.2 Scanner Freshdesk API v2 (8 dimensions) | E20 | 8 | Should |
| 11 | US-20.3 Health Score + rapport differencies | E20 | 5 | Should |
| 12 | US-20.4 Cles API ephemeres + UX securite | E20 | 3 | Must |

### PRIORITE 3 — Backlog lointain

| # | Story | Pts |
|---|-------|-----|
| Blog engine (MDX ou CMS headless) | 5 |
| Pillar pages SEO (5 × 2000-5000 mots) | 13 |
| Score cards virales LinkedIn | 5 |
| Cross-tool nurture ITSM+CX | 5 |
| Benchmark DB agregee | 8 |
| Analytics GA4/GTM implementation | 2 |
| Structured logging (pino/winston) | 3 |

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

---

## 6. Metriques actuelles

| Metrique | Valeur |
|----------|--------|
| Tests unitaires + i18n | **489** |
| Tests E2E (Playwright) | **11** (8 homepage + 3 quiz) |
| Couverture code (logique metier) | **72.8%** |
| Vulns critiques | **0** |
| Images Unsplash | **0** (toutes locales) |
| Pipeline CI | **GitHub Actions** (lint + typecheck + test + build) |
| CSP unsafe-eval prod | **Non** (dev only) |
| Score audit estime | **A (90+/100)** |
| Story points cumules (Sprint 1-9) | **71+** |

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

*PRODUCT-BACKLOG.md — Referentiel unique — v6.0*
*What A Service — "Freshworks Consulting, Done Right."*
