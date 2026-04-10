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

| Ordre | Story | Pts | Sprint cible | Statut DoR | Fichier |
|-------|-------|-----|--------------|------------|---------|
| 1 | US-21.1 Eliminer waitForTimeout quiz | 1 | Sprint 13 | ✅ Ready | [US-21.1.md](./US-21.1.md) |
| 2 | US-21.2 Smoke + a11y /mentions-legales | 2 | Sprint 13 | ✅ Ready | [US-21.2.md](./US-21.2.md) |
| 3 | US-21.3 Scan axe-core quiz (5 etats) | 3 | Sprint 13 | ✅ Ready | [US-21.3.md](./US-21.3.md) |
| 4 | US-15.4 Playwright dans GitHub Actions CI | 5 | Sprint 13 | ✅ Ready | [US-15.4.md](./US-15.4.md) |
| 5 | US-18.9 API quiz dediee /api/quiz/submit | 4 | Sprint 13 | ✅ Ready | [US-18.9.md](./US-18.9.md) |

**Total Ready : 15 pts** (5 stories, 100% du Sprint 13)

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

---

## Stories en attente de redaction

Aucune — toutes les stories du Sprint 13 sont Ready.

Les 2 decisions ouvertes (D5, D6) impactent des stories post-Sprint 13 et ne
bloquent pas le demarrage du sprint.

---

*docs/stories-ready/README.md — cree le 10/04/2026, mis a jour le 10/04/2026
(Phase 2 refinement, 5/5 stories Ready)*
