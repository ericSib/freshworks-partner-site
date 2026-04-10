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

### Sprint 13 "Fiabiliser et couvrir" (15 pts + 2 pts hotfix)

| Ordre | Story | Pts | Statut DoR | Fichier |
|-------|-------|-----|------------|---------|
| 1 | US-21.1 Eliminer waitForTimeout quiz | 1 | ✅ Ready | [US-21.1.md](./US-21.1.md) |
| 2 | US-21.2 Smoke + a11y /mentions-legales | 2 | ✅ Ready | [US-21.2.md](./US-21.2.md) |
| 3 | US-21.3 Scan axe-core quiz (5 etats) | 3 | ✅ Ready | [US-21.3.md](./US-21.3.md) |
| 4 | US-15.4 Playwright dans GitHub Actions CI | 5 | ✅ Ready | [US-15.4.md](./US-15.4.md) |
| 5 | US-18.9 API quiz dediee /api/quiz/submit | 4 | ✅ Ready | [US-18.9.md](./US-18.9.md) |
| **HOT** | **US-21.5 Tests unitaires generate-pdf.ts** (hors-velocite) | **2** | ✅ Ready | [US-21.5.md](./US-21.5.md) |

### Sprint 14 "Consolider la qualite interne" (propose)

| Ordre | Story | Pts | Statut DoR | Fichier |
|-------|-------|-----|------------|---------|
| 1 | US-21.6 Completer tests analytics.ts | 1 | ✅ Ready | [US-21.6.md](./US-21.6.md) |
| 2 | US-21.7 Refacto QuizResultsPreview (4 sous-composants) | 3 | ✅ Ready | [US-21.7.md](./US-21.7.md) |

**Total Ready Sprint 13** : 15 pts in-sprint + 2 pts hotfix (US-21.5)
**Total Ready Sprint 14** : 4 pts (2/5 stories — US-21.4, logger, US-10.1 en refinement)

> **Note capacity** : cible initiale 13 pts → 15 pts apres passage de US-18.9
> de 3 a 4 pts (D3 Option A retenue). Depassement de 2 pts (+15%) acceptable
> au vu de l'importance strategique du sprint (correction bug critique quiz
> + activation CI E2E).
>
> **Ordre d'implementation recommande** (documente dans chaque story) :
> 1. **US-21.1** (1 pt) — quick win, debloque la CI future
> 2. **US-21.2** (2 pts) — autonome, couvre mentions-legales
> 3. **US-21.3** (3 pts) — autonome, couvre quiz a11y
> 4. **US-15.4** (5 pts) — active la CI sur tous les tests deja livres
> 5. **US-18.9** (4 pts) — feat majeure, beneficie de la CI des le demarrage

---

## Decisions tranchees (reference)

| Decision | Statut | Impact |
|----------|--------|--------|
| **D3** : Archi API quiz | ✅ **Option A** — endpoint dedie `/api/quiz/submit` | US-18.9 passee de 3 a 4 pts |
| **D4** : Priorite Playwright CI | ✅ **Must** (ex-Could) | US-15.4 integree Sprint 13 |
| **D5** : Pages maturite L2-L5 vs blog/pilliers | 🕐 En attente | Impact backlog post-Sprint 13 |
| **D6** : Scope US-10.1 "E2E complementaires" | 🕐 En attente | US-10.1 reste Could, a clarifier ou archiver |
| **D7** : US-21.5 hotfix hors-sprint vs intra-sprint | ✅ **Hors-velocite** (remboursement dette Sprint 9) | Sprint Goal 13 preserve |
| **D8** : Structured logging Sprint 14 vs lointain | 🕐 En attente | Finding #7 audit, reco PO : rester lointain |
| **D9** : Refacto QuizResultsPreview avant/apres A/B test | 🕐 En attente | Reco PO : avant (US-21.7 Sprint 14) |

---

## Stories en attente de redaction

Aucune — toutes les stories du Sprint 13 sont Ready.

Les 2 decisions ouvertes (D5, D6) impactent des stories post-Sprint 13 et ne
bloquent pas le demarrage du sprint.

---

*docs/stories-ready/README.md — cree le 10/04/2026, mis a jour le 10/04/2026
(Phase 3 refinement post-audit : +US-21.5 hotfix Sprint 13 + US-21.6/US-21.7 Sprint 14 propose)*
