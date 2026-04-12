# Sprint 14 — "Industrialiser la qualite et poser les fondations SEO"

> **Sprint Goal** : Industrialiser la qualite (mutation testing, coverage 75%, commitlint aligne) et poser les fondations SEO (FAQ schema JSON-LD, 50+ tests SEO).
> **Debut** : 19 avril 2026
> **Fin** : 25 avril 2026
> **Capacite** : 20 pts (forecast conservateur 10 pts)

---

## Stories engagees

| ID | Titre | Pts | Priorite | Statut |
|---|---|---|---|---|
| T2+T3 | Aligner commitlint scopes + monter seuil coverage 75% | 1 | Must | Committed |
| US-17.1 | Cleanup Button.tsx mort | 1 | Could | Committed |
| US-22.SEO | Atteindre 50+ tests SEO (actuellement 33) | 2 | Should | Committed |
| US-21.10 | Setup Stryker mutation testing + CI | 3 | Should | Committed |
| US-22.6 | FAQ schema JSON-LD + rich snippets | 3 | Should | Committed |

**Total engage** : 10 pts / 20 pts capacite

---

## Metriques qualite de depart (fin Sprint 13)

| Metrique | Valeur | Seuil actuel | Seuil cible S14 |
|---|---|---|---|
| Statements | 87.57% | 70% | 75% |
| Branches | 77.54% | 60% | 65% |
| Functions | 87.01% | 70% | 75% |
| Lines | 88.40% | 70% | 75% |
| Tests unitaires | 645 pass / 0 fail | 100% pass | 100% pass |
| Tests E2E | 95 pass / 0 fail | 100% pass | 100% pass |
| Mutation score | N/A | N/A | >= 60% (5 modules) |
| Tests SEO | 33 | — | 50+ |
| Commitlint warnings | 1 (scope quiz) | 0 | 0 |

---

## Sprint Planning (12/04/2026)

**Sprint Goal valide** : Industrialiser la qualite et poser les fondations SEO.

**Test du Goal** : npm run test:mutation passe >= 60%, seuil CI coverage a 75%, commitlint 0 warning, schema FAQ JSON-LD valide.

**Ordre de travail** :
1. T2+T3 (1 pt) + US-17.1 (1 pt) — Jour 1
2. US-22.SEO (2 pts) — Jour 2-3
3. US-21.10 (3 pts) — Jour 3-5
4. US-22.6 (3 pts) — Jour 5-7
