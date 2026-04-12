# Sprint 13 — "Fiabiliser et couvrir"

> **Sprint Goal** : Fiabiliser le quiz lead magnet en production et securiser main par la CI.
> **Debut** : 12 avril 2026
> **Fin** : 18 avril 2026
> **Capacite** : 15 pts

---

## Stories engagees

| ID | Titre | Pts | Priorite | Statut |
|---|---|---|---|---|
| US-21.1 | Eliminer waitForTimeout dans les tests E2E | 1 | Must | Done |
| US-21.2 | Test E2E smoke + a11y /mentions-legales FR+EN | 2 | Must | Committed |
| US-21.3 | Scan axe-core quiz (5 etats cles) | 3 | Must | Committed |
| US-18.9 | API dediee /api/quiz/submit (endpoint + Zod + HubSpot + refactor client) | 4 | Must | Committed |
| US-15.4 | Playwright dans GitHub Actions CI | 5 | Must | Committed |

**Total engage** : 15 pts / 15 pts capacite

---

## Metriques qualite de depart

| Metrique | Valeur | Seuil |
|---|---|---|
| Statements | 85.24% | 70% |
| Lines | 86.12% | 70% |
| Functions | 83.11% | 70% |
| Branches | 75.40% | 70% |
| Tests unitaires | 638 pass / 0 fail | 100% pass |
| Tests E2E | 93 pass / 2 fail / 9 skip | 100% pass |

---

## Health check 3 Amigos (12/04/2026)

### PO — ALL GREEN

- HubSpot token : `HUBSPOT_ACCESS_TOKEN` utilise dans `src/lib/hubspot.ts:144`
- Resend / GA4 : env vars correctement referencees
- Bug quiz : **deja corrige** — `useQuizSubmit.ts` envoie `"itsm"/"cx"` (lowercase), Zod accepte
- 11 proprietes HubSpot : toutes mappees dans `src/lib/quiz/hubspot.ts:56-66`

### Dev — 1 RED

- Build : OK
- Lint : OK (0 erreurs, 2 warnings non-bloquants)
- Tests : 638 pass, coverage stable
- waitForTimeout : **0 occurrence** (US-21.1 deja done)
- `useQuizSubmit.ts` : **0% coverage** — 58 lignes non couvertes, gain potentiel +11% Stmts

### QA — 3 RED

- Suite E2E : 104 tests, **2 failures** (axe-core mentions-legales mobile-chrome)
- Tests flaky : aucun (suite propre)
- data-testid mentions-legales : **0** — manquant pour US-21.2
- data-testid quiz : **0** sur 13 composants — manquant pour US-21.3

---

## Decisions sprint

| ID | Decision | Date |
|---|---|---|
| D-S13-1 | US-21.1 marquee Done (waitForTimeout deja elimines) | 12/04/2026 |
| D-S13-2 | Les 2 fails E2E a11y mobile seront adressees par US-21.2/US-21.3 | 12/04/2026 |
| D-S13-3 | data-testid a instrumenter au debut de US-21.2 et US-21.3 | 12/04/2026 |

---

## Notes

- Bug critique quiz (segment Zod mismatch) initialement rapporte : **non confirme** — le code est correct.
- `useQuizSubmit.ts` a 0% coverage est une dette identifiee, a traiter dans un sprint futur ou en complement de US-18.9.

---

## Sprint Planning (12/04/2026)

**Sprint Goal valide** : Fiabiliser le quiz lead magnet en production et securiser main par la CI.

**Test du Goal** : La suite E2E complete passe en vert en CI GitHub Actions, incluant scans axe-core sur /mentions-legales et quiz, et le quiz produit des leads structures dans HubSpot via /api/quiz/submit.

**Ordre de travail** :
1. US-21.2 (2 pts) — Jour 1-2
2. US-21.3 (3 pts) — Jour 2-3
3. US-18.9 (4 pts) — Jour 3-5
4. US-15.4 (5 pts) — Jour 5-7

**Note** : US-18.9 avancee avant US-15.4 car le refactor client quiz est un prerequis pour que les tests E2E soient stables en CI.
