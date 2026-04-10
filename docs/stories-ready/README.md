# Stories Ready — Definition of Ready (DoR)

> **But** : stocker les User Stories detaillees et pretes a etre prises par un developpeur.
> Une story n'entre ici **qu'apres validation de la Definition of Ready**.
> Source de verite principale : `../../PRODUCT-BACKLOG.md`.

---

## Pourquoi ce dossier

Le `PRODUCT-BACKLOG.md` maintient le backlog priorise en one-liners, ce qui
facilite la vue d'ensemble mais ne contient pas assez de details pour etre
"Ready" au sens Scrum. Ce dossier sert de tampon entre le backlog et le Sprint.

Chaque story Ready est un fichier Markdown independant : `US-XX.Y.md`.

---

## Definition of Ready (DoR)

Une story est Ready quand toutes les cases sont cochees :

- [ ] **Format standard** : rôle + action + benefice ("En tant que... je veux... afin de...")
- [ ] **3 a 5 criteres d'acceptation** en Given/When/Then (Gherkin)
- [ ] **Estimee** en story points (Fibonacci : 1, 2, 3, 5, 8, 13)
- [ ] **Pas de dependance bloquante** non resolue (decisions, specs, APIs externes)
- [ ] **Fichiers impactes** identifies (chemins relatifs depuis la racine)
- [ ] **Donnees de test** definies (fixtures, mocks, comptes de demo)
- [ ] **Perspective QA** : criteres de test automatisable identifies
- [ ] **DoD applicable** verifiee (voir section 7 du PRODUCT-BACKLOG.md)

---

## Template de story

Utiliser `_TEMPLATE.md` comme point de depart pour chaque nouvelle story.

---

## Workflow

```
Backlog (one-liner) --> [3-Amigos refinement] --> docs/stories-ready/US-XX.Y.md --> Sprint --> Implementation --> Done
```

1. **Refinement** : le PO (ou 3-Amigos) redige la story complete depuis un one-liner du backlog.
2. **Review DoR** : checklist ci-dessus validee.
3. **Sprint Planning** : stories tirees depuis ce dossier vers le sprint actif.
4. **Apres implementation** : supprimer le fichier de ce dossier (il reste trace dans git + PRODUCT-BACKLOG.md historique).

---

## Stories actuellement Ready

### Sprint 13 "Fiabiliser et couvrir" — ✅ **LIVRE** (11/04/2026)

Toutes les stories du sprint 13 ont ete livrees et committees. Les fichiers
`US-21.1.md`, `US-21.2.md`, `US-21.3.md`, `US-21.5.md`, `US-15.4.md` et
`US-18.9.md` sont conserves pour reference (traçabilite) mais ne sont plus
pris en compte pour le tirage en Sprint Planning.

| Story | Pts | Commit | Verdict |
|-------|-----|--------|---------|
| US-21.5 generate-pdf tests (hotfix) | 2 | `788cd8f` | ✅ coverage 38% → 75.31% |
| US-21.1 Eliminer waitForTimeout | 1 | `5168a96` | ✅ 0 match grep |
| US-21.2 /mentions-legales smoke + a11y | 2 | `ca5d2d1` | ✅ 5 tests E2E |
| US-21.3 Quiz a11y scan (5 etats) | 3 | `1287a91` + `da42ccc` | ✅ 1 fix + 5 tests |
| US-15.4 Playwright CI | 5 | `6f4f8c6` | ✅ workflow `.github/workflows/e2e.yml` |
| US-18.9 API quiz dediee | 4 | `9d1228e` | ✅ bug critique HubSpot fixe |

### Sprint 14 "Consolider la qualite interne" — **ACTIF** (demarre 11/04/2026)

| Ordre | Story | Pts | Statut DoR | Fichier |
|-------|-------|-----|------------|---------|
| 1 | US-21.6 Completer tests analytics.ts | 1 | ✅ Ready | [US-21.6.md](./US-21.6.md) |
| 2 | US-21.8 Tests unit hubspot.ts (contact, recadre 11/04) | 2 | ✅ Ready | [US-21.8.md](./US-21.8.md) |
| 3 | US-21.11 Test E2E mobile menu keyboard nav | 1 | ✅ Ready | [US-21.11.md](./US-21.11.md) |
| 4 | US-21.9 Tests unit useQuiz hook (state machine) | 3 | ✅ Ready | [US-21.9.md](./US-21.9.md) |
| 5 | US-21.7 Refacto QuizResultsPreview (4 sous-composants) | 3 | ✅ Ready | [US-21.7.md](./US-21.7.md) |

### Sprint 15 "Qualite avancee" (propose)

| Ordre | Story | Pts | Statut DoR | Fichier |
|-------|-------|-----|------------|---------|
| 1 | US-21.10 Stryker mutation testing + CI | 3 | ✅ Ready | [US-21.10.md](./US-21.10.md) |
| 2 | US-21.4 QuizPage POM (centraliser selecteurs) | 3 | 🕐 Refinement | — |
| — | Chore : `chore(ci): raise vitest threshold 70% → 80%` (suite D13) | hors-velocite | — | — |

**Total Ready Sprint 14** : **10 pts** (5/5 stories) — engagement bas de fourchette 10-13
**Total Ready Sprint 15** : 3 pts (1/2 stories — US-21.4 en refinement)

> **Ordre d'implementation recommande Sprint 14** :
> 1. **US-21.6** (1 pt) — quick win analytics
> 2. **US-21.8** (2 pts) — aligner `src/lib/hubspot.ts` historique sur `quiz/hubspot.ts` (deja livre US-18.9)
> 3. **US-21.11** (1 pt) — quick win, filet a11y hors-sprint `28a8186` (pattern `expect.toPass` obligatoire)
> 4. **US-21.9** (3 pts) — **prerequis obligatoire** avant US-21.7
> 5. **US-21.7** (3 pts) — refacto beneficiant du filet US-21.9

---

## Decisions tranchees (reference)

| Decision | Statut | Impact |
|----------|--------|--------|
| **D3** : Archi API quiz | ✅ **Option A** — endpoint dedie `/api/quiz/submit` | US-18.9 livre Sprint 13 |
| **D4** : Priorite Playwright CI | ✅ **Must** (ex-Could) | US-15.4 livre Sprint 13 |
| **D5** : Pages maturite L2-L5 vs blog/pilliers | 🕐 En attente stakeholder | Impact backlog Sprint 16+ |
| **D6** : Scope US-10.1 "E2E complementaires" | ✅ **Backlog lointain** (archive) | Tranchee 11/04 |
| **D7** : US-21.5 hotfix hors-sprint vs intra-sprint | ✅ **Hors-velocite** | Sprint Goal 13 preserve |
| **D8** : Structured logging Sprint 14 vs lointain | ✅ **Backlog lointain** | Tranchee 11/04 — volume actuel ne le justifie pas |
| **D9** : Refacto QuizResultsPreview avant/apres A/B test | ✅ **Avant** (US-21.7 Sprint 14) | Cout refacto posterior >> anterior |
| **D10** : Tests hubspot.ts integres US-18.9 vs story dediee | ✅ **Story dediee** (US-21.8 Sprint 14) | Respect INVEST |
| **D11** : Tests useQuiz hook unit vs E2E only | ✅ **Unit prioritaire** (US-21.9 Sprint 14) | Cout E2E 10x + protege refacto US-21.7 |
| **D12** : Mutation testing Sprint 14 vs Sprint 15 | ✅ **Sprint 15** (US-21.10 differe) | Pre-requis : modules critiques a 80%+ |
| **D13** : Seuil coverage vitest (60% actuel) | ✅ **70% fin Sprint 14** | Tranchee 11/04 — commit `chore(ci)` hors velocite, cible 80% Sprint 16 |

---

## Stories en attente de redaction

Aucune — toutes les stories Sprint 14 (Must/Should) sont Ready.

- **Sprint 13** : ✅ livre 11/04/2026 (6/6 stories DONE)
- **Sprint 14** : 5 stories Ready (10 pts), demarrage 11/04/2026
- **Sprint 15** : 1 story Ready (US-21.10), US-21.4 en refinement

Les decisions ouvertes restantes (D5 uniquement) n'impactent pas les sprints
14-15 et seront arbitrees au Sprint Planning Sprint 16.

---

*docs/stories-ready/README.md — cree le 10/04/2026, mis a jour le 11/04/2026
(cloture Sprint 13 + activation Sprint 14 + D6/D8/D13 tranchees)*
