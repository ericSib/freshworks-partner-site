# Sprint 19 — "SMI complet : ESM + ROI + offer mapping" — 🟢 CLOTURE

> **Sprint Goal** : Livrer le Service Maturity Index™ complet — 3 parcours (ITSM/CX/ESM), ROI estime, offre recommandee.
> **Debut** : 25 avril 2026
> **Fin effective** : 26 avril 2026 (publication prod 25/04 soir)
> **Capacite** : 20 pts (engage 13 pts dev + 4 pts ops Phase 2)
> **Verdict final** : **ATTEINT — INCREMENT EN PRODUCTION**
> **Refinement source** : [refinement/sprint-19-refinement.md](../refinement/sprint-19-refinement.md)
> **Refinement complementaire** : [refinement/refactoring-radar-2026-04-25.md](../refinement/refactoring-radar-2026-04-25.md)
> **Review** : [demo/sprint-19.md](../demo/sprint-19.md)
> **Retrospective** : [retro/sprint-19-retro.md](../retro/sprint-19-retro.md)

---

## Stories engagees — Phase 1 (Dev)

| Ordre | ID | Titre | Pts | Priorite | Statut |
|---|---|---|---|---|---|
| 1 | SMI-esm | Full ESM path (config + questions + dimensions + i18n) | 6 | Must | 🟢 Done (commits 1d21502 / d12f439 / 4f82320 / fe188cb) |
| 2 | SMI-offers | Mapping maturite → offre WaS (matrice 5×3) | 2 | Must | 🟢 Done (commit f2db051) |
| 3 | SMI-roi | ROI estime dans les resultats du quiz | 2 | Should | 🟢 Done (commit 771ef9e) |
| 4 | US-23.4 | (buffer) Suppression exports morts (config) | 1 | Could | 🟢 Done (commit 47a4822) |
| 5 | US-23.5 | (buffer) MaturityPage parameter object | 1 | Could | 🟢 Done (commit c1c3ea0) |
| 6 | US-23.3 | (buffer) Extract FormInput composant | 1 | Could | 🟢 Done (commit 5d97114) |

**Phase 1 — 13 / 13 pts livres + 1 hotfix a11y** (`aebf9e7`)

## Stories Phase 2 (Deploy / Ops — hors backlog initial)

| ID | Titre | Pts | Statut |
|---|---|---|---|
| OPS-26.1 | Domaine custom freshworks.whataservice.fr (DNS OVH + Vercel + cert Let's Encrypt) | 1 | 🟢 Done (ops, no code) |
| OPS-26.2 | Push 15 commits S18+S19 + auto-deploy Vercel | 1 | 🟢 Done (commit 2a82c58) |
| OPS-26.3 | Configurer 3 env vars Vercel (RESEND_API_KEY, NEXT_PUBLIC_GA_MEASUREMENT_ID, CONTACT_EMAIL) + force fresh build | 1 | 🟢 Done (commit 92e8c8e) |
| OPS-26.4 | Fix sender Resend → noreply@update.whataservice.fr (D27) | 1 | 🟢 Done (commit 1e92f10) |
| OPS-26.5 | Smoke test reel : POST /api/contact → email reçu + contact HubSpot cree | 0 | 🟢 Done (validation) |

**Phase 2 — 4 pts ops livres** (boucle universelle violee, cf. retro Drop D8)

## Total Sprint 19

- **Pts livres** : 13 dev + 4 ops = **17 pts** (sur capacite 20)
- **Increment en prod** : ✅ `https://freshworks.whataservice.fr`
- **Email + CRM end-to-end** : ✅ valide par le test 21:54:33

---

## Decisions PO sources

| ID | Decision | Date | Source |
|---|---|---|---|
| D20 | 5 dimensions ESM @ 20% chacune | 25/04/2026 | Refinement S19 |
| D21 | ROI : Forrester TEI + modele interne (option d) — score + taille + segment | 25/04/2026 | Refinement S19 |
| D22 | Matrice complete 5 niveaux × 3 segments validee (15 cellules) | 25/04/2026 | Refinement S19 |
| D23 | Cadence Refactoring Radar institutionnalisee | 25/04/2026 | Refinement Radar |
| D24 | Epic E23 ouverte — "Refactoring Radar (hygiene continue)" | 25/04/2026 | Refinement Radar |
| D25 | Budget refactoring : ~20% sprint | 25/04/2026 | Refinement Radar |
| D26 | Publication prod sur `freshworks.whataservice.fr` (Pattern A "sous-domaine par activite") | 25/04/2026 | Phase 2 ops |
| D27 | Sender Resend = `update.whataservice.fr` (best practice Resend reputation isolation) | 25/04/2026 | Phase 2 ops |

---

## Sprint Goal — test d'atteinte

A la cloture (26/04/2026) :
- [x] Demo : Nadia (DRH ESM) complete /quiz en 7 minutes, voit son score sur les 5 dimensions — couvert par `tests/e2e/quiz-esm.spec.ts` (2/2 passes)
- [x] Demo : page resultats affiche fourchette ROI EUR (min/max) avec disclaimer — composant `QuizROI` + Intl.NumberFormat
- [x] Demo : page resultats affiche l'offre recommandee selon la cellule matrice — composant `QuizRecommendedOffer` + matrice D22 dans `offer-mapping.ts`
- [x] CI green : 913 unit tests, 6/6 quiz E2E + 10/10 contact/a11y E2E, T16 i18n parity passe avec 168 nouvelles cles ESM
- [x] **Increment en prod** : `https://freshworks.whataservice.fr` HTTPS valide, sitemap servi, smoke test POST /api/contact 200 OK
- [x] **Emails operationnels** : test reel `Claude Deploy Test` → email reçu cote PO + contact HubSpot cree (verifie 25/04 ~22h)

---

## Pre-requis ops — bilan post-cloture

- [x] **D26** : DNS OVH `freshworks` → CNAME → cname.vercel-dns.com (resolu)
- [x] **D27** : sender Resend aligne sur `update.whataservice.fr`
- [x] **Env vars Vercel** : `RESEND_API_KEY`, `HUBSPOT_ACCESS_TOKEN`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `CONTACT_EMAIL`, `LOG_LEVEL` configures
- [ ] **HubSpot custom properties ESM** (`smi_esm_score_dim1..5`, `smi_recommended_offer`) — A FAIRE par le PO avant le 1er prospect ESM reel (sinon les leads ESM seront crees mais sans segmentation par dimension)
- [ ] **Lecture rapport Forrester TEI Freshworks public** — pour calibrer les coefficients `PER_EMPLOYEE_GAIN_AT_LEVEL_1` dans `roi.ts` (story candidate S20+)
- [ ] **Soumettre sitemap a Google Search Console** : `https://search.google.com/search-console` → Add property `https://freshworks.whataservice.fr` → Sitemaps → submit `/sitemap.xml`

---

## Inbox Sprint 20 — backlog ordonne par WSJF approximatif

### Stories du Refactoring Radar (refinement 25/04)

| ID | Titre | Pts | Origine |
|---|---|---|---|
| US-23.1 | Decompose `generate-pdf.ts` en helpers (Extract Method) | 2 | Radar 25/04 — S |
| US-23.2 | Extract `MobileMenu` + `useFocusTrap` depuis Header | 3 | Radar 25/04 — M |

### Stories de la Retrospective S19

| ID | Titre | Pts | Origine |
|---|---|---|---|
| T20 | `vitest-axe` sur composants critiques quiz | 2 | Retro S19 — D5 |
| T21 | Process : relecture editoriale PO i18n > 50 cles | 0 | Retro S19 — D6 |
| T22 | Retrospective N en gate du Sprint Planning N+1 (PROCESS.md §4.1) | 1 | Retro S19 — D7 |
| T23 | Sender Resend en variable d'env + assertion de coherence | 1 | Retro S19 — D9 |
| T24 | Runbook env vars Vercel + force-fresh-build documente | 1 | Retro S19 — D10 |
| T25 | Mini-refinement obligatoire pour ops > 30 min | 0 | Retro S19 — D8 |
| T26 | `checkResend` health check : passer a `/emails` (Sending-scope compatible) | 1 | Retro S19 — Phase 2 |

### Total inbox S20 disponible

**12 pts Ready ou refinable** — sous capacite 20 pts. Marge confortable pour absorber un nouveau Refactoring Radar mensuel + une eventuelle decision PO sur la calibration ROI ou la page maturite niveau 2-5.

### Sprint Goal S20 — proposition (a valider Sprint Planning)

> *"Industrialiser les guard-rails qualite et ops decouverts en Phase 2 S19 (a11y au commit, sender en config, runbook deploy) pour que les futurs sprints livrent en prod sans Phase 2 manuelle."*

---

## Transition vers Sprint 20

**Avant le Sprint Planning S20, conduire** :
1. ✅ Retro S18 (rattrape 25/04) → [retro/sprint-18-retro.md](../retro/sprint-18-retro.md)
2. ✅ Retro S19 (cloturee 26/04) → [retro/sprint-19-retro.md](../retro/sprint-19-retro.md)
3. ⏳ Refinement preparatoire S20 — passer T20, T22, T23, T24, T26 a DoR Ready (specs Gherkin + estimation chiffree). Estimation duree refinement : ~45 min.

**Trigger** : prochaine session ouvre par "Refinement preparatoire Sprint 20" dans `docs/refinement/sprint-20-refinement.md`.

---

*Sprint 19 cloture le 26/04/2026 — increment SMI complet en prod, email + CRM operationnels. Voir [demo/sprint-19.md](../demo/sprint-19.md) pour la Sprint Review complete.*
