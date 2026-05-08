# Sprint 22 — "SEO recovery + calibration capacité + dette E2E Tier 1" — 🟡 EN COURS

> **Sprint Goal** : Restaurer l'indexation Google (≥7 routes en index a J+14) via correction headers cache-control + canonical, calibrer la capacite Claude Code (T42 obligatoire depuis S20), et combler la dette E2E sur les pages services Tier 1.
> **Debut** : 8 mai 2026
> **Fin cible** : 15 mai 2026 (cadence 1 semaine, Manifeste P3)
> **Capacite** : 20 pts
> **Engage** : 6 pts (7 si HOTFIX-S22.0b debloque par Q2 PO)
> **Refinement source** : [refinement/sprint-22-refinement.md](../refinement/sprint-22-refinement.md)
> **Three Amigos mobilise** : `dev-architecture` + `dev-clean-code` + `qa-strategy` (demande PO 08/05)

---

## Verification T1-v2 (PROCESS.md §4.1) — etat reel des stories candidates au Sprint Planning

| Story | Verification code | Verdict |
|---|---|---|
| HOTFIX-S22.0a | `next.config.ts` ne contient AUCUNE regle `Cache-Control` (uniquement `securityHeaders`). Bug confirme `curl -I` = `cache-control: private, no-cache, no-store`. | ✅ A faire (livre dans S22) |
| HOTFIX-S22.0c | `docs/runbooks/seo-indexation-checklist.md` n'existe pas. | ✅ A faire (livre dans S22) |
| HOTFIX-S22.0b | URL exacte inconnue, depend Q2 PO export GSC. | ⏳ Bloque (DoR pending Q2) |
| T42 | `CLAUDE.md` ne contient pas de section calibration capacite Claude Code. | ✅ A faire (livre dans S22) |
| T41 | `src/app/sitemap.ts` listing manuel ligne 56-68 (10 entrees codees a la main). `VALID_SLUGS` source unique a `src/app/[locale]/services/[slug]/page.tsx`. | ✅ A faire (livre dans S22) |
| T43 | `tests/e2e/services-freshservice.spec.ts` + `tests/e2e/services-freshdesk.spec.ts` n'existent pas (verifie `ls tests/e2e/services-*` = uniquement Tier 2 livres S21). | ✅ A faire (livre dans S22) |
| T47 | `docs/runbooks/hotfix-procedure.md` n'existe pas. | ✅ A faire (livre dans S22) |
| T44 | `docs/PROCESS.md` §4.1 ne contient pas section "estimation i18n". | ✅ A faire (livre dans S22) |
| T45 | `CLAUDE.md` ne mentionne pas T29 pre-commit tsc comme regle structurelle (acquis non promu). | ✅ A faire (livre dans S22) |

**Conclusion** : 8/9 stories valides, 1 bloque sur Q2 PO — aucune story ecartee pour cause de "deja fait".

---

## Stories engagees — Bloc 1 (SEO recovery — P0 Must)

| Ordre | ID | Titre | Pts | Priorite | Statut | Commit |
|---|---|---|---|---|---|---|
| 1 | **HOTFIX-S22.0a** | Cache-control public sur routes indexables | 1.5 | **P0 Must** | ⏳ TODO | — |
| 2 | **HOTFIX-S22.0c** | Runbook seo-indexation-checklist.md (ex-T48 absorbe) | 0.5 | P0 Must | ⏳ TODO | — |
| 3 | **HOTFIX-S22.0b** | Fix canonical "Page en double" (depend Q2 PO) | 1 | P1 Should | ⏳ Bloque DoR | — |

**Sous-total Bloc 1 : 2 pts engages (3 si Q2 debloque)**

## Stories engagees — Bloc 2 (Process & calibration — P0/P1 Must)

| Ordre | ID | Titre | Pts | Priorite | Statut | Commit |
|---|---|---|---|---|---|---|
| 4 | **T42** | Calibration capacite Claude Code (story points ↔ heures) | 1 | **P0 Must** | ⏳ TODO | — |
| 5 | T44 | Section "estimation i18n volume cles" PROCESS.md | 0 | Should | ⏳ TODO | — |
| 6 | T45 | Promotion T29 acquis structurel CLAUDE.md | 0 | Should | ⏳ TODO | — |

**Sous-total Bloc 2 : 1 pt engage**

## Stories engagees — Bloc 3 (Quality work — Should)

| Ordre | ID | Titre | Pts | Priorite | Statut | Commit |
|---|---|---|---|---|---|---|
| 7 | T41 | Refactor sitemap.ts loop sur VALID_SLUGS (single source) | 1 | Must | ⏳ TODO | — |
| 8 | T43 | Specs E2E retro freshservice + freshdesk (dette S20) | 1 | Should | ⏳ TODO | — |
| 9 | T47 | Runbook hotfix-procedure.md | 1 | Should | ⏳ TODO | — |

**Sous-total Bloc 3 : 3 pts engages**

---

## Total Sprint 22 : 6 pts engages (7 si Q2 PO debloque HOTFIX-S22.0b)

**Sprint Goal — criteres d'atteinte (test cloture)** :
- [ ] `curl -I` sur 10 URLs sitemap retourne `cache-control: public, s-maxage=86400, ...` (no `private/no-store`)
- [ ] Test E2E nouveau `seo-cache-headers.spec.ts` vert
- [ ] Tests E2E S21 (sitemap-hreflang + services Tier 2) restent verts
- [ ] 960 vitest reste pass
- [ ] Sitemap re-soumis dans GSC + Inspection URL "Demander indexation" sur 10 routes (action PO)
- [ ] **GSC monitoring J+7 = ≥ 1 page indexee** (signal precoce que fix fonctionne)
- [ ] **GSC monitoring J+14 = ≥ 7 pages indexees** (KPI Sprint Goal)
- [ ] Section CLAUDE.md sur calibration capacite Claude Code livree (T42)
- [ ] Specs E2E Tier 1 services livrees (T43)

---

## Plan d'enchainement propose

| Jour | Bloc | Stories | Action |
|---|---|---|---|
| **J0 (08/05 apres-midi)** | Setup | Refinement + sprint-current | ✅ Done (ce fichier) |
| **J0 (08/05 apres-midi)** | **Bloc 1.0a** | HOTFIX-S22.0a | TDD : test E2E rouge → fix next.config.ts → vert → push prod |
| **J1 (09/05 matin)** | Bloc 1.0c | HOTFIX-S22.0c | Runbook + smoke curl prod |
| **J1 (09/05 apres-midi)** | Bloc 2 | T42 + T44 + T45 | Process hardening |
| **J2-J3** | Bloc 1.0b | HOTFIX-S22.0b si Q2 | Canonical fix conditionnel |
| **J3-J5** | Bloc 3 | T41 + T43 + T47 | Quality work |
| **J6-J7** | Buffer | Monitoring GSC | J+3 + J+7 observation |
| **J7 (15/05)** | Cloture | Demo + Retro | Sprint Review + S22 retro → S23 inbox |

---

## Pre-requis ouverts (carry-over S22)

- [ ] **HubSpot custom properties ESM** (`smi_esm_score_dim1..5`, `smi_recommended_offer`) — toujours ouvert depuis S19, Q4 PO acte report jusqu'au 1er prospect ESM reel
- [ ] **Q2 PO** : URL exacte de la page "Page en double : URL canonique differente" via GSC > Couverture > onglet "Pages avec problemes" (debloque HOTFIX-S22.0b)
- [ ] **Action PO post-merge HOTFIX-S22.0a** : re-soumettre `https://freshworks.whataservice.fr/sitemap.xml` dans GSC > Sitemaps + Inspection URL "Demander indexation" sur 10 routes prio
- [ ] **Action PO J+3 / J+7 / J+14** : monitoring GSC indexation (criteres dans runbook seo-indexation-checklist.md livre HOTFIX-S22.0c)

---

## Decisions PO actees S22 (arbitrages Sprint Planning Q1-Q3)

| ID | Decision | Date |
|---|---|---|
| Q1 | Hotfix integre Sprint Planning S22 (vs pattern D39 hors-sprint US-26.1) | 08/05/2026 |
| Q2 | URL "Page en double" — a fournir par PO post-Planning | ⏳ pending |
| Q3 | Action GSC manuelle post-merge confirmee (PO opere GSC depuis S20) | 08/05/2026 |
| Q4 | Engagement total = 6 pts (7 si Q2 OK) — pattern sous-engagement S21 reproduit | 08/05/2026 |
| Q5 | Sprint Goal valide libelle propose §1 refinement | 08/05/2026 |

---

## Reportes en S23+ (acte refinement S22)

| Story | Pts | Raison report |
|---|---|---|
| US-23.1 — Decompose generate-pdf.ts | 2 | Refacto lourd (carry-over S20→S21→S22) |
| US-23.2 — Extract MobileMenu + useFocusTrap | 3 | Refacto lourd (carry-over S20→S21→S22) |
| T20 — vitest-axe quiz components | 2 | E2E axe suffit court terme |
| T26 — checkResend `/emails` health | 1 | Cosmetique, non urgent |
| T46 — Pages services Tier 3 (3 pages) | 5 | Depend T41 livre + capacite dispo |
| HOTFIX-S22.0b | 1 | Si Q2 PO non resolu fin S22 |

---

## Risques sprint S22 (Three Amigos QA `qa-strategy`)

| Risque | Severite | Mitigation |
|---|---|---|
| Cache trop agressive sert contenu stale | Moyen | `s-maxage=86400` (1j) + `stale-while-revalidate` (Google ré-crawl quotidien) |
| Regression CSP ou autre security header | Eleve | Tests E2E security-headers existants + diff PR review |
| Cache-control non-cause racine de la desindexation | Eleve | Monitoring J+7, runbook fallback `seo-indexation-checklist.md` (HOTFIX-S22.0c) |
| Q2 PO non fourni → HOTFIX-S22.0b reporte S23 | Faible | HOTFIX-S22.0a autonome P0 livrable independamment |
| Vercel cache stale apres deploy (env vars not re-baked) | Moyen | Pattern empty commit deja documente runbook vercel-env-vars.md S20 |

---

## Trys retro S22 (entrees Sprint 23, a decouvrir pendant le sprint)

A remplir au fil du sprint et finalise en Sprint 23 retro.

---

*Sprint 22 demarre le 08/05/2026 — Three Amigos triade convoquee sur demande PO. Premiere story : HOTFIX-S22.0a (TDD strict, test rouge → fix → vert → push prod).*
