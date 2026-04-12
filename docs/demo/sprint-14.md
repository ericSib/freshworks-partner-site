# Sprint Review — Sprint 14 "Industrialiser la qualite et poser les fondations SEO"

> **Date** : 12 avril 2026
> **Sprint Goal** : Industrialiser la qualite et poser les fondations SEO.
> **Verdict** : ATTEINT

---

## Stories livrees

| ID | Titre | Pts | Travail reel | Resultat |
|---|---|---|---|---|
| T2+T3 | commitlint scopes + coverage 75% | 1 | Oui | Done |
| US-17.1 | Cleanup Button.tsx | 1 | Minimal | Done |
| US-22.SEO | 50+ tests SEO | 2 | Non (pre-sprint) | Done |
| US-21.10 | Stryker mutation testing | 3 | Oui | Done |
| US-22.6 | FAQ schema JSON-LD | 3 | Non (pre-sprint) | Done |

**Total** : 5/5 stories · 10/10 pts · 0 reportee
**Travail reel** : 4/10 pts. 6 pts fantomes malgre T1.

---

## Metriques qualite

| Metrique | Debut | Fin | Delta |
|---|---|---|---|
| Seuil coverage CI | 70% | 75% | +5% |
| Mutation score | N/A | 56.04% | nouveau |
| Commitlint warnings | 1 | 0 | corrige |
| Tests unitaires | 645 | 645 | stable |
| Tests E2E | 95/95 | 95/95 | stable |
| Coverage | 87.57% | 87.57% | stable |

---

## Commits du sprint

```
53c73db chore(config): add quiz/api/hubspot scopes + raise coverage to 75%
7452bde chore(ci): setup stryker mutation testing on 5 critical modules
```

---

## Apprentissages

1. T1 (verification etat reel) doit se faire au Sprint Planning, pas au refinement
2. Score mutation 56% revele hubspot.ts sous-teste (65 mutants non couverts)
3. Le forecast conservateur (10 pts) etait justifie — aurait ete 16 pts fantomes sinon
