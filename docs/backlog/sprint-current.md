# Sprint 21 — "Couverture SEO Tier 2 + foundations qualite"

> **Sprint Goal** : Etendre la couverture SEO indexable de 7 a 10 routes (3 pages services Tier 2 : Migration ServiceNow + Freddy AI + Audit/Optimisation, FR+EN), durcir la qualite par hooks pre-commit (tsc + DoD SEO/meta), et boucler la conformite a11y AA sur le funnel quiz.
> **Debut** : 27 avril 2026
> **Fin cible** : ≤ 7 jours (cadence 1 semaine, Manifeste P3)
> **Capacite** : 20 pts (cadence 1 semaine, Manifeste P8)
> **Engage** : **9 pts** (3 pts Bloc 1 + 5 pts Bloc 2 + 2 pts Bloc 3) · **Marge** : ~11 pts (audit findings buffer + opportunites emergentes)
> **Refinement source** : [refinement/sprint-21-refinement.md](../refinement/sprint-21-refinement.md)
> **Decision PO Option B** : 27/04/2026 — "priorite au SEO car le site est deja en prod et indexe sur Google"

---

## Pre-requis Sprint Planning S21 (PROCESS.md §4.1, T22) — gates verts

| Gate | Statut | Lien |
|---|---|---|
| Retrospective S20 committee dans `docs/retro/` | ✅ Done | [sprint-20-retro.md](../retro/sprint-20-retro.md) (commit 2d9731a) |
| Refinement preparatoire S21 committe | ✅ Done | [sprint-21-refinement.md](../refinement/sprint-21-refinement.md) (commit fe01cba) |
| US-26.1 (vuln HIGH residuelle de S20) traitee | ✅ Hotfix livre | commit 3f9c682 (27/04) |
| Decisions D37-D41 actees au journal CLAUDE.md | ✅ Done | commit f832748 (27/04) |
| Stories candidates Ready (DoR) | ✅ 9 stories Ready | docs/stories-ready/US-S21-1/2/3.md + T28/T29/T33.md + US-26.2.md |

**Conclusion** : 5/5 gates verts. Sprint Planning S21 OK.

---

## Verification T1-v2 (PROCESS.md §4.1) — etat reel des stories candidates

| Story | Verification code | Verdict |
|---|---|---|
| US-S21-1 (Migration ServiceNow) | `src/app/[locale]/services/[slug]/page.tsx:23` : `VALID_SLUGS = ["freshservice","freshdesk"]`. Slug `"migration"` ABSENT. i18n `services.migration.*` absent. | ✅ A faire |
| US-S21-2 (Freddy AI) | Idem : `"freddy-ai"` absent de VALID_SLUGS. Aucune cle i18n `services.freddy-ai.*`. | ✅ A faire |
| US-S21-3 (Audit/Optimisation) | Idem : `"audit-optimisation"` absent. Aucune cle i18n `services.audit-optimisation.*`. | ✅ A faire |
| T28 (DoD SEO/meta) | `docs/PROCESS.md` §7.2 ne contient pas la checklist conditionnelle SEO. `_TEMPLATE.md` non enrichi. | ✅ A faire |
| T29 (pre-commit tsc) | `.husky/pre-commit` execute uniquement `next lint --quiet` (verifier). `tsc --noEmit` absent. | ✅ A faire |
| T33 (mock localStorage) | `src/lib/__tests__/analytics.test.ts:35` : `Object.defineProperty(global, "localStorage", ...)` present. Pas de `vitest.setup.ts` partage. | ✅ A faire |
| T34/T35/T39 (process gates) | `docs/PROCESS.md` §4.1/§4.3 : aucune trace des 3 ajouts. | ✅ A faire |
| US-26.2 (aria-label QuizEmailGate) | `src/components/quiz/QuizEmailGate.tsx:42` : input email sans `aria-label`. Cle `quiz.results.gateAriaLabel` absente. | ✅ A faire |

**Conclusion** : 9 / 9 stories valides — aucune story ecartee pour cause de "deja fait dans le code".

---

## Stories engagees — Bloc 1 (Foundations process)

| Ordre | ID | Titre | Pts | Priorite | Statut | Commit |
|---|---|---|---|---|---|---|
| 1 | T29 | Pre-commit `tsc --noEmit` au husky hook (D41) | 1 | Must | ⏳ A faire | — |
| 2 | T28 | DoD enrichie SEO/meta + template story (D40) | 1 | Must | ⏳ A faire | — |
| 3 | T34 | "Sprint Goal 100% ?" gate Review (PROCESS.md §4.3) | 0 | Must | ⏳ A faire | — |
| 4 | T35 | Audit findings buffer 5-15% (PROCESS.md §4.1) | 0 | Must | ⏳ A faire | — |
| 5 | T39 | Test live navigation incognito (PROCESS.md §4.3) | 0 | Must | ⏳ A faire | — |

**Sous-total Bloc 1 : 2 pts effectifs (3 process)**

## Stories engagees — Bloc 2 (Pages services Tier 2 SEO)

| Ordre | ID | Titre | Pts | Priorite | Statut | Commit |
|---|---|---|---|---|---|---|
| 6 | US-S21-3 | Page service Audit/Optimisation FR+EN (warm-up pattern) | 1 | Must | ⏳ A faire | — |
| 7 | US-S21-1 | Page service Migration ServiceNow FR+EN | 2 | Must | ⏳ A faire | — |
| 8 | US-S21-2 | Page service Freddy AI FR+EN | 2 | Must | ⏳ A faire | — |

**Sous-total Bloc 2 : 5 pts**

## Stories engagees — Bloc 3 (A11y + quality)

| Ordre | ID | Titre | Pts | Priorite | Statut | Commit |
|---|---|---|---|---|---|---|
| 9 | US-26.2 | aria-label QuizEmailGate (WCAG 1.3.1 AA) | 1 | Should | ⏳ A faire | — |
| 10 | T33 | Refactor mock localStorage en setupFile partage | 1 | Should | ⏳ A faire | — |

**Sous-total Bloc 3 : 2 pts**

---

## Total Sprint 21 : 9 / 20 pts engages — marge ~11 pts

**Sprint Goal** : ⏳ EN COURS — 4 outcomes a livrer :
1. **+3 routes services indexables** (10 routes total vs 7 pre-S21)
2. **Pre-commit `tsc --noEmit`** = drift TS bloque a la source
3. **DoD enrichie SEO/meta** = pas de regression D40 future
4. **Conformite a11y AA bouclee sur le funnel quiz** (US-26.2 + verif post-S20 globale)

**Increment cible en prod** : `https://freshworks.whataservice.fr` — 10 routes indexables × 2 langues = 14 URLs sitemap (vs 14 actuel, +6 nouvelles routes brutes).

---

## Plan d'enchainement propose

| Bloc | Stories | Estimation effective | Sequence |
|---|---|---|---|
| **Bloc 1** | T29 + T28 + T34 + T35 + T39 | 2 pts effectifs | TDD process — pose les guard-rails. Doit etre fini avant Bloc 2. |
| **Bloc 2** | US-S21-3 → US-S21-1 → US-S21-2 | 5 pts | Pages services (du + simple au + complexe). Pattern code path acquis (US-S20-2). |
| **Bloc 3** | US-26.2 + T33 | 2 pts | Stories isolees, livrables independamment apres Bloc 1+2. |
| **Cloture** | Sprint Review + Retro S21 | — | Skill agile-product-owner |

---

## Sprint Goal — test d'atteinte (a verifier en cloture)

- [ ] 3 nouvelles routes services 200 OK (FR+EN) sur prod : `/fr/services/migration`, `/fr/services/freddy-ai`, `/fr/services/audit-optimisation` + EN
- [ ] Sitemap.xml passe de 14 a 20 URLs (10 routes × 2 langues)
- [ ] `.husky/pre-commit` execute `tsc --noEmit` apres lint, drift TS bloque
- [ ] `docs/PROCESS.md` §7.2 contient la checklist DoD SEO/meta + §4.3 contient gate "Sprint Goal 100% ?" + §4.1 contient buffer audit
- [ ] axe-core 0 violation critical/serious sur les 3 nouvelles pages services + page quiz post-gate
- [ ] T16 i18n parity passe avec +75 cles × 2 langues (~150 entrees)
- [ ] 958+ tests pass (baseline post-S20)
- [ ] 0 vuln HIGH (baseline post US-26.1 hotfix)

---

## Decisions PO actees S21 (a alimenter au fur et a mesure)

| ID | Decision | Date |
|---|---|---|
| Q1 | T33 engagee (1 pt) en plus du Bloc 1+2+3 → total 9 pts | 27/04/2026 |
| Q2 | Prix `SERVICE_PRICE_FROM` : migration 12_000, freddy-ai 8_000, audit-optimisation 6_000 (a confirmer en cours de story) | 27/04/2026 |
| Q3 | Libelles a11y US-26.2 : FR "Saisissez votre email professionnel", EN "Enter your work email" | 27/04/2026 |
| Q4 | HubSpot ESM custom properties = backlog (pas de prospect ESM imminent) | 27/04/2026 |
| Q5 | Sprint Goal valide : "Etendre couverture SEO indexable de 7 a 10 routes + foundations qualite" | 27/04/2026 |

---

## Red flags ouverts

- **RF1** ⚠️ : Vercel preview du hotfix US-26.1 (next 16.2.4) **non verifie au demarrage S21**. Si KO en preview → rollback `git revert 3f9c682 + npm ci` puis replanification. Verifier dashboard Vercel avant fin Bloc 1.
- **RF2** : postcss MOD residuelle (next 16.2.4 pin 8.4.31). Veille D38 Next 17 future.
- **RF3** : ecart velocite S20 19 pts/session non resorbe. T36 (calibrage) reporte hors S21 (Q4 PO indirect).
- **RF4** : pre-requis HubSpot ESM = blocage 1er prospect ESM reel. Accepte (Q4 PO).

---

## Marge candidates (~11 pts a piocher si capacite)

Stories listees dans le refinement S21 §5 mais **non engagees** :
- T36 — calibrage capacite Claude (1 pt)
- US-23.1 — decompose generate-pdf.ts (2 pts)
- US-23.2 — extract MobileMenu + useFocusTrap (3 pts)
- T20 — vitest-axe quiz (2 pts)
- T26 — checkResend `/emails` (1 pt, cosmetique)
- US-26.4 — audit a11y systematique 8 pages (3-5 pts, candidate non encore fiche)

A piocher selon avance du Bloc 2/3 + appetit refacto en fin de sprint.

---

*Sprint 21 ouvert 27/04/2026. Plan d'enchainement Bloc 1 → Bloc 2 → Bloc 3 → Review + Retro. Voir [refinement/sprint-21-refinement.md](../refinement/sprint-21-refinement.md) pour le detail Three Amigos par story.*
