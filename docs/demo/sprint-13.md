# Sprint Review — Sprint 13 "Fiabiliser et couvrir"

> **Date** : 12 avril 2026
> **Sprint Goal** : Fiabiliser le quiz lead magnet en production et securiser main par la CI.
> **Verdict** : ATTEINT

---

## Stories livrees

| ID | Titre | Pts | Origine | Resultat |
|---|---|---|---|---|
| US-21.1 | Eliminer waitForTimeout E2E | 1 | Initial | Done (pre-sprint) |
| US-21.2 | E2E smoke + a11y /mentions-legales | 2 | Initial | Done |
| US-21.3 | Scan axe-core quiz 5 etats | 3 | Initial | Done |
| US-18.9 | API /api/quiz/submit | 4 | Initial | Done |
| US-15.4 | Playwright dans GitHub Actions CI | 5 | Initial | Done |
| US-21.6 | Tests analytics.ts 100% | 1 | Etendu | Done |
| US-21.11 | E2E keyboard nav mobile menu | 1 | Etendu | Done |
| US-21.8 | Tests hubspot.ts | 2 | Etendu | Done |
| US-21.5 | Tests generate-pdf.ts | 2 | Etendu | Done |

**Total** : 9/9 stories · 20/20 pts · 0 reportee

---

## Metriques qualite

| Metrique | Debut | Fin | Delta |
|---|---|---|---|
| Statements | 85.24% | 87.57% | +2.33% |
| Branches | 75.40% | 77.54% | +2.14% |
| Functions | 83.11% | 87.01% | +3.90% |
| Lines | 86.12% | 88.40% | +2.28% |
| E2E pass | 93/104 (2 fail) | 95/95 (0 fail) | 0 fail |
| Unit tests | 638 | 645 | +7 tests |

---

## Demo live

- Homepage FR : OK (mobile 375px + desktop)
- Quiz /fr/quiz : OK, 0 erreur console
- Mentions legales /fr/mentions-legales : OK, 6 sections h2, breadcrumb
- 0 erreur console sur toutes les pages

---

## Commits du sprint

```
0000edf docs(process): add agile framework — Manifeste, boucle universelle, rituels, TDD
b466d43 fix(a11y): add inert to collapsed mobile menu
7a475d3 test(quiz): add unit tests for useQuizSubmit hook
```

---

## Apprentissages

1. Le "bug critique quiz" rapporte n'existait pas — code deja corrige
2. Un seul fix (`inert`) a resolu 3 stories (cause racine commune)
3. La majorite du backlog etait deja implementee — le health check doit verifier l'etat reel de chaque story
4. Le framework agile (CLAUDE.md + PROCESS.md) a structure le travail sans friction

---

## Feedback PO

Sprint Goal atteint. Le quiz lead magnet est fiable en production (API, schema, HubSpot, 0 erreur). Main est securise par la CI (lint + typecheck + tests + build + E2E Playwright). La couverture a progresse sur les 4 axes.
