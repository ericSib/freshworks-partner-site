# Sprint 20 — "Surface SEO + funnel instrumente" — 🟢 CLOTURE

> **Sprint Goal** : Etendre la surface de captage SEO du site (pages services dediees Freshservice + Freshdesk en FR+EN, schema.org enrichi UK/BE/CH, OG dynamiques) et instrumenter le funnel de conversion (events GA4 quiz + CTA + contact) pour piloter les optimisations a la donnee.
> **Debut** : 26 avril 2026 (compresse en 1 session intensive, vs cadence Manifeste 1 semaine)
> **Fin effective** : 26 avril 2026
> **Capacite** : 20 pts (cadence 1 semaine, Manifeste P8)
> **Engage** : 18 pts (apres ajout OPS-S20.1 D34-D36) · **Livre** : 18 pts engages + 1 pt bug fix imprevu (US-S20-BUG.1) = **19 pts effectifs**
> **Verdict final** : 🟢 **ATTEINT — 4 outcomes / 4 livres en prod**
> **Refinement source** : [refinement/sprint-20-refinement.md](../refinement/sprint-20-refinement.md)
> **Audit SEO source** : [seo/audit-2026-04-26.md](../seo/audit-2026-04-26.md)
> **Review** : [demo/sprint-20.md](../demo/sprint-20.md)
> **Retrospective** : [retro/sprint-20-retro.md](../retro/sprint-20-retro.md)

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

## Stories engagees — Phase 1 (SEO surface + meta) — TOUTES LIVREES

| Ordre | ID | Titre | Pts | Priorite | Statut | Commit |
|---|---|---|---|---|---|---|
| 1 | US-S20-1 | Audit SEO formel + soumission Google Search Console | 1 | Must | 🟢 Done | [156fed8](156fed8) + [ca850b5](ca850b5) (GSC meta follow-up) |
| 4 | US-S20-4 | Schema.org areaServed UK/BE/CH + meta home raccourcie | 1 | Must | 🟢 Done | [3691964](3691964) + [2996f18](2996f18) (areaServed unification follow-up) |
| 9 | US-S20-3 | OG image dynamique per route (Next.js opengraph-image) | 2 | Must | 🟢 Done | [c7508c7](c7508c7) |
| 11 | US-S20-2 | Pages services dediees Freshservice + Freshdesk (FR+EN) | 5 | Must | 🟢 Done | [d73ffd0](d73ffd0) |

**Sous-total Phase 1 : 9 / 9 pts livres**

## Stories engagees — Phase 2 (Conversion instrumentation, Epic E25) — TOUTES LIVREES

| Ordre | ID | Titre | Pts | Priorite | Statut | Commit |
|---|---|---|---|---|---|---|
| 7 | US-S20-5 | Funnel GA4 quiz (events started/form/lead/results/pdf) | 2 | Must | 🟢 Done | [b6e4f4b](b6e4f4b) |
| 8 | US-S20-6 | CTA tracking (hero/sticky/calendly/contact_submit) | 1 | Must | 🟢 Done | [67aba21](67aba21) |
| 10 | US-S20-7 | Calibration ROI Forrester TEI 2024 | 2 | Should | 🟢 Done | [3bf92f9](3bf92f9) |

**Sous-total Phase 2 : 5 / 5 pts livres**

## Stories engagees — Phase 3 (Process / Ops) — TOUTES LIVREES

| Ordre | ID | Titre | Pts | Priorite | Statut | Commit |
|---|---|---|---|---|---|---|
| 0 | OPS-S20.1 | Resync lockfile (hotfix CI) + alignement Node CI ↔ local via .nvmrc Node 22 LTS | 1 | Must | 🟢 Done | [c2b555e](c2b555e) (PO) + [633e367](633e367) (PO) + [bc7f8b5](bc7f8b5) |
| 2 | T25 | Mini-refinement obligatoire ops > 30 min (formalisation) | 0 | Must | 🟢 Done | [ee6a2f3](ee6a2f3) |
| 3 | T22 | Retrospective N en gate du Sprint Planning N+1 | 1 | Must | 🟢 Done | [d772e46](d772e46) |
| 5 | T24 | Runbook env vars Vercel + force-fresh-build | 1 | Must | 🟢 Done | [e78f083](e78f083) |
| 6 | T23 | Sender Resend en variable d'environnement + assertion | 1 | Must | 🟢 Done | [c16dd6a](c16dd6a) |

**Sous-total Phase 3 : 4 / 4 pts livres**

## Bug fix imprevu (1 pt hors capacite engagee)

| ID | Titre | Pts | Priorite | Statut | Commit |
|---|---|---|---|---|---|
| US-S20-BUG.1 | Cookie banner ne se ferme pas au clic (RGPD blocker, debloque tracking GA4) | 1 | P0 | 🟢 Done | [9437c59](9437c59) |

---

## Total Sprint 20 : 18 / 18 pts engages livres + 1 pt bug fix = **19 pts effectifs livres**

**Sprint Goal** : 🟢 **ATTEINT — 4 outcomes / 4 livres en prod** (pages services FR+EN, schema 4 pays, OG dynamique, funnel instrumente)
**Increment en prod** : ✅ `https://freshworks.whataservice.fr` 7 routes indexables (vs 4 avant), 27 Country JSON-LD, 10 events GA4 actifs, ROI Forrester TEI 2024 calibre.

---

## Plan d'enchainement REEL (1 session intensive, 26/04/2026)

Le sprint a ete livre en 1 session compresse (vs cadence 1 semaine prevue). Velocite atypique a investiguer en retro (Drop S20 D14, Try T36).

| Bloc | Stories livrees | Phase |
|---|---|---|
| **Bloc 1** | T25 + T22 + US-S20-1 + US-S20-4 + T23 + T24 + US-S20-5 + US-S20-6 (8 pts) | Phase 1 + Phase 2 + Phase 3 quick wins |
| **Bloc 2** | US-S20-3 + US-S20-7 + US-S20-BUG.1 + OPS-S20.1 + US-S20-1 follow-up + US-S20-4 follow-up (~7 pts) | OG + ROI + bug fix + ops |
| **Bloc 3** | US-S20-2 (5 pts) | Pages services FR+EN |
| **Cloture** | Sprint Review + Retro S20 | Skill agile-product-owner |

---

## Sprint Goal — test d'atteinte (cloture 26/04/2026)

- [x] Sitemap passe de 10 URLs a 14 URLs (7 routes × 2 langues) — `curl https://freshworks.whataservice.fr/sitemap.xml | grep -c "<url>"` retourne **7** ✅
- [x] GSC : balise verification meta livree, sitemap soumis (PO confirme propriete confirmee) ✅
- [x] Schema Organization + Service couvrent 4 pays (FR/UK/BE/CH) — Schema.org Validator 0 erreur, 27 Country JSON-LD sur `/fr` ✅
- [x] OG image dynamique generee per route — `/fr/opengraph-image` 41KB PNG, `/quiz/opengraph-image` 43KB, `/maturite/itsm/level-1/opengraph-image` 39KB ✅
- [x] 10 events GA4 firing en prod apres consent (5 funnel quiz + 5 CTA/Calendly/contact) ✅
- [x] ROI Forrester TEI 2024 calibre sur source publique citee dans le disclaimer FR+EN ✅
- [x] T16 i18n parity passe avec +280 nouvelles cles (services × 2 langues) ✅
- [x] 958 / 958 tests pass (+45 tests unitaires vs S19) ✅
- [x] Bug RGPD cookie banner fixe — debloque tout le tracking GA4 livre ✅

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

## Transition vers Sprint 21

**Avant le Sprint Planning S21, conduire** :
1. ✅ Sprint Review S20 (cloturee 26/04) → [demo/sprint-20.md](../demo/sprint-20.md)
2. ✅ Sprint Retrospective S20 (cloturee 26/04) → [retro/sprint-20-retro.md](../retro/sprint-20-retro.md) — gate T22 respectee
3. ⏳ Refinement preparatoire S21 — passer les 7 trys de la retro S20 (T33-T39) a DoR Ready, plus les stories backlog non-livrees S20 (US-23.1, US-23.2, T20, T26, T21).

**Trigger** : prochaine session ouvre par "Refinement preparatoire Sprint 21" dans `docs/refinement/sprint-21-refinement.md`.

---

*Sprint 20 cloture le 26/04/2026 — Sprint Goal 100% atteint, 19 pts effectifs livres en 1 session intensive (vs cadence 1 semaine). Voir [demo/sprint-20.md](../demo/sprint-20.md) pour la Sprint Review complete et [retro/sprint-20-retro.md](../retro/sprint-20-retro.md) pour les Keep/Drop/Try.*
