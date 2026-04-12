# Sprint Review — Sprint 15 "Assainir et consolider"

> **Date** : 12 avril 2026
> **Sprint Goal** : Assainir les backlogs, monter le mutation score a 60%, consolider les gaps qualite.
> **Verdict** : ATTEINT

---

## Stories livrees

| ID | Titre | Pts | Travail reel |
|---|---|---|---|
| T7 | Audit et archivage backlogs obsoletes | 1 | Oui |
| T5 | Tests hubspot.ts quiz wrappers (6 tests) | 2 | Oui |
| T6 | Ratchet mutation score break: 60% | 1 | Oui |
| A11y | Verification false positive oklch (12.59:1) | 1 | Oui |
| CSP | Hardening (img-src, base-uri, form-action) | 2 | Oui |
| Hooks | Coverage useScrollReveal | 2 | Oui |

**6/6 stories · 9/9 pts · 0 fantome (T1-v2 fonctionne) · 0 reportee**

---

## Metriques

| Metrique | Debut | Fin | Delta |
|---|---|---|---|
| Statements | 87.57% | 92.03% | +4.46% |
| Branches | 77.54% | 83.42% | +5.88% |
| Mutation score | 56.04% | 71.43% | +15.39% |
| Tests unitaires | 645 | 653 | +8 |
| E2E | 95/95 | 95/95 | stable |

---

## Commits

```
62d23df test(hubspot): add upsertHubSpotQuizLead network + error branch tests
222eb4e chore(ci): ratchet mutation score threshold to 60%
c607f09 docs(a11y): document verified contrast ratio on mobile menu false positive
faa60b7 perf(config): harden CSP — tighten img-src, add base-uri and form-action
061edfe test(ui): extend useScrollReveal tests + sprint 15 sprint-current
```

---

## Apprentissages

1. T1-v2 fonctionne : 0 story fantome engagee (vs 60% fantome en S14)
2. Les hooks visuels (IntersectionObserver, rAF) ont une limite jsdom — les branches animation sont couvertes uniquement par E2E Playwright
3. Le mutation testing a le meilleur ROI sur les modules metier (hubspot.ts : 26% → 70% avec 6 tests)
