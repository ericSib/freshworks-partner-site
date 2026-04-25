# Sprint 19 — "SMI complet : ESM + ROI + offer mapping"

> **Sprint Goal** : Livrer le Service Maturity Index™ complet — 3 parcours (ITSM/CX/ESM), ROI estime, offre recommandee.
> **Debut** : 25 avril 2026 (Sprint Planning faisant suite a Sprint Review S18)
> **Fin** : 02 mai 2026
> **Capacite** : 20 pts (engage 10 pts + buffer 4 pts)
> **Refinement source** : [refinement/sprint-19-refinement.md](../refinement/sprint-19-refinement.md)
> **Refinement complementaire** : [refinement/refactoring-radar-2026-04-25.md](../refinement/refactoring-radar-2026-04-25.md) (buffer alimente)

---

## Stories engagees

| Ordre | ID | Titre | Pts | Priorite | Statut |
|---|---|---|---|---|---|
| 1 | SMI-esm | Full ESM path (config + questions + dimensions + i18n) | 6 | Must | 🟢 Done (commits 1d21502 / d12f439 / 4f82320 / fe188cb) |
| 2 | SMI-offers | Mapping maturite → offre WaS (matrice 5×3) | 2 | Must | 🟢 Done (commit f2db051) |
| 3 | SMI-roi | ROI estime dans les resultats du quiz | 2 | Should | 🟢 Done (commit 771ef9e) |
| 4 | US-23.4 | (buffer) Suppression exports morts (config) | 1 | Could | 🟢 Done (commit 47a4822) |
| 5 | US-23.5 | (buffer) MaturityPage parameter object | 1 | Could | 🟢 Done (commit c1c3ea0) |
| 6 | US-23.3 | (buffer) Extract FormInput composant | 1 | Could | 🟢 Done (commit 5d97114) |

**Total core engage** : 10 pts (SMI)
**Buffer engage** : 3 pts (US-23.3 + US-23.4 + US-23.5 — quick wins Refactoring Radar)
**Total engage** : 13 pts
**Capacite** : 20 pts
**Marge de securite** : 7 pts (rythme soutenable, principe Manifeste #8)

---

## Decisions PO sources

| ID | Decision | Date |
|---|---|---|
| D20 | 5 dimensions ESM @ 20% chacune | 25/04/2026 |
| D21 | ROI : Forrester TEI + modele interne (option d) — score + taille + segment | 25/04/2026 |
| D22 | Matrice complete 5 niveaux × 3 segments validee (15 cellules) | 25/04/2026 |
| D23 | Cadence Refactoring Radar institutionnalisee — chaque scan → refinement → epic E23 | 25/04/2026 |
| D24 | Epic E23 ouverte — "Refactoring Radar (hygiene continue)" | 25/04/2026 |
| D25 | Budget refactoring : ~20% sprint — quick wins en buffer, structurels en stories dediees | 25/04/2026 |

---

## Etat refinement des stories

| Story | DoR | Fichier | Bloque par |
|---|---|---|---|
| SMI-esm | ✅ Ready | [stories-ready/SMI-esm.md](../stories-ready/SMI-esm.md) | — |
| SMI-offers | ✅ Ready | [stories-ready/SMI-offers.md](../stories-ready/SMI-offers.md) | — |
| SMI-roi | ✅ Ready | [stories-ready/SMI-roi.md](../stories-ready/SMI-roi.md) | — |
| US-23.3 | ✅ Ready | [stories-ready/US-23.3.md](../stories-ready/US-23.3.md) | — |
| US-23.4 | ✅ Ready | [stories-ready/US-23.4.md](../stories-ready/US-23.4.md) | — |
| US-23.5 | ✅ Ready | [stories-ready/US-23.5.md](../stories-ready/US-23.5.md) | — |

### Inbox Sprint 20 (issus du Refactoring Radar 25/04)

| Story | DoR | Fichier | Effort |
|---|---|---|---|
| US-23.1 | ✅ Ready | [stories-ready/US-23.1.md](../stories-ready/US-23.1.md) | 2 pts (S — Decompose generate-pdf.ts) |
| US-23.2 | ✅ Ready | [stories-ready/US-23.2.md](../stories-ready/US-23.2.md) | 3 pts (M — Extract MobileMenu + useFocusTrap) |

---

## Sprint Goal — test d'atteinte

A la Sprint Review (02/05) :
- [x] Demo : Nadia (DRH ESM) complete /quiz en 7 minutes, voit son score sur les 5 dimensions — couvert par `tests/e2e/quiz-esm.spec.ts` (2/2 passes)
- [x] Demo : page resultats affiche fourchette ROI EUR (min/max) avec disclaimer — composant `QuizROI` + Intl.NumberFormat
- [x] Demo : page resultats affiche l'offre recommandee selon la cellule matrice — composant `QuizRecommendedOffer` + matrice D22 dans `offer-mapping.ts`
- [x] CI green : 913 unit tests, 6/6 quiz E2E + 10/10 contact/a11y E2E, T16 i18n parity passe avec 168 nouvelles cles ESM

---

## Pre-requis ops avant J1 ou en debut de sprint

- [ ] Creation des proprietes HubSpot custom ESM :
  `smi_esm_score_dim1` a `smi_esm_score_dim5`, `smi_recommended_offer`
- [ ] Lecture rapport Forrester TEI Freshworks public — extraction des
  ranges typiques pour les coefficients ROI

---

## Retro S18 a conduire J1

Avant le Sprint Planning S19 effectif, conduire la retro S18 (Keep / Drop / Try)
pour integrer les insights — notamment :
- Drop : ne plus engager une story sans DoR au Sprint Planning
- Try : automatiser la verification DoR au Sprint Planning ?
- Keep : la T1-v2 (verification etat reel) a evite 0 pt fantome

---

*Sprint planifie le 25/04/2026 — refinement source [sprint-19-refinement.md](../refinement/sprint-19-refinement.md).*
