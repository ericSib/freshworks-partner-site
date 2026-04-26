# Sprint 20 — "Surface SEO + funnel instrumente"

> **Sprint Goal** : Etendre la surface de captage SEO du site (pages services dediees Freshservice + Freshdesk en FR+EN, schema.org enrichi UK/BE/CH, OG dynamiques) et instrumenter le funnel de conversion (events GA4 quiz + CTA + contact) pour piloter les optimisations a la donnee.
> **Debut** : 27 avril 2026 (J1)
> **Fin cible** : 3 mai 2026 (J7)
> **Capacite** : 20 pts (cadence 1 semaine, Manifeste P8)
> **Engage** : 17 pts (marge 3 pts pour Refactoring Radar mensuel ou story emergente)
> **Refinement source** : [refinement/sprint-20-refinement.md](../refinement/sprint-20-refinement.md)
> **Audit SEO source** : a formaliser dans `docs/seo/audit-2026-04-26.md` via US-S20-1
> **Statut** : 🟡 EN COURS

---

## Verification T1-v2 (PROCESS.md §4.1) — etat reel des stories candidates

| Story | Verification code | Verdict |
|---|---|---|
| US-S20-1 | `src/app/sitemap.ts` : `lastModified: new Date()` ligne 12 — fix necessaire. GSC submission non faite. Audit SEO present dans refinement, a formaliser. | ✅ A faire |
| US-S20-2 | `src/app/[locale]/services/` : route inexistante. `src/config/services-content.ts` : fichier absent. | ✅ A faire |
| US-S20-3 | Recherche `opengraph-image.tsx` : 0 fichier trouve. OG = `/images/og-default.png` statique unique. | ✅ A faire |
| US-S20-4 | `src/config/schema.ts` : `areaServed` = single GeoCircle Paris+500km. Meta description home = 268 chars (audit). | ✅ A faire |
| US-S20-5 | `grep -rn "trackQuiz" src/components/quiz/` = 0 call-site. Helpers definis `src/lib/analytics.ts:57-72` mais jamais appeles. Signature `trackQuizComplete(segment: "itsm" \| "cx", ...)` manque ESM. | ✅ A faire |
| US-S20-6 | `grep -rn "trackContactSubmit\|trackEvent" src/components/sections/Contact.tsx` = 0 call-site. CTA Hero/Sticky/Calendly = liens directs sans tracking. | ✅ A faire |
| US-S20-7 | `src/lib/quiz/roi.ts` existe (Sprint 19 livre) mais coefficients heuristiques. Pre-requis ouvert post-S19. | ✅ A faire (depend confirmation source) |
| T22-T25 | `docs/PROCESS.md` + `docs/runbooks/` : aucune trace des trois mises a jour visees. | ✅ A faire |

**Conclusion** : 11 / 11 stories valides — aucune story ecartee pour cause de "deja fait dans le code".

---

## Stories engagees — Phase 1 (SEO surface + meta)

| Ordre | ID | Titre | Pts | Priorite | Statut |
|---|---|---|---|---|---|
| 1 | US-S20-1 | Audit SEO formel + soumission Google Search Console | 1 | Must | 🔵 A faire |
| 4 | US-S20-4 | Schema.org areaServed UK/BE/CH + meta home raccourcie | 1 | Must | 🔵 A faire |
| 9 | US-S20-3 | OG image dynamique per route (Next.js opengraph-image) | 2 | Must | 🔵 A faire |
| 11 | US-S20-2 | Pages services dediees Freshservice + Freshdesk (FR+EN) | 5 | Must | 🔵 A faire |

**Sous-total Phase 1 : 9 pts**

## Stories engagees — Phase 2 (Conversion instrumentation)

| Ordre | ID | Titre | Pts | Priorite | Statut |
|---|---|---|---|---|---|
| 7 | US-S20-5 | Funnel GA4 quiz (events started/question/results/lead/pdf) | 2 | Must | 🔵 A faire |
| 8 | US-S20-6 | CTA tracking (hero/sticky/calendly/contact_submit) | 1 | Must | 🔵 A faire |
| 10 | US-S20-7 | Calibration ROI Forrester (rapport TEI public) | 2 | Should | 🟡 Quasi-Ready (depend confirmation source PO) |

**Sous-total Phase 2 : 5 pts**

## Stories engagees — Phase 3 (Process / Ops buffer)

| Ordre | ID | Titre | Pts | Priorite | Statut |
|---|---|---|---|---|---|
| 0 | OPS-S20.1 | Resync lockfile (hotfix CI) + alignement Node CI ↔ local via .nvmrc | 1 | Must | 🟠 Hotfix lockfile applique J0 (26/04 soir) — alignement Node a faire J1 |
| 2 | T25 | Mini-refinement obligatoire ops > 30 min (formalisation) | 0 | Must | 🔵 A faire |
| 3 | T22 | Retrospective N en gate du Sprint Planning N+1 | 1 | Must | 🔵 A faire |
| 5 | T24 | Runbook env vars Vercel + force-fresh-build | 1 | Must | 🔵 A faire |
| 6 | T23 | Sender Resend en variable d'environnement + assertion | 1 | Must | 🔵 A faire |

**Sous-total Phase 3 : 4 pts** (était 3 pts, +1 pt OPS-S20.1)

---

## Total engage Sprint 20 : 18 pts (sur 20 capacite)

**Marge** : 2 pts (était 3 pts) pour absorber un Refactoring Radar mensuel (D23) ou une story emergente. OPS-S20.1 a pris 1 pt de marge.

---

## Plan d'enchainement (jours 1-6)

| Jour | Stories prioritaires | Focus |
|---|---|---|
| **J1** | T25 + T22 + US-S20-1 + US-S20-4 | Process formalise + audit + quick wins SEO (4 stories courtes, 3 pts) |
| **J2** | T23 + T24 + US-S20-5 (debut) | Ops runbooks + funnel quiz GA4 (3 pts) |
| **J3** | US-S20-5 (fin) + US-S20-6 + US-S20-3 | Tracking complet + OG dynamique (3 pts livres) |
| **J4** | US-S20-2 (debut) — homepage Freshservice FR | Premiere page service en place |
| **J5** | US-S20-2 (suite) — Freshservice EN + Freshdesk FR | Bilingue + 2eme service |
| **J6** | US-S20-2 (fin) + US-S20-7 (apres confirmation source) | Freshdesk EN + ROI Forrester |
| **J7** | Sprint Review + Retro S20 | Demo live + Keep/Drop/Try |

---

## Sprint Goal — test d'atteinte (a verifier en Sprint Review J7)

A la cloture (~3/05/2026) :
- [ ] Sitemap passe de 10 URLs a 14 URLs (+ 2 services × 2 langues) — `curl https://freshworks.whataservice.fr/sitemap.xml | grep -c "<url>"`
- [ ] GSC : sitemap soumis, 0 erreur 24h apres deploy, screenshot dans `docs/seo/`
- [ ] Schema Organization + Service couvrent 4 pays (FR/UK/BE/CH) — Schema.org Validator passe
- [ ] OG image dynamique generee per route — fetch `/<route>/opengraph-image` retourne 200 + content-type image/png pour les 4 routes services + quiz + maturity + home
- [ ] 8-10 events GA4 firing en prod apres consent (verifie en E2E + DevTools)
- [ ] ROI Forrester calibre sur source publique citee dans le disclaimer FR+EN
- [ ] 6 nouvelles specs Playwright passent (estimation : 61 tests E2E vs 55)
- [ ] T16 i18n parity passe avec ~250 nouvelles cles services FR+EN

---

## Pre-requis ouverts (hors S20 mais a clarifier)

- [x] **Confirmation source Forrester pour US-S20-7** : ✅ acte D33 — Forrester TEI Freshworks 2024 retenu (26/04)
- [x] **Decision D32 candidate** : ✅ acte D32 — epic **E25 "Conversion instrumentation"** ouverte (26/04). US-S20-5/6/7 rattaches a E25.
- [ ] **HubSpot custom properties ESM** (`smi_esm_score_dim1..5`, `smi_recommended_offer`) — toujours ouvert depuis S19 cloture, a faire avant le 1er prospect ESM reel

---

## Decisions PO sources S20

| ID | Decision | Date |
|---|---|---|
| D28 | Pivot Sprint Goal S20 vers SEO surface + conversion instrumentation | 26/04/2026 |
| D29 | 2 pages services prioritaires = Freshservice + Freshdesk, FR+EN simultane | 26/04/2026 |
| D30 | Audit SEO formel obligatoire en pre-Sprint Planning quand le Sprint Goal cible le SEO | 26/04/2026 |
| D31 | Cluster maturite etendu (ESM + niveaux 2-5) = backlog Phase 2 (hors scope S20) | 26/04/2026 |
| D32 | Epic **E25 "Conversion instrumentation"** ouverte — US-S20-5/6/7 rattaches | 26/04/2026 |
| D33 | Source ROI Forrester = Forrester TEI Freshworks 2024 (US-S20-7) | 26/04/2026 |
| D34 | **Hotfix lockfile** — `npm install` + commit du `package-lock.json` regenere (CI rouge depuis 5 runs sur drift `@swc/helpers` next-intl transitive) | 26/04/2026 |
| D35 | **Aligner Node CI ↔ local via `.nvmrc` = Node 22 LTS** — story OPS-S20.1 (1 pt, buffer Phase 3) | 26/04/2026 |
| D36 | **Regle commit lockfile** — tout `npm install` qui modifie `package-lock.json` doit etre committe scope `chore(deps)` dans le meme push que la modif deps qui l'a declenche | 26/04/2026 |

---

## Reportes en S21+ (acte refinement S20)

| Story | Pts | Raison report |
|---|---|---|
| US-23.1 — Decompose generate-pdf.ts | 2 | Refactoring lourd, valeur indirecte |
| US-23.2 — Extract MobileMenu + useFocusTrap | 3 | Refactoring lourd, valeur a11y indirecte |
| T20 — vitest-axe sur composants critiques quiz | 2 | A11y unit, valeur indirecte (axe-core E2E suffit court terme) |
| T26 — checkResend health check `/emails` | 1 | Cosmetique (faux degraded), pas urgent |
| T21 — Process : relecture editoriale PO i18n > 50 cles | 0 | Reportee comme story formelle mais appliquee de facto en S20 (pages services) |

---

*Sprint 20 demarre le 27/04/2026 — pivot Sprint Goal vers SEO + conversion (D28-D31). Refinement complet [ici](../refinement/sprint-20-refinement.md). 11 stories Ready, 17 pts engages, 3 pts marge.*
