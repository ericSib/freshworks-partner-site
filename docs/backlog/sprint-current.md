# Sprint 21 — "Couverture SEO Tier 2 + foundations qualité" — 🟢 CLOTURE

> **Sprint Goal** : Étendre la couverture SEO indexable de 7 à 10 routes (3 pages services Tier 2 : Migration ServiceNow + Freddy AI + Audit/Optimisation, FR+EN), durcir la qualité par hooks pre-commit (tsc + DoD SEO/meta), et boucler la conformité a11y AA sur le funnel quiz.
> **Début** : 27 avril 2026
> **Fin effective** : 28 avril 2026 (compressé en 1 session intensive — pattern S20/S21 D14/D16, calibration Try T42 obligatoire S22)
> **Capacité** : 20 pts (cadence 1 semaine, Manifeste P8)
> **Engagé** : 9 pts · **Livré** : 9 pts engagés + ~3 pts effort hors capacité (US-26.1 hotfix + slate-400 a11y + sitemap fix) = **~12 pts effectifs**
> **Verdict final** : 🟢 **ATTEINT — 4 outcomes / 4 livrés en prod**
> **Refinement source** : [refinement/sprint-21-refinement.md](../refinement/sprint-21-refinement.md)
> **Review** : [demo/sprint-21.md](../demo/sprint-21.md)
> **Retrospective** : [retro/sprint-21-retro.md](../retro/sprint-21-retro.md)

---

## Verification T1-v2 (PROCESS.md §4.1) — etat reel des stories candidates au Sprint Planning

| Story | Verification code | Verdict |
|---|---|---|
| US-S21-1 (Migration) | `VALID_SLUGS = ["freshservice","freshdesk"]` ligne 23 — slug "migration" absent. i18n `services.migration.*` absent. | ✅ A faire (livre) |
| US-S21-2 (Freddy AI) | Idem — slug "freddy-ai" absent + i18n absent. | ✅ A faire (livre) |
| US-S21-3 (Audit/Optimisation) | Idem — slug "audit-optimisation" absent + i18n absent. | ✅ A faire (livre) |
| T28 (DoD SEO/meta) | `docs/PROCESS.md` §7.2 ne contient pas la checklist conditionnelle SEO. | ✅ A faire (livre) |
| T29 (pre-commit tsc) | `.husky/pre-commit` execute uniquement `npx lint-staged`. `tsc --noEmit` absent. | ✅ A faire (livre) |
| T33 (mock localStorage) | `analytics.test.ts:43` `Object.defineProperty(global, "localStorage", ...)` present. Pas de `vitest.setup.ts` partage du mock. | ✅ A faire (livre) |
| T34/T35/T39 (process gates) | `docs/PROCESS.md` §4.1/§4.3 : aucune trace des 3 ajouts. | ✅ A faire (livre) |
| US-26.2 (aria-label QuizEmailGate) | `QuizEmailGate.tsx:42` input email sans `aria-label`. Cle `quiz.results.gateAriaLabel` absente. | ✅ A faire (livre) |

**Conclusion** : 9 / 9 stories valides — aucune story ecartee pour cause de "deja fait dans le code".

---

## Stories engagees — Bloc 1 (Foundations process) — TOUTES LIVREES

| Ordre | ID | Titre | Pts | Priorite | Statut | Commit |
|---|---|---|---|---|---|---|
| 1 | T29 | Pre-commit `tsc --noEmit` au husky hook (D41) | 1 | Must | 🟢 Done | [9edea94](https://github.com/ericSib/freshworks-partner-site/commit/9edea94) |
| 2 | T28 | DoD enrichie SEO/meta + template story (D40) | 1 | Must | 🟢 Done | [804d947](https://github.com/ericSib/freshworks-partner-site/commit/804d947) |
| 3 | T34 | "Sprint Goal 100% ?" gate Review (PROCESS.md §4.3) | 0 | Must | 🟢 Done | [804d947](https://github.com/ericSib/freshworks-partner-site/commit/804d947) |
| 4 | T35 | Audit findings buffer 5-15% (PROCESS.md §4.1) | 0 | Must | 🟢 Done | [804d947](https://github.com/ericSib/freshworks-partner-site/commit/804d947) |
| 5 | T39 | Test live navigation incognito (PROCESS.md §4.3) | 0 | Must | 🟢 Done | [804d947](https://github.com/ericSib/freshworks-partner-site/commit/804d947) |

**Sous-total Bloc 1 : 2 / 2 pts effectifs livres (3 process 0-pt + 2 stories 1-pt)**

## Stories engagees — Bloc 2 (Pages services Tier 2 SEO) — TOUTES LIVREES

| Ordre | ID | Titre | Pts | Priorite | Statut | Commit |
|---|---|---|---|---|---|---|
| 6 | US-S21-3 | Page service Audit/Optimisation FR+EN (warm-up pattern) | 1 | Must | 🟢 Done | [af19633](https://github.com/ericSib/freshworks-partner-site/commit/af19633) |
| 7 | US-S21-1 | Page service Migration ServiceNow FR+EN | 2 | Must | 🟢 Done | [53e5a58](https://github.com/ericSib/freshworks-partner-site/commit/53e5a58) |
| 8 | US-S21-2 | Page service Freddy AI FR+EN | 2 | Must | 🟢 Done | [b241937](https://github.com/ericSib/freshworks-partner-site/commit/b241937) |

**Sous-total Bloc 2 : 5 / 5 pts livres**

## Stories engagees — Bloc 3 (A11y + quality) — TOUTES LIVREES

| Ordre | ID | Titre | Pts | Priorite | Statut | Commit |
|---|---|---|---|---|---|---|
| 9 | US-26.2 | aria-label QuizEmailGate (WCAG 1.3.1 AA) | 1 | Should | 🟢 Done | [05704fa](https://github.com/ericSib/freshworks-partner-site/commit/05704fa) |
| 10 | T33 | Refactor mock localStorage en setupFile partage | 1 | Should | 🟢 Done | [8382cab](https://github.com/ericSib/freshworks-partner-site/commit/8382cab) |

**Sous-total Bloc 3 : 2 / 2 pts livres**

## Hors capacite — follow-ups & hotfixes (~4 pts effort)

| ID | Titre | Pts effort | Priorite | Statut | Commit |
|---|---|---|---|---|---|
| **US-26.1** | Hotfix vuln HIGH next 16.2.4 + next-intl 4.9.1 (D39 hors-sprint immediat) | 2 | P0 | 🟢 Done | [3f9c682](https://github.com/ericSib/freshworks-partner-site/commit/3f9c682) |
| **Bonus a11y** | Fix pre-existant `text-slate-500` → `400` ServicePageContent.tsx (decouvert pendant US-S21-3) | 0.5 | Should | 🟢 Done | [c83d8e3](https://github.com/ericSib/freshworks-partner-site/commit/c83d8e3) |
| **Audit findings T35** | Sitemap.ts manquait 3 routes Tier 2 — fix + test update | 0.5 | Must | 🟢 Done | [098fd7a](https://github.com/ericSib/freshworks-partner-site/commit/098fd7a) |
| **T40 livre en avance** | Test E2E sitemap hreflang FR/EN/x-default (initialement liste Try S22, livre en S21 suite a question PO 28/04 sur visibilite hreflang) | 1 | Should | 🟢 Done | [cfbde0a](https://github.com/ericSib/freshworks-partner-site/commit/cfbde0a) |

**Sous-total hors capacite : ~4 pts effort livres (consommation buffer T35 = ~40%)**

---

## Total Sprint 21 : 9 / 9 pts engages livres + ~4 pts hors capacite = **~13 pts effectifs livres**

**Sprint Goal** : 🟢 **ATTEINT — 4 outcomes / 4 livres en prod** :
1. ✅ Surface SEO indexable étendue de 7 à 10 routes
2. ✅ Pre-commit `tsc --noEmit` actif (drift TS bloqué)
3. ✅ DoD enrichie SEO/meta (T28/D40 prevention)
4. ✅ Conformite WCAG 1.3.1 AA bouclée sur funnel quiz (US-26.2)

**Increment en prod** : ✅ `https://freshworks.whataservice.fr` — 10 routes indexables vs 7 baseline, sitemap 10 entrees, 9 schemas Service+Org coherents, 36 Q/A FAQPage rich-snippet eligibles, funnel quiz conforme AA, baseline securite 0 HIGH.

---

## Plan d'enchainement REEL (1 session intensive, 27-28/04/2026)

| Bloc | Stories livrees | Phase |
|---|---|---|
| **J0 (27/04 matin)** | Hotfix US-26.1 + cleanup S20 + refinement S21 + setup 6 stories + sprint-current.md | Setup + hotfix |
| **J0 (27/04 apres-midi)** | T29 + T28+T34+T35+T39 | Bloc 1 foundations |
| **J0+1 (27→28/04 nuit)** | US-S21-3 + US-S21-1 + US-S21-2 + slate-400 fix bonus | Bloc 2 services |
| **J1 (28/04 matin)** | US-26.2 + T33 | Bloc 3 a11y + quality |
| **J1 (28/04 apres-midi)** | Sitemap fix + push prod + Sprint Review + Retro S21 | Cloture + audit findings |

Velocite atypique reproduite (S19 + S20 + S21 = pattern recurrent). T36/T42 calibration capacite reste **obligatoire S22 Bloc 1**.

---

## Sprint Goal — test d'atteinte (cloture 28/04/2026)

- [x] 3 nouvelles routes services 200 OK (FR+EN) sur prod : `/fr/services/migration`, `/fr/services/freddy-ai`, `/fr/services/audit-optimisation` + EN ✅ (curl validated)
- [x] Sitemap.xml passe de 7 à 10 entrées (+3 services Tier 2 × hreflang FR/EN) ✅ (`curl /sitemap.xml | grep -c "<url>"` = 10)
- [x] `.husky/pre-commit` execute `tsc --noEmit` apres lint, drift TS bloque ✅ (test artificiel verifie + 11 commits franchissent le hook sans drift)
- [x] `docs/PROCESS.md` §7.2 contient la checklist DoD SEO/meta + §4.3 contient gate "Sprint Goal 100% ?" + §4.3 contient test live incognito + §4.1 contient buffer audit ✅
- [x] axe-core 0 violation critical/serious sur les 3 nouvelles pages services (FR+EN, 6 specs Playwright) + page quiz post-gate (US-26.2 + 2 tests RTL) ✅
- [x] T16 i18n parity passe avec ~360 nouvelles cles (3 services × 58 cles × 2 langues + 2 cles US-26.2) ✅
- [x] **960** tests pass (vs 958 baseline post-S20, +2 US-26.2) ✅
- [x] 0 vuln HIGH (US-26.1 hotfix livre 27/04) ✅
- [x] **+18 nouveaux tests E2E** Playwright (3 specs services × 6 tests) — non comptes dans les 960 vitest mais executes contre dev server pendant developpement ✅

---

## Pre-requis ouverts (carry-over S22)

- [ ] **HubSpot custom properties ESM** (`smi_esm_score_dim1..5`, `smi_recommended_offer`) — toujours ouvert depuis S19, Q4 PO acte report jusqu'au 1er prospect ESM reel
- [ ] **T39 navigation incognito** par PO — recommande sur les 6 nouvelles routes services + funnel quiz pour valider US-26.2 avec screen reader (VoiceOver/NVDA)
- [ ] **Indexation Google** — diagnostic 28/04 : 0 page indexee (site:freshworks.whataservice.fr = 0 resultat). Cause principale = age domaine (3 jours en prod, delai typique 4j-4sem). Actions PO recommandees : GSC > Inspection URL "Demander indexation" sur les 10 routes prioritaires + verifier statut sitemap dans GSC > Sitemaps + investiguer header `cache-control: private, no-cache, no-store` etrange sur les pages services (potentiel ralentisseur de re-crawl, probablement lie a next-intl middleware — story candidate S22 ~1 pt)

---

## Decisions PO actees S21 (arbitrages Sprint Planning Q1-Q5)

| ID | Decision | Date |
|---|---|---|
| Q1 | T33 engagee (1 pt) en Bloc 3 → 9 pts engages au total | 27/04/2026 |
| Q2 | Prix `SERVICE_PRICE_FROM` migration 12k / freddy-ai 8k / audit-optimisation 6k EUR | 27/04/2026 |
| Q3 | Libelles a11y FR/EN US-26.2 actes (FR "Saisissez votre email professionnel", EN "Enter your work email") | 27/04/2026 |
| Q4 | HubSpot ESM custom properties = backlog (pas de prospect ESM imminent) | 27/04/2026 |
| Q5 | Sprint Goal final valide | 27/04/2026 |

Aucune nouvelle decision structurelle (D42+) ouverte pendant S21 — les 5 arbitrages sont des decisions Sprint Planning, pas des regles process perennes (les regles process pertinentes sont D37-D41 actees AVANT S21).

---

## Reportes en S22+ (acte refinement S21)

| Story | Pts | Raison report |
|---|---|---|
| US-23.1 — Decompose generate-pdf.ts | 2 | Refacto lourd, valeur indirecte (carry-over depuis S20) |
| US-23.2 — Extract MobileMenu + useFocusTrap | 3 | Refacto lourd, valeur a11y indirecte (carry-over depuis S20) |
| T20 — vitest-axe quiz components | 2 | A11y unit, axe-core E2E suffit court terme (carry-over depuis S20) |
| T26 — checkResend `/emails` health | 1 | Cosmetique, pas urgent (carry-over depuis S20) |
| T36 → T42 — Calibrage capacite Claude | 1 | Reporte de S20 puis S21 — **engagement obligatoire S22 Bloc 1** |
| T37 → T46 — Pages services Tier 3 (cx-esm-transformation + esm-sprints + managed-excellence) | 5 | Si pattern T41 sitemap dynamique livre |

## Trys retro S21 (entrees Sprint 22)

- ~~T40 (1 pt) — Test E2E asserte sitemap.xml contient toutes les routes actives~~ ✅ **livre en S21 (cfbde0a)** suite a question PO 28/04
- T41 (1 pt) — Refactor sitemap.ts pour boucler sur VALID_SLUGS (source unique verite)
- T42 (1 pt) — Calibrage capacite Claude Code (T36 reporte de S20) — **obligatoire S22 Bloc 1**
- T43 (1 pt) — Specs E2E retroactives sur freshservice + freshdesk (combler dette S20)
- T44 (0 pt) — Estimation i18n basee sur volume cles (process)
- T45 (0 pt) — Promotion T29 au statut acquis structurel CLAUDE.md (process)
- T46 (5 pts) — Pages services Tier 3 (3 pages restantes catalogue)
- T47 (1 pt) — Runbook hotfix-procedure.md avec etape "verify Vercel preview"
- **T48** (1 pt) — Investiguer header `cache-control: private, no-cache, no-store` sur pages services (impact crawl Google) + runbook indexation GSC (`docs/runbooks/seo-indexation-checklist.md`)

---

## Transition vers Sprint 22

**Avant le Sprint Planning S22, conduire** :
1. ✅ Sprint Review S21 (cloturee 28/04) → [demo/sprint-21.md](../demo/sprint-21.md)
2. ✅ Sprint Retrospective S21 (cloturee 28/04) → [retro/sprint-21-retro.md](../retro/sprint-21-retro.md) — gate T22 respectee
3. ⏳ Refinement preparatoire S22 — passer les 8 trys retro S21 (T40-T47) + 5 stories carry-over (US-23.1, US-23.2, T20, T26, T46) à DoR Ready, plus la calibration T42 obligatoire en Bloc 1

**Trigger** : prochaine session ouvre par "Refinement preparatoire Sprint 22" dans `docs/refinement/sprint-22-refinement.md`.

---

*Sprint 21 cloture definitivement le 29/04/2026 — Sprint Goal 100% atteint, ~13 pts effectifs livres (9 engages + ~4 hors capacite incl. T40 livre en avance suite a question PO sur visibilite sitemap hreflang). 13 commits livres (3f9c682 → cfbde0a). Voir [demo/sprint-21.md](../demo/sprint-21.md) pour la Sprint Review complete et [retro/sprint-21-retro.md](../retro/sprint-21-retro.md) pour les Keep/Drop/Try.*
