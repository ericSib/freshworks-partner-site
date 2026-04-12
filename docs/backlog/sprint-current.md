# Sprint 17 — "Pages services + pricing"

> **Sprint Goal** : Deployer les 6 pages services dediees + page pricing "sur devis" pour la longue traine SEO.
> **Debut** : 12 avril 2026
> **Fin** : 18 avril 2026
> **Capacite** : 20 pts (forecast 12 pts — T1-v2 verifie, 0 fantome)

---

## Stories engagees

| ID | Titre | Pts | Priorite | Statut |
|---|---|---|---|---|
| T14 | Ratchet coverage 85% + mutation 70% | 1 | Must | Committed |
| T12 | Lighthouse CI dans e2e.yml | 1 | Should | Committed |
| Pricing | Page pricing "Sur devis" (D12) | 1 | Must | Committed |
| Services | Pages services dediees (6 pages dynamiques) | 8 | Must | Committed |
| Branch-prot | Branch protection main (ops GitHub) | 1 | Could | Committed |

**Total engage** : 12 pts / 20 pts capacite

---

## Ordre de travail

1. T14 (1 pt) — ratchet configs — Jour 1
2. T12 (1 pt) — Lighthouse CI step — Jour 1
3. Pricing (1 pt) — page statique "sur devis" — Jour 1-2
4. Services (8 pts) — Jour 2-7
   - 4a. Framework : route dynamique, config slugs, nav, breadcrumbs
   - 4b. Contenu : 6 pages FR + EN (generation + review)
   - 4c. SEO : JSON-LD Service schema, meta tags
   - 4d. Homepage : service cards → Link vers pages dediees
   - 4e. Tests : rendering, a11y, E2E
5. Branch-prot (1 pt) — ops GitHub — Jour 7
