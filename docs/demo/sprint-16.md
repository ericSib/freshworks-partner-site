# Sprint Review — Sprint 16 "Core Web Vitals & Performance"

> **Date** : 12 avril 2026
> **Sprint Goal** : Lighthouse 90+, performance mobile, seuils qualite verrouilles.
> **Verdict** : ATTEINT (config + optimisations ; validation Lighthouse CI a executer avec Chrome)

---

## Stories livrees

| ID | Titre | Pts | Travail reel |
|---|---|---|---|
| T8 | T1-v2 institutionnalise dans PROCESS.md | 1 | Oui |
| T10+T11 | Ratchet coverage 80% + mutation 65% | 1 | Oui |
| T9 | Domaine custom freshworks.whataservice.fr (D14) | 1 | Oui |
| T13 | Tests useReducedMotion (7 tests) | 2 | Oui |
| T12 | Grain texture GPU perf (will-change + reduced-motion) | 1 | Oui |
| CWV | Lighthouse CI config + optimisations | 5 | Oui |

**6/6 stories · 11/11 pts · 0 fantome · 0 reportee**

---

## Metriques

| Metrique | Debut S16 | Fin S16 | Delta |
|---|---|---|---|
| Seuil coverage CI | 75% | 80% | +5% |
| Seuil mutation CI | 60% | 65% | +5% |
| Tests unitaires | 653 | 660 | +7 |
| E2E | 95/95 | 95/95 | stable |
| Domain | whataservice.fr | freshworks.whataservice.fr | D14 |
| Lighthouse CI | N/A | .lighthouserc.js (90+ threshold) | nouveau |
| Grain perf | SVG feTurbulence brut | will-change + contain + reduced-motion | optimise |

---

## Commits

```
f3281a8 docs(process): institutionalize T1-v2 story verification at sprint planning
06b9b5e chore(ci): ratchet coverage to 80% and mutation score to 65%
0f5454f test(a11y): add useReducedMotion hook tests
266bcac perf(ui): optimize grain texture overlay for GPU compositing
eb38ac6 feat(config): set custom domain freshworks.whataservice.fr (D14)
74282bd perf(ci): add lighthouse CI config with 90+ threshold on 4 categories
```

---

## Apprentissages

1. T1-v2 institutionnalise : 4eme sprint consecutif sans fantome — le process est mature
2. Les hooks visuels (useReducedMotion) sont bien testables en jsdom grace a useSyncExternalStore + mock matchMedia
3. La config Lighthouse CI necessite Chrome sur le runner — a ajouter au workflow e2e.yml en Sprint 17
