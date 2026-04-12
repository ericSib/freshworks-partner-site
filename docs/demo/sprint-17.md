# Sprint Review — Sprint 17 "Refonte homepage"

> **Date** : 12 avril 2026
> **Sprint Goal** : Refondre le contenu homepage — catalogue 8 offres, narratif PAS, personas, pricing.
> **Verdict** : ATTEINT

## Stories livrees

| ID | Titre | Pts |
|---|---|---|
| S17-1 | Config catalogue 8 offres (offers.ts, schema slugs) | 3 |
| S17-2 | Refonte i18n FR+EN (hero PAS, problems personas, 8 offres) | 5 |
| S17-3 | Composant Services refonde (3 tiers, 8 icones) | 3 |
| S17-4 | CTA sticky persistant | 1 |

**4/4 stories · 12/12 pts · 0 report**

## Commits

```
513afe5 feat(config): add 8-offer complexity-first catalogue (D18)
a7d5e7a feat(i18n): rewrite homepage narratif — PAS framework, personas, 8 offers
6f0e21b feat(services): refonte composant — 3 tiers complexity-first (D18)
31f9d87 feat(ui): add sticky CTA banner at bottom of viewport
```

## Apprentissages

1. La refonte de contenu (i18n) est le chantier le plus lourd — 818 lignes changees sur 2 fichiers JSON
2. Le composant Services s'adapte dynamiquement au catalogue via config/offers.ts — pas de hardcoding
3. Le CTA sticky utilise inert + aria-hidden pour l'a11y (meme pattern que le mobile menu Sprint 13)
