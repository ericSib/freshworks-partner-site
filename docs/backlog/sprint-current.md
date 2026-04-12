# Sprint 15 — "Assainir et consolider"

> **Sprint Goal** : Assainir les backlogs, monter le mutation score a 60%, et consolider les derniers gaps de qualite.
> **Debut** : 12 avril 2026
> **Fin** : 18 avril 2026
> **Capacite** : 20 pts (forecast 9 pts — T1-v2 verifie, 0 story fantome)

---

## Stories engagees

| ID | Titre | Pts | Priorite | Statut |
|---|---|---|---|---|
| T7 | Audit et archivage backlogs obsoletes | 1 | Must | Committed |
| T5 | Tests hubspot.ts quiz wrappers (mock fetch) | 2 | Must | Committed |
| T6 | Ratchet mutation score break: 60% | 1 | Must | Committed |
| A11y-contrast | Verifier false positive oklch color-contrast | 1 | Should | Committed |
| CSP | CSP hardening (tighten policies + reporting) | 2 | Should | Committed |
| Hooks-cov | Coverage useCountUp + useScrollReveal ≥ 80% | 2 | Should | Committed |

**Total engage** : 9 pts / 20 pts capacite

---

## T1-v2 — Verification au Sprint Planning (0 story fantome)

Chaque candidate a ete verifiee en direct :
- T7 : archive existe mais root copies non-committed → TRAVAIL REEL
- T5 : 4 fonctions hubspot quiz non testees (59 mutants no-coverage) → TRAVAIL REEL
- T6 : score 56.04%, seuil 55%, depend de T5 → TRAVAIL REEL
- A11y : 1 seule occurrence, false positive documente → TRAVAIL REEL (verification)
- CSP : Calendly deja whiteliste, hardening broad policies → TRAVAIL REEL
- Hooks : useCountUp 39%, useScrollReveal 60%, mocks en place → TRAVAIL REEL

---

## Sprint Planning

**Ordre de travail** :
1. T7 (1 pt) — audit backlogs — Jour 1
2. T5 (2 pts) — tests hubspot.ts wrappers — Jour 1-2
3. T6 (1 pt) — ratchet mutation 60% — Jour 2 (apres T5)
4. Hooks-cov (2 pts) — useCountUp + useScrollReveal — Jour 3-4
5. A11y-contrast (1 pt) — verification false positive — Jour 4
6. CSP (2 pts) — hardening — Jour 5-6
